# HerbBayog - Herbal Plant Classification System

## Overview
HerbBayog is a comprehensive web application for identifying Philippine medicinal plants using AI-powered image classification. Developed for Calbayog City Herbal Research, this system focuses on 10 DOH-approved medicinal plants with detailed information about their medicinal uses and preparation methods.

## Features

### 🌿 **Plant Identification**
- Live camera scanning with real-time CNN classification
- Image upload support for plant identification
- TensorFlow-powered machine learning model
- 95%+ accuracy on trained plant species

### 📊 **Comprehensive Database**
- 10 DOH-approved Philippine medicinal plants
- Detailed medicinal uses and preparation steps
- Cultural relevance information
- Scientific names and descriptions

### 📱 **Modern UI/UX**
- Responsive design for mobile and desktop
- Nature-inspired green theme
- Interactive statistics dashboard
- Real-time scanning interface

### 📈 **Analytics & Statistics**
- Confusion matrix visualization
- Per-class accuracy metrics
- Training progress charts
- Performance analytics

## Supported Plants
1. **Lagundi** (Vitex negundo L.)
2. **Sambong** (Blumea balsamifera)
3. **Tsaang Gubat** (Carmona retusa)
4. **Ampalaya** (Momordica charantia)
5. **Bawang** (Allium sativum)
6. **Bayabas** (Psidium guajava)
7. **Niyog-niyogan** (Quisqualis indica)
8. **Yerba Buena** (Clinopodium douglasii)
9. **Akapulko** (Cassia alata)
10. **Ulasimang Bato** (Peperomia pellucida)

## Technology Stack

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API development
- **TensorFlow 2.13** - Machine learning
- **MySQL** - Database
- **OpenCV** - Image processing

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Webcam** - Camera integration
- **Chart.js** - Data visualization
- **Lucide React** - Icons

## Project Structure

```
HerbBayog/
├── backend/
│   ├── herbbayog/           # Django project
│   ├── herbal_plants/       # Django app
│   │   ├── models.py        # Database models
│   │   ├── views.py         # API views
│   │   ├── urls.py          # URL routing
│   │   └── seed_data.sql    # Database seed
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   └── App.js           # Main app
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL 5.7+
- pip and npm

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. **Setup MySQL database**
```sql
CREATE DATABASE herbbayog;
```

6. **Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

7. **Seed the database**
```bash
python manage.py dbshell < herbal_plants/seed_data.sql
```

8. **Create superuser (optional)**
```bash
python manage.py createsuperuser
```

9. **Start Django server**
```bash
python manage.py runserver
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start React development server**
```bash
npm start
```

## Model Setup

### Place your trained model in:
```
backend/models/herbbayog_v1.h5
```

### If you don't have a model yet:
The system includes placeholder predictions for development. The backend will log warnings when the model file is missing.

## API Endpoints

### Plant Classification
- `POST /api/classify/` - Upload and classify plant image
- `GET /api/plants/` - List all medicinal plants
- `GET /api/plants/{id}/` - Get specific plant details

## Usage

1. **Start both servers**
   - Backend: `python manage.py runserver` (port 8000)
   - Frontend: `npm start` (port 3000)

2. **Open browser**
   - Navigate to `http://localhost:3000`

3. **Use the application**
   - **Home**: Overview and quick access
   - **Scan**: Camera-based plant identification
   - **Search**: Browse plant database
   - **Statistics**: View model performance metrics

## Configuration

### Database Settings
Edit `backend/herbbayog/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'herbbayog',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### CORS Settings
For production, update `CORS_ALLOWED_ORIGINS` in settings:
```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
]
```

## Development

### Adding New Plants
1. Update `seed_data.sql` with new plant information
2. Update the class names in `views.py`
3. Retrain your model with the new classes

### Model Training
1. Collect images for each plant class
2. Preprocess images (224x224, normalized)
3. Train using transfer learning (MobileNetV2 recommended)
4. Save model as `herbbayog_v1.h5`

### Customization
- **Theme**: Modify `tailwind.config.js` and CSS variables
- **Layout**: Update React components in `src/components/`
- **API**: Extend Django views in `herbal_plants/views.py`

## Production Deployment

### Backend (Django)
1. Set `DEBUG = False` in settings
2. Configure production database
3. Set up static file serving
4. Use Gunicorn or uWSGI

### Frontend (React)
1. Build the application: `npm run build`
2. Serve static files with Nginx
3. Configure reverse proxy to Django API

## Security Considerations

- File upload validation implemented
- CORS properly configured
- SQL injection protection via Django ORM
- XSS protection via React's built-in safeguards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational and research purposes. Please ensure compliance with:
- DOH guidelines for medicinal plant information
- Data privacy regulations
- Open source licenses for dependencies

## Support

For issues and questions:
- Check the troubleshooting section
- Review API documentation
- Contact the development team

## Acknowledgments

- Philippine Department of Health (DOH) for medicinal plant guidelines
- Calbayog City Herbal Research team
- Open source community for the tools and libraries used

---

**Disclaimer**: This application is for educational purposes only. Always consult with healthcare professionals before using any medicinal plants.
