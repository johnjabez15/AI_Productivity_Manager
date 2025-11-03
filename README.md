# AI-Based Productivity Manager

A full-stack web application for managing tasks with AI-powered assistance and motivation. Built with React, Spring Boot, and PostgreSQL.

## Features

✨ **User Authentication**: Secure login and registration with JWT tokens
📝 **Task Management**: Create, edit, delete, and organize tasks
🤖 **AI Assistant**: Chat with an AI for motivation and productivity tips
📊 **Progress Tracking**: View completed tasks and track your progress
🎯 **Smart Scheduling**: AI-powered task prioritization based on urgency and priority

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios

### Backend
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- OpenAI API Integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Java 17 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher
- Maven 3.6 or higher
- OpenAI API Key (get from https://platform.openai.com)

## Installation & Setup

### 1. Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:

```bash
psql -U postgres
CREATE DATABASE productivity_db;
\q
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Configure application.properties:
   - Open `src/main/resources/application.properties`
   - Update database credentials if needed:
     ```
     spring.datasource.username=postgres
     spring.datasource.password=your_postgres_password
     ```
   - Add your OpenAI API key:
     ```
     openai.api.key=your-openai-api-key-here
     ```
   - Update JWT secret (for production):
     ```
     jwt.secret=your-secure-256-bit-secret-key
     ```

3. Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on http://localhost:8080

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on http://localhost:3000

## Usage

### Getting Started

1. **Register**: Create a new account at http://localhost:3000/register
2. **Login**: Sign in with your credentials
3. **Dashboard**: View your task statistics and navigate to different features
4. **Create Tasks**: Go to Task Manager and create your first task
5. **AI Chat**: Get motivation and productivity tips from the AI assistant
6. **Track Progress**: View completed tasks to see your accomplishments

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Tasks
- `GET /api/tasks` - Get all tasks for current user
- `GET /api/tasks/completed` - Get completed tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

#### AI Assistant
- `POST /api/ai/chat` - Chat with AI
- `POST /api/ai/schedule-tasks` - Get AI-scheduled task list

## Project Structure

```
AI-Productivity-Manager/
├── backend/
│   ├── src/main/java/com/productivity/
│   │   ├── controller/      # REST API controllers
│   │   ├── service/         # Business logic
│   │   ├── model/           # Entity models
│   │   ├── repository/      # Data access layer
│   │   ├── dto/             # Data transfer objects
│   │   ├── security/        # JWT and security config
│   │   └── config/          # Application configuration
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Configuration

### Database Configuration
Edit `backend/src/main/resources/application.properties`:
- Database URL, username, and password
- JPA/Hibernate settings

### Security Configuration
- JWT secret key (change in production!)
- JWT expiration time (default: 24 hours)
- CORS allowed origins

### OpenAI Configuration
- API key (required for AI features)
- Model selection (default: gpt-4)

## Troubleshooting

### Backend Issues

**Database connection failed:**
- Verify PostgreSQL is running
- Check database credentials in application.properties
- Ensure productivity_db database exists

**Port 8080 already in use:**
- Change server.port in application.properties
- Update API URL in frontend (api.js)

### Frontend Issues

**CORS errors:**
- Verify backend CORS configuration
- Check that frontend URL matches cors.allowed.origins

**API connection failed:**
- Ensure backend is running on http://localhost:8080
- Check API_URL in src/services/api.js

**OpenAI API errors:**
- Verify API key is valid
- Check API key has sufficient credits
- Ensure internet connectivity

## Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/productivity-manager-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your web server
```

## Security Notes

⚠️ **Important Security Reminders:**
- Change JWT secret key before deploying to production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Regularly update dependencies
- Never commit API keys to version control

## Features in Detail

### Task Management
- Create tasks with title, description, priority, and deadline
- Update task status (Pending, In Progress, Completed)
- Delete tasks
- View tasks organized by status

### AI Assistant
- Motivational chat interface
- Context-aware responses
- Task scheduling suggestions
- Productivity tips

### Progress Tracking
- View completed tasks
- Task completion statistics
- Visual dashboard with metrics

## License

This project is created for educational and interview purposes.

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

## Credits

Created as a demonstration project showcasing full-stack development with modern technologies.
