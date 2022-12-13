# 🚀 Proyecto Final
## Primera entrega
Author: Ivan Talijancic

# 📦 Contenido del repositorio
En este repositorio se entrega el código correspondiente a la primera entrega del proyecto final del curso de `BackEnd` de `Coderhouse`.

## 📋 Consignas
- Desarrollar un **servidor** basasdo en `Node.js` y `Express`, que escuche el puerto 8080 y que disponga de dos grupos de rutas: `/api/products` y `/api/carts`. Dichos endpoints estarán implementados con el router de express.

### ✅ Especificaciones
- Productos
    - Para el manejo de productos, el cuál tendrá su router en `/api/products`, configurar las siguientes rutas:
        - La ruta raíz `GET /` deberá listar todos los productos de la base. (Incluyendo la limitación `?limit` del desafio anterior)
        - La ruta `GET /:pid` deberá traer sólo el producto con el `pid` porporcionado.
        - La ruta `POST /` deberá agrear un nuevo producto con los campos:
            - **id**: `Number/String` (A elección el `id` no se manda desde el body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los `ids` en el archivo).
            - **title**: `String`
            - **description**: `String`
            - **code**: `String`
            - **price**: `Number`
            - **status**: `Boolean` - default `true`
            - **stock**: `Number`
            - **category**: `String`
            - **thumbnails**: `String[]`
            - Todos los campos son OBLIGATORIOS, a excepción de thumbnails.
        - La ruta `PUT /:pid` deberá tomar un producto y actualizarlo por los campos embiados desde el body. NUNCA se debe actualizar o eliminar el `id` al momento de hacer dicha actualización.
        - La ruta `DELETE /:pid` deberá eliminar el producto con el `pid` indicado.

- Carrito:
    - Para el manejo del carrito, el cuál tendrá su ruta en `/api/carts`, configurar dos rutas:
        - La ruta raíz `POST /` deberá crear un nuevo carrito con la siguiente estructura:
            - **id**: `Number/String` (A elección, de igual manera como con los porductos, se debe asegurar qque nunca se dupliquen los `ids` y que sean autogenerados).
            - **products**: `Objects Array` Array de objetos que representan cada producto.
        - La ruta `GET /:cid` deberá listar los productos que pertenezcan al carrito con el parámetro `cid` proporcionado.
        - La ruta `POST /:cid/product/:pid` deberá agregar el producto al arreglo _products[ ]_ del carrito seleccionado, agregandose como un objeto bajo el siguiente formato:
            - **product**: Solo debe contener el `id` del producto (Es crucial que no se agregue el producto completo).
            - **quantity**: Debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
            - NOTA: Si un producto ya existente intenta agregarse al carro, se deberá incrementar el campo quantity de dicho producto.
