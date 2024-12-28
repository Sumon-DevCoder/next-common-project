# **Common - Fronted**

**Common** Frontend provides the user interface for the e-commerce platform with a modern and responsive design built using Next.js, TypeScript, React, and Redux. It enables users to browse products, book items, manage carts, and interact with a seamless, intuitive UI. Integrated with the backend through secure APIs, it ensures smooth real-time updates, secure user authentication, and efficient order processing.

## **Live Demo**

[Live Link](Common)

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

# Project Overview:

**Common** Frontend is the interactive interface for a full-stack e-commerce platform, providing an engaging shopping experience. Integrated with the **Mega Mart Backend**, it features product browsing, cart management, order placement, and booking functionality. The platform is designed to be responsive, offering smooth functionality across devices, and is optimized for both desktop and mobile viewing.

## Objectives

- **Seamless User Experience**: Provide an intuitive, responsive, and accessible shopping and cart and order experience, allowing users to browse, search, and filter product listings.
- **Efficient cart System**: Enable users to reserve favorite product with real-time availability feedback and dynamic pricing calculations.
- **Robust Admin Management**: Empower admins with tools to manage products, orders, payments, and slot reservations, supporting operational efficiency and effective inventory control.
- **Scalability**: Ensure the platform can handle growing traffic and data, accommodating an expanding inventory, user base, and booking needs.
- **Real-Time Interaction**: Implement real-time updates for product and slot availability to enhance user engagement and admin oversight.

## Features

1. **Product Browsing and Management**:

   - Detailed Proudct listings organized by categories (e.g., electronices, food, furniture, SmartPhone, etc)
   - Search, filtering, and pagination for optimized browsing and selection

2. **User Booking**:

   - **Browse** available prodcut and reservation.
   - **Create bookings** by selecting preferred product.
   - **Automatic Pricing Calculation**: Total cost is calculated based on selected slots and associated pricing.
   - **Real-Time Availability**: Users receive instant feedback and product availability.

3. **Admin & User Roles**:

   - **Admin**: Comprehensive dashboard with tools for product, order, payment, and slot management
   - **User**: Simplified checkout, cart management, and booking process for a smooth purchasing journey

4. **Responsive and Aesthetic UI**:

   - blue-themed design for visual consistency
   - Enhanced sidebar navigation with interactive elements like border styles and emojis

5. **Additional Functionalities**:
   - AdminSidebar with Home, About, and Contact links that auto-collapse on smaller screens
   - Real-time updates for users on availability and for admins on booking and order processing

**Common** delivers a fully functional, user-friendly, and scalable platform for the e-commerce trade, supporting effective interaction between admins and users. The new booking feature adds versatility, making it easy for users to secure products or slots while ensuring admins can monitor availability and bookings effectively.

## Technology Stack

- **Frontend**: Next.js, TypeScript, React, Redux, RTK Query, Tailwind CSS,
- **Backend**: API routes, Node, Express, Mongodb, mongoose, custom Axios instance for API handling
- **Authentication**: JWT stored in cookies for secure, persistent user sessions
- **Image Hosting**: ImgBB API for efficient product image storage
- **Payment Processing**: Amarpay integration for secure and reliable transactions
- **Programming Language:** Javascript
- **Web Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sumon-DevCoder/Common.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd maga-Common
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env.local` file in the root directory and add your environment variables**:

   ```bash
   # .env crediential (REDACTED)
   DB_URL=mongodb+srv://<username>:<password>@cluster0. 0i0xa.mongodb.net/Common?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   BCRYPT_SALT_ROUND=12
   NODE_ENV='development'

   # payment credential (REDACTED)
   STORE_ID="aamarpaytest"
   SIGNETURE_KEY="dbb74894e82415a2f7ff0ec3a97e4183"
   PAYMENT_URL="https://sandbox.aamarpay.com/jsonpost.php"
   PAYMENT_VERIFY_URL="https://sandbox.aamarpay.com/api/v1/trxcheck/request.php"

   # admin credentials (REDACTED)
   admin_email=sumon.devcoder@gmail.com
   admin_password=sumon-Dev24%
   admin_mobile_number=+8801962-878499

   # jwt credentials (REDACTED)
   JWT_ACCESS_SECRET=secret
   JWT_ACCESS_EXPIRES_IN=365d
   JWT_REFRESH_SECRET=refreshscret
   JWT_REFRESH_EXPIRES_IN=365d
   ```

# Usage

```
npm run dev
```

# License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code for personal, educational, or commercial purposes, subject to the terms of the license. See the LICENSE file for more details.
