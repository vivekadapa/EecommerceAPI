# API Overview

## User APIs

### Create User
`POST /users`
- **Description**: Creates a new user.
- **Request Body**: JSON object with user details (e.g., name, email, phone).
- **Response**: Returns the created user object.

### Update User
`PUT /users/:id`
- **Description**: Updates an existing user's details.
- **Parameters**: 
  - `id`: The ID of the user to be updated.
- **Request Body**: JSON object with updated user details.
- **Response**: Returns the updated user object.

### Get User
`GET /users/:id`
- **Description**: Retrieves the details of a specific user by ID.
- **Parameters**:
  - `id`: The ID of the user to be fetched.
- **Response**: Returns the user object with the specified ID.

---

## Product APIs

### Create Product
`POST /products`
- **Description**: Creates a new product.
- **Request Body**: JSON object with product details (e.g., name, category, price, stock).
- **Response**: Returns the created product object.

### Update Product
`PUT /products/:id`
- **Description**: Updates an existing product's details.
- **Parameters**: 
  - `id`: The ID of the product to be updated.
- **Request Body**: JSON object with updated product details.
- **Response**: Returns the updated product object.

### Get Product
`GET /products/:id`
- **Description**: Retrieves the details of a specific product by ID.
- **Parameters**: 
  - `id`: The ID of the product to be fetched.
- **Response**: Returns the product object with the specified ID.

---

## Order APIs

### Create Order
`POST /orders`
- **Description**: Creates a new order.
- **Request Body**: JSON object with order details (e.g., userId, productId, quantity).
- **Response**: Returns the created order object.

### Get Order by ID
`GET /orders/:orderId`
- **Description**: Retrieves the details of a specific order by order ID.
- **Parameters**: 
  - `orderId`: The ID of the order to be fetched.
- **Response**: Returns the order object with the specified order ID.

### Update Order
`PUT /orders/:orderId`
- **Description**: Updates the status of an existing order.
- **Parameters**: 
  - `orderId`: The ID of the order to be updated.
- **Request Body**: JSON object with updated order details.
- **Response**: Returns the updated order object.

### Get Recent Orders
`GET /orders/recent`
- **Description**: Retrieves the most recent orders.
- **Response**: Returns an array of recent order objects.

### Get Orders by User
`GET /orders/user/:userId`
- **Description**: Retrieves all orders placed by a specific user.
- **Parameters**:
  - `userId`: The ID of the user whose orders are to be fetched.
- **Response**: Returns an array of orders placed by the user.

### Get Users by Product
`GET /orders/product/:productId/users`
- **Description**: Retrieves all users who have placed orders for a specific product.
- **Parameters**: 
  - `productId`: The ID of the product whose buyers are to be fetched.
- **Response**: Returns an array of users who have ordered the specified product.

### Get Total Stock
`GET /orders/stock/total`
- **Description**: Retrieves the total stock of all products.
- **Response**: Returns the total stock available across all products.
