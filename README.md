# Maison Web

Maison Web is a modern, full-stack web application designed for a professional digital agency or development portfolio. Built with performance and aesthetics in mind, the platform serves as a public-facing portfolio while featuring robust administrative capabilities to manage services, projects, brands, and client feedback dynamically.

## Features

- **Dynamic Portfolio:** Showcase past projects with smooth and interactive scroll animations powered by Framer Motion.
- **Service Management:** Dynamically display and categorize offered web and digital services.
- **Client Feedback & Brands:** Highlight client testimonials, reviews, and external brand collaborations.
- **Integrated Admin Capabilities:** Access secure API endpoints to seed, create, update, and organize database entries directly from the application.
- **Modern UI/UX:** Crafted with Tailwind CSS 4, React Icons, and Lucide React for a sleek, responsive, and intuitive user interface.
- **Secure Contact Forms:** Built-in messaging features utilizing Nodemailer for email alerts and React Google Recaptcha to prevent spam.
- **Scalable Data Management:** Fully integrated with MongoDB using Mongoose, enabling flexible document schemas for all agency data.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Email Delivery:** [Nodemailer](https://nodemailer.com/)
- **Spam Protection:** [React Google reCAPTCHA](https://www.npmjs.com/package/react-google-recaptcha)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [MongoDB](https://www.mongodb.com/) cluster or local instance

### Environment Variables

To run the project, rename `.env.example` to `.env.local` (or create a new `.env.local` file) and configure the following required variables:

```env
# Database configuration
MONGODB_URI=your_mongodb_connection_string

# Email delivery and notification settings
NO_REPLY_EMAIL=your_email_for_sending_notifications
NO_REPLY_PASS=your_email_app_password
SERVICE_PROVIDER_EMAIL=your_service_provider_email_to_receive_messages
```

*(Note: Create an App Password if using Gmail for `NO_REPLY_PASS`)*

### Installation

1. Clone the repository and navigate into the directory:
   ```bash
   git clone <repository_url>
   cd maison-web
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Start the development server (runs with Turbopack for faster execution):
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

This project is fully optimized for continuous deployment on [Vercel](https://vercel.com/). Ensure that all environment variables specified above are correctly configured within your Vercel project settings prior to building. 

For more advanced configurations and custom domains, please refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
