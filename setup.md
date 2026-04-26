# HerbBayog Setup Guide

## Quick Start

### 1. Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your MySQL credentials

# Database setup
python manage.py makemigrations
python manage.py migrate
python manage.py dbshell < herbal_plants/seed_data.sql

# Start server
python manage.py runserver
```

### 2. Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

### 3. Model Setup
Place your trained TensorFlow model at:
```
backend/models/herbbayog_v1.h5
```

## Database Configuration
Create MySQL database:
```sql
CREATE DATABASE herbbayog;
```

Update `.env` file:
```
DB_NAME=herbbayog
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
```

## Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin Panel: http://localhost:8000/admin/

## Features Included
✅ Complete Django backend with TensorFlow integration
✅ React frontend with Tailwind CSS
✅ Live camera scanning with react-webcam
✅ Plant database with 10 DOH medicinal plants
✅ Statistics dashboard with Chart.js
✅ Mobile-responsive design
✅ CORS configuration for frontend-backend communication

## Troubleshooting
- Ensure MySQL is running
- Check Python and Node.js versions
- Verify all dependencies are installed
- Place model file in correct location
