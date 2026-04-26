from django.contrib import admin
from django.utils import timezone
from .models import HerbalPlant, UserPhotoSubmission, SubmissionFeedback

@admin.register(HerbalPlant)
class HerbalPlantAdmin(admin.ModelAdmin):
    list_display = ['name', 'scientific_name', 'created_at']
    search_fields = ['name', 'scientific_name']
    list_filter = ['created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'scientific_name', 'description', 'image')
        }),
        ('Medicinal Information', {
            'fields': ('medicinal_uses', 'preparation_steps')
        }),
        ('Cultural Context', {
            'fields': ('cultural_relevance',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(UserPhotoSubmission)
class UserPhotoSubmissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'plant_name', 'user', 'status', 'is_correction', 'ai_prediction', 'created_at']
    list_filter = ['status', 'is_correction', 'plant_name', 'created_at']
    search_fields = ['plant_name', 'ai_prediction', 'review_notes', 'location_name']
    readonly_fields = ['created_at', 'updated_at', 'reviewed_at', 'session_id']
    
    fieldsets = (
        ('Submission Details', {
            'fields': ('image', 'plant_name', 'user', 'session_id', 'is_correction', 'created_at')
        }),
        ('AI Information', {
            'fields': ('ai_prediction', 'ai_confidence'),
            'classes': ('collapse',)
        }),
        ('Location', {
            'fields': ('latitude', 'longitude', 'location_name'),
            'classes': ('collapse',)
        }),
        ('Review', {
            'fields': ('status', 'reviewed_by', 'reviewed_at', 'review_notes')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if 'status' in form.changed_data:
            if obj.status in ['approved', 'rejected'] and not obj.reviewed_by:
                obj.reviewed_by = request.user
                obj.reviewed_at = timezone.now()
        super().save_model(request, obj, form, change)

@admin.register(SubmissionFeedback)
class SubmissionFeedbackAdmin(admin.ModelAdmin):
    list_display = ['submission', 'user', 'is_correct', 'created_at']
    list_filter = ['is_correct', 'created_at']
    search_fields = ['comment']
