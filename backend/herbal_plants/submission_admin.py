"""
Admin configuration for User Photo Submissions
"""
from django.contrib import admin
from .submission_models import UserPhotoSubmission, SubmissionFeedback

@admin.register(UserPhotoSubmission)
class UserPhotoSubmissionAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'plant_name', 'user', 'status', 'is_correction',
        'ai_prediction', 'created_at', 'reviewed_at'
    ]
    list_filter = ['status', 'is_correction', 'plant_name', 'created_at']
    search_fields = ['plant_name', 'ai_prediction', 'review_notes', 'location_name']
    readonly_fields = [
        'created_at', 'updated_at', 'reviewed_at', 'session_id',
        'ai_prediction', 'ai_confidence', 'image_preview'
    ]
    
    fieldsets = (
        ('Submission Details', {
            'fields': (
                'image', 'image_preview', 'plant_name', 'user', 'session_id',
                'is_correction', 'created_at'
            )
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
    
    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 200px;" />'
        return "No image"
    image_preview.allow_tags = True
    image_preview.short_description = "Image Preview"
    
    def save_model(self, request, obj, form, change):
        if 'status' in form.changed_data:
            if obj.status in ['approved', 'rejected']:
                obj.reviewed_by = request.user
                obj.reviewed_at = timezone.now()
                
                # If approved, move to training folder
                if obj.status == 'approved':
                    self._move_to_training(obj)
        
        super().save_model(request, obj, form, change)
    
    def _move_to_training(self, submission):
        """Move approved image to training dataset"""
        import shutil
        from django.conf import settings
        
        # Source path
        src_path = submission.image.path
        
        # Destination: training_data/herbbayog_complete_dataset/{plant_name}/
        plant_name = submission.plant_name.replace(' ', '_')
        dest_dir = os.path.join(
            settings.BASE_DIR, 'training', 'training_data', 
            'herbbayog_complete_dataset', plant_name
        )
        
        os.makedirs(dest_dir, exist_ok=True)
        
        # Generate unique filename
        ext = os.path.splitext(src_path)[1]
        dest_filename = f"user_submission_{submission.id}{ext}"
        dest_path = os.path.join(dest_dir, dest_filename)
        
        try:
            shutil.copy2(src_path, dest_path)
            submission.status = 'training'
            submission.save()
        except Exception as e:
            print(f"Error moving submission {submission.id}: {e}")
    
    actions = ['approve_submissions', 'reject_submissions']
    
    @admin.action(description='Approve selected submissions')
    def approve_submissions(self, request, queryset):
        for submission in queryset:
            submission.status = 'approved'
            submission.reviewed_by = request.user
            submission.reviewed_at = timezone.now()
            submission.save()
            self._move_to_training(submission)
    
    @admin.action(description='Reject selected submissions')
    def reject_submissions(self, request, queryset):
        queryset.update(
            status='rejected',
            reviewed_by=request.user,
            reviewed_at=timezone.now()
        )

@admin.register(SubmissionFeedback)
class SubmissionFeedbackAdmin(admin.ModelAdmin):
    list_display = ['submission', 'user', 'is_correct', 'created_at']
    list_filter = ['is_correct', 'created_at']
    search_fields = ['comment']
