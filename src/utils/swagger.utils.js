import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptios = {
  swaggerDefinition: {
    info: {
      title: 'Coderhouse Backend Project Documentation',
      description: 'Carts and Products API endpoints',
      version: '1.0.0'
    }
  },
  apis: ['docs/**/*.yaml']
}

const specs =  swaggerJSDoc(swaggerOptios)

export default specs