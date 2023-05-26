import { describe, before, after, it, beforeEach } from 'mocha'
import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'

import dbConnect from '../configs/db.config.js'

const expect = chai.expect

const requester = supertest('http://localhost:3000')

const mockUser = {
  firstName: 'User',
  lastName: 'Test',
  email: 'coder@test.com',
  age: '32',
  password: '123456',
}

const mockProduct = {
  title: 'Test product',
  description: 'Product test description',
  code: 'CR86A51',
  price: 100,
  status: true,
  stock: 24,
  category: 'Test-1',
  thumbnails: ['./imgs/img-3.jpg', './imgs/img-3-2.jpg']
}

let cookie = {}

describe('Ecommerce Tests', () => {

  before(async () => {
    await dbConnect()
  })

  // Delete test DB
  beforeEach(async () => {
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.collection('carts').deleteMany({})
    await mongoose.connection.collection('products').deleteMany({})
  })

  after(async () => {
    mongoose.connection.close()
  })

  describe('Users', () => {

    it('User creation', async () => {
      const { statusCode, ok, _body } = await requester.post('/api/users').send(mockUser)
      expect(statusCode).to.equal(201)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
      expect(_body.message).to.be.equal('User created OK')
    })

    it('Get Users', async () => {
      await requester.post('/api/users').send(mockUser)
      const { statusCode, ok, _body } = await requester.get('/api/users?email=coder@test.com')
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
      expect(_body.user.firstName).to.be.equal(mockUser.firstName)
    })

  })

  describe('Sessions', () => {

    it('Login proccess', async () => {
      await requester.post('/api/users').send(mockUser)
      const { statusCode, ok, headers } = await requester.post('/api/auth/login').send({
        email: mockUser.email,
        password: mockUser.password
      })
      const split = headers['set-cookie'][0].split('=')
      cookie = {
        name: split[0],
        token: split[1]
      }
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(cookie.name).to.be.ok.and.equal('connect.sid')
      expect(cookie.token).to.be.ok
    })

    it('Get current session', async () => {
      const { statusCode, ok, _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.token}`])
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.success).to.be.equal('success')
      expect(_body.session.user.email).to.be.equal(mockUser.email)
    })
  })

  describe('Products', () => {

    it('Product creation', async () => {
      const { statusCode, ok, _body } = await requester.post('/api/products').send(mockProduct).set('Cookie', [`${cookie.name}=${cookie.token}`])
      expect(statusCode).to.equal(201)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
      expect(_body.message).to.be.equal('Product creation OK')
    })

    it('Get products', async () => {
      const { statusCode, ok, _body } = await requester.get('/api/products')
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
    })
  })

  describe('Carts', () => {

    it('Cart creation', async () => {
      const { statusCode, ok, _body } = await requester.post('/api/carts')
      expect(statusCode).to.equal(201)
      expect(ok).to.be.true
      expect(_body.success).to.be.equal('success')
      expect(_body.message).to.be.equal('Cart created OK')
    })

    it('Get products by CartId', async () => {
      const response = await requester.post('/api/carts')
      const createdCart = response._body.createdCart
      const { statusCode, ok, _body } = await requester.get(`/api/carts/${createdCart.id}`)

      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.success).to.be.equal('success')
      expect(_body.products.items).to.be.an('array').that.is.empty
    })

  })


})
