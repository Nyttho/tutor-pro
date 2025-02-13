# TutorPro - Private Tutoring Platform

## **Concept:**

TutorPro is an application dedicated to private tutors, providing them with a centralized tool to effectively manage their courses and students.

This intuitive platform will allow teachers to gather all the essential information in one place:

- **Student details** for personalized tracking
- **Course management** with a history of lessons taught
- **Payment tracking** for better financial organization

With this solution, private tutors can streamline their daily management tasks and focus fully on teaching.

## **Requirements:**

- **Node.js** (v14.x or higher)
- **PostgreSQL** (v12.x or higher)

## **Installation:**

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/tutorpro.git
```
### 2. Navigate to the project folder: 

```bash
cd tutor-pro
```

### 3. Install dependencies:
Make sure you have Node.js installed. Then run:

```bash
npm install
```

### 4. Set up the PostgreSQL database:

```bash
psql -U <bd-user> -d <db-name> -f database/migrations/01_initial_schema.sql
```

### 5. Set up environment variables:
Rename .env.exemple file to .env and set the variables.

### 6. Run the application:
To start the server in development mode, use:

```bash
npm run start
```
## API Documentation:
You can explore and interact with the API using Swagger. The documentation will be available at http://localhost:3000/api-docs/