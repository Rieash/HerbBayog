from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from .models import HerbalPlant
import json

class HerbalPlantModelTest(TestCase):
    def setUp(self):
        self.plant = HerbalPlant.objects.create(
            name='Test Plant',
            scientific_name='Testus plantus',
            description='A test plant',
            medicinal_uses='Test use 1\nTest use 2',
            preparation_steps='Step 1\nStep 2',
            cultural_relevance='Test cultural info'
        )

    def test_plant_creation(self):
        self.assertEqual(self.plant.name, 'Test Plant')
        self.assertEqual(self.plant.scientific_name, 'Testus plantus')

    def test_get_medicinal_uses_list(self):
        uses = self.plant.get_medicinal_uses_list()
        self.assertEqual(len(uses), 2)
        self.assertIn('Test use 1', uses)

    def test_get_preparation_steps_list(self):
        steps = self.plant.get_preparation_steps_list()
        self.assertEqual(len(steps), 2)
        self.assertIn('Step 1', steps)

class HerbalPlantAPITest(TestCase):
    def setUp(self):
        self.plant = HerbalPlant.objects.create(
            name='Lagundi',
            scientific_name='Vitex negundo',
            description='Test description',
            medicinal_uses='Test use',
            preparation_steps='Test step'
        )

    def test_list_plants(self):
        response = self.client.get(reverse('list_plants'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(len(data['plants']), 1)

    def test_plant_detail(self):
        response = self.client.get(reverse('plant_detail', args=[self.plant.id]))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['name'], 'Lagundi')

    def test_classify_image_no_file(self):
        response = self.client.post(reverse('classify_image'))
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertIn('error', data)
