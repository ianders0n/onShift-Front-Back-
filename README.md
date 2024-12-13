OnShift
The goal of this project is to solve a common logistical challenge faced by the event staff at our school: managing and keeping track of what needs to be done for daily event setup. 
The OnShift system will automate and simplify the tracking of what needs to be done from shift to shift, reducing the amount of communication error between coordinator and supervisor.

User Guide
1. Clone the repository

2. Install dependencies in both client and server: cd client npm i cd .. cd server npm i

3. Set up the database: npx prisma generate npx prisma migrate dev --name init npm run seed

4. Configure environment variables:
    .env for server settings (PORT, DATABASE_URL)
    .env.local for client settings (NEXT_PUBLIC_API_BASE_URL)

5. Run the project npm run dev (ensure that server is also running)
