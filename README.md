# ShoppyGlobe Backend

A robust e-commerce backend API built with Node.js, Express, and MongoDB.

## Demo

[Live Demo](https://github.com/utkrisht25/ShoppyGlobe_BE) 

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Product Management
- Shopping Cart Functionality
- Secure Password Hashing
- MongoDB Database Integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing

## API Endpoints

### Authentication

```
POST /api/auth/register - Register a new user
POST /api/auth/login - Login existing user
```

### Products

```
GET /api/products - Get all products
POST /api/products - Add a new product
GET /api/products/:id - Get a specific product
PUT /api/products/:id - Update a product
DELETE /api/products/:id - Delete a product
```

### Cart

```
GET /api/cart - Get user's cart
POST /api/cart - Add item to cart
PUT /api/cart/:itemId - Update cart item
DELETE /api/cart/:itemId - Remove item from cart
```

## Project Structure

```
ShoppyGlobe_BE/
├── controllers/
│   └── authControllers.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Cart.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   └── productRoutes.js
├── utils/
│   └── generateToken.js
├── .env
├── index.js
└── package.json
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/utkrisht25/ShoppyGlobe_BE.git
   ```

2. Install dependencies:
   ```bash
   cd ShoppyGlobe_BE
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   KEY=your_jwt_secret_key
   MONGO=your_mongodb_connection_string
   PORT=5500
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

- `KEY` - JWT secret key for token generation
- `MONGO` - MongoDB connection string
- `PORT` - Server port (default: 5500)

## API Documentation

### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Product Schema
```javascript
{
  name: String,
  price: Number,
  description: String,
  stock: Number
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License

This project is licensed under the ISC License.

## Author

[Utkrisht25](https://github.com/utkrisht25)
