# 🚀 Practica integradora ecommerce
Author: Ivan Talijancic

# 📦 Contenido del repositorio
En este repositorio se entrega el código correspondiente a la resolución de

## 📋 Consignas
Continuar trabajando sobre el proyecto que has trabajdo para tu ecommerce y configurar los siguientes elementos

### ✅ Aspectos a incluir
- Agregar el modelo de persistencia de Mongo a tu proyecto.
- Crear una base de datos llamada `ecommerce` dentro de Atlas, y crear las siguientes colecciones:
    - Carts
    - Messages
    - Products
- Separar los Manager del filesSystem de los managers de MongoDb.
- Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem
- **NO ELIMINAR** FileSystem de tu proyecto.
- Implementar una vista nueva en handlebars llamada `chat.handlebars`, la cual permita implementar un chat como el visto en clases. Los mensajes deberán guardarse en una colección `mensajes` en mongo (no es necesario implementarlo en FileSystem). El formato es `{user: correo de usuario, message: mensaje del usuario}`
- Comprobar la integridad del proyecto para que todo funcione como lo ha echo hasta ahora.