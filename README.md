# ShopEase — React + Vite E-Commerce App

A modern, responsive single-page e-commerce application built with React and Vite. It includes:

- Dynamic product loading and filtering
- Category browsing with sidebar toggle
- Shopping cart functionality with quantity management
- Checkout flow with form validations (Formik + Yup)
- Persistent cart & address storage via `localStorage`
- Fake payment and delivery confirmation using React-Bootstrap UI

---

## Demo & Hosting

**Live Demo:** _[Add GitHub Pages/Vercel link here once deployed]_

---

## Features

1. **Product Catalog**
   - Fetches products and categories from [dummyjson.com](https://dummyjson.com)
   - Search and category filters with real-time suggestions

2. **Responsive Layout**
   - Sidebar for categories on larger screens
   - Toggleable sidebar on tablets and mobiles
   - Product grid adjusts for each viewport

3. **Cart Management**
   - Add/remove products, adjust quantity
   - Cart status displayed in navbar badge
   - Cart stored persistently using `localStorage`

4. **Checkout & Address Forms**
   - Accordion-based delivery address selection and form
   - Formik + Yup for structured form validation
   - Numeric-only inputs and field-level error messages

5. **Payment Simulation**
   - Dummy payment flow with validation
   - Confetti animation on successful order

---

## Tech Stack

- **React** 19 (Hooks, Context API)
- **Vite** for fast development and build
- **React-Bootstrap** for UI components
- **Formik** + **Yup** for form handling & validation
- **React Router v7** for routing
- **Canvas-Confetti** for order celebration animation
- **CSS Modules + Custom Styles** for responsive UI

---

## Installation & Startup

1. **Clone the repository**
   ```bash
   git clone https://github.com/BHOGESH4I9/E-Commerce.git
   cd E-Commerce

2. **Install dependencies**
bash - npm install

3. **Start development server**
bash - npm run dev
The app will run at http://localhost:5173

4. **Build for production**
npm run build

5. **Deploy to GitHub Pages (optional)**
bash - npm run deploy

## Project Structure
src/
├─ components/
│  ├─ ProductCard/
│  ├─ Categories/
│  └─ checkout/
│     ├─ AddressListAccordion.jsx
│     ├─ AddressFormAccordion.jsx
│     └─ DeliveryAddressSection.jsx
├─ pages/
│  ├─ ProductPage.jsx
│  ├─ CartPage.jsx
│  ├─ CheckoutPage.jsx
│  └─ AuthPage.jsx
├─ context/
│  └─ ProductContext.jsx
├─ App.jsx
└─ main.jsx

## Validation & Error Handling

Formik + Yup schemas validate all form inputs
Inline error messages shown in red under each field
Numeric-only input validation for mobile number and pincode
Accordion form toggles and resets correctly after address submission

## Contribute

Want to contribute?
Fork this repo
Create a feature branch
Submit a pull request

**Looking for improvements in:**

Real authentication (Firebase/Auth0)
Backend integration for orders
Unit and integration tests
Better UX on small devices

## License
This project is open source under the MIT License.
Feel free to use, modify, and distribute with credit.

## Next Steps

Add order summary and history view
Introduce real payment gateway (e.g. Razorpay/Stripe)
Optimize performance with lazy loading and image caching
Migrate backend to Firebase/Node later


---

Let me know if you want me to auto-generate a badge section (like build status, license, etc.) or add deployment steps for GitHub Pages or Vercel.
