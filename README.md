# Pasteplace

A modern **Next.js** application for storing and sharing text snippets securely. Built with **TailwindCSS**, **Shadcn UI**, and **Turso/LibSQL** for persistent storage.

## Features

- **Optimistic UI**: Instant feedback for add/delete actions with loading states.
- **Pagination**: Browse pastes 10 per page with navigation controls.
- **Markdown Support**: Choose between plain text and markdown modes; markdown is rendered safely.
- **Password Protection**: Secure pastes with optional passwords.
- **Responsive Design**: Clean, modern UI that works on desktop and mobile.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- Edit pages in the `app/` directory (e.g., `app/page.tsx`).
- Run `npm run lint` to check code quality.

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## Deployment

Deploy effortlessly with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

You will also need to create a database for the application. You can use [Turso](https://turso.tech) for this.

To deploy on vercel, push your code to a GitHub repository, and then follow the instructions on the Vercel Platform.

Once you have created a database and deployed the application, you will need to set the following environment variables (you can do this in the Vercel dashboard, or locally in a `.env.local` file in the root of the project when developing):

- `TURSO_DATABASE_URL`: The URL of your database.
- `TURSO_AUTH_TOKEN`: The authentication token for your Turso account.
- `PASTEPLACE_PASSWORD`: The password for your Pasteplace instance.

This is all you need to do to deploy the application.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)


---

© 2025 Pasteplace. All rights reserved.

