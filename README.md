# E-commerce Application

This is a full-stack e-commerce application with a separate admin panel and user-facing frontend, built using React.js for the frontend and Node.js with Express.js for the backend. MongoDB is used as the primary database.

## Table of Contents

- [Features](#features)
  - [Admin Panel](#admin-panel)
  - [User Frontend](#user-frontend)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Admin Panel Setup](#admin-panel-setup)
  - [User Frontend Setup](#user-frontend-setup)
- [Environment Variables](#environment-variables)

---

## Features

### Admin Panel

The admin panel provides functionalities for managing products and orders efficiently.

* **Admin Authentication:** Secure login system for administrators.
* **Product Management:**
    * Add new products with details such as name, description, price, category, sub-category, sizes, and multiple images.
    * View a comprehensive list of all products.
    * Update and remove existing products.
* **Order Management:**
    * View all customer orders.
    * Update the status of orders (e.g., Order Placed, Packing, Shipped, Out For Delivery, Delivered).

### User Frontend

The user-facing frontend allows customers to browse products, manage their cart, and place orders seamlessly.

* **User Authentication:** Register, login (including Google Sign-In), and logout functionalities.
* **Product Catalog:**
    * Browse products on the home and collection pages.
    * View detailed information for individual products, including multiple images, descriptions, and available sizes.
    * Search for products by name.
    * Filter products by category and sub-category.
    * Sort products by price (low to high, high to low) and relevance.
* **Shopping Cart:**
    * Add products to the cart with selected sizes.
    * Update product quantities in the cart.
    * Remove items from the cart.
* **Order Placement:**
    * Proceed to checkout from the cart.
    * Place orders using Cash on Delivery (COD) or the Stripe payment gateway.
* **Order History:** View a list of all previously placed orders.
* **Informational Pages:** * **About Us:** Information about the company's mission and values.
    * **Contact Us:** Contact details and career information.
    * **Newsletter:** Subscription form for updates and promotions.

---

## Technologies Used

**Frontend (Admin & User):**
* React.js
* Vite (Build tool)
* Tailwind CSS (Styling)
* React Router DOM (Navigation)
* Axios (API requests)
* React Toastify (Notifications)

**Backend:**
* Node.js & Express.js (Web framework)
* MongoDB & Mongoose (Database & ODM)
* Cloudinary & Multer (Image storage & `multipart/form-data` handling)
* JWT & Bcrypt (Authentication & Password hashing)
* Validator (Input validation)
* CORS (Cross-Origin Resource Sharing)
* Dotenv (Environment variables management)
* Stripe (Payment gateway integration)
* Google OAuth (Client ID for Sign up/Login)
* Brevo (Email Sender / SMTP)

---

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* MongoDB Atlas account (or local MongoDB instance)
* Cloudinary account
* Stripe account (for payment gateway)
* Google Cloud Console account (for Google Client ID)
* Brevo account (for SMTP email sending)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the `backend` directory and add the following environment variables. *(Replace the placeholder values with your actual credentials)*:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_uri
    JWT_SECRET=your_jwt_secret
    
    # Admin Credentials
    ADMIN_EMAIL=your_admin_email@example.com
    ADMIN_PASSWORD=your_admin_password
    STORE_ADMIN_EMAIL=your_store_receiving_email@gmail.com
    
    # Stripe Integration
    STRIPE_SECRET_KEY=your_stripe_secret_key
    
    # Cloudinary Integration
    CLOUDINARY_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    
    # Email / SMTP (Brevo)
    EMAIL_USER=your_email_address@gmail.com
    EMAIL_PASS=your_email_app_password
    SMTP_API_KEY=your_brevo_smtp_api_key
    
    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    ```

4.  **Run the backend server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The backend server will run on `http://localhost:3000` (or the port you specified in `.env`).

### Admin Panel Setup

1.  **Navigate to the `admin` directory:**
    ```bash
    cd ../admin
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the `admin` directory and add the following:
    ```env
    VITE_BACKEND_URL=http://localhost:3000
    ```

4.  **Run the admin panel:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The admin panel will run on `http://localhost:5174` (or the port specified in your Vite config).

### User Frontend Setup

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the `frontend` directory and add the following:
    ```env
    VITE_BACKEND_URL=http://localhost:3000
    ```

4.  **Run the user frontend:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The user frontend will run on `http://localhost:5173`.

---

## Environment Variables Reference

Make sure to properly configure the following environment variables in their respective `.env` files:

### Backend (`backend/.env`)

* **Server & Database**
    * `PORT`: Port for the backend server (default: `3000`).
    * `MONGODB_URI`: Connection string for your MongoDB database (e.g., from MongoDB Atlas).
    * `JWT_SECRET`: A strong, random string for JWT token signing.
* **Admin Access**
    * `ADMIN_EMAIL`: Email address used to log into the Admin Panel.
    * `ADMIN_PASSWORD`: Password used to log into the Admin Panel.
    * `STORE_ADMIN_EMAIL`: The email address where store notifications (like new orders or contact forms) will be sent.
* **Stripe (Payments)**
    * `STRIPE_SECRET_KEY`: Your secret key from Stripe for payment processing.
* **Cloudinary (Images)**
    * `CLOUDINARY_NAME`: Your Cloudinary cloud name.
    * `CLOUDINARY_API_KEY`: Your Cloudinary API key.
    * `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
* **Email Sending (Brevo / Nodemailer)**
    * `EMAIL_USER`: The sender's email address (e.g., `xyz123@gmail.com`).
    * `EMAIL_PASS`: The App Password for the sender's email account.
    * `SMTP_API_KEY`: Your Brevo (or other SMTP provider) API key for sending emails.
* **Authentication**
    * `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID for enabling Google Sign-Up/Login.

### Frontend & Admin (`admin/.env` & `frontend/.env`)

* `VITE_BACKEND_URL`: The full URL of your running backend server (e.g., `http://localhost:3000`).