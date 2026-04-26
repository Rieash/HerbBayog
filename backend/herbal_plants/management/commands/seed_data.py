from django.core.management.base import BaseCommand
from herbal_plants.models import HerbalPlant
import datetime

class Command(BaseCommand):
    help = 'Seed the database with medicinal plants data'

    def handle(self, *args, **options):
        # Clear existing data
        HerbalPlant.objects.all().delete()
        
        plants_data = [
            {
                'name': 'Lagundi',
                'scientific_name': 'Vitex negundo L.',
                'description': 'A medicinal plant traditionally used for respiratory ailments and fever relief.',
                'medicinal_uses': 'Relieves cough and colds\nReduces fever\nTreats asthma\nAlleviates rheumatism\nReduces pain and inflammation',
                'preparation_steps': 'For cough/asthma: Boil 5-6 fresh leaves in 2 glasses of water for 15 minutes. Drink 1 glass 3 times daily.\nFor fever: Crush fresh leaves and apply on forehead.\nFor rheumatism: Pound fresh leaves and apply as poultice on affected areas.\nFor general wellness: Make decoction using dried leaves and drink as tea.',
                'cultural_relevance': 'One of the 10 medicinal plants endorsed by the Philippine Department of Health. Widely cultivated in Filipino households as a traditional remedy for respiratory ailments. Considered a "miracle plant" in many rural communities.'
            },
            {
                'name': 'Sambong',
                'scientific_name': 'Blumea balsamifera (L.) DC.',
                'description': 'A diuretic herb traditionally used for kidney stones and urinary tract problems.',
                'medicinal_uses': 'Dissolves kidney stones\nTreats urinary tract infections\nActs as diuretic\nReduces edema\nRelieves stomach pain',
                'preparation_steps': 'For kidney stones: Boil 5-7 fresh leaves in 2 glasses of water for 15 minutes. Drink 1 glass 3 times daily.\nFor UTI: Make decoction and drink while warm.\nAs diuretic: Drink tea made from dried leaves regularly.\nFor edema: Apply crushed leaves externally on swollen areas.',
                'cultural_relevance': 'Known as "blumea camphor" in scientific circles. Traditionally used by indigenous communities for kidney-related ailments. DOH-approved as one of the primary medicinal plants for kidney health.'
            },
            {
                'name': 'Tsaang Gubat',
                'scientific_name': 'Carmona retusa (Vahl) Masamune',
                'description': 'A medicinal shrub used for treating stomach disorders and skin infections.',
                'medicinal_uses': 'Relieves stomach pain\nTreats diarrhea\nActs as mouthwash\nTreats skin infections\nReduces inflammation',
                'preparation_steps': 'For stomach pain: Boil 8-10 fresh leaves in 2 glasses of water for 10 minutes. Drink 1 glass 3 times daily.\nFor diarrhea: Drink decoction regularly until symptoms subside.\nAs mouthwash: Gargle with warm decoction 2-3 times daily.\nFor skin infections: Apply crushed leaves directly on affected area.',
                'cultural_relevance': 'Literally means "wild tea" in Filipino. Traditionally consumed as tea for digestive health. Widely available in Philippine forests and commonly grown in home gardens.'
            },
            {
                'name': 'Ampalaya',
                'scientific_name': 'Momordica charantia L.',
                'description': 'A bitter vegetable known for its blood sugar lowering properties.',
                'medicinal_uses': 'Lowers blood sugar\nTreats diabetes\nBoosts immune system\nTreats skin infections\nActs as antioxidant',
                'preparation_steps': 'For diabetes: Eat 2-3 fresh fruits daily or drink juice from leaves and fruits.\nFor skin infections: Apply crushed leaves on wounds.\nAs immune booster: Drink tea made from leaves regularly.\nFor general wellness: Include young leaves and fruits in diet.',
                'cultural_relevance': 'One of the most widely studied Philippine medicinal plants. Known internationally as "bitter melon." Traditional Filipino remedy for diabetes and various skin conditions.'
            },
            {
                'name': 'Bawang',
                'scientific_name': 'Allium sativum L.',
                'description': 'A common spice with powerful medicinal properties for cardiovascular health.',
                'medicinal_uses': 'Lowers cholesterol\nTreats hypertension\nActs as antibiotic\nBoosts immune system\nReduces blood clotting',
                'preparation_steps': 'For hypertension: Eat 2-3 fresh cloves daily or take garlic supplements.\nFor cholesterol: Include raw garlic in diet regularly.\nAs antibiotic: Crush and apply on minor wounds.\nFor general health: Take garlic tea or supplements.',
                'cultural_relevance': 'Known worldwide as garlic, but has special significance in Philippine folk medicine. Used traditionally for treating various cardiovascular conditions and as natural antibiotic.'
            },
            {
                'name': 'Bayabas',
                'scientific_name': 'Psidium guajava L.',
                'description': 'A tropical fruit tree whose leaves are used for treating wounds and diarrhea.',
                'medicinal_uses': 'Treats diarrhea\nHeals wounds\nTreats toothache\nActs as astringent\nReduces inflammation',
                'preparation_steps': 'For diarrhea: Boil 5-10 fresh leaves in 2 glasses of water for 10 minutes. Drink 1 glass 3 times daily.\nFor wounds: Crush fresh leaves and apply directly on cuts.\nFor toothache: Chew fresh leaves and apply on affected gum.\nAs mouthwash: Gargle with warm decoction.',
                'cultural_relevance': 'Commonly known as guava. Leaves are traditionally used in rural Philippines for treating diarrhea and wounds. One of the most accessible medicinal plants in the country.'
            },
            {
                'name': 'Niyog-niyogan',
                'scientific_name': 'Quisqualis indica L.',
                'description': 'A climbing vine traditionally used for expelling intestinal parasites.',
                'medicinal_uses': 'Expels intestinal worms\nTreats parasitic infections\nRelieves cough\nReduces fever\nActs as laxative',
                'preparation_steps': 'For deworming: Chew 5-8 dried seeds thoroughly and swallow with water. Take once daily for 3 days.\nFor cough: Make decoction from leaves and drink 2 times daily.\nFor fever: Drink warm tea made from leaves.\nAs laxative: Drink decoption from seeds.',
                'cultural_relevance': 'Also known as "Rangoon creeper." Traditionally used in Philippine rural communities for deworming children. Seeds must be properly prepared to avoid toxicity.'
            },
            {
                'name': 'Yerba Buena',
                'scientific_name': 'Clinopodium douglasii (Benth.)',
                'description': 'A aromatic herb traditionally used for pain relief and digestive problems.',
                'medicinal_uses': 'Relieves body pain\nTreats headache\nAlleviates toothache\nTreats stomach problems\nActs as carminative',
                'preparation_steps': 'For body pain: Boil 6-8 fresh leaves in 2 glasses of water for 10 minutes. Drink 1 glass 3 times daily.\nFor headache: Apply crushed leaves on forehead.\nFor toothache: Chew fresh leaves and apply on affected area.\nFor stomach problems: Drink warm decoption.',
                'cultural_relevance': 'Spanish for "good herb." Known as "peppermint" in English. Widely used in Philippine traditional medicine for pain relief and digestive issues.'
            },
            {
                'name': 'Akapulko',
                'scientific_name': 'Cassia alata L.',
                'description': 'A medicinal plant traditionally used for treating fungal skin infections.',
                'medicinal_uses': 'Treats fungal infections\nRelieves eczema\nTreats ringworm\nHeals insect bites\nActs as antiseptic',
                'preparation_steps': 'For fungal infections: Crush fresh leaves and apply juice on affected area 2-3 times daily.\nFor ringworm: Apply leaf poultice directly on infected area.\nFor insect bites: Crush leaves and apply on bite area.\nAs antiseptic: Wash wounds with decoction.',
                'cultural_relevance': 'Known as "ringworm bush" or "candle bush." One of the most effective traditional remedies for fungal skin diseases in the Philippines. DOH-approved for treating various skin conditions.'
            },
            {
                'name': 'Ulasimang Bato',
                'scientific_name': 'Peperomia pellucida (L.) Kunth',
                'description': 'A small herb traditionally used for treating arthritis and gout.',
                'medicinal_uses': 'Treats arthritis\nRelieves gout\nReduces uric acid\nTreats kidney problems\nActs as diuretic',
                'preparation_steps': 'For arthritis/gout: Eat 3-5 fresh leaves daily or make salad.\nFor uric acid: Drink decoction from fresh leaves regularly.\nFor kidney problems: Boil leaves and drink as tea.\nAs diuretic: Include fresh leaves in diet.',
                'cultural_relevance': 'Also known as "pepper elder" or "shiny bush." Traditionally consumed as salad for treating arthritis and gout. Widely available in Philippine backyards and gardens.'
            },
            {
                'name': 'Kamias',
                'scientific_name': 'Averrhoa bilimbi L.',
                'description': 'A tropical tree with sour fruits used for culinary and medicinal purposes.',
                'medicinal_uses': 'Lowers blood pressure\nTreats cough and colds\nReduces fever\nControls diabetes\nActs as antioxidant',
                'preparation_steps': 'For hypertension: Drink juice from fresh fruits daily.\nFor cough: Boil 3-4 fruits and drink as tea.\nFor fever: Apply crushed leaves on forehead.\nFor diabetes: Include fruit in diet regularly.',
                'cultural_relevance': 'Known as "bilimbi" or "cucumber tree." Widely used in Filipino cuisine for souring dishes. Traditional remedy for hypertension and diabetes in rural Philippines.'
            }
        ]

        for plant_data in plants_data:
            plant = HerbalPlant.objects.create(**plant_data)
            self.stdout.write(
                self.style.SUCCESS(f'Created plant: {plant.name}')
            )

        self.stdout.write(
            self.style.SUCCESS('Successfully seeded database with medicinal plants!')
        )
