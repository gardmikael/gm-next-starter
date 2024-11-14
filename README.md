## Overview

This is a Next.js template which includes the following technology

- Next.js (with app router)
- Drizzle orm
- Lucia auth
- postgres
- Resend emails

The point of this template is to allow you to setup a project which has a lot of the necessary authentication functionality out of the box, such as

- Google oauth login
- Magic link login
- Email / password login
- Password reset flow email
- Account registration + confirmation emails

## Running locally

1. `cp .env.sample .env` (fill out the necessary information for email support with resend, and your google oauth info, more info below)
1. `npm i`
1. `npx drizzle-kit push` (will create your sqlite database)
1. `npm run dev`

### Setting up Google Provider

If you want google login, you'll need to setup a google project and create some keys:

1. https://console.cloud.google.com/apis/credentials
2. create a new project
3. setup oauth consent screen
4. create credentials - oauth client id
5. for authorized javascript origins

- http://localhost:3000
- https://your-domain.com

6. Authorized redirect URIs

- http://localhost:3000/api/login/google/callback
- https://your-domain.com/api/login/google/callback

7. Set your google id and secret inside of .env

- **GOOGLE_CLIENT_ID**
- **GOOGLE_CLIENT_SECRET**
