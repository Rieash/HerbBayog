# PowerShell script to copy plant photos from training dataset to frontend
# This copies the first image from each plant folder

$sourceDir = "d:\HerbBayog\backend\training\training_data\herbbayog_complete_dataset"
$destDir = "d:\HerbBayog\frontend\public\images\plants"

# Create destination directory if it doesn't exist
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
    Write-Host "Created directory: $destDir" -ForegroundColor Green
}

# Get all plant folders
$plantFolders = Get-ChildItem -Path $sourceDir -Directory

$copyCount = 0
$skipCount = 0

foreach ($folder in $plantFolders) {
    $plantName = $folder.Name
    
    # Get first jpg file from the folder
    $firstImage = Get-ChildItem -Path $folder.FullName -Filter "*.jpg" | Select-Object -First 1
    
    if ($firstImage) {
        # Create destination filename (lowercase, spaces to hyphens)
        $destFileName = ($plantName -replace ' ', '-').ToLower() + ".jpg"
        $destPath = Join-Path $destDir $destFileName
        
        # Copy the file
        Copy-Item -Path $firstImage.FullName -Destination $destPath -Force
        Write-Host "✅ Copied: $plantName -> $destFileName" -ForegroundColor Green
        $copyCount++
    } else {
        Write-Host "❌ No images found in: $plantName" -ForegroundColor Yellow
        $skipCount++
    }
}

Write-Host "
========================================" -ForegroundColor Cyan
Write-Host "Copy Complete!" -ForegroundColor Cyan
Write-Host "Copied: $copyCount plants" -ForegroundColor Green
Write-Host "Skipped: $skipCount plants" -ForegroundColor Yellow
Write-Host "Total in dataset: $($plantFolders.Count) plants" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
