from django.urls import path
from . import views
from .submission_views import submit_photo, get_submission_status
from .api_views import classify_image_api, get_plant_database

urlpatterns = [
    path('classify/', views.classify_image, name='classify_image'),
    # FREE API-based classification (no training needed!)
    path('classify-api/', classify_image_api, name='classify_image_api'),
    path('plants-database/', get_plant_database, name='plant_database'),
    path('plants/', views.list_plants, name='list_plants'),
    path('plants/<int:plant_id>/', views.plant_detail, name='plant_detail'),
    path('model-info/', views.get_model_info, name='get_model_info'),
    # Submission endpoints
    path('submit-photo/', submit_photo, name='submit_photo'),
    path('submission/<int:submission_id>/status/', get_submission_status, name='submission_status'),
    # Feedback endpoint
    path('api/feedback/', views.submit_feedback, name='submit_feedback'),
    path('api/training/status/', views.get_training_status, name='training_status'),
    path('api/training/trigger/', views.trigger_retrain, name='trigger_retrain'),
]
