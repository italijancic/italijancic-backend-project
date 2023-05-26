# 🚀 Projecto Final
## Curso de Back-End: Coderhouse
Author: Ivan Talijancic

# 📦 Contenido del repositorio
Servicio de backend para la implementación de un `ecommerce`, permitiendonos la gestión de los siguientes recursos:

- `Usuarios`:
  - Registro
  - Login
  - Logout
  - Recuperación de contraseña
  - Eliminación de usuarios por inactividad y notificación de eleiminación de cuenta mediante email

- `Productos`:
  - Creación
  - Actualización
  - Eliminación, solo para usuarios admin o prmium. Cuando se elimine un producto se notifica al usuario premium mediante un email que se uso su cuenta para eliminar un producto

- `Carros de compra`:
  - Creación
  - Agregado de productos
  - Eliminación de productos

- `Finalización de una compra`:
  - Generar un ticket de compra con todos los elementos que se encuentran en él carro del usuario
  - Calcular el costo total de la compra y eliminar los ítems comprados del carro del usuario

- `Applicación de Chat`:
  - Utilizando `web-socket` para la implementación del mismo

- `Testing de algunas funcionalidades/enpoints`:
  - Utilizando `mocha`

- `Documentación de APIs`:
  - Siguiendo el standard OPEN Api
  - Ver: `host/apidocs`

- `Deployment`:
  - Para el deploy en modo development de la aplicación se hizo uso del servicio gratuito de **Koyeb**
  - Para acceder al servicio ir a [url](https://vocational-libbie-italijancic.koyeb.app/)
