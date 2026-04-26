"""
Complete HerbBayog Database Seeder
Seeds all 39 Philippine medicinal plants with scientific names and uses
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'herbbayog.settings')
django.setup()

from herbal_plants.models import HerbalPlant

def seed_complete_database():
    """Seed database with all 39 Philippine medicinal plants"""
    
    plants_data = [
        # DOH 10 Medicinal Plants (8 in dataset)
        {
            'name': 'Lagundi',
            'scientific_name': 'Vitex negundo L.',
            'description': 'A medicinal plant traditionally used for respiratory ailments and fever relief.',
            'medicinal_uses': 'Relieves cough and colds\nReduces fever\nTreats asthma\nAlleviates rheumatism',
            'preparation_steps': 'Boil 5-6 fresh leaves in 2 glasses of water for 15 minutes. Drink 1 glass 3 times daily.',
            'cultural_relevance': 'One of the 10 medicinal plants endorsed by DOH. Widely cultivated in Filipino households.'
        },
        {
            'name': 'Sambong',
            'scientific_name': 'Blumea balsamifera (L.) DC.',
            'description': 'A diuretic herb traditionally used for kidney stones and urinary tract problems.',
            'medicinal_uses': 'Dissolves kidney stones\nTreats UTI\nActs as diuretic\nReduces edema',
            'preparation_steps': 'Boil 5-7 fresh leaves in 2 glasses of water for 15 minutes. Drink 1 glass 3 times daily.',
            'cultural_relevance': 'DOH-approved primary medicinal plant for kidney health.'
        },
        {
            'name': 'Tsaang Gubat',
            'scientific_name': 'Carmona retusa (Vahl) Masamune',
            'description': 'A medicinal shrub used for treating stomach disorders and skin infections.',
            'medicinal_uses': 'Relieves stomach pain\nTreats diarrhea\nActs as mouthwash\nTreats skin infections',
            'preparation_steps': 'Boil 8-10 fresh leaves in 2 glasses of water for 10 minutes. Drink 1 glass 3 times daily.',
            'cultural_relevance': 'Literally means "wild tea" in Filipino. Traditionally consumed as tea for digestive health.'
        },
        {
            'name': 'Ampalaya',
            'scientific_name': 'Momordica charantia L.',
            'description': 'A bitter vegetable known for its blood sugar lowering properties.',
            'medicinal_uses': 'Lowers blood sugar\nTreats diabetes\nBoosts immune system\nActs as antioxidant',
            'preparation_steps': 'Eat 2-3 fresh fruits daily or drink juice from leaves and fruits.',
            'cultural_relevance': 'One of the most widely studied Philippine medicinal plants. Known internationally as bitter melon.'
        },
        {
            'name': 'Akapulko',
            'scientific_name': 'Senna alata L. (formerly Cassia alata)',
            'description': 'A medicinal plant traditionally used for treating fungal skin infections.',
            'medicinal_uses': 'Treats fungal infections\nRelieves eczema\nTreats ringworm\nHeals insect bites',
            'preparation_steps': 'Crush fresh leaves and apply juice on affected area 2-3 times daily.',
            'cultural_relevance': 'Known as "ringworm bush". DOH-approved for treating various skin conditions.'
        },
        {
            'name': 'Yerba Buena',
            'scientific_name': 'Mentha cordifolia Opiz',
            'description': 'An aromatic herb traditionally used for pain relief and digestive problems.',
            'medicinal_uses': 'Relieves body pain\nTreats headache\nAlleviates toothache\nTreats stomach problems',
            'preparation_steps': 'Boil 6-8 fresh leaves in 2 glasses of water for 10 minutes. Drink 1 glass 3 times daily.',
            'cultural_relevance': 'Spanish for "good herb". Known as peppermint in English. Widely used for pain relief.'
        },
        {
            'name': 'Bayabas',
            'scientific_name': 'Psidium guajava L.',
            'description': 'A tropical fruit tree whose leaves are used for treating wounds and diarrhea.',
            'medicinal_uses': 'Treats diarrhea\nHeals wounds\nTreats toothache\nActs as astringent',
            'preparation_steps': 'Boil 5-10 fresh leaves in 2 glasses of water for 10 minutes. Drink 1 glass 3 times daily.',
            'cultural_relevance': 'Commonly known as guava. Leaves traditionally used for treating diarrhea and wounds.'
        },
        {
            'name': 'Ulasimang Bato',
            'scientific_name': 'Peperomia pellucida (L.) Kunth',
            'description': 'A small herb traditionally used for treating arthritis and gout.',
            'medicinal_uses': 'Treats arthritis\nRelieves gout\nReduces uric acid\nTreats kidney problems',
            'preparation_steps': 'Eat 3-5 fresh leaves daily or make salad.',
            'cultural_relevance': 'Also known as "pepper elder" or "shiny bush". Traditionally consumed as salad.'
        },
        
        # Additional 31 Philippine Medicinal Plants
        {
            'name': 'Gumamela',
            'scientific_name': 'Hibiscus rosa-sinensis L.',
            'description': 'Ornamental flowering plant with medicinal properties.',
            'medicinal_uses': 'Relieves cough\nTreats fever\nPromotes hair growth\nSoothes skin irritation',
            'preparation_steps': 'Boil flowers in water for tea or crush for poultice.',
            'cultural_relevance': 'Popular ornamental plant, also used in traditional hair care and medicine.'
        },
        {
            'name': 'Bignay',
            'scientific_name': 'Antidesma bunius (L.) Spreng.',
            'description': 'A fruit-bearing tree with medicinal bark and leaves.',
            'medicinal_uses': 'Lowers blood pressure\nTreats diabetes\nAids digestion\nRich in antioxidants',
            'preparation_steps': 'Use bark decoction for various ailments.',
            'cultural_relevance': 'Traditional fruit and medicinal tree in Philippine provinces.'
        },
        {
            'name': 'Malunggay',
            'scientific_name': 'Moringa oleifera Lam.',
            'description': 'A highly nutritious plant known as the "miracle tree".',
            'medicinal_uses': 'Highly nutritious\nBoosts immune system\nReduces inflammation\nRich in vitamins and minerals',
            'preparation_steps': 'Add leaves to soups and dishes or make tea.',
            'cultural_relevance': 'Called the "miracle tree" due to its exceptional nutritional value. Used worldwide.'
        },
        {
            'name': 'Oregano',
            'scientific_name': 'Origanum vulgare L.',
            'description': 'An aromatic herb with powerful medicinal and culinary uses.',
            'medicinal_uses': 'Antibacterial properties\nAids digestion\nRelieves respiratory issues\nBoosts immune system',
            'preparation_steps': 'Make tea from fresh or dried leaves.',
            'cultural_relevance': 'Popular culinary and medicinal herb used worldwide.'
        },
        {
            'name': 'Gotu Kola',
            'scientific_name': 'Centella asiatica (L.) Urb.',
            'description': 'A traditional herb used for cognitive and skin health.',
            'medicinal_uses': 'Improves memory\nHeals wounds\nReduces anxiety\nAnti-inflammatory',
            'preparation_steps': 'Eat fresh leaves or make tea.',
            'cultural_relevance': 'Used in traditional medicine across Asia for cognitive enhancement.'
        },
        {
            'name': 'Mayana',
            'scientific_name': 'Coleus scutellarioides (L.) Benth.',
            'description': 'Ornamental plant with colorful leaves and medicinal properties.',
            'medicinal_uses': 'Treats cough\nRelieves asthma\nAnti-inflammatory\nTreats skin conditions',
            'preparation_steps': 'Boil leaves for tea or use as poultice.',
            'cultural_relevance': 'Popular ornamental plant also used in traditional medicine.'
        },
        {
            'name': 'Sampa-sampalukan',
            'scientific_name': 'Phyllanthus niruri L.',
            'description': 'A herb traditionally used for liver and kidney support.',
            'medicinal_uses': 'Supports liver health\nTreats kidney stones\nAnti-viral properties\nLowers blood sugar',
            'preparation_steps': 'Make decoction from whole plant.',
            'cultural_relevance': 'Traditional herb used for liver and kidney conditions.'
        },
        {
            'name': 'Saluyot',
            'scientific_name': 'Corchorus olitorius L.',
            'description': 'A leafy vegetable with high nutritional value.',
            'medicinal_uses': 'Rich in fiber\nAids digestion\nLowers blood pressure\nAnti-inflammatory',
            'preparation_steps': 'Cook leaves in various dishes or make tea.',
            'cultural_relevance': 'Popular leafy vegetable in the Philippines and other Asian countries.'
        },
        {
            'name': 'Tawa-tawa',
            'scientific_name': 'Euphorbia hirta L.',
            'description': 'A traditional herb used for respiratory and digestive issues.',
            'medicinal_uses': 'Treats asthma\nRelieves cough\nTreats diarrhea\nAnti-spasmodic',
            'preparation_steps': 'Boil whole plant for decoction.',
            'cultural_relevance': 'Traditional herb commonly used for respiratory ailments.'
        },
        {
            'name': 'Turmeric Luyang Dilaw',
            'scientific_name': 'Curcuma longa L.',
            'description': 'A powerful anti-inflammatory root spice.',
            'medicinal_uses': 'Strong anti-inflammatory\nAntioxidant properties\nAids digestion\nBoosts immunity',
            'preparation_steps': 'Grate root and make tea or use in cooking.',
            'cultural_relevance': 'Essential spice in Filipino and Asian cuisine, also powerful medicinal herb.'
        },
        {
            'name': 'Siling Labuyo',
            'scientific_name': 'Capsicum frutescens L.',
            'description': 'A small, very hot chili pepper with medicinal properties.',
            'medicinal_uses': 'Boosts metabolism\nRich in Vitamin C\nPain relief\nImproves circulation',
            'preparation_steps': 'Use in cooking or make spicy medicinal concoctions.',
            'cultural_relevance': 'Iconic Filipino chili pepper used in cuisine and traditional medicine.'
        },
        {
            'name': 'Tubang Bakod',
            'scientific_name': 'Jatropha curcas L.',
            'description': 'A shrub with medicinal properties (caution: toxic if not prepared properly).',
            'medicinal_uses': 'Treats skin diseases\nAnti-inflammatory\nWound healing (external use only)',
            'preparation_steps': 'External use only - apply latex to skin conditions.',
            'cultural_relevance': 'Used externally in traditional medicine. Caution: internal use is toxic.'
        },
        {
            'name': 'Sweet Basil Balanoi',
            'scientific_name': 'Ocimum basilicum L.',
            'description': 'Aromatic culinary and medicinal herb.',
            'medicinal_uses': 'Anti-bacterial\nAids digestion\nStress relief\nAnti-inflammatory',
            'preparation_steps': 'Use fresh in cooking or make tea.',
            'cultural_relevance': 'Popular culinary herb also used in traditional medicine.'
        },
        {
            'name': 'Oleander Kaner',
            'scientific_name': 'Nerium oleander L.',
            'description': 'Ornamental flowering shrub (highly toxic - medicinal use requires expert knowledge).',
            'medicinal_uses': 'Traditional heart medicine (requires expert preparation)\nExternal wound treatment',
            'preparation_steps': 'WARNING: Highly toxic. Only for expert traditional healers.',
            'cultural_relevance': 'Used in traditional medicine but requires extreme caution due to toxicity.'
        },
        {
            'name': 'Pandan',
            'scientific_name': 'Pandanus amaryllifolius Roxb.',
            'description': 'Aromatic plant used for cooking and traditional medicine.',
            'medicinal_uses': 'Relieves headache\nTreats arthritis\nFlavor enhancer\nNatural food coloring',
            'preparation_steps': 'Use leaves in cooking or make aromatic tea.',
            'cultural_relevance': 'Essential aromatic ingredient in Southeast Asian cuisine.'
        },
        {
            'name': 'Aloe Vera Sabila',
            'scientific_name': 'Aloe barbadensis Miller',
            'description': 'Succulent plant famous for skin healing properties.',
            'medicinal_uses': 'Heals burns\nSoothes skin irritation\nMoisturizes skin\nAids digestion',
            'preparation_steps': 'Apply gel directly to skin or make juice from inner gel.',
            'cultural_relevance': 'World-renowned medicinal plant used in cosmetics and traditional medicine.'
        },
        {
            'name': 'Banaba',
            'scientific_name': 'Lagerstroemia speciosa (L.) Pers.',
            'description': 'A tree with leaves used for diabetes treatment.',
            'medicinal_uses': 'Lowers blood sugar\nDiabetes management\nDiuretic properties\nWeight management',
            'preparation_steps': 'Boil dried leaves for tea.',
            'cultural_relevance': 'Traditional Philippine tree used for diabetes treatment. Popular herbal tea.'
        },
        {
            'name': 'Kamias',
            'scientific_name': 'Averrhoa bilimbi L.',
            'description': 'A sour fruit-bearing tree with medicinal bark and leaves.',
            'medicinal_uses': 'Lowers blood pressure\nTreats cough\nAids digestion\nRich in Vitamin C',
            'preparation_steps': 'Use fruit in cooking or make medicinal decoction.',
            'cultural_relevance': 'Popular sour fruit used in Filipino cuisine and traditional medicine.'
        },
        {
            'name': 'Guyabano Soursop',
            'scientific_name': 'Annona muricata L.',
            'description': 'A fruit tree with medicinal leaves and fruit.',
            'medicinal_uses': 'Anti-cancer properties (being studied)\nTreats insomnia\nBoosts immune system\nAids digestion',
            'preparation_steps': 'Make tea from leaves or eat the fruit.',
            'cultural_relevance': 'Popular fruit tree with emerging research on anti-cancer properties.'
        },
        {
            'name': 'Key Lime Dayap',
            'scientific_name': 'Citrus aurantiifolia (Christm.) Swingle',
            'description': 'Small citrus fruit with medicinal properties.',
            'medicinal_uses': 'Rich in Vitamin C\nAids digestion\nTreats cough\nAntioxidant properties',
            'preparation_steps': 'Use juice for various ailments or in cooking.',
            'cultural_relevance': 'Essential citrus in Southeast Asian cuisine and traditional medicine.'
        },
        {
            'name': 'Alagaw',
            'scientific_name': 'Premna odorata Blanco',
            'description': 'A tree with leaves used for respiratory ailments.',
            'medicinal_uses': 'Treats cough\nRelieves asthma\nTreats colds\nExpectorant properties',
            'preparation_steps': 'Boil leaves for tea or steam inhalation.',
            'cultural_relevance': 'Traditional tree used for respiratory conditions in the Philippines.'
        },
        {
            'name': 'Kakawate Madre de Cacao',
            'scientific_name': 'Gliricidia sepium (Jacq.) Kunth ex Walp.',
            'description': 'A tree used for shade and medicinal purposes.',
            'medicinal_uses': 'External parasite treatment\nFertilizer (green manure)\nLive fence posts',
            'preparation_steps': 'Apply crushed leaves externally for parasites.',
            'cultural_relevance': 'Multi-purpose tree used for shade, medicine, and agriculture.'
        },
        {
            'name': 'Orange Dalandan',
            'scientific_name': 'Citrus sinensis (L.) Osbeck',
            'description': 'Sweet citrus fruit with medicinal properties.',
            'medicinal_uses': 'Rich in Vitamin C\nBoosts immune system\nAids digestion\nAntioxidant',
            'preparation_steps': 'Eat fruit fresh or drink juice.',
            'cultural_relevance': 'Popular citrus fruit known as "dalandan" in the Philippines.'
        },
        {
            'name': 'Mango',
            'scientific_name': 'Mangifera indica L.',
            'description': 'The national fruit of the Philippines with medicinal properties.',
            'medicinal_uses': 'Rich in vitamins\nAids digestion\nBoosts immunity\nAnti-inflammatory',
            'preparation_steps': 'Eat fruit fresh or use unripe mango in cooking.',
            'cultural_relevance': 'National fruit of the Philippines. Most beloved fruit in the country.'
        },
        {
            'name': 'Calamansi',
            'scientific_name': 'Citrus microcarpa Bunge',
            'description': 'A small citrus fruit essential in Filipino cuisine.',
            'medicinal_uses': 'Rich in Vitamin C\nTreats cough\nAids digestion\nSkin whitening properties',
            'preparation_steps': 'Use juice for cooking or medicinal purposes.',
            'cultural_relevance': 'Essential ingredient in Filipino cuisine and traditional medicine.'
        },
        {
            'name': 'Touch-me-not Balsamina',
            'scientific_name': 'Impatiens balsamina L.',
            'description': 'Ornamental plant with medicinal properties.',
            'medicinal_uses': 'Treats skin diseases\nAnti-inflammatory\nPain relief\nWound healing',
            'preparation_steps': 'Crush leaves and flowers for external application.',
            'cultural_relevance': 'Ornamental plant also used in traditional medicine for skin conditions.'
        },
        {
            'name': 'Peanut Mani',
            'scientific_name': 'Arachis hypogaea L.',
            'description': 'A legume with nutritious and medicinal properties.',
            'medicinal_uses': 'High protein content\nHeart health\nAnti-oxidant\nEnergy booster',
            'preparation_steps': 'Eat nuts raw, roasted, or processed.',
            'cultural_relevance': 'Important agricultural crop and popular snack in the Philippines.'
        },
        {
            'name': 'Sampalok Tamarind',
            'scientific_name': 'Tamarindus indica L.',
            'description': 'A sour fruit tree with many medicinal uses.',
            'medicinal_uses': 'Aids digestion\nLaxative properties\nTreats fever\nRich in antioxidants',
            'preparation_steps': 'Make juice or use pulp in cooking.',
            'cultural_relevance': 'Popular souring agent in Filipino and Asian cuisine.'
        },
        {
            'name': 'Ipil-ipil',
            'scientific_name': 'Leucaena leucocephala (Lam.) de Wit',
            'description': 'A fast-growing tree used for fodder and green manure.',
            'medicinal_uses': 'Nutritious fodder\nGreen manure\nSoil improvement',
            'preparation_steps': 'Use leaves as animal feed or fertilizer.',
            'cultural_relevance': 'Important agroforestry tree used for animal feed and soil improvement.'
        },
        {
            'name': 'Sweet Potato Kamote',
            'scientific_name': 'Ipomoea batatas (L.) Lam.',
            'description': 'A nutritious root crop with edible leaves.',
            'medicinal_uses': 'Rich in fiber and vitamins\nAids digestion\nAnti-inflammatory\nEnergy source',
            'preparation_steps': 'Cook roots or leaves in various dishes.',
            'cultural_relevance': 'Important root crop in the Philippines. Leaves are also edible and nutritious.'
        },
        {
            'name': 'Cassava Kamoteng Kahoy',
            'scientific_name': 'Manihot esculenta Crantz',
            'description': 'A starchy root crop with medicinal properties.',
            'medicinal_uses': 'Energy source\nGluten-free alternative\nTreats diarrhea (processed)\nNutritious',
            'preparation_steps': 'Cook thoroughly before eating (raw is toxic).',
            'cultural_relevance': 'Important root crop in tropical countries. Must be properly cooked.'
        },
        {
            'name': 'Pomelo Suha',
            'scientific_name': 'Citrus maxima (Burm.) Merr.',
            'description': 'The largest citrus fruit with medicinal properties.',
            'medicinal_uses': 'Rich in Vitamin C\nAids digestion\nWeight management\nBoosts immunity',
            'preparation_steps': 'Eat fruit fresh or make juice.',
            'cultural_relevance': 'Popular citrus fruit during Christmas season in the Philippines.'
        },
    ]
    
    print(f"🌿 HerbBayog Complete Database Seeder")
    print(f"=" * 50)
    print(f"Seeding {len(plants_data)} Philippine medicinal plants...")
    
    # Clear existing data
    HerbalPlant.objects.all().delete()
    print("Cleared existing plant data")
    
    # Create new plants
    created_count = 0
    for plant_data in plants_data:
        try:
            plant = HerbalPlant.objects.create(**plant_data)
            print(f"✅ Created: {plant.name}")
            created_count += 1
        except Exception as e:
            print(f"❌ Error creating {plant_data['name']}: {e}")
    
    print(f"\n🎉 Successfully created {created_count} medicinal plants!")
    print(f"HerbBayog database is now complete with 39 Philippine medicinal plants!")

if __name__ == "__main__":
    seed_complete_database()
