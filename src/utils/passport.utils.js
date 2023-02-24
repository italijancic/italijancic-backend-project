import passport from 'passport'
import passportLocal  from 'passport-local'
import passportGitHub  from 'passport-github2'

import { User } from '../models/User.model.js'

import * as userServices from '../services/users.services.js'
import * as authServices from '../services/auth.services.js'

import dotenv from 'dotenv'
dotenv.config()

// This two functions are allways required
passport.serializeUser( function(user, done) {
  console.log('Serializing')
  done(null, user._id)
})

passport.deserializeUser( (_id, done) => {
  console.log('Deserializing')

  User.findById(_id, (err, user) => {
    done(err, user)
  })
})

passport.use('singup', new passportLocal.Strategy( { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
  try {
    const userExist = await User.findOne({email: username})
    if (userExist) {
      return done('User already exist', false)
    } else {
      // Call our service in prder to create a new user with hash password
      const user = await userServices.createUser(req.body)
      return done(null, user)
    }
  } catch (error) {
    return done(error.message, false)
  }
}))

passport.use('login', new passportLocal.Strategy( {passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
  try {

    const login = await authServices.login(username, password)

    if (login) {
      const user = await User.findOne({ email: username })
      return done(null, user)
    } else {
      return done('Error on login', false)
    }
  } catch (error) {
    return done(error.message, false)
  }
}))

passport.use('github', new passportGitHub.Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {

    console.log(profile)

    const newUser = {
      first_name: profile.displayName,
      last_name: profile.displayName,
      age: 20,
      email:profile._json.email
    }

    const user = await User.create(newUser)

    done(null, user)

  } catch (error) {
    throw new Error(error.message)
  }
}))

passport.use('githubLogin', new passportGitHub.Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL:'http://localhost:3000/api/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {

    const user = await User.findOne({ email: profile._json.email})

    return done(null, user)
  } catch (error) {
    throw new Error(error.message)
  }
}))

export default passport