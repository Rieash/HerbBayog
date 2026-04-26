from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import User

class HerbalPlant(models.Model):
    name = models.CharField(max_length=100, validators=[MinLengthValidator(2)])
    scientific_name = models.CharField(max_length=200, validators=[MinLengthValidator(2)])
    description = models.TextField(blank=True)
    medicinal_uses = models.TextField(help_text="List of medicinal uses separated by newlines")
    preparation_steps = models.TextField(help_text="Preparation instructions separated by newlines")
    cultural_relevance = models.TextField(blank=True, help_text="Cultural significance in the Philippines")
    image = models.ImageField(upload_to='plant_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Herbal Plant'
        verbose_name_plural = 'Herbal Plants'

    def __str__(self):
        return f"{self.name} ({self.scientific_name})"

    def get_medicinal_uses_list(self):
        return [use.strip() for use in self.medicinal_uses.split('\n') if use.strip()]

    def get_preparation_steps_list(self):
        return [step.strip() for step in self.preparation_steps.split('\n') if step.strip()]


class UserPhotoSubmission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('training', 'In Training'),
        ('trained', 'Trained'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=100, null=True, blank=True, help_text="For non-logged users")
    
    image = models.ImageField(upload_to='submissions/pending/')
    plant_name = models.CharField(max_length=100, help_text="User's identification")
    ai_prediction = models.CharField(max_length=100, null=True, blank=True, help_text="What AI predicted")
    ai_confidence = models.FloatField(null=True, blank=True)
    is_correction = models.BooleanField(default=False, help_text="User correcting AI mistake")
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_submissions')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    review_notes = models.TextField(blank=True)
    
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    location_name = models.CharField(max_length=200, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_photo_submissions'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.plant_name} - {self.status} - {self.created_at.strftime('%Y-%m-%d')}"


class SubmissionFeedback(models.Model):
    submission = models.ForeignKey(UserPhotoSubmission, on_delete=models.CASCADE, related_name='feedbacks')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_correct = models.BooleanField(help_text="Is the identification correct?")
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'submission_feedbacks'
    
    def __str__(self):
        return f"Feedback on {self.submission.plant_name} by {self.user.username}"
