# 🧩 ShoppyGlobe Backend

This is the **backend API** for the ShoppyGlobe e-commerce application. It is built using **Node.js**, **Express**, and **MongoDB**. It provides RESTful endpoints for product management, user authentication, and shopping cart functionality.

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas** with **Mongoose**
- **JWT Authentication**
- **Cookie-based sessions**
- **CORS & dotenv configuration**

---

## 📁 Folder Structure

```bash
├── backend/
│ ├── config/
│ │  └──db.js
│ ├── Controller/
│ │  ├──auth.controller.js
│ │  ├──cart.controller.js
│ │  └──products.controller.js
│ ├── middleware/
│ │  └──auth.middleware.js
│ ├── Model/
│ │  ├──user.model.js
│ │  ├──cart.model.js
│ │  └──products.model.js
│ ├── Routes/
│ │  ├──auth.routes.js
│ │  ├──cart.routes.js
│ │  └──products.routes.js
│ ├── utils/
│ │  └──generateToken.js
│ └── server.js
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` folder with the following:

```env
PORT=8080
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/shoppyglobe?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

## 🚀 Getting Started

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. The server runs on:

```
http://localhost:8080
```

## 📦 API Endpoints

### 🛂 Auth Routes (`/auth`)

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| POST   | `/register` | Register a new user   |
| POST   | `/login`    | Log in a user         |
| GET    | `/logout`   | Log out current user  |
| GET    | `/`         | Get current user info |

---

### 🛒 Cart Routes (`/cart`)

> ⚠️ All routes protected by JWT middleware

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| POST   | `/cart`         | Add item to cart            |
| GET    | `/cart`         | Get user’s cart             |
| PUT    | `/cart/:cartId` | Update quantity/remove item |
| DELETE | `/cart/clear`   | Delete all items from cart  |
| DELETE | `/cart/:cartId` | Delete item from cart       |

---

### 📦 Product Routes (`/products`)

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/products`     | Fetch all products  |
| GET    | `/products/:id` | Fetch product by ID |
| POST   | `/products`     | Add new product     |

> You can disable public POST/PUT/DELETE routes in production or protect them using an admin middleware.

## 🧪 Testing

Use tools like Postman or Thunder Client to test the APIs locally. Make sure to attach the access_token (JWT) as a cookie for protected routes.

---

## 🧰 Future Improvements

- Role-based access control (Admin)

- Input validation with Joi or Zod

- Order and payment routes

- Rate limiting and security headers

## 👨‍💻 Author

**Aayush Joshi**

📧 [aayushjoshi1006@gmail.com](mailto:aayushjoshi1006@gmail.com)  
🔗 [GitHub](https://github.com/aayush-joshi1006)

---

## 📄 License

This project is licensed under the MIT License.
