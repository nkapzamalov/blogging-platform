# Project Name

RISEBLOG

## Description

This project is a blog website built with React and Next.js. It aims to create a platform where users can share and explore blog posts. The main features include:

1. Homepage: Displays a list of blog posts with titles, authors, published times, image placeholders, and summaries.
2. Full Blog Post View: Clicking on a blog post shows the complete content of the post.
3. Users can create edit or delete blog posts.

## Prerequisites

Before running this project locally, make sure you have the following environment variables set up:

- `DATABASE_URL`: The connection URL for your MySQL database. Example: `mysql://root:....@localhost:3306/....`
- `USER_EMAIL`: The email address of a test user.
- `USER_PASSWORD`: The password for the test user.
- `USER2_EMAIL`: Another email address for a second test user.
- `USER2_PASSWORD`: The password for the second test user.

## Installation

Follow these steps to set up and run the project:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install project dependencies using Yarn by running the following command: yarn install
4. Set up the required environment variables mentioned in the Prerequisites section by creating a `.env` file in the root of your project and populating it accordingly.
5. Ensure that you have MySQL installed locally. If not, download and install MySQL from [https://dev.mysql.com/downloads/].
6. Create a new MySQL database for your project.
7. Update the `DATABASE_URL` environment variable in your `.env` file with the appropriate MySQL connection details (e.g., host, port, username, password, and database name).
8. Run the database migrations to create the required database tables. Execute the following command:npx prisma migrate dev
9. Start the development server using the following command:yarn dev

## Seeding Dummy Data

To seed the project with dummy data, follow these steps:

1. Make sure your development server is running.
2. Open a terminal window and navigate to the project directory.
3. Run the following command to seed the data: yarn seedData
   Note: If you need to seed more data, you can change the values of the environment variables in your `.env` file. Update the `USER_EMAIL`, `USER_PASSWORD`, `USER2_EMAIL`, and `USER2_PASSWORD` variables to the desired email addresses and passwords for the new dummy data.
