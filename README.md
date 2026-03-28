🛒 ShoppyGlobe E-Commerce App (React + Vite)
🔗 GitHub Repository
👉 Add your repo link here
https://github.com/your-username/shoppyglobe

📌 Project Overview
ShoppyGlobe is a basic e-commerce web application built using React + Vite.
It allows users to browse products, view details, add items to a cart, and simulate a checkout process.

🚀 Features
🧩 Component Structure
App – Main root component

Header – Navigation bar + Cart icon

ProductList – Displays all products

ProductItem – Individual product card

ProductDetail – Detailed product view

Cart – Displays added items

CartItem – Individual cart item

Checkout – Order form + summary

NotFound – 404 error page

🔄 Data Fetching (useEffect + Custom Hook)
Fetch product list from API:
https://dummyjson.com/products

Fetch product details dynamically using route params

Implemented error handling for API failures

🧠 State Management (Redux)
Used Redux Toolkit for managing cart state

Features:

Add to cart

Remove from cart

Update quantity (not below 1)

Search/filter products

🔗 Routing (React Router)
Implemented dynamic routing using:

Home (/)

Product Details (/product/:id)

Cart (/cart)

Checkout (/checkout)

404 Page (*)

⚡ Performance Optimization
Code splitting using React.lazy and Suspense

Lazy loading for components and images

🎨 Styling
Fully responsive design

Clean and modern UI using CSS

🛍️ Checkout Flow
Dummy form for user details

Order summary displayed

On clicking Place Order:

Shows success message

Clears cart

Redirects to Home

🛠️ Tech Stack
React 18

Vite

Redux Toolkit

React Router DOM

CSS

