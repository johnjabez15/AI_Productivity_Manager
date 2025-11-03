# Quick Setup Guide

## Step-by-Step Installation

### 1. Prerequisites Check
```bash
# Check Java version (should be 17+)
java -version

# Check Node.js version (should be 16+)
node -v

# Check PostgreSQL
psql --version

# Check Maven
mvn -v
```

### 2. Database Setup
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE productivity_db;

# Exit
\q
```

### 3. Backend Setup
```bash
# Navigate to backend
cd backend

# Update application.properties with your settings
# Required changes:
# - Database password
# - OpenAI API key
# - JWT secret (for production)

# Run the application
mvn spring-boot:run
```

### 4. Frontend Setup
```bash
# Open a new terminal
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the app
npm start
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Register a new account and start using!

## Common Issues

**Q: Backend won't start?**
A: Check if PostgreSQL is running and database exists

**Q: Frontend can't connect to backend?**
A: Ensure backend is running on port 8080

**Q: AI chat not working?**
A: Verify OpenAI API key is correct and has credits

**Q: Login not working?**
A: Check browser console for errors, verify backend is running

## Configuration Files to Update

1. `backend/src/main/resources/application.properties`
   - Line 3: spring.datasource.password
   - Line 15: openai.api.key
   - Line 12: jwt.secret (for production)

2. `frontend/src/services/api.js`
   - Line 3: API_URL (if backend port changes)

## Next Steps After Installation

1. Register a new account
2. Create your first task
3. Try the AI chat feature
4. Mark a task as completed
5. View your progress on the dashboard

Happy coding! 🚀
