import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Coderhouse Backend Project Documentation',
      description: 'Carts and Products API endpoints',
      version: '1.0.0'
    }
  },
  apis: ['docs/**/*.yaml']
}

const specs =  swaggerJSDoc(swaggerOptions)

export default specs