// Extended DOH plant database - ALL Philippine medicinal plants
export const dohPlantDatabase = {
  'Papaya': {
    description: 'Papaya (Carica papaya) is a tropical fruit tree widely cultivated in the Philippines. Both the fruit and leaves have recognized medicinal properties supported by traditional and modern medicine.',
    uses: ['Aids digestion', 'Anti-inflammatory', 'Wound healing', 'Immune support', 'Rich in vitamins A & C'],
    preparation: ['Eat ripe fruit daily for digestion', 'Leaf tea: Boil 2-3 young leaves in 2 cups water for 10 mins', 'Poultice from unripe fruit pulp for wounds'],
    warnings: ['Unripe papaya contains latex - avoid during pregnancy', 'May cause allergic reactions', 'Excessive consumption may cause digestive upset'],
    category: 'Digestive',
    dohApproved: false
  },
  'Lagundi': {
    description: 'Lagundi (Vitex negundo) is one of the ten medicinal plants officially endorsed by the Philippine Department of Health (DOH) for its proven effectiveness in treating respiratory ailments.',
    dohApproved: true,
    uses: ['Cough and asthma relief', 'Fever reduction', 'Anti-inflammatory', 'Headache relief', 'Treatment of pharyngitis'],
    preparation: ['Boil 2-3 tablespoons dried leaves in 2 cups water for 10-15 mins', 'Drink as tea 3-4 times daily', 'Add honey to sweeten for cough relief'],
    warnings: ['Not recommended for pregnant women', 'May cause allergic reactions', 'Consult doctor if symptoms persist'],
    category: 'Respiratory'
  },
  'Sambong': {
    description: 'Sambong (Blumea balsamifera) is officially recognized by the Philippine DOH for its diuretic properties and effectiveness in treating kidney stones and urinary tract disorders.',
    dohApproved: true,
    uses: ['Kidney stone treatment', 'Anti-edema', 'Hypertension aid', 'Anti-diarrheal', 'Relief from rheumatism'],
    preparation: ['Wash fresh leaves thoroughly', 'Boil 1 cup chopped leaves in 2 cups water for 15-20 mins', 'Drink 3-4 cups daily', 'Can be used as poultice for wounds'],
    warnings: ['May increase urination frequency', 'Not for long-term use without medical supervision', 'Consult doctor before use with other medications'],
    category: 'Urinary'
  },
  'Malunggay': {
    description: 'Malunggay (Moringa oleifera), called the "miracle tree," is recognized by the DOH for its exceptional nutritional value. It is rich in vitamins, minerals, and antioxidants.',
    dohApproved: true,
    uses: ['Nutritional supplement', 'Milk production for nursing mothers', 'Blood sugar control', 'Anti-inflammatory', 'Treatment of anemia'],
    preparation: ['Young leaves can be eaten raw in salads', 'Add leaves to soups and stews (do not overcook)', 'Make tea: Steep 1 tsp dried leaves in hot water for 5 mins'],
    warnings: ['Roots contain toxic compounds - do not consume', 'May lower blood sugar - diabetics should monitor levels', 'Generally safe for consumption'],
    category: 'Nutritional'
  },
  'Bayabas': {
    description: 'Bayabas or Guava (Psidium guajava) is one of the most important traditional medicines in the Philippines, endorsed by DOH for treating diarrhea and wounds.',
    dohApproved: true,
    uses: ['Treatment of diarrhea and dysentery', 'Wound healing and disinfection', 'Relief from toothache', 'Controls blood sugar levels', 'Treatment of gum problems'],
    preparation: ['For diarrhea: Boil 10-15 fresh leaves in 2 cups water for 15 mins', 'For wounds: Crush young leaves and apply as poultice', 'For toothache: Chew young leaves', 'As mouthwash: Gargle with cooled decoction'],
    warnings: ['May cause constipation if overused', 'Pregnant women should consult doctor first', 'May interact with diabetes medication'],
    category: 'Digestive'
  },
  'Ampalaya': {
    description: 'Ampalaya or Bitter Melon (Momordica charantia) is widely used in the Philippines for managing diabetes. The DOH recognizes its anti-diabetic properties.',
    dohApproved: true,
    uses: ['Lowers blood sugar levels', 'Treatment of diabetes', 'Boosts immune system', 'Antioxidant properties', 'Treatment of skin diseases'],
    preparation: ['Wash and slice fresh fruit', 'Cook as vegetable dish (ginisang ampalaya)', 'Make juice: Blend with water and strain', 'Dried leaves can be made into tea'],
    warnings: ['Diabetics should monitor blood sugar closely', 'Pregnant women should avoid (may cause miscarriage)', 'May cause stomach upset in large amounts'],
    category: 'Diabetes'
  },
  'Niyog-niyogan': {
    description: 'Niyog-niyogan or Rangoon Creeper (Quisqualis indica) is a climbing vine traditionally used in the Philippines for expelling intestinal worms.',
    dohApproved: false,
    uses: ['Expels intestinal worms', 'Treats fever', 'Relieves diarrhea', 'Reduces inflammation'],
    preparation: ['Collect mature seeds', 'Dry seeds in sunlight', 'Crack open and extract kernel', 'Take 1-2 kernels with water'],
    warnings: ['Do not exceed recommended dosage', 'Not for children under 5', 'Pregnant women should avoid'],
    category: 'Antiparasitic'
  },
  'Yerba Buena': {
    description: 'Yerba Buena (Clinopodium douglasii) is one of the most popular Philippine medicinal plants, officially endorsed by DOH for its pain-relieving properties.',
    dohApproved: true,
    uses: ['Relief from body pain and aches', 'Treatment of coughs and colds', 'Relief from insect bites', 'Treatment of nausea and dizziness', 'Relief from menstrual cramps'],
    preparation: ['Make tea: Steep fresh or dried leaves in hot water for 5-10 mins', 'For pain: Apply crushed leaves as poultice', 'For insect bites: Rub fresh leaves on affected area'],
    warnings: ['Generally safe for most people', 'May interact with medications', 'Pregnant women should consult doctor'],
    category: 'Pain Relief'
  },
  'Bawang': {
    description: 'Bawang or Garlic (Allium sativum) is one of the most widely used medicinal plants in the Philippines, recognized by DOH for its antimicrobial and cardiovascular benefits.',
    dohApproved: true,
    uses: ['Lowers blood pressure', 'Reduces cholesterol', 'Antibacterial and antiviral', 'Boosts immune system', 'Relief from coughs and colds'],
    preparation: ['Eat 1-2 cloves raw daily (crush first and let sit 10 mins)', 'Can be added to cooking', 'Make tea: Steep crushed garlic in hot water', 'For cough: Mix with honey'],
    warnings: ['May cause bad breath and body odor', 'May interact with blood thinners', 'Can cause heartburn in some people', 'May lower blood sugar'],
    category: 'Cardiovascular'
  },
  'Akapulko': {
    description: 'Akapulko or Ringworm Bush (Senna alata) is officially recognized by the Philippine DOH for its effectiveness in treating fungal skin infections.',
    dohApproved: true,
    uses: ['Treatment of ringworm and fungal infections', 'Treatment of skin diseases', 'Treatment of insect bites', 'Relief from herpes', 'Treatment of scabies'],
    preparation: ['Crush fresh leaves to extract juice', 'Apply juice directly to affected skin', 'For ringworm: Apply 2-3 times daily'],
    warnings: ['For external use only - do not ingest', 'May cause skin irritation in some people', 'Test on small area first', 'Keep away from eyes'],
    category: 'Skin/Fungal'
  },
  'Tsaang Gubat': {
    description: 'Tsaang Gubat or Wild Tea (Ehretia microphylla) is endorsed by the Philippine DOH for treating diarrhea and stomach problems.',
    dohApproved: true,
    uses: ['Treatment of diarrhea', 'Relieves stomach pain', 'Anti-diarrheal', 'Stomachic'],
    preparation: ['Collect fresh leaves', 'Wash thoroughly', 'Boil in water for 10-15 mins', 'Drink as tea'],
    warnings: ['Generally safe', 'Consult doctor for persistent diarrhea', 'May interact with other medications'],
    category: 'Digestive'
  },
  'Ulasimang Bato': {
    description: 'Ulasimang Bato or Pansit-pansitan (Peperomia pellucida) is traditionally used in the Philippines for treating arthritis, gout, and kidney stones.',
    dohApproved: false,
    uses: ['Dissolves kidney stones', 'Diuretic', 'Lowers uric acid', 'Treatment of arthritis and gout'],
    preparation: ['Eat fresh as salad (1-2 handfuls daily)', 'Or boil for tea: Boil leaves in water for 10 mins'],
    warnings: ['May lower blood pressure', 'Pregnant women should avoid', 'Do not consume in large amounts'],
    category: 'Urinary'
  },
  'Siling Labuyo': {
    description: 'Siling Labuyo or Philippine Bird\'s Eye Chili (Capsicum frutescens) is widely used as a medicinal plant for its capsaicin content and health benefits.',
    dohApproved: false,
    uses: ['Improves metabolism', 'Pain relief (topical)', 'Rich in Vitamin C', 'Antioxidant properties', 'Aids digestion'],
    preparation: ['Can be added to dishes for daily health benefits', 'For pain relief: Apply crushed chili carefully to affected area'],
    warnings: ['May cause stomach irritation', 'Handle with care - avoid contact with eyes', 'Not for children'],
    category: 'Spice/Medicinal'
  },
  'Kalabasa': {
    description: 'Kalabasa or Squash/Pumpkin (Cucurbita maxima) is commonly used in the Philippines for its nutritional and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamin A', 'Good for eye health', 'Aids digestion', 'Anti-inflammatory', 'Immune support'],
    preparation: ['Cook as vegetable dish', 'Make soup from flesh and seeds', 'Seeds can be roasted and eaten'],
    warnings: ['Generally safe', 'May cause digestive upset in large amounts'],
    category: 'Nutritional'
  },
  'Kamote': {
    description: 'Kamote or Sweet Potato (Ipomoea batatas) tops and tubers are used medicinally in the Philippines for various health benefits.',
    dohApproved: false,
    uses: ['Rich in vitamins and minerals', 'Good for digestion', 'Anti-diabetic properties', 'Boosts immunity'],
    preparation: ['Tops: Boil quickly and serve as vegetable', 'Tubers: Boil, bake, or steam', 'Make tea from dried tops'],
    warnings: ['Generally safe', 'Diabetics should monitor blood sugar'],
    category: 'Nutritional'
  },
  'Talong': {
    description: 'Talong or Eggplant (Solanum melongena) is commonly used in Philippine cuisine and has medicinal properties.',
    dohApproved: false,
    uses: ['Rich in fiber', 'Good for heart health', 'Contains antioxidants', 'Aids digestion'],
    preparation: ['Cook as vegetable dish', 'Grill and mash for salads', 'Can be made into torta'],
    warnings: ['Generally safe', 'May cause allergic reactions in sensitive individuals'],
    category: 'Vegetable'
  },
  'Kangkong': {
    description: 'Kangkong or Water Spinach (Ipomoea aquatica) is a popular leafy vegetable in the Philippines with laxative properties.',
    dohApproved: false,
    uses: ['Mild laxative', 'Rich in iron', 'Good for digestion', 'Lowers blood pressure'],
    preparation: ['Saute with garlic', 'Add to sinigang or adobo', 'Boil and serve with bagoong'],
    warnings: ['May cause loose stools', 'Not recommended for those with kidney problems', 'Harvest from clean water sources only'],
    category: 'Vegetable'
  },
  'Alugbati': {
    description: 'Alugbati or Malabar Spinach (Basella alba) is a leafy vegetable used in the Philippines for its nutritional and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in iron and vitamins', 'Mild laxative', 'Good for digestion', 'Anti-inflammatory'],
    preparation: ['Saute with garlic and onions', 'Add to soups', 'Use in salads when young'],
    warnings: ['May cause loose stools in large amounts', 'Generally safe for consumption'],
    category: 'Vegetable'
  },
  'Saluyot': {
    description: 'Saluyot or Jute Mallow (Corchorus olitorius) is a leafy vegetable popular in the Philippines for its slimy texture and health benefits.',
    dohApproved: false,
    uses: ['Rich in vitamins A & C', 'Good for digestion', 'Anti-inflammatory', 'Boosts immunity'],
    preparation: ['Boil and serve with bagoong', 'Add to mongo dishes', 'Cook with fish or meat'],
    warnings: ['Generally safe', 'May interact with blood thinning medications'],
    category: 'Vegetable'
  },
  'Moringa': {
    description: 'Moringa (Moringa oleifera) is called the "miracle tree" and is widely cultivated in the Philippines for its exceptional nutritional value.',
    dohApproved: true,
    uses: ['Complete nutritional supplement', 'Milk production for nursing mothers', 'Blood sugar control', 'Anti-inflammatory', 'Rich in antioxidants'],
    preparation: ['Add leaves to soups and stews', 'Make tea from dried leaves', 'Eat young leaves raw', 'Use leaf powder in smoothies'],
    warnings: ['Roots and bark are toxic - do not consume', 'May lower blood sugar - diabetics monitor levels'],
    category: 'Nutritional'
  },
  'Oregano': {
    description: 'Oregano (Plectranthus amboinicus or Origanum vulgare) is a popular herb in the Philippines used for respiratory ailments.',
    dohApproved: false,
    uses: ['Relief from coughs and colds', 'Treatment of asthma', 'Relief from indigestion', 'Treatment of menstrual cramps', 'Antibacterial properties'],
    preparation: ['Make tea: Steep 1-2 tsp dried leaves in hot water for 10 mins', 'For cough: Add honey and lemon', 'Can be used as steam inhalation'],
    warnings: ['May cause stomach upset in large doses', 'Pregnant women should use with caution', 'May interact with blood thinners'],
    category: 'Respiratory'
  },
  'Tanglad': {
    description: 'Tanglad or Lemongrass (Cymbopogon citratus) is widely used in the Philippines for its calming properties and digestive benefits.',
    dohApproved: false,
    uses: ['Relief from digestive problems', 'Reduces stress and anxiety', 'Lowers cholesterol', 'Relief from insomnia', 'Treatment of fever'],
    preparation: ['Make tea: Boil 2-3 stalks in 2 cups water for 10 mins', 'Can be used as flavoring in cooking', 'Oil can be used for massage'],
    warnings: ['Generally safe', 'May lower blood sugar', 'Pregnant women should consult doctor', 'May cause skin irritation in sensitive people'],
    category: 'Relaxant'
  },
  'Pandan': {
    description: 'Pandan or Screwpine (Pandanus amaryllifolius) is widely used in Philippine cooking and has medicinal properties.',
    dohApproved: false,
    uses: ['Mild laxative', 'Lowers blood pressure', 'Anti-rheumatic', 'Fragrant aroma for relaxation'],
    preparation: ['Tie leaves in knot and add to rice while cooking', 'Make tea from leaves', 'Extract juice for flavoring'],
    warnings: ['Generally safe', 'May lower blood pressure excessively in some people'],
    category: 'Aromatic'
  },
  'Luya': {
    description: 'Luya or Ginger (Zingiber officinale) is one of the most widely used medicinal plants in the Philippines for digestive and respiratory ailments.',
    dohApproved: false,
    uses: ['Relief from nausea and motion sickness', 'Treatment of colds and flu', 'Aids digestion', 'Anti-inflammatory', 'Pain relief'],
    preparation: ['Make tea: Slice fresh ginger and boil in water', 'Add to cooking', 'Chew raw for nausea', 'Make ginger ale'],
    warnings: ['May cause heartburn in some people', 'May interact with blood thinners', 'Gallstone patients should consult doctor'],
    category: 'Digestive'
  },
  'Turmeric': {
    description: 'Turmeric or Luyang Dilaw (Curcuma longa) is used in the Philippines for its anti-inflammatory and antioxidant properties.',
    dohApproved: false,
    uses: ['Anti-inflammatory', 'Antioxidant', 'Aids digestion', 'Wound healing', 'Boosts immunity'],
    preparation: ['Make tea from fresh or dried turmeric', 'Add to cooking (curries, soups)', 'Mix with milk for golden milk'],
    warnings: ['May stain skin and clothes', 'High doses may cause digestive upset', 'May interact with blood thinners'],
    category: 'Anti-inflammatory'
  },
  'Basil': {
    description: 'Basil or Balanoi (Ocimum basilicum) is used in the Philippines for its culinary and medicinal properties.',
    dohApproved: false,
    uses: ['Relief from coughs', 'Treatment of colds', 'Aids digestion', 'Stress relief', 'Antibacterial properties'],
    preparation: ['Make tea from fresh or dried leaves', 'Add to dishes', 'Use as inhalant for congestion'],
    warnings: ['Generally safe', 'May interact with blood thinning medications'],
    category: 'Aromatic'
  },
  'Guyabano': {
    description: 'Guyabano or Soursop (Annona muricata) is used in the Philippines for its fruit and leaves which have medicinal properties.',
    dohApproved: false,
    uses: ['Aids digestion', 'Rich in Vitamin C', 'Immune support', 'Anti-inflammatory', 'Sleep aid (leaves)'],
    preparation: ['Eat ripe fruit', 'Make tea from leaves (boil 3-5 leaves for 10 mins)', 'Add to smoothies'],
    warnings: ['Large amounts of seeds are toxic', 'May lower blood pressure', 'Pregnant women should consult doctor'],
    category: 'Fruit'
  },
  'Atis': {
    description: 'Atis or Sugar Apple (Annona squamosa) is used in the Philippines for its sweet fruit and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in vitamins', 'Aids digestion', 'Anti-inflammatory', 'Treatment of scabies (seeds)'],
    preparation: ['Eat ripe fruit', 'Make decoction from leaves', 'Crushed seeds with coconut oil for skin conditions'],
    warnings: ['Seeds are toxic if consumed', 'May cause allergic reactions'],
    category: 'Fruit'
  },
  'Kalamansi': {
    description: 'Kalamansi or Calamondin (Citrus microcarpa) is widely used in the Philippines for its culinary and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Aids digestion', 'Cough relief', 'Skin lightening', 'Antioxidant'],
    preparation: ['Squeeze juice for cooking and drinks', 'Make juice with honey for coughs', 'Apply juice to skin (diluted)'],
    warnings: ['May erode tooth enamel', 'May cause heartburn', 'Can irritate sensitive skin'],
    category: 'Citrus'
  },
  'Dalandan': {
    description: 'Dalandan or Bitter Orange (Citrus aurantium) is used in the Philippines for its fruit and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Aids digestion', 'Appetite stimulant', 'Weight management'],
    preparation: ['Eat fresh fruit', 'Make juice', 'Use peel for flavoring'],
    warnings: ['May interact with certain medications', 'May increase heart rate', 'Pregnant women should consult doctor'],
    category: 'Citrus'
  },
  'Kamias': {
    description: 'Kamias or Bilimbi (Averrhoa bilimbi) is used in the Philippines for its sour fruit and medicinal properties.',
    dohApproved: false,
    uses: ['Lowers blood pressure', 'Treatment of coughs', 'Aids digestion', 'Skin lightening', 'Treatment of rheumatism'],
    preparation: ['Use in cooking for sour flavor', 'Make juice with sugar', 'Apply to skin for lightening'],
    warnings: ['May lower blood pressure excessively', 'High oxalate content - avoid with kidney stones', 'May cause tooth sensitivity'],
    category: 'Fruit'
  },
  'Duhat': {
    description: 'Duhat or Java Plum (Syzygium cumini) is used in the Philippines for its fruit and medicinal properties.',
    dohApproved: false,
    uses: ['Lowers blood sugar', 'Aids digestion', 'Rich in antioxidants', 'Treatment of diarrhea', 'Mouthwash'],
    preparation: ['Eat ripe fruit', 'Make tea from leaves or bark', 'Gargle with bark decoction'],
    warnings: ['May lower blood sugar - diabetics monitor levels', 'May stain mouth and teeth purple'],
    category: 'Fruit'
  },
  'Bignay': {
    description: 'Bignay or Chinese Laurel (Antidesma bunius) is used in the Philippines for its fruit and leaves.',
    dohApproved: false,
    uses: ['Rich in antioxidants', 'Aids digestion', 'Treatment of urinary stones', 'Lowers blood pressure', 'Anti-inflammatory'],
    preparation: ['Eat ripe fruit', 'Make wine from fruit', 'Make tea from leaves'],
    warnings: ['Unripe fruit may cause stomach upset', 'May lower blood pressure excessively'],
    category: 'Fruit'
  },
  'Katakataka': {
    description: 'Katakataka or Miracle Leaf (Bryophyllum pinnatum) is used in the Philippines for wound healing and other medicinal purposes.',
    dohApproved: false,
    uses: ['Wound healing', 'Treatment of headaches', 'Relief from coughs', 'Anti-inflammatory', 'Kidney stone treatment'],
    preparation: ['Crush leaves and apply to wounds', 'Make tea from leaves', 'Eat young leaves'],
    warnings: ['May cause uterine contractions - pregnant women avoid', 'May cause allergic reactions'],
    category: 'Medicinal'
  },
  'Sampalok': {
    description: 'Sampalok or Tamarind (Tamarindus indica) is widely used in the Philippines for its culinary and medicinal properties.',
    dohApproved: false,
    uses: ['Aids digestion', 'Laxative properties', 'Rich in Vitamin C', 'Appetite stimulant', 'Treatment of fever'],
    preparation: ['Make juice from ripe fruit', 'Use pulp in cooking', 'Make tea from leaves'],
    warnings: ['May erode tooth enamel', 'May interact with certain medications', 'High amounts may cause digestive upset'],
    category: 'Fruit'
  },
  'Mango': {
    description: 'Mango (Mangifera indica) is widely cultivated in the Philippines for its delicious fruit and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamins A & C', 'Aids digestion', 'Immune support', 'Eye health', 'Skin health'],
    preparation: ['Eat ripe fruit', 'Make juice or smoothies', 'Young leaves can be made into tea'],
    warnings: ['Sap may cause skin irritation', 'May cause allergic reactions in some people', 'Diabetics should consume in moderation'],
    category: 'Fruit'
  },
  'Mangosteen': {
    description: 'Mangosteen (Garcinia mangostana) is known as the "Queen of Fruits" in the Philippines. It has a purple rind with white sweet flesh and is highly valued for its medicinal properties.',
    dohApproved: false,
    uses: ['Rich in antioxidants (xanthones)', 'Anti-inflammatory', 'Boosts immune system', 'Aids digestion', 'Skin health'],
    preparation: ['Eat ripe fruit fresh', 'Make tea from dried rind', 'Add to smoothies', 'Use rind for traditional medicine'],
    warnings: ['May interact with blood thinners', 'May lower blood sugar - diabetics monitor levels', 'May cause allergic reactions in some people'],
    category: 'Fruit'
  },
  'Jackfruit': {
    description: 'Jackfruit or Langka (Artocarpus heterophyllus) is the largest tree fruit and is used in the Philippines for food and medicine.',
    dohApproved: false,
    uses: ['Rich in nutrients', 'Aids digestion', 'Boosts immunity', 'Good for skin health', 'Energy booster'],
    preparation: ['Eat ripe fruit fresh', 'Cook unripe fruit as vegetable', 'Make chips from fruit'],
    warnings: ['May cause allergic reactions', 'High in sugar - diabetics consume in moderation'],
    category: 'Fruit'
  },
  'Coconut': {
    description: 'Coconut or Niyog (Cocos nucifera) is called the "Tree of Life" in the Philippines for its numerous uses and health benefits.',
    dohApproved: false,
    uses: ['Hydration (buko water)', 'Rich in healthy fats', 'Boosts immunity', 'Skin and hair health', 'Digestive health'],
    preparation: ['Drink fresh buko water', 'Use coconut oil for cooking', 'Eat coconut meat', 'Apply coconut oil to skin and hair'],
    warnings: ['High in calories - consume in moderation', 'May raise cholesterol in some people'],
    category: 'Nutritional'
  },
  'Banana': {
    description: 'Banana or Saging (Musa spp.) is widely consumed in the Philippines for its nutritional and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in potassium', 'Aids digestion', 'Energy booster', 'Heart health', 'Mood booster'],
    preparation: ['Eat ripe fruit', 'Cook saba banana as dessert or snack', 'Make banana cue'],
    warnings: ['May cause constipation if unripe', 'High in sugar - diabetics consume in moderation'],
    category: 'Fruit'
  },
  'Pineapple': {
    description: 'Pineapple or Pinya (Ananas comosus) is used in the Philippines for its sweet fruit and medicinal enzyme bromelain.',
    dohApproved: false,
    uses: ['Aids digestion (bromelain)', 'Anti-inflammatory', 'Rich in Vitamin C', 'Immune support', 'Wound healing'],
    preparation: ['Eat fresh fruit', 'Make juice', 'Use in cooking (pinakbet, afritada)', 'Apply to skin for exfoliation'],
    warnings: ['May cause mouth irritation', 'Bromelain may interact with blood thinners', 'May cause allergic reactions'],
    category: 'Fruit'
  },
  'Carrot': {
    description: 'Carrot (Daucus carota) is widely used in the Philippines for its high Vitamin A content and health benefits.',
    dohApproved: false,
    uses: ['Rich in Vitamin A (eye health)', 'Antioxidant properties', 'Aids digestion', 'Immune support', 'Skin health'],
    preparation: ['Eat raw as snack', 'Add to dishes (giniling, sopas)', 'Make juice', 'Cook in stews'],
    warnings: ['Excessive consumption may cause skin yellowing', 'Generally safe'],
    category: 'Vegetable'
  },
  'Cassava': {
    description: 'Cassava or Kamoteng Kahoy (Manihot esculenta) is a staple root crop in the Philippines with various uses.',
    dohApproved: false,
    uses: ['Rich in carbohydrates', 'Energy source', 'Gluten-free alternative', 'Aids digestion'],
    preparation: ['Boil and eat with sugar', 'Make cassava cake', 'Cook as suman', 'Make chips'],
    warnings: ['Must be cooked properly - raw cassava contains cyanide', 'Do not consume if bitter taste remains'],
    category: 'Root Crop'
  },
  'Gabi': {
    description: 'Gabi or Taro (Colocasia esculenta) is a root crop widely used in the Philippines for food and traditional medicine.',
    dohApproved: false,
    uses: ['Rich in fiber', 'Good for digestion', 'Energy source', 'Contains vitamins and minerals'],
    preparation: ['Cook as laing with coconut milk', 'Boil and eat as snack', 'Make into chips'],
    warnings: ['Must be cooked thoroughly - raw gabi causes itching', 'May cause allergic reactions in sensitive individuals'],
    category: 'Root Crop'
  },
  'Camote': {
    description: 'Camote (Ipomoea batatas) is a nutritious root crop widely grown in the Philippines.',
    dohApproved: false,
    uses: ['Rich in vitamins A & C', 'Good for digestion', 'Anti-diabetic properties', 'Immunity booster'],
    preparation: ['Boil or bake and eat as snack', 'Make into halaya', 'Cook tops as vegetable', 'Make chips'],
    warnings: ['Generally safe', 'May cause gas in some people'],
    category: 'Root Crop'
  },
  'Peas': {
    description: 'Peas or Gisantes (Pisum sativum) are used in the Philippines for their nutritional value.',
    dohApproved: false,
    uses: ['Rich in protein', 'Good for digestion', 'Rich in vitamins', 'Heart health'],
    preparation: ['Add to dishes (giniling, sopas)', 'Cook as side dish', 'Add to salads'],
    warnings: ['Generally safe', 'May cause gas in some people'],
    category: 'Legume'
  },
  'Peanut': {
    description: 'Peanut or Mani (Arachis hypogaea) is widely consumed in the Philippines as snack and ingredient.',
    dohApproved: false,
    uses: ['Rich in protein', 'Good for heart health', 'Energy booster', 'Rich in healthy fats', 'Antioxidant properties'],
    preparation: ['Roast and eat as snack', 'Make peanut butter', 'Add to dishes (kare-kare)', 'Make into candy'],
    warnings: ['Common allergen - avoid if allergic', 'High in calories - consume in moderation'],
    category: 'Legume'
  },
  'Gumamela': {
    description: 'Gumamela or Hibiscus (Hibiscus rosa-sinensis) is used in the Philippines for ornamental and medicinal purposes.',
    dohApproved: false,
    uses: ['Lowers blood pressure', 'Rich in Vitamin C', 'Hair health', 'Skin health', 'Aids digestion'],
    preparation: ['Make tea from flowers', 'Use flower extract for hair', 'Make decoction for coughs'],
    warnings: ['May lower blood pressure excessively', 'May interact with medications', 'Pregnant women should consult doctor'],
    category: 'Ornamental'
  },
  'Rosemary': {
    description: 'Rosemary (Salvia rosmarinus) is used in the Philippines for culinary and medicinal purposes.',
    dohApproved: false,
    uses: ['Improves memory and concentration', 'Aids digestion', 'Antioxidant properties', 'Hair health', 'Pain relief'],
    preparation: ['Make tea from leaves', 'Use in cooking', 'Make rosemary oil for hair', 'Use as inhalant'],
    warnings: ['May interact with blood thinners', 'High doses may cause seizures', 'Pregnant women should avoid large amounts'],
    category: 'Aromatic'
  },
  'Gotu Kola': {
    description: 'Gotu Kola or Centella (Centella asiatica) is used in the Philippines for its cognitive and healing properties.',
    dohApproved: false,
    uses: ['Improves memory', 'Wound healing', 'Anti-inflammatory', 'Reduces anxiety', 'Skin health'],
    preparation: ['Eat fresh leaves in salads', 'Make tea from leaves', 'Apply to wounds', 'Make into juice'],
    warnings: ['May interact with sedatives', 'May cause allergic reactions', 'Pregnant women should consult doctor'],
    category: 'Medicinal'
  },
  'Tawa-tawa': {
    description: 'Tawa-tawa or Asthma Plant (Euphorbia hirta) is traditionally used in the Philippines for asthma and respiratory problems.',
    dohApproved: false,
    uses: ['Treatment of asthma', 'May help with dengue fever', 'Treatment of dysentery', 'Treatment of skin sores', 'Relief from intestinal worms'],
    preparation: ['Boil 1 cup of whole plant in 4 cups water for 10 mins', 'Let cool and strain', 'Drink 3-4 cups daily'],
    warnings: ['Not proven cure for dengue - seek medical attention', 'Should not replace professional medical treatment', 'May cause allergic reactions'],
    category: 'Respiratory'
  },
  'Mayana': {
    description: 'Mayana or Coleus (Coleus blumei) is an ornamental plant used in the Philippines for medicinal purposes.',
    dohApproved: false,
    uses: ['Treatment of coughs', 'Relief from headaches', 'Anti-inflammatory', 'Treatment of eye problems'],
    preparation: ['Make tea from leaves', 'Crush leaves and apply to forehead for headaches', 'Use as eyewash (cooled tea)'],
    warnings: ['May interact with medications', 'Pregnant women should avoid', 'May cause allergic reactions'],
    category: 'Ornamental'
  },
  'Oregano': {
    description: 'Oregano (Plectranthus amboinicus, also called Cuban oregano or Indian borage) is a succulent herb widely used in Philippine traditional medicine. Despite its name, it is not true oregano but has similar aromatic and medicinal properties.',
    dohApproved: false,
    uses: ['Relief from coughs and colds', 'Treatment of asthma and bronchitis', 'Aids digestion', 'Relief from insect bites', 'Treatment of menstrual cramps', 'Antibacterial and antifungal properties'],
    preparation: ['Make tea: Steep 3-5 fresh leaves in hot water for 10 mins', 'For cough: Add honey and calamansi', 'Crush leaves and apply to insect bites', 'Use as steam inhalation for congestion'],
    warnings: ['May cause stomach upset in large doses', 'Pregnant women should use with caution', 'May interact with blood thinners', 'Not recommended for people with iron deficiency'],
    category: 'Respiratory'
  },
  'Cuban-oregano': {
    description: 'Cuban Oregano (Plectranthus amboinicus) is a succulent herb with thick, fleshy leaves and strong oregano-like scent. It is widely grown in Philippine gardens for culinary and medicinal use.',
    dohApproved: false,
    uses: ['Relief from respiratory ailments', 'Treatment of coughs and asthma', 'Digestive aid', 'Anti-inflammatory', 'Treatment of skin conditions'],
    preparation: ['Make tea from fresh or dried leaves', 'Add to soups and stews for flavor', 'Crush leaves and apply to skin irritations', 'Use as herbal steam for congestion'],
    warnings: ['May cause stomach irritation in high doses', 'Pregnant women should consult doctor', 'May interact with certain medications'],
    category: 'Respiratory'
  },
  'Kakawate': {
    description: 'Kakawate or Madre de Cacao (Gliricidia sepium) is a fast-growing tree commonly found in the Philippines. It is widely used as a living fence and shade tree for cacao plantations. The leaves have insecticidal and medicinal properties.',
    dohApproved: false,
    uses: ['Natural insecticide and pesticide', 'Treatment of scabies and skin parasites', 'Fertilizer and green manure', 'Livestock feed', 'Firewood'],
    preparation: ['For scabies: Crush leaves and apply to affected areas', 'Make leaf extract for spray insecticide', 'Use as mulch for plants', 'Boil leaves for animal deworming'],
    warnings: ['Seeds are toxic to humans and animals if consumed in large quantities', 'May cause skin irritation in sensitive individuals', 'Use with caution as insecticide'],
    category: 'Pesticidal/Medicinal'
  },
  'Quick-stick': {
    description: 'Quick-stick is another name for Kakawate or Madre de Cacao (Gliricidia sepium), a versatile tree used in Philippine agriculture and traditional medicine. It grows rapidly from cuttings, hence the name "quick-stick."',
    dohApproved: false,
    uses: ['Natural insecticide', 'Treatment of skin parasites', 'Soil improvement', 'Shade tree for crops', 'Living fence posts'],
    preparation: ['Crush fresh leaves for skin application', 'Make leaf decoction for spraying', 'Plant cuttings directly for quick growth'],
    warnings: ['Toxic if seeds are ingested', 'Handle with care when using as pesticide', 'May irritate sensitive skin'],
    category: 'Pesticidal/Medicinal'
  },
  'Avocado': {
    description: 'Avocado (Persea americana) is a nutritious fruit tree grown throughout the Philippines. The leaves have medicinal properties and are used in traditional remedies.',
    dohApproved: false,
    uses: ['Rich in healthy fats', 'Anti-inflammatory properties', 'Helps lower cholesterol', 'Good for skin and hair health', 'Menstrual pain relief (leaves)'],
    preparation: ['Eat ripe fruit for nutrition', 'Make tea from young leaves for menstrual cramps', 'Apply oil to skin and hair', 'Add to salads and smoothies'],
    warnings: ['May interact with blood thinners', 'Some people may have latex allergy', 'High in calories - consume in moderation'],
    category: 'Nutritional'
  },
  'Calamansi': {
    description: 'Calamansi or Kalamansi (Citrus microcarpa) is a small citrus fruit essential to Philippine cuisine and traditional medicine. It is rich in Vitamin C and has numerous health benefits.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Aids digestion', 'Cough and sore throat relief', 'Skin lightening', 'Antioxidant properties'],
    preparation: ['Squeeze juice for cooking and drinks', 'Mix juice with honey for cough remedy', 'Apply diluted juice to skin', 'Use as marinade for meat'],
    warnings: ['May erode tooth enamel', 'Can irritate sensitive skin if undiluted', 'May cause heartburn in some people'],
    category: 'Citrus'
  },
  'Kalamansi': {
    description: 'Kalamansi (Citrus microcarpa) is a small Philippine citrus fruit known for its distinct aroma and sour taste. It is a staple ingredient in Filipino cooking and traditional remedies.',
    dohApproved: false,
    uses: ['Immune system boost (Vitamin C)', 'Digestive aid', 'Cough and cold remedy', 'Natural skin cleanser', 'Flavoring for dishes'],
    preparation: ['Make juice with water and sugar', 'Use as souring agent in sinigang', 'Mix with soy sauce for dipping', 'Apply juice to scalp for dandruff'],
    warnings: ['May damage tooth enamel over time', 'Can cause stomach acidity', 'Dilute before applying to skin'],
    category: 'Citrus'
  },
  'Guyabano': {
    description: 'Guyabano or Soursop (Annona muricata) is a tropical fruit tree with sweet, creamy flesh and spiky green skin. The leaves, bark, and fruit have traditional medicinal uses.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Aids digestion', 'Immune system support', 'Anti-inflammatory properties', 'Sleep aid (leaf tea)'],
    preparation: ['Eat ripe fruit fresh', 'Make tea from leaves or bark', 'Blend into smoothies', 'Add to desserts'],
    warnings: ['Large amounts of seeds are toxic', 'May lower blood pressure excessively', 'Pregnant women should consult doctor', 'May interact with diabetes medication'],
    category: 'Fruit'
  },
  'Soursop': {
    description: 'Soursop (Annona muricata), known as Guyabano in the Philippines, is a tropical fruit with creamy white flesh and distinctive flavor. All parts of the tree have traditional medicinal applications.',
    dohApproved: false,
    uses: ['High Vitamin C content', 'Digestive health', 'Immune boosting', 'Anti-inflammatory effects', 'Calming tea for sleep'],
    preparation: ['Eat fresh fruit', 'Make herbal tea from dried leaves', 'Create fruit shakes', 'Use in traditional medicine preparations'],
    warnings: ['Seeds contain toxic compounds', 'May affect blood pressure', 'Consult healthcare provider before medicinal use'],
    category: 'Fruit'
  },
  'Tanglad': {
    description: 'Tanglad or Lemongrass (Cymbopogon citratus) is a fragrant tropical grass widely used in Philippine cooking and traditional medicine. It has a distinctive lemon scent and flavor.',
    dohApproved: false,
    uses: ['Relief from digestive problems', 'Reduces stress and anxiety', 'Lowers cholesterol', 'Relief from insomnia', 'Treatment of fever', 'Natural insect repellent'],
    preparation: ['Make tea: Boil 2-3 stalks in 2 cups water for 10 mins', 'Use as flavoring in cooking', 'Crush leaves for insect repellent', 'Oil can be used for massage'],
    warnings: ['Generally safe', 'May lower blood sugar', 'Pregnant women should consult doctor', 'May cause skin irritation in sensitive people'],
    category: 'Relaxant'
  },
  'Lemongrass': {
    description: 'Lemongrass (Cymbopogon citratus), known as Tanglad in the Philippines, is an aromatic tropical grass with citrus flavor. It is essential in Southeast Asian cuisine and traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Stress and anxiety relief', 'Cholesterol reduction', 'Sleep improvement', 'Fever reduction', 'Natural mosquito repellent'],
    preparation: ['Brew as herbal tea', 'Add to soups and curries', 'Use essential oil for aromatherapy', 'Plant around home for insect control'],
    warnings: ['May lower blood glucose levels', 'Use caution during pregnancy', 'Essential oil may irritate skin'],
    category: 'Relaxant'
  },
  'Pandan': {
    description: 'Pandan or Screwpine (Pandanus amaryllifolius) is a tropical plant widely used in Philippine cooking for its fragrant aroma. The leaves impart a sweet, floral flavor to dishes.',
    dohApproved: false,
    uses: ['Mild laxative properties', 'Lowers blood pressure', 'Anti-rheumatic effects', 'Fragrant aroma for relaxation', 'Natural food coloring and flavoring'],
    preparation: ['Tie leaves in knot and add to rice while cooking', 'Make tea from leaves', 'Extract juice for flavoring desserts', 'Use as natural air freshener'],
    warnings: ['Generally safe', 'May lower blood pressure excessively in some people', 'Moderate consumption recommended'],
    category: 'Aromatic'
  },
  'Basil': {
    description: 'Basil or Balanoi (Ocimum basilicum) is an aromatic herb used in Philippine cuisine and traditional medicine. It has a sweet, peppery flavor and distinctive aroma.',
    dohApproved: false,
    uses: ['Relief from coughs', 'Treatment of colds', 'Aids digestion', 'Stress relief', 'Antibacterial properties'],
    preparation: ['Make tea from fresh or dried leaves', 'Add to dishes for flavor', 'Use as inhalant for congestion', 'Apply crushed leaves to insect bites'],
    warnings: ['Generally safe', 'May interact with blood thinning medications', 'Large amounts may affect fertility'],
    category: 'Aromatic'
  },
  'Sweet Basil': {
    description: 'Sweet Basil (Ocimum basilicum) is a popular culinary herb in the Philippines known for its aromatic leaves. It is used in both cooking and traditional remedies.',
    dohApproved: false,
    uses: ['Respiratory relief', 'Digestive aid', 'Anti-stress properties', 'Natural antibiotic', 'Insect bite treatment'],
    preparation: ['Use fresh in salads and cooking', 'Make herbal tea', 'Crush leaves for topical application', 'Use in aromatherapy'],
    warnings: ['May interact with anticoagulants', 'Avoid excessive consumption', 'Use caution during pregnancy'],
    category: 'Aromatic'
  },
  'Turmeric': {
    description: 'Turmeric or Luyang Dilaw (Curcuma longa) is a flowering plant whose rhizomes are used in Philippine traditional medicine and cuisine. It contains curcumin, a powerful anti-inflammatory compound.',
    dohApproved: false,
    uses: ['Anti-inflammatory properties', 'Antioxidant effects', 'Aids digestion', 'Wound healing', 'Boosts immunity', 'Joint pain relief'],
    preparation: ['Make tea from fresh or dried turmeric', 'Add to cooking (curries, soups)', 'Mix with milk for golden milk', 'Apply paste to wounds'],
    warnings: ['May stain skin and clothes', 'High doses may cause digestive upset', 'May interact with blood thinners', 'Gallbladder patients should consult doctor'],
    category: 'Anti-inflammatory'
  },
  'Luya': {
    description: 'Luya or Ginger (Zingiber officinale) is one of the most widely used medicinal plants in the Philippines for digestive and respiratory ailments. It has a spicy, aromatic flavor.',
    dohApproved: false,
    uses: ['Relief from nausea and motion sickness', 'Treatment of colds and flu', 'Aids digestion', 'Anti-inflammatory', 'Pain relief', 'Menstrual cramp relief'],
    preparation: ['Make tea: Slice fresh ginger and boil in water', 'Add to cooking', 'Chew raw for nausea', 'Make ginger ale'],
    warnings: ['May cause heartburn in some people', 'May interact with blood thinners', 'Gallstone patients should consult doctor'],
    category: 'Digestive'
  },
  'Ginger': {
    description: 'Ginger (Zingiber officinale), known as Luya in the Philippines, is a flowering plant whose rhizome is widely used as a spice and folk medicine. It has powerful anti-inflammatory and antioxidant effects.',
    dohApproved: false,
    uses: ['Nausea and vomiting relief', 'Cold and flu treatment', 'Digestive health', 'Anti-inflammatory', 'Pain reduction', 'Blood sugar regulation'],
    preparation: ['Brew as tea', 'Use in cooking', 'Make into candies', 'Apply oil for muscle pain'],
    warnings: ['May cause heartburn', 'Can interact with blood-thinning medications', 'High doses not recommended for those with gallstones'],
    category: 'Digestive'
  },
  
  // TREES - Common Philippine trees identified by PlantNet
  'Neem': {
    description: 'Neem (Azadirachta indica) is a fast-growing tree native to the Indian subcontinent, widely grown in the Philippines for its medicinal properties. Known as the "village pharmacy," almost every part of the tree has therapeutic uses.',
    dohApproved: false,
    uses: ['Natural insecticide and pesticide', 'Treatment of skin diseases', 'Dental care (twigs used as toothbrush)', 'Blood sugar regulation', 'Anti-inflammatory properties', 'Immune system booster'],
    preparation: ['Make decoction from leaves or bark', 'Use neem oil for skin conditions', 'Chew young twigs for dental health', 'Make leaf extract spray for plants'],
    warnings: ['Pregnant women should avoid internal use', 'May lower blood sugar excessively', 'May cause allergic reactions in some people', 'Not recommended for children'],
    category: 'Medicinal Tree'
  },
  'Moringa': {
    description: 'Moringa or Malunggay (Moringa oleifera) is a fast-growing, drought-resistant tree native to the Indian subcontinent, now widely cultivated in the Philippines. Known as the "Miracle Tree" or "Tree of Life" for its exceptional nutritional value.',
    dohApproved: true,
    uses: ['Extremely rich in vitamins and minerals', 'Boosts immune system', 'Anti-inflammatory properties', 'Lowers blood sugar', 'Improves digestion', 'Supports brain health', 'Anti-aging properties'],
    preparation: ['Add leaves to soups and stews (tinola, gulay)', 'Make tea from dried leaves', 'Eat fresh leaves in salads', 'Take leaf powder as supplement', 'Use pods (drumsticks) in curries'],
    warnings: ['May cause digestive upset in large amounts', 'May lower blood pressure and sugar', 'Pregnant women should consult doctor', 'May have laxative effect'],
    category: 'Nutritional'
  },
  'Acacia': {
    description: 'Acacia (Acacia spp.) is a genus of trees and shrubs in the Philippines, some species are native while others are introduced. Various parts have traditional medicinal uses.',
    dohApproved: false,
    uses: ['Treatment of diarrhea and dysentery', 'Sore throat relief', 'Wound healing', 'Astringent properties', 'Anti-inflammatory effects'],
    preparation: ['Make decoction from bark or leaves', 'Use as gargle for sore throat', 'Apply to wounds', 'Make into tea for digestive issues'],
    warnings: ['Some species may be toxic', 'Pregnant women should avoid', 'May interact with medications', 'Use under guidance of herbal practitioner'],
    category: 'Medicinal Tree'
  },
  'Mahogany': {
    description: 'Mahogany (Swietenia macrophylla) is a large deciduous tree native to the Americas but widely planted in the Philippines for timber. Seeds and bark have traditional medicinal uses.',
    dohApproved: false,
    uses: ['Treatment of diabetes (seeds)', 'Lowering blood sugar', 'Anti-inflammatory properties', 'Skin conditions', 'Digestive aid'],
    preparation: ['Crush seeds and make decoction', 'Use bark for tea', 'Apply seed oil to skin conditions'],
    warnings: ['Seeds can be toxic in large amounts', 'Pregnant women should avoid', 'May cause digestive upset', 'Consult healthcare provider before use'],
    category: 'Medicinal Tree'
  },
  'Eucalyptus': {
    description: 'Eucalyptus (Eucalyptus spp.) is an introduced tree in the Philippines, primarily grown for timber and pulp. Its leaves are well-known for their medicinal properties, especially for respiratory conditions.',
    dohApproved: false,
    uses: ['Relief from coughs and colds', 'Treatment of asthma', 'Decongestant', 'Antiseptic properties', 'Insect repellent', 'Pain relief'],
    preparation: ['Steam inhalation with leaves', 'Make tea (use food-grade only)', 'Use eucalyptus oil for massage', 'Add to bath for relaxation'],
    warnings: ['Oil is toxic if ingested', 'Not safe for children under 2', 'May interact with medications', 'Pregnant women should consult doctor'],
    category: 'Respiratory'
  },
  'Narra': {
    description: 'Narra (Pterocarpus indicus) is the national tree of the Philippines. A large deciduous tree with beautiful flowers, it has been used in traditional medicine for various ailments.',
    dohApproved: false,
    uses: ['Treatment of mouth sores', 'Diarrhea relief', 'Anti-inflammatory', 'Treatment of skin diseases', 'Antioxidant properties'],
    preparation: ['Make decoction from bark', 'Use as mouthwash', 'Apply bark extract to skin conditions'],
    warnings: ['May interact with medications', 'Pregnant women should consult doctor', 'Use under guidance'],
    category: 'Medicinal Tree'
  },
  'Ipil-ipil': {
    description: 'Ipil-ipil or Lead Tree (Leucaena leucocephala) is a fast-growing tree introduced to the Philippines, widely used for firewood, fodder, and green manure. Leaves and seeds have medicinal properties.',
    dohApproved: false,
    uses: ['Treatment of intestinal worms', 'Fever reduction', 'Diarrhea treatment', 'Protein-rich food source', 'Soil improvement'],
    preparation: ['Make decoction from leaves or seeds', 'Cook young pods as vegetable', 'Use as fodder for animals'],
    warnings: ['Contains mimosine which can be toxic in large amounts', 'Seeds should not be consumed raw', 'Pregnant women should avoid'],
    category: 'Medicinal'
  },
  'Banaba': {
    description: 'Banaba (Lagerstroemia speciosa) is a flowering tree native to Southeast Asia including the Philippines. Its leaves are well-known for their anti-diabetic properties.',
    dohApproved: false,
    uses: ['Blood sugar regulation (diabetes)', 'Diuretic properties', 'Weight management', 'Kidney health', 'Anti-inflammatory', 'Urinary tract infections'],
    preparation: ['Make tea from dried leaves', 'Boil 1 cup leaves in 4 cups water', 'Drink 2-3 times daily'],
    warnings: ['May lower blood sugar excessively', 'Diabetics should monitor blood sugar', 'Pregnant women should avoid', 'May cause digestive upset'],
    category: 'Diabetes'
  },
  'Duhat': {
    description: 'Duhat or Java Plum (Syzygium cumini) is a tropical fruit tree native to the Indian subcontinent but widely grown in the Philippines. The fruit, leaves, and bark have medicinal uses.',
    dohApproved: false,
    uses: ['Blood sugar regulation', 'Digestive aid', 'Antioxidant properties', 'Rich in vitamins', 'Treatment of diarrhea', 'Mouth and throat conditions'],
    preparation: ['Eat fresh fruits', 'Make decoction from leaves or bark', 'Make vinegar from fruits'],
    warnings: ['May lower blood sugar', 'Pregnant women should consult doctor', 'May cause constipation in large amounts'],
    category: 'Fruit'
  },
  
  // FLOWERS - Common ornamental and medicinal flowers
  'Sampaguita': {
    description: 'Sampaguita or Arabian Jasmine (Jasminum sambac) is the national flower of the Philippines. The fragrant flowers are used in religious offerings, garlands, and traditional medicine.',
    dohApproved: false,
    uses: ['Stress and anxiety relief', 'Aphrodisiac properties', 'Treatment of eye infections', 'Skin care', 'Aromatherapy', 'Headache relief'],
    preparation: ['Make tea from flowers', 'Use flower oil for massage', 'Apply cool tea to eyes', 'Inhale aroma for relaxation'],
    warnings: ['Generally safe', 'May cause allergic reactions in sensitive individuals', 'Pregnant women should consult doctor'],
    category: 'Aromatic'
  },
  'Rosal': {
    description: 'Rosal or Gardenia (Gardenia jasminoides) is a flowering shrub popular in Philippine gardens. The fragrant white flowers and roots have medicinal uses.',
    dohApproved: false,
    uses: ['Treatment of bladder infections', 'Jaundice treatment', 'Fever reduction', 'Anxiety relief', 'Bleeding disorders'],
    preparation: ['Make tea from flowers', 'Use root decoction for jaundice', 'Apply crushed flowers to wounds'],
    warnings: ['May cause digestive upset', 'Pregnant women should avoid', 'May interact with medications'],
    category: 'Ornamental'
  },
  'Champaca': {
    description: 'Champaca (Magnolia champaca) is a large evergreen tree with fragrant flowers, grown in the Philippines for ornamental and medicinal purposes.',
    dohApproved: false,
    uses: ['Fever reduction', 'Gynecological issues', 'Aphrodisiac', 'Aromatherapy', 'Skin conditions'],
    preparation: ['Make tea from flowers', 'Use flower oil for massage', 'Make decoction from bark'],
    warnings: ['Pregnant women should avoid', 'May interact with medications', 'Use under guidance'],
    category: 'Ornamental'
  },
  'Ylang-ylang': {
    description: 'Ylang-ylang (Cananga odorata) is a tropical tree native to the Philippines, famous for its fragrant flowers used in perfumes. The flowers and oil have medicinal properties.',
    dohApproved: false,
    uses: ['Stress and anxiety relief', 'Lowers blood pressure', 'Aphrodisiac', 'Skin care', 'Treatment of malaria', 'Sedative properties'],
    preparation: ['Make tea from flowers', 'Use essential oil for aromatherapy', 'Apply oil to skin', 'Inhale aroma for relaxation'],
    warnings: ['May cause skin irritation in sensitive people', 'May lower blood pressure excessively', 'Pregnant women should consult doctor', 'May interact with sedatives'],
    category: 'Aromatic'
  },
  'Bougainvillea': {
    description: 'Bougainvillea (Bougainvillea spp.) is a popular ornamental vine in the Philippines with colorful bracts. The flowers and leaves have traditional medicinal uses.',
    dohApproved: false,
    uses: ['Cough and cold treatment', 'Diarrhea relief', 'Anti-inflammatory', 'Antiseptic properties', 'Blood sugar regulation'],
    preparation: ['Make tea from flowers or leaves', 'Use as decoction for coughs', 'Apply to wounds'],
    warnings: ['May cause digestive upset', 'Pregnant women should avoid', 'May cause skin irritation'],
    category: 'Ornamental'
  },
  'Orchid': {
    description: 'Orchids (Orchidaceae family) are diverse flowering plants, many species native to the Philippines. Various orchid species have been used in traditional medicine.',
    dohApproved: false,
    uses: ['Treatment of tuberculosis', 'Strengthening lungs', 'Boosting immune system', 'Aphrodisiac', 'Anti-aging'],
    preparation: ['Make tea from dried flowers or stems', 'Use in traditional medicine preparations'],
    warnings: ['Some species may be toxic', 'Use only known edible species', 'Consult herbal practitioner'],
    category: 'Ornamental'
  },
  'Sunflower': {
    description: 'Sunflower (Helianthus annuus) is grown in the Philippines for seeds, oil, and ornamental purposes. Seeds are highly nutritious and have medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamin E', 'Heart health', 'Anti-inflammatory', 'Bone health', 'Blood sugar regulation', 'Mood enhancement'],
    preparation: ['Eat seeds as snack', 'Make tea from leaves', 'Use oil for cooking', 'Add seeds to salads'],
    warnings: ['High in calories - consume in moderation', 'May cause allergic reactions', 'High in sodium if salted'],
    category: 'Nutritional'
  },
  'Marigold': {
    description: 'Marigold or Aztec Marigold (Tagetes erecta) is a flowering plant grown in the Philippines for ornamental purposes and traditional medicine.',
    dohApproved: false,
    uses: ['Eye health (treatment of conjunctivitis)', 'Wound healing', 'Anti-inflammatory', 'Digestive aid', 'Antiseptic properties'],
    preparation: ['Make eye wash from flowers', 'Apply crushed flowers to wounds', 'Make tea for digestion'],
    warnings: ['May cause allergic reactions', 'Pregnant women should avoid', 'May interact with medications'],
    category: 'Ornamental'
  },
  'Daisy': {
    description: 'Daisy (Bellis perennis and related species) are common flowering plants. Some species have been used in traditional Philippine herbal medicine.',
    dohApproved: false,
    uses: ['Cough treatment', 'Wound healing', 'Digestive aid', 'Anti-inflammatory', 'Menstrual disorders'],
    preparation: ['Make tea from flowers and leaves', 'Apply crushed flowers to wounds', 'Use as poultice'],
    warnings: ['Some people may be allergic', 'Pregnant women should avoid', 'May interact with medications'],
    category: 'Ornamental'
  },
  'Ixora': {
    description: 'Ixora or Santan (Ixora coccinea) is a flowering shrub native to Asia, widely grown in Philippine gardens. Flowers have traditional medicinal uses.',
    dohApproved: false,
    uses: ['Treatment of dysentery', 'Menstrual disorders', 'Blood purification', 'Skin conditions', 'Fever reduction'],
    preparation: ['Make decoction from flowers or leaves', 'Apply to skin conditions', 'Drink for digestive issues'],
    warnings: ['May cause digestive upset', 'Pregnant women should avoid', 'Use under guidance'],
    category: 'Ornamental'
  },
  
  // FRUITS - Tropical and common fruits
  'Papaya': {
    description: 'Papaya (Carica papaya) is a tropical fruit tree widely grown in the Philippines. The fruit, leaves, and seeds all have medicinal and nutritional value.',
    dohApproved: false,
    uses: ['Digestive aid', 'Rich in Vitamins A and C', 'Anti-inflammatory', 'Wound healing (unripe fruit)', 'Menstrual pain regulation', 'Immune booster'],
    preparation: ['Eat ripe fruit', 'Make tea from young leaves', 'Apply latex from unripe fruit to wounds', 'Cook unripe fruit as vegetable (tinola)', 'Use seeds for deworming'],
    warnings: ['Unripe fruit should be cooked', 'Pregnant women should avoid unripe fruit', 'Latex may cause allergic reactions', 'Seeds may affect fertility'],
    category: 'Fruit'
  },
  'Pineapple': {
    description: 'Pineapple or Pinya (Ananas comosus) is a tropical fruit native to South America but widely cultivated in the Philippines. Rich in bromelain enzyme with anti-inflammatory properties.',
    dohApproved: false,
    uses: ['Digestive aid (bromelain)', 'Anti-inflammatory', 'Immune support', 'Wound healing', 'Cough relief', 'Bone strength'],
    preparation: ['Eat fresh fruit', 'Make juice', 'Use in cooking (adobo, humba)', 'Apply fresh juice to reduce swelling'],
    warnings: ['May cause mouth irritation due to bromelain', 'Not recommended before surgery', 'May interact with blood thinners', 'May cause allergic reactions'],
    category: 'Fruit'
  },
  'Watermelon': {
    description: 'Watermelon or Pakwan (Citrullus lanatus) is a refreshing fruit grown in the Philippines, especially during summer. It has high water content and medicinal properties.',
    dohApproved: false,
    uses: ['Hydration', 'Rich in lycopene (antioxidant)', 'Heart health', 'Blood pressure regulation', 'Anti-inflammatory', 'Kidney health'],
    preparation: ['Eat fresh fruit', 'Make juice or smoothie', 'Roast seeds for snack', 'Use rind as vegetable'],
    warnings: ['High glycemic index - diabetics consume in moderation', 'May cause digestive upset in large amounts', 'Allergic reactions rare but possible'],
    category: 'Fruit'
  },
  'Strawberry': {
    description: 'Strawberry (Fragaria x ananassa) is grown in cooler regions of the Philippines like Baguio. Rich in antioxidants and vitamins.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Antioxidant properties', 'Heart health', 'Blood sugar regulation', 'Anti-inflammatory', 'Skin health'],
    preparation: ['Eat fresh', 'Make into jam or preserves', 'Add to smoothies', 'Make tea from leaves'],
    warnings: ['Common allergen', 'May interact with blood thinners', 'High pesticide residue if not organic - wash thoroughly'],
    category: 'Fruit'
  },
  'Orange': {
    description: 'Orange (Citrus sinensis) is a citrus fruit grown in the Philippines, rich in Vitamin C and antioxidants.',
    dohApproved: false,
    uses: ['Immune system boost', 'Rich in Vitamin C', 'Heart health', 'Cholesterol reduction', 'Skin health', 'Eye health'],
    preparation: ['Eat fresh', 'Make juice', 'Use peel as flavoring', 'Make marmalade'],
    warnings: ['May interact with certain medications', 'Acidic - may irritate sensitive stomachs', 'May cause heartburn'],
    category: 'Fruit'
  },
  'Lemon': {
    description: 'Lemon (Citrus limon) is a citrus fruit used in the Philippines for culinary and medicinal purposes.',
    dohApproved: false,
    uses: ['Immune support', 'Digestive aid', 'Skin lightening', 'Sore throat relief', 'Detoxification', 'Antioxidant'],
    preparation: ['Make lemonade', 'Use in cooking', 'Apply diluted juice to skin', 'Use as natural cleaner'],
    warnings: ['Acidic - may erode tooth enamel', 'May irritate sensitive skin', 'May interact with medications'],
    category: 'Fruit'
  },
  'Rambutan': {
    description: 'Rambutan (Nephelium lappaceum) is a tropical fruit native to Southeast Asia, widely grown in the Philippines. Related to lychee and longan.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Iron source', 'Boosts energy', 'Bone health', 'Weight management', 'Antioxidant properties'],
    preparation: ['Eat fresh fruit', 'Make into preserves', 'Add to fruit salads', 'Seeds can be roasted'],
    warnings: ['High sugar content', 'Seeds have traces of toxic compounds - do not eat raw', 'May cause allergic reactions'],
    category: 'Fruit'
  },
  'Lanzones': {
    description: 'Lanzones or Langsat (Lansium parasiticum) is a tropical fruit native to Southeast Asia, popular in the Philippines especially in Camiguin.',
    dohApproved: false,
    uses: ['Rich in fiber', 'Good for digestion', 'Mosquito repellent (dried peels)', 'Anti-inflammatory', 'Fever reduction'],
    preparation: ['Eat fresh fruit', 'Make into preserves', 'Use dried peels as incense'],
    warnings: ['Seeds are bitter and may be toxic if consumed', 'May cause allergic reactions', 'Unripe fruit contains latex'],
    category: 'Fruit'
  },
  'Durian': {
    description: 'Durian (Durio zibethinus) is known as the "King of Fruits" in Southeast Asia including the Philippines. Has a distinctive smell and rich creamy flesh.',
    dohApproved: false,
    uses: ['Energy booster', 'Rich in vitamins and minerals', 'Digestive aid', 'Blood pressure regulation', 'Anti-aging', 'Bone health'],
    preparation: ['Eat fresh flesh', 'Make into candy or preserves', 'Add to desserts', 'Seeds can be boiled and eaten'],
    warnings: ['High in calories and sugar', 'Strong smell may be offensive', 'Not recommended with alcohol', 'May cause digestive upset', 'Hypertensive patients consume in moderation'],
    category: 'Fruit'
  },
  'Coconut': {
    description: 'Coconut or Niyog (Cocos nucifera) is called the "Tree of Life" in the Philippines. Every part has uses - from food to medicine to materials.',
    dohApproved: false,
    uses: ['Hydration (buko water)', 'Rich in healthy fats', 'Boosts immunity', 'Skin and hair health', 'Digestive health', 'Antimicrobial properties'],
    preparation: ['Drink fresh buko water', 'Use coconut oil for cooking and skin', 'Eat coconut meat', 'Make coconut milk for cooking', 'Use oil for hair treatment'],
    warnings: ['High in calories - consume in moderation', 'May raise cholesterol in some people', 'Coconut water may lower blood pressure'],
    category: 'Nutritional'
  },
  'Banana': {
    description: 'Banana or Saging (Musa spp.) is one of the most important fruits in the Philippines. Different varieties have different uses and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in potassium', 'Heart health', 'Digestive aid', 'Energy booster', 'Mood enhancement', 'Blood pressure regulation'],
    preparation: ['Eat fresh', 'Cook unripe (saba) as vegetable', 'Make into desserts', 'Use peels for plant fertilizer', 'Make flour from green bananas'],
    warnings: ['High in sugar - diabetics consume in moderation', 'May cause constipation if not ripe', 'May interact with certain medications'],
    category: 'Fruit'
  },
  'Jackfruit': {
    description: 'Jackfruit or Langka (Artocarpus heterophyllus) is the largest tree fruit and is used in the Philippines for food and medicine.',
    dohApproved: false,
    uses: ['Rich in nutrients', 'Aids digestion', 'Boosts immunity', 'Good for skin health', 'Energy booster'],
    preparation: ['Eat ripe fruit fresh', 'Cook unripe fruit as vegetable', 'Make chips from fruit', 'Make into preserves'],
    warnings: ['May cause allergic reactions', 'High in sugar - diabetics consume in moderation', 'Latex from fruit may stain'],
    category: 'Fruit'
  },
  'Star Fruit': {
    description: 'Star Fruit or Balimbing (Averrhoa carambola) is a tropical fruit with distinctive star-shaped cross-sections when cut. Native to Southeast Asia.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Antioxidant properties', 'Lowers cholesterol', 'Anti-inflammatory', 'Cough treatment', 'Hangover cure'],
    preparation: ['Eat fresh', 'Make juice', 'Use in salads', 'Make preserves'],
    warnings: ['Contains oxalic acid - avoid if have kidney disease', 'May interact with medications', 'May cause hiccups or nausea in some people'],
    category: 'Fruit'
  },
  
  // VEGETABLES - Common vegetables
  'Cabbage': {
    description: 'Cabbage (Brassica oleracea var. capitata) is widely cultivated in the Philippines, particularly in the highlands of Benguet. Rich in nutrients and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamin C and K', 'Anti-inflammatory', 'Digestive health', 'Heart health', 'Cancer prevention', 'Wound healing'],
    preparation: ['Eat raw in salads', 'Cook in soups and stews', 'Make into sauerkraut', 'Use leaves as poultice for wounds'],
    warnings: ['May cause gas and bloating', 'May interact with blood thinners', 'Hypothyroid patients should consume cooked'],
    category: 'Vegetable'
  },
  'Eggplant': {
    description: 'Eggplant or Talong (Solanum melongena) is a common vegetable in Philippine cuisine with medicinal properties.',
    dohApproved: false,
    uses: ['Rich in fiber', 'Good for heart health', 'Contains antioxidants', 'Aids digestion', 'Blood sugar regulation'],
    preparation: ['Cook as vegetable dish', 'Grill and mash for salads', 'Can be made into torta', 'Use in pinakbet'],
    warnings: ['Generally safe', 'May cause allergic reactions in sensitive individuals', 'Contains solanine - do not eat raw in large amounts'],
    category: 'Vegetable'
  },
  'Bitter Melon': {
    description: 'Bitter Melon or Ampalaya (Momordica charantia) is a tropical vine widely grown in the Philippines. Known for its distinctive bitter taste and anti-diabetic properties.',
    dohApproved: true,
    uses: ['Blood sugar regulation (diabetes)', 'Rich in vitamins and minerals', 'Immune system boost', 'Digestive aid', 'Antioxidant properties', 'Blood purification'],
    preparation: ['Cook as vegetable (ginisang ampalaya)', 'Make tea from leaves or fruit', 'Juice fresh fruit', 'Add to dishes for health benefits'],
    warnings: ['Pregnant women should avoid', 'May lower blood sugar excessively', 'May cause digestive upset', 'Bitter taste may be unpleasant'],
    category: 'Vegetable'
  },
  'Okra': {
    description: 'Okra or Lady\'s Finger (Abelmoschus esculentus) is a flowering plant valued for its edible seed pods. Popular in Philippine cooking.',
    dohApproved: false,
    uses: ['Rich in fiber', 'Blood sugar regulation', 'Heart health', 'Digestive health', 'Anti-inflammatory', 'Rich in folate'],
    preparation: ['Cook in stews (pinakbet, sinigang)', 'Fry or grill', 'Make soup', 'Eat raw in salads'],
    warnings: ['High in oxalates - consume in moderation if prone to kidney stones', 'May cause digestive upset in some', 'Allergic reactions rare'],
    category: 'Vegetable'
  },
  'String Beans': {
    description: 'String Beans or Sitaw (Vigna unguiculata sesquipedalis) are long, slender beans widely grown and consumed in the Philippines.',
    dohApproved: false,
    uses: ['Rich in protein and fiber', 'Heart health', 'Bone health', 'Digestive health', 'Blood sugar regulation', 'Rich in vitamins'],
    preparation: ['Cook in adobo style', 'Add to stews and soups', 'Stir-fry', 'Steam and eat with bagoong'],
    warnings: ['Must be cooked thoroughly', 'Raw beans contain lectins', 'May cause digestive upset if undercooked'],
    category: 'Vegetable'
  },
  'Squash': {
    description: 'Squash or Kalabasa (Cucurbita maxima) is commonly used in the Philippines for its nutritional and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamin A', 'Good for eye health', 'Aids digestion', 'Anti-inflammatory', 'Immune support'],
    preparation: ['Cook as vegetable dish', 'Make soup from flesh and seeds', 'Seeds can be roasted and eaten'],
    warnings: ['Generally safe', 'May cause digestive upset in large amounts'],
    category: 'Vegetable'
  },
  'Winged Bean': {
    description: 'Winged Bean or Sigarilyas (Psophocarpus tetragonolobus) is a tropical legume grown in the Philippines. All parts of the plant are edible and nutritious.',
    dohApproved: false,
    uses: ['High protein content', 'Rich in vitamins and minerals', 'Immune booster', 'Bone health', 'Digestive health'],
    preparation: ['Cook pods in stews', 'Eat leaves as greens', 'Eat flowers in salads', 'Cook tubers like potatoes'],
    warnings: ['May cause digestive upset in some people', 'Eat in moderation'],
    category: 'Vegetable'
  },
  'Chayote': {
    description: 'Chayote or Sayote (Sechium edule) is a tropical fruit used as a vegetable in the Philippines. Mild flavor and crisp texture.',
    dohApproved: false,
    uses: ['Low calorie', 'Rich in fiber', 'Heart health', 'Blood sugar regulation', 'Antioxidant properties'],
    preparation: ['Cook in stews and soups', 'Stir-fry', 'Make into salads', 'Steam and serve'],
    warnings: ['Generally safe', 'May cause digestive upset if eaten in large amounts', 'Seeds should not be consumed'],
    category: 'Vegetable'
  },
  'Moringa': {
    description: 'Moringa (Moringa oleifera), known as Malunggay or Marunggay in the Philippines, is a fast-growing tree called the "Miracle Tree." Its leaves are among the most nutrient-dense foods on earth.',
    dohApproved: true,
    uses: ['Extremely rich in vitamins and minerals (7x Vitamin C of oranges, 4x Vitamin A of carrots, 4x calcium of milk)', 'Complete protein with all 9 essential amino acids', 'Anti-inflammatory compounds', 'Blood sugar regulation', 'Cholesterol reduction', 'Brain health and cognitive function', 'Antioxidant powerhouse'],
    preparation: ['Add fresh leaves to soups and stews (tinola, ginisang munggo)', 'Dry leaves and make into powder for smoothies', 'Make tea from dried leaves', 'Eat young pods (drumsticks) in curries', 'Add to scrambled eggs or omelets'],
    warnings: ['May cause digestive upset in large amounts due to laxative properties', 'May lower blood pressure and blood sugar - monitor if on medication', 'Root and bark extracts should be avoided during pregnancy', 'Start with small amounts to test tolerance'],
    category: 'Nutritional'
  },
  'Corn': {
    description: 'Corn or Mais (Zea mays) is a staple crop in the Philippines. Different varieties are used for food, feed, and traditional medicine.',
    dohApproved: false,
    uses: ['Energy source', 'Rich in fiber', 'Antioxidant properties', 'Eye health', 'Digestive health'],
    preparation: ['Boil and eat as snack', 'Make into rice (mais)', 'Use in soups and stews', 'Make corn silk tea'],
    warnings: ['High glycemic index', 'May be genetically modified if not organic', 'High in calories'],
    category: 'Vegetable'
  },
  'Sweet Potato': {
    description: 'Sweet Potato or Kamote (Ipomoea batatas) tops and tubers are used medicinally in the Philippines for various health benefits.',
    dohApproved: false,
    uses: ['Rich in vitamins and minerals', 'Good for digestion', 'Anti-diabetic properties', 'Boosts immunity'],
    preparation: ['Tops: Boil quickly and serve as vegetable', 'Tubers: Boil, bake, or steam', 'Make tea from dried tops'],
    warnings: ['Generally safe', 'Diabetics should monitor blood sugar'],
    category: 'Vegetable'
  },
  
  // HERBS and SPICES
  'Cilantro': {
    description: 'Cilantro or Coriander (Coriandrum sativum) is an herb used in Philippine cooking and traditional medicine. Both leaves and seeds are used.',
    dohApproved: false,
    uses: ['Digestive aid', 'Heavy metal detoxification', 'Blood sugar regulation', 'Anti-inflammatory', 'Antimicrobial', 'Heart health'],
    preparation: ['Use fresh leaves in cooking', 'Make tea from seeds', 'Add to soups and salads', 'Use seeds as spice'],
    warnings: ['Some people have genetic aversion to taste', 'May interact with medications', 'Pregnant women should use in moderation'],
    category: 'Herb'
  },
  'Mint': {
    description: 'Mint (Mentha spp.) is an aromatic herb used in the Philippines for culinary and medicinal purposes. Various species are grown.',
    dohApproved: false,
    uses: ['Digestive aid', 'Relief from nausea', 'Treatment of headaches', 'Respiratory relief', 'Mental alertness', 'Natural insect repellent'],
    preparation: ['Make tea from fresh or dried leaves', 'Add to dishes and salads', 'Use essential oil for aromatherapy', 'Chew leaves for fresh breath'],
    warnings: ['May worsen acid reflux in some people', 'May interact with medications', 'Essential oil should not be ingested undiluted'],
    category: 'Herb'
  },
  'Thyme': {
    description: 'Thyme (Thymus vulgaris) is an aromatic herb with medicinal properties, used in Philippine traditional medicine.',
    dohApproved: false,
    uses: ['Respiratory health', 'Antibacterial and antifungal', 'Boosts immunity', 'Digestive aid', 'Mood enhancer', 'Blood pressure regulation'],
    preparation: ['Make tea from leaves', 'Use in cooking', 'Use essential oil for aromatherapy', 'Make cough syrup'],
    warnings: ['May interact with blood thinners', 'May cause allergic reactions', 'Pregnant women should consult doctor'],
    category: 'Herb'
  },
  'Parsley': {
    description: 'Parsley (Petroselinum crispum) is a flowering plant used as herb and vegetable in the Philippines. Rich in vitamins and antioxidants.',
    dohApproved: false,
    uses: ['Rich in Vitamin K', 'Bone health', 'Heart health', 'Anti-inflammatory', 'Digestive aid', 'Immune support'],
    preparation: ['Use fresh as garnish', 'Add to salads', 'Make tea', 'Use in cooking'],
    warnings: ['High in Vitamin K - may interact with blood thinners', 'Pregnant women should avoid large amounts', 'May cause allergic reactions'],
    category: 'Herb'
  },
  'Chives': {
    description: 'Chives (Allium schoenoprasum) are an aromatic herb related to onion and garlic, used in Philippine cooking.',
    dohApproved: false,
    uses: ['Digestive aid', 'Antioxidant properties', 'Bone health', 'Heart health', 'Immune support'],
    preparation: ['Use fresh in salads', 'Add to soups and dishes', 'Make into herb butter'],
    warnings: ['May interact with blood thinners', 'May cause digestive upset in some', 'Allergic to onion family should avoid'],
    category: 'Herb'
  },
  'Dill': {
    description: 'Dill (Anethum graveolens) is an aromatic herb used in Philippine cooking and traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Relief from insomnia', 'Bone health', 'Diabetes management', 'Anti-inflammatory', 'Menstrual pain relief'],
    preparation: ['Use leaves in cooking', 'Make tea from seeds', 'Add to pickles', 'Use in fish dishes'],
    warnings: ['May interact with medications', 'May cause allergic reactions', 'Pregnant women should consult doctor'],
    category: 'Herb'
  },
  'Fennel': {
    description: 'Fennel (Foeniculum vulgare) is a flowering plant species with aromatic properties used in Philippine traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Relief from colic and gas', 'Respiratory health', 'Menstrual pain relief', 'Milk production for nursing mothers', 'Eye health'],
    preparation: ['Make tea from seeds', 'Use bulb in cooking', 'Chew seeds after meals', 'Use as vegetable'],
    warnings: ['May interact with medications', 'May cause allergic reactions', 'Pregnant women should consult doctor'],
    category: 'Herb'
  },
  'Laurel': {
    description: 'Laurel or Bay Leaf (Laurus nobilis) is an aromatic leaf used extensively in Philippine cooking and traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Respiratory health', 'Anti-inflammatory', 'Pain relief', 'Treatment of dandruff'],
    preparation: ['Use dried leaves in cooking (adobo, stews)', 'Make tea from leaves', 'Use in aromatherapy'],
    warnings: ['Leaves are sharp - do not eat whole', 'May cause choking if swallowed whole', 'May interact with medications'],
    category: 'Herb'
  },
  'Lemongrass': {
    description: 'Lemongrass (Cymbopogon citratus), known as Tanglad in the Philippines, is an aromatic tropical grass with citrus flavor. It is essential in Southeast Asian cuisine and traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Stress and anxiety relief', 'Cholesterol reduction', 'Sleep improvement', 'Fever reduction', 'Natural mosquito repellent'],
    preparation: ['Brew as herbal tea', 'Add to soups and curries', 'Use essential oil for aromatherapy', 'Plant around home for insect control'],
    warnings: ['May lower blood glucose levels', 'Use caution during pregnancy', 'Essential oil may irritate skin'],
    category: 'Relaxant'
  },
  
  // OTHER MEDICINAL AND USEFUL PLANTS
  'Aloe Vera': {
    description: 'Aloe Vera (Aloe barbadensis miller) is a succulent plant widely grown in the Philippines for its medicinal gel. Used for skin conditions and digestive health.',
    dohApproved: false,
    uses: ['Wound healing', 'Skin hydration and burns', 'Digestive aid', 'Anti-inflammatory', 'Dental health', 'Antioxidant properties'],
    preparation: ['Apply gel to skin and wounds', 'Make juice from inner leaf (food-grade)', 'Add to smoothies', 'Use in skin care products'],
    warnings: ['Yellow latex (under skin) is a strong laxative and toxic', 'Pregnant women should avoid internal use', 'May interact with diabetes medications', 'May cause allergic reactions'],
    category: 'Medicinal'
  },
  'Noni': {
    description: 'Noni or Apatot (Morinda citrifolia) is a fruit-bearing tree native to Southeast Asia including the Philippines. The fruit has a strong smell but is highly valued for medicinal properties.',
    dohApproved: false,
    uses: ['Immune system booster', 'Anti-inflammatory', 'Pain relief', 'Antioxidant properties', 'Skin health', 'Joint health'],
    preparation: ['Drink noni juice', 'Make tea from leaves', 'Apply fruit pulp to skin', 'Make decoction from bark'],
    warnings: ['Strong taste and smell may be unpleasant', 'May interact with medications', 'May cause liver problems in rare cases', 'Pregnant women should avoid'],
    category: 'Medicinal'
  },
  'Tsaang Gubat': {
    description: 'Tsaang Gubat (Ehretia microphylla) is a shrub native to the Philippines and is one of the ten medicinal plants endorsed by the Department of Health (DOH) for treating diarrhea and stomach problems.',
    dohApproved: true,
    uses: ['Treatment of diarrhea and stomach problems', 'Anti-spasmodic properties', 'Anti-diarrheal', 'Stomach pain relief', 'Mouthwash for oral health'],
    preparation: ['Boil 2 cups of leaves in 4 cups water for 10-15 minutes', 'Let cool and strain', 'Drink 1 cup, 3 times daily', 'Use cooled tea as mouthwash'],
    warnings: ['May cause constipation if consumed in excess', 'Pregnant women should consult healthcare provider', 'May interact with medications for diarrhea'],
    category: 'Digestive'
  },
  'Ulasimang Bato': {
    description: 'Ulasimang Bato or Pansit-pansitan (Peperomia pellucida) is a small herb used in the Philippines for treating arthritis, gout, and kidney stones.',
    dohApproved: false,
    uses: ['Treatment of arthritis and gout', 'Kidney stone prevention', 'Diuretic properties', 'Lowers uric acid', 'Anti-inflammatory', 'Treatment of skin abscesses'],
    preparation: ['Eat fresh leaves in salads', 'Make tea from fresh or dried plant', 'Pound leaves and apply to affected areas', 'Drink decoction 2-3 times daily'],
    warnings: ['Pregnant women should avoid', 'May interact with diuretic medications', 'May lower blood pressure', 'Consult healthcare provider before regular use'],
    category: 'Urinary'
  },
  'Sambong': {
    description: 'Sambong (Blumea balsamifera) is a shrub used in the Philippines and is one of the ten medicinal plants endorsed by the DOH for its diuretic properties and effectiveness in treating kidney stones.',
    dohApproved: true,
    uses: ['Diuretic properties', 'Treatment of kidney stones', 'Urinary tract infections', 'Hypertension', 'Anti-inflammatory', 'Treatment of colds and coughs'],
    preparation: ['Boil 2 cups of leaves in 4 cups water for 15 minutes', 'Let cool and strain', 'Drink 1 cup, 3 times daily after meals'],
    warnings: ['May cause increased urination', 'Pregnant women should consult healthcare provider', 'May interact with diuretic medications', 'May lower blood pressure'],
    category: 'Urinary'
  },
  'Niyog-niyogan': {
    description: 'Niyog-niyogan (Quisqualis indica) is a vine traditionally used in the Philippines as an anthelmintic to expel intestinal worms.',
    dohApproved: false,
    uses: ['Expels intestinal worms (anthelmintic)', 'Treatment of Ascaris', 'Treatment of other parasitic worms', 'Ornamental vine'],
    preparation: ['Dry seeds', 'Take 1-2 kernels with water (adults only)', 'Repeat after a week if necessary'],
    warnings: ['Seeds are toxic in large amounts - use only recommended dosage', 'Not for children without medical supervision', 'Pregnant women should avoid', 'May cause nausea and vomiting', 'Consult healthcare provider before use'],
    category: 'Antiparasitic'
  },
  'Bawang': {
    description: 'Bawang or Garlic (Allium sativum) is recognized by the DOH for its cardiovascular benefits. It is one of the most important medicinal plants in the Philippines.',
    dohApproved: true,
    uses: ['Lowers blood pressure', 'Reduces cholesterol', 'Prevents blood clot formation', 'Antibacterial and antiviral', 'Immune system booster', 'Treatment of intestinal worms'],
    preparation: ['Eat raw (1-2 cloves daily)', 'Add to cooking', 'Make into capsules', 'Infuse in oil'],
    warnings: ['May cause body odor and breath odor', 'May interact with blood thinners', 'May cause stomach upset in some people', 'May lower blood sugar', 'Avoid before surgery'],
    category: 'Cardiovascular'
  },
  'Akapulko': {
    description: 'Akapulko or Ringworm Bush (Senna alata) is DOH-endorsed for treating fungal skin infections. The leaves contain chrysophanic acid which is effective against ringworm.',
    dohApproved: true,
    uses: ['Treatment of ringworm and other fungal infections', 'Treatment of scabies', 'Treatment of eczema', 'Treatment of insect bites', 'Anti-fungal properties'],
    preparation: ['Wash young leaves', 'Pound until juicy', 'Apply directly to affected areas', 'Do this twice daily until healed', 'Can also make decoction for washing'],
    warnings: ['For external use only', 'Do not use on open wounds', 'May cause skin irritation in some', 'Pregnant women should avoid internal use'],
    category: 'Skin/Fungal'
  },
  'Yerba Buena': {
    description: 'Yerba Buena (Clinopodium douglasii) is one of the ten DOH-endorsed medicinal plants for pain relief. Its menthol content provides effective relief from body aches and headaches.',
    dohApproved: true,
    uses: ['Relief from body aches and pains', 'Treatment of headaches', 'Relief from menstrual cramps', 'Relief from coughs and colds', 'Relief from arthritis pain', 'Aromatherapy'],
    preparation: ['Make decoction: Boil handful of leaves in 2 cups water for 15 minutes', 'Drink as tea for internal pains', 'Apply warm decoction to affected areas', 'Inhale steam for congestion'],
    warnings: ['May interact with blood thinners', 'May cause allergic reactions in sensitive individuals', 'Pregnant women should consult healthcare provider', 'May lower blood sugar'],
    category: 'Pain Relief'
  },
  'Lagundi': {
    description: 'Lagundi (Vitex negundo) is one of the ten medicinal plants officially endorsed by the Philippine DOH for its proven effectiveness in treating respiratory ailments.',
    dohApproved: true,
    uses: ['Treatment of coughs and colds', 'Asthma relief', 'Treatment of pharyngitis', 'Fever reduction', 'Treatment of diarrhea', 'Rheumatism relief'],
    preparation: ['Boil 2 cups of leaves in 4 cups water for 10-15 minutes', 'Let cool and strain', 'Drink 1 cup, 3 times daily', 'For children: Use smaller amounts'],
    warnings: ['May cause nausea in some people', 'Pregnant women should consult healthcare provider', 'May interact with hormonal medications', 'Do not exceed recommended dosage'],
    category: 'Respiratory'
  },
  'Bayabas': {
    description: 'Bayabas or Guava (Psidium guajava) is endorsed by the DOH as an effective treatment for diarrhea and wound infections. The leaves contain tannins with antimicrobial properties.',
    dohApproved: true,
    uses: ['Treatment of diarrhea', 'Treatment of wound infections', 'Relief from toothache', 'Treatment of stomach aches', 'Disinfectant for wounds', 'Treatment of mouth ulcers'],
    preparation: ['For diarrhea: Boil 4-6 leaves in 2 cups water for 15 minutes', 'For wounds: Wash leaves, pound, and apply as poultice', 'For toothache: Chew young leaves', 'Use as mouthwash'],
    warnings: ['May cause constipation if consumed in excess', 'May interact with diabetes medications', 'Pregnant women should use with caution'],
    category: 'Digestive'
  },
  'Ampalaya': {
    description: 'Ampalaya or Bitter Melon (Momordica charantia) is recognized by the DOH for its anti-diabetic properties. It contains charantin and momordicin which help lower blood glucose levels.',
    dohApproved: true,
    uses: ['Blood sugar regulation (diabetes)', 'Lowers blood sugar levels', 'Anti-diabetic properties', 'Boosts immune system', 'Treatment of wounds', 'Digestive aid'],
    preparation: ['Make decoction from leaves', 'Cook unripe fruit as vegetable', 'Drink 1/2 cup, twice daily before meals', 'Apply leaves to wounds as poultice'],
    warnings: ['Pregnant women should avoid', 'May lower blood sugar excessively', 'May cause digestive upset', 'Bitter taste may be unpleasant', 'Monitor blood sugar if on diabetes medication'],
    category: 'Diabetes'
  },
  'Malunggay': {
    description: 'Malunggay (Moringa oleifera) is called the "Miracle Tree" and is endorsed by the DOH. It contains 7x more Vitamin C than oranges and 4x more Vitamin A than carrots.',
    dohApproved: true,
    uses: ['Nutritional supplement for malnutrition', 'Rich in vitamins and minerals', 'Boosts milk production for nursing mothers', 'Immune system support', 'Anti-inflammatory properties', 'Treatment of anemia'],
    preparation: ['Add leaves to soups and stews', 'Cook leaves with fish or meat', 'Make tea from dried leaves', 'Add to scrambled eggs', 'Make leaf powder'],
    warnings: ['May have laxative effect in large amounts', 'May lower blood pressure', 'Root and bark should be avoided during pregnancy', 'May interact with thyroid medications'],
    category: 'Nutritional'
  },
  'Pansit-pansitan': {
    description: 'Pansit-pansitan (Peperomia pellucida) is traditionally used for treating arthritis, gout, and kidney stones. It has diuretic and anti-inflammatory properties.',
    dohApproved: false,
    uses: ['Treatment of arthritis', 'Treatment of gout', 'Kidney stone treatment', 'Lowers uric acid levels', 'Diuretic properties', 'Anti-inflammatory effects'],
    preparation: ['Eat fresh leaves in salads', 'Make decoction from whole plant', 'Drink 2 cups daily', 'Pound leaves and apply to joints'],
    warnings: ['Pregnant women should avoid', 'May interact with diuretics', 'May lower blood pressure', 'Monitor electrolyte levels with regular use'],
    category: 'Urinary'
  },
  'Katakataka': {
    description: 'Katakataka or Life Plant (Bryophyllum pinnatum) is a succulent plant used in the Philippines for treating various ailments including headaches and coughs.',
    dohApproved: false,
    uses: ['Treatment of headaches', 'Relief from coughs', 'Treatment of kidney stones', 'Wound healing', 'Anti-inflammatory properties'],
    preparation: ['Crush leaves and apply to forehead for headaches', 'Make decoction for coughs', 'Apply to wounds', 'Make tea from leaves'],
    warnings: ['Contains bufadienolides that can affect heart rhythm', 'Pregnant women should avoid', 'Do not consume in large amounts', 'Consult healthcare provider before use'],
    category: 'Medicinal'
  },
  'Siling Labuyo': {
    description: 'Siling Labuyo or Philippine Bird\'s Eye Chili (Capsicum frutescens) is widely used as a medicinal plant for its capsaicin content and health benefits.',
    dohApproved: false,
    uses: ['Improves metabolism', 'Pain relief (topical)', 'Rich in Vitamin C', 'Antioxidant properties', 'Aids digestion'],
    preparation: ['Can be added to dishes for daily health benefits', 'For pain relief: Apply crushed chili carefully to affected area'],
    warnings: ['May cause stomach irritation', 'Handle with care - avoid contact with eyes', 'Not for children'],
    category: 'Spice/Medicinal'
  },
  'Kalabasa': {
    description: 'Kalabasa or Squash/Pumpkin (Cucurbita maxima) is commonly used in the Philippines for its nutritional and medicinal properties.',
    dohApproved: false,
    uses: ['Rich in Vitamin A', 'Good for eye health', 'Aids digestion', 'Anti-inflammatory', 'Immune support'],
    preparation: ['Cook as vegetable dish', 'Make soup from flesh and seeds', 'Seeds can be roasted and eaten'],
    warnings: ['Generally safe', 'May cause digestive upset in large amounts'],
    category: 'Vegetable'
  },
  'Kamote': {
    description: 'Kamote (Ipomoea batatas) is a nutritious root crop widely grown in the Philippines.',
    dohApproved: false,
    uses: ['Rich in vitamins A & C', 'Good for digestion', 'Anti-diabetic properties', 'Immunity booster'],
    preparation: ['Boil or bake and eat as snack', 'Make into halaya', 'Cook tops as vegetable', 'Make chips'],
    warnings: ['Generally safe', 'May cause gas in some people'],
    category: 'Root Crop'
  },
  'Talong': {
    description: 'Talong or Eggplant (Solanum melongena) is commonly used in Philippine cuisine and has medicinal properties.',
    dohApproved: false,
    uses: ['Rich in fiber', 'Good for heart health', 'Contains antioxidants', 'Aids digestion'],
    preparation: ['Cook as vegetable dish', 'Grill and mash for salads', 'Can be made into torta'],
    warnings: ['Generally safe', 'May cause allergic reactions in sensitive individuals'],
    category: 'Vegetable'
  },
  'Sitaw': {
    description: 'Sitaw or String Beans (Vigna unguiculata) are widely cultivated and consumed in the Philippines for their nutritional value.',
    dohApproved: false,
    uses: ['Rich in protein', 'Good for digestion', 'Heart health', 'Rich in vitamins and minerals'],
    preparation: ['Cook in adobo', 'Add to stews', 'Stir-fry', 'Steam and eat with bagoong'],
    warnings: ['Must be cooked thoroughly', 'Raw beans contain lectins'],
    category: 'Vegetable'
  },
  'Pechay': {
    description: 'Pechay or Chinese Cabbage (Brassica rapa subsp. pekinensis) is a leafy vegetable widely grown in the Philippines, especially in the highlands.',
    dohApproved: false,
    uses: ['Rich in vitamins A, C, and K', 'Good for bone health', 'Boosts immune system', 'Aids digestion', 'Low in calories'],
    preparation: ['Saute with garlic', 'Add to soups', 'Use in stir-fries', 'Eat raw in salads'],
    warnings: ['May cause gas in some people', 'May interact with blood thinners', 'Those with thyroid issues should cook thoroughly'],
    category: 'Vegetable'
  },
  'Mustasa': {
    description: 'Mustasa or Mustard Greens (Brassica juncea) are leafy vegetables with a peppery flavor, used in Philippine cooking and traditional medicine.',
    dohApproved: false,
    uses: ['Rich in vitamins A, C, and K', 'Anti-inflammatory', 'Digestive aid', 'Detoxification', 'Heart health'],
    preparation: ['Cook in soups', 'Saute with garlic', 'Pickle the leaves', 'Add to stews'],
    warnings: ['May be too spicy for some', 'May interact with blood thinners', 'Those with kidney stones should consume in moderation'],
    category: 'Vegetable'
  },
  'Gabi': {
    description: 'Gabi or Taro (Colocasia esculenta) is a root crop widely grown in the Philippines. The leaves and corms are both edible and medicinal.',
    dohApproved: false,
    uses: ['Rich in fiber', 'Good for digestion', 'Energy source', 'Contains vitamins and minerals'],
    preparation: ['Cook as laing with coconut milk', 'Boil and eat as snack', 'Make into chips'],
    warnings: ['Must be cooked thoroughly - raw gabi causes itching', 'May cause allergic reactions in sensitive individuals'],
    category: 'Root Crop'
  },
  'Camote': {
    description: 'Camote (Ipomoea batatas) is a nutritious root crop widely grown in the Philippines.',
    dohApproved: false,
    uses: ['Rich in vitamins A & C', 'Good for digestion', 'Anti-diabetic properties', 'Immunity booster'],
    preparation: ['Boil or bake and eat as snack', 'Make into halaya', 'Cook tops as vegetable', 'Make chips'],
    warnings: ['Generally safe', 'May cause gas in some people'],
    category: 'Root Crop'
  },
  'Peas': {
    description: 'Peas or Gisantes (Pisum sativum) are used in the Philippines for their nutritional value.',
    dohApproved: false,
    uses: ['Rich in protein', 'Good for digestion', 'Rich in vitamins', 'Heart health'],
    preparation: ['Add to dishes (giniling, sopas)', 'Cook as side dish', 'Add to salads'],
    warnings: ['Generally safe', 'May cause gas in some people'],
    category: 'Legume'
  },
  'Peanut': {
    description: 'Peanut or Mani (Arachis hypogaea) is widely consumed in the Philippines as snack and ingredient.',
    dohApproved: false,
    uses: ['Rich in protein', 'Good for heart health', 'Energy booster', 'Rich in healthy fats', 'Antioxidant properties'],
    preparation: ['Roast and eat as snack', 'Make peanut butter', 'Add to dishes (kare-kare)', 'Make into candy'],
    warnings: ['Common allergen - avoid if allergic', 'High in calories - consume in moderation'],
    category: 'Legume'
  },
  'Gumamela': {
    description: 'Gumamela or Hibiscus (Hibiscus rosa-sinensis) is used in the Philippines for ornamental and medicinal purposes.',
    dohApproved: false,
    uses: ['Lowers blood pressure', 'Rich in Vitamin C', 'Hair health', 'Skin health', 'Aids digestion'],
    preparation: ['Make tea from flowers', 'Use flower extract for hair', 'Make decoction for coughs'],
    warnings: ['May lower blood pressure excessively', 'May interact with medications', 'Pregnant women should consult doctor'],
    category: 'Ornamental'
  },
  'Rosemary': {
    description: 'Rosemary (Salvia rosmarinus) is used in the Philippines for culinary and medicinal purposes.',
    dohApproved: false,
    uses: ['Improves memory and concentration', 'Aids digestion', 'Antioxidant properties', 'Hair health', 'Pain relief'],
    preparation: ['Make tea from leaves', 'Use in cooking', 'Make rosemary oil for hair', 'Use as inhalant'],
    warnings: ['May interact with blood thinners', 'High doses may cause seizures', 'Pregnant women should avoid large amounts'],
    category: 'Aromatic'
  },
  'Gotu Kola': {
    description: 'Gotu Kola or Centella (Centella asiatica) is used in the Philippines for its cognitive and healing properties.',
    dohApproved: false,
    uses: ['Improves memory', 'Wound healing', 'Anti-inflammatory', 'Reduces anxiety', 'Skin health'],
    preparation: ['Eat fresh leaves in salads', 'Make tea from leaves', 'Apply to wounds', 'Make into juice'],
    warnings: ['May interact with sedatives', 'May cause allergic reactions', 'Pregnant women should consult doctor'],
    category: 'Medicinal'
  },
  'Tawa-tawa': {
    description: 'Tawa-tawa or Asthma Plant (Euphorbia hirta) is traditionally used in the Philippines for asthma and respiratory problems.',
    dohApproved: false,
    uses: ['Treatment of asthma', 'May help with dengue fever', 'Treatment of dysentery', 'Treatment of skin sores', 'Relief from intestinal worms'],
    preparation: ['Boil 1 cup of whole plant in 4 cups water for 10 mins', 'Let cool and strain', 'Drink 3-4 cups daily'],
    warnings: ['Not proven cure for dengue - seek medical attention', 'Should not replace professional medical treatment', 'May cause allergic reactions'],
    category: 'Respiratory'
  },
  'Mayana': {
    description: 'Mayana or Coleus (Coleus blumei) is an ornamental plant used in the Philippines for medicinal purposes.',
    dohApproved: false,
    uses: ['Treatment of coughs', 'Relief from headaches', 'Anti-inflammatory', 'Treatment of eye problems'],
    preparation: ['Make tea from leaves', 'Crush leaves and apply to forehead for headaches', 'Use as eyewash (cooled tea)'],
    warnings: ['May interact with medications', 'Pregnant women should avoid', 'May cause allergic reactions'],
    category: 'Ornamental'
  },
  'Oregano': {
    description: 'Oregano (Plectranthus amboinicus, also called Cuban oregano or Indian borage) is a succulent herb widely used in Philippine traditional medicine. Despite its name, it is not true oregano but has similar aromatic and medicinal properties.',
    dohApproved: false,
    uses: ['Relief from coughs and colds', 'Treatment of asthma and bronchitis', 'Aids digestion', 'Relief from insect bites', 'Treatment of menstrual cramps', 'Antibacterial and antifungal properties'],
    preparation: ['Make tea: Steep 3-5 fresh leaves in hot water for 10 mins', 'For cough: Add honey and calamansi', 'Crush leaves and apply to insect bites', 'Use as steam inhalation for congestion'],
    warnings: ['May cause stomach upset in large doses', 'Pregnant women should use with caution', 'May interact with blood thinners', 'Not recommended for people with iron deficiency'],
    category: 'Respiratory'
  },
  'Cuban-oregano': {
    description: 'Cuban Oregano (Plectranthus amboinicus) is a succulent herb with thick, fleshy leaves and strong oregano-like scent. It is widely grown in Philippine gardens for culinary and medicinal use.',
    dohApproved: false,
    uses: ['Relief from respiratory ailments', 'Treatment of coughs and asthma', 'Digestive aid', 'Anti-inflammatory', 'Treatment of skin conditions'],
    preparation: ['Make tea from fresh or dried leaves', 'Add to soups and stews for flavor', 'Crush leaves and apply to skin irritations', 'Use as herbal steam for congestion'],
    warnings: ['May cause stomach irritation in high doses', 'Pregnant women should consult doctor', 'May interact with certain medications'],
    category: 'Respiratory'
  },
  'Kakawate': {
    description: 'Kakawate or Madre de Cacao (Gliricidia sepium) is a fast-growing tree commonly found in the Philippines. It is widely used as a living fence and shade tree for cacao plantations. The leaves have insecticidal and medicinal properties.',
    dohApproved: false,
    uses: ['Natural insecticide and pesticide', 'Treatment of scabies and skin parasites', 'Fertilizer and green manure', 'Livestock feed', 'Firewood'],
    preparation: ['For scabies: Crush leaves and apply to affected areas', 'Make leaf extract for spray insecticide', 'Use as mulch for plants', 'Boil leaves for animal deworming'],
    warnings: ['Seeds are toxic to humans and animals if consumed in large quantities', 'May cause skin irritation in sensitive individuals', 'Use with caution as insecticide'],
    category: 'Pesticidal/Medicinal'
  },
  'Quick-stick': {
    description: 'Quick-stick is another name for Kakawate or Madre de Cacao (Gliricidia sepium), a versatile tree used in Philippine agriculture and traditional medicine. It grows rapidly from cuttings, hence the name "quick-stick."',
    dohApproved: false,
    uses: ['Natural insecticide', 'Treatment of skin parasites', 'Soil improvement', 'Shade tree for crops', 'Living fence posts'],
    preparation: ['Crush fresh leaves for skin application', 'Make leaf decoction for spraying', 'Plant cuttings directly for quick growth'],
    warnings: ['Toxic if seeds are ingested', 'Handle with care when using as pesticide', 'May irritate sensitive skin'],
    category: 'Pesticidal/Medicinal'
  },
  'Avocado': {
    description: 'Avocado (Persea americana) is a nutritious fruit tree grown throughout the Philippines. The leaves have medicinal properties and are used in traditional remedies.',
    dohApproved: false,
    uses: ['Rich in healthy fats', 'Anti-inflammatory properties', 'Helps lower cholesterol', 'Good for skin and hair health', 'Menstrual pain relief (leaves)'],
    preparation: ['Eat ripe fruit for nutrition', 'Make tea from young leaves for menstrual cramps', 'Apply oil to skin and hair', 'Add to salads and smoothies'],
    warnings: ['May interact with blood thinners', 'Some people may have latex allergy', 'High in calories - consume in moderation'],
    category: 'Nutritional'
  },
  'Calamansi': {
    description: 'Calamansi or Kalamansi (Citrus microcarpa) is a small citrus fruit essential to Philippine cuisine and traditional medicine. It is rich in Vitamin C and has numerous health benefits.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Aids digestion', 'Cough and sore throat relief', 'Skin lightening', 'Antioxidant properties'],
    preparation: ['Squeeze juice for cooking and drinks', 'Mix juice with honey for cough remedy', 'Apply diluted juice to skin', 'Use as marinade for meat'],
    warnings: ['May erode tooth enamel', 'Can irritate sensitive skin if undiluted', 'May cause heartburn in some people'],
    category: 'Citrus'
  },
  'Kalamansi': {
    description: 'Kalamansi (Citrus microcarpa) is a small Philippine citrus fruit known for its distinct aroma and sour taste. It is a staple ingredient in Filipino cooking and traditional remedies.',
    dohApproved: false,
    uses: ['Immune system boost (Vitamin C)', 'Digestive aid', 'Cough and cold remedy', 'Natural skin cleanser', 'Flavoring for dishes'],
    preparation: ['Make juice with water and sugar', 'Use as souring agent in sinigang', 'Mix with soy sauce for dipping', 'Apply juice to scalp for dandruff'],
    warnings: ['May damage tooth enamel over time', 'Can cause stomach acidity', 'Dilute before applying to skin'],
    category: 'Citrus'
  },
  'Guyabano': {
    description: 'Guyabano or Soursop (Annona muricata) is a tropical fruit tree with sweet, creamy flesh and spiky green skin. The leaves, bark, and fruit have traditional medicinal uses.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Aids digestion', 'Immune system support', 'Anti-inflammatory properties', 'Sleep aid (leaf tea)'],
    preparation: ['Eat ripe fruit fresh', 'Make tea from leaves or bark', 'Blend into smoothies', 'Add to desserts'],
    warnings: ['Large amounts of seeds are toxic', 'May lower blood pressure excessively', 'Pregnant women should consult doctor', 'May interact with diabetes medication'],
    category: 'Fruit'
  },
  'Soursop': {
    description: 'Soursop (Annona muricata), known as Guyabano in the Philippines, is a tropical fruit with creamy white flesh and distinctive flavor. All parts of the tree have traditional medicinal applications.',
    dohApproved: false,
    uses: ['High Vitamin C content', 'Digestive health', 'Immune boosting', 'Anti-inflammatory effects', 'Calming tea for sleep'],
    preparation: ['Eat fresh fruit', 'Make herbal tea from dried leaves', 'Create fruit shakes', 'Use in traditional medicine preparations'],
    warnings: ['Seeds contain toxic compounds', 'May affect blood pressure', 'Consult healthcare provider before medicinal use'],
    category: 'Fruit'
  },
  'Tanglad': {
    description: 'Tanglad or Lemongrass (Cymbopogon citratus) is a fragrant tropical grass widely used in Philippine cooking and traditional medicine. It has a distinctive lemon scent and flavor.',
    dohApproved: false,
    uses: ['Relief from digestive problems', 'Reduces stress and anxiety', 'Lowers cholesterol', 'Relief from insomnia', 'Treatment of fever', 'Natural insect repellent'],
    preparation: ['Make tea: Boil 2-3 stalks in 2 cups water for 10 mins', 'Use as flavoring in cooking', 'Crush leaves for insect repellent', 'Oil can be used for massage'],
    warnings: ['Generally safe', 'May lower blood sugar', 'Pregnant women should consult doctor', 'May irritate sensitive skin'],
    category: 'Relaxant'
  },
  'Lemongrass': {
    description: 'Lemongrass (Cymbopogon citratus), known as Tanglad in the Philippines, is an aromatic tropical grass with citrus flavor. It is essential in Southeast Asian cuisine and traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Stress and anxiety relief', 'Cholesterol reduction', 'Sleep improvement', 'Fever reduction', 'Natural mosquito repellent'],
    preparation: ['Brew as herbal tea', 'Add to soups and curries', 'Use essential oil for aromatherapy', 'Plant around home for insect control'],
    warnings: ['May lower blood glucose levels', 'Use caution during pregnancy', 'Essential oil may irritate skin'],
    category: 'Relaxant'
  },
  
  // ADDITIONAL PLANTS - Identified by PlantNet but missing from database
  'Rough lemon': {
    description: 'Rough lemon (Citrus jambhiri) is a citrus species commonly used as rootstock for other citrus varieties. It has a rough, textured skin and acidic juice. The leaves and peel have traditional medicinal uses.',
    dohApproved: false,
    uses: ['Rich in Vitamin C', 'Digestive aid', 'Natural cleaning agent', 'Insect repellent (leaves)', 'Rootstock for citrus grafting', 'Juice for cooking and beverages'],
    preparation: ['Use juice for marinades and sauces', 'Make lemonade with honey', 'Boil leaves for aromatic tea', 'Use peel zest in cooking', 'Extract oil from peel for cleaning'],
    warnings: ['Highly acidic - may irritate sensitive stomachs', 'Can erode tooth enamel', 'May interact with certain medications', 'Avoid excessive consumption'],
    category: 'Citrus'
  },
  'Greater yam': {
    description: 'Greater Yam (Dioscorea alata), known as Ube in the Philippines, is a tropical tuberous vine with distinctive purple or white flesh. It is a staple food crop and important ingredient in Filipino desserts and traditional medicine.',
    dohApproved: false,
    uses: ['Rich source of carbohydrates and fiber', 'Contains antioxidants (purple variety)', 'Supports digestive health', 'Traditional remedy for hormonal balance', 'Energy source', 'Anti-inflammatory properties'],
    preparation: ['Boil or steam and eat as vegetable', 'Make Ube halaya (purple yam jam)', 'Add to soups and stews', 'Grate for traditional desserts', 'Make flour for baking', 'Roast like potatoes'],
    warnings: ['Must be cooked properly - raw yams contain irritating compounds', 'Some people may be allergic', 'High glycemic index - diabetics should consume in moderation', 'May cause digestive discomfort if eaten in large amounts'],
    category: 'Root Crop'
  },
  'Ube': {
    description: 'Ube (Dioscorea alata) or Purple Yam is a beloved Filipino root crop known for its vibrant purple color and sweet, nutty flavor. It is a staple in Philippine desserts and has traditional medicinal value.',
    dohApproved: false,
    uses: ['Rich in carbohydrates and dietary fiber', 'High antioxidant content (anthocyanins)', 'Supports digestive health', 'Energy booster', 'Contains vitamins C and B6', 'Potassium source'],
    preparation: ['Make Ube halaya (jam/pudding)', 'Use in cakes and pastries', 'Make ice cream and desserts', 'Boil and eat as vegetable', 'Create Ube powder for flavoring', 'Add to halo-halo'],
    warnings: ['Must be thoroughly cooked', 'Some varieties may be toxic if not prepared correctly', 'High calorie content - consume in moderation', 'May cause blood sugar spikes'],
    category: 'Root Crop'
  },
  'Cassava': {
    description: 'Cassava (Manihot esculenta), known as Kamoteng Kahoy in the Philippines, is a drought-tolerant root crop that is a major source of carbohydrates. It requires proper preparation to remove naturally occurring cyanide compounds.',
    dohApproved: false,
    uses: ['Major carbohydrate source', 'Gluten-free flour alternative', 'Source of resistant starch', 'Contains vitamin C and folate', 'Sustainable crop for food security'],
    preparation: ['Boil thoroughly until tender', 'Make cassava cake (bibingkang kamoteng kahoy)', 'Fry as chips or fries', 'Grate and squeeze out juice for baking', 'Make tapioca starch', 'Sun-dry for storage'],
    warnings: ['Must be properly cooked to remove cyanogenic compounds', 'Never consume raw', 'Bitter varieties are more toxic than sweet varieties', 'Soaking and thorough cooking essential', 'Pregnant women should consume in moderation'],
    category: 'Root Crop'
  },
  
  // ==================== TREES (15 plants) ====================
  'Neem': {
    description: 'Neem (Azadirachta indica) is a fast-growing evergreen tree native to India and Southeast Asia. Known as the "village pharmacy," it has been used in Ayurvedic medicine for thousands of years. Every part of the tree has medicinal value.',
    dohApproved: false,
    uses: ['Natural insecticide and pesticide', 'Treats skin disorders and infections', 'Dental care (neem twigs used as toothbrushes)', 'Blood sugar regulation', 'Immune system support', 'Liver detoxification'],
    preparation: ['Make neem leaf tea for internal cleansing', 'Apply neem oil for skin conditions', 'Use neem twigs for dental hygiene', 'Boil leaves for insect repellent spray', 'Make neem-based soap and shampoo'],
    warnings: ['Pregnant women should avoid internal use', 'May lower blood sugar significantly', 'Can cause allergic reactions in some people', 'Not recommended for infants'],
    category: 'Tree'
  },
  'Acacia': {
    description: 'Acacia is a genus of trees and shrubs known for their thorny branches and feathery leaves. Several species grow in the Philippines and have traditional uses in medicine and construction.',
    dohApproved: false,
    uses: ['Source of gum arabic', 'Tannin production for leather', 'Soil improvement through nitrogen fixation', 'Traditional wound healing', 'Fodder for livestock', 'Quality timber'],
    preparation: ['Use gum arabic as food stabilizer', 'Make bark decoction for diarrhea', 'Apply crushed leaves to wounds', 'Use pods as animal feed', 'Harvest wood for furniture'],
    warnings: ['Some species have toxic compounds', 'Excessive bark consumption may cause digestive issues', 'Thorns can cause injury'],
    category: 'Tree'
  },
  'Mahogany': {
    description: 'Mahogany (Swietenia macrophylla) is a tropical hardwood tree prized for its beautiful, durable timber. Native to the Americas but widely planted in the Philippines as a reforestation species.',
    dohApproved: false,
    uses: ['Premium furniture and cabinet wood', 'Musical instrument construction', 'Ship building', 'Shade tree in plantations', 'Carbon sequestration', 'Seed oil for traditional medicine'],
    preparation: ['Harvest mature trees for lumber', 'Use seeds for oil extraction', 'Plant as shade trees in coffee plantations', 'Use wood veneer for decorative purposes'],
    warnings: ['Endangered in native range - use plantation-grown only', 'Dust from sanding may cause respiratory irritation', 'Not for internal medicinal use'],
    category: 'Tree'
  },
  'Eucalyptus': {
    description: 'Eucalyptus (Eucalyptus globulus) is a fast-growing evergreen tree native to Australia. Widely planted in the Philippines for pulp, timber, and essential oil production.',
    dohApproved: false,
    uses: ['Eucalyptus oil for respiratory relief', 'Paper and pulp production', 'Insect repellent properties', 'Fever reduction', 'Natural decongestant', 'Antiseptic for wounds'],
    preparation: ['Steam inhalation with eucalyptus oil', 'Apply diluted oil to chest for congestion', 'Use leaves in potpourri', 'Make cough syrup with honey', 'Add oil to bath for muscle relief'],
    warnings: ['Essential oil toxic if ingested', 'Not safe for children under 2', 'May interact with medications', 'Keep oil away from pets'],
    category: 'Tree'
  },
  'Narra': {
    description: 'Narra (Pterocarpus indicus) is the national tree of the Philippines. A large, deciduous tree with distinctive buttress roots and beautiful grain wood. It produces fragrant yellow flowers.',
    dohApproved: false,
    uses: ['National symbol of Philippines', 'High-quality timber for furniture', 'Traditional medicine for inflammation', 'Ornamental shade tree', 'Kino resin for dye and medicine', 'Nitrogen-fixing properties'],
    preparation: ['Use wood for fine furniture and carving', 'Make resin decoction for mouth ulcers', 'Plant as avenue tree for shade', 'Harvest flowers for ornamental purposes'],
    warnings: ['Endangered in wild - conservation status', 'Protected by law in Philippines', 'Sustainable plantation sources only'],
    category: 'Tree'
  },
  'Ipil-ipil': {
    description: 'Ipil-ipil (Leucaena leucocephala) is a fast-growing legume tree native to Central America. Widely naturalized in the Philippines as fodder, green manure, and firewood source.',
    dohApproved: false,
    uses: ['High-protein animal fodder', 'Green manure for soil improvement', 'Firewood and charcoal', 'Living fence posts', 'Nitrogen fixation', 'Erosion control'],
    preparation: ['Feed young leaves to livestock', 'Use as mulch around crops', 'Plant as hedgerows', 'Harvest wood for quick-burning fuel', 'Use seeds as coffee substitute'],
    warnings: ['Contains mimosine - toxic to horses', 'Should not exceed 30% of animal diet', 'Not for human consumption'],
    category: 'Tree'
  },
  'Banaba': {
    description: 'Banaba (Lagerstroemia speciosa) is a tropical flowering tree native to Southeast Asia. Known for its beautiful purple flowers and traditional use in treating diabetes.',
    dohApproved: false,
    uses: ['Blood sugar regulation', 'Kidney and bladder health', 'Weight management support', 'Antioxidant properties', 'Ornamental flowering tree', 'Diuretic effects'],
    preparation: ['Make banaba leaf tea', 'Take as herbal supplement capsules', 'Use extract in herbal medicine', 'Plant as ornamental garden tree'],
    warnings: ['May lower blood sugar - diabetics monitor levels', 'Pregnant women consult doctor', 'May interact with diabetes medications'],
    category: 'Tree'
  },
  'Duhat': {
    description: 'Duhat (Syzygium cumini), also known as Java plum, is a tropical evergreen tree with edible purple-black fruits. Common throughout the Philippines.',
    dohApproved: false,
    uses: ['Blood sugar regulation', 'Digestive health', 'Antioxidant-rich fruits', 'Ornamental shade tree', 'Timber for construction', 'Bark for tanning'],
    preparation: ['Eat fresh fruits', 'Make duhat wine or vinegar', 'Dry seeds for herbal tea', 'Use bark for traditional medicine', 'Make jam from ripe fruits'],
    warnings: ['May lower blood sugar significantly', 'Excessive consumption may cause constipation', 'Stains clothing and surfaces'],
    category: 'Tree'
  },
  'Kakawate': {
    description: 'Kakawate (Gliricidia sepium) is a fast-growing legume tree native to Central America. Widely used in the Philippines as living fence posts and shade for cacao and coffee.',
    dohApproved: false,
    uses: ['Living fence posts (cuttings root easily)', 'Shade tree for cacao plantations', 'Green manure and mulch', 'Firewood source', 'Rat poison (seeds)', 'Traditional medicine for skin parasites'],
    preparation: ['Plant cuttings directly in ground for fences', 'Use leaves as green mulch', 'Make decoction for external parasite treatment', 'Prune regularly for firewood'],
    warnings: ['Seeds highly toxic to mammals', 'Not for internal consumption', 'Handle with care when using as rodenticide'],
    category: 'Tree'
  },
  'Mango': {
    description: 'Mango (Mangifera indica) is the national fruit of the Philippines. A tropical evergreen tree producing sweet, juicy fruits rich in vitamins A and C.',
    dohApproved: false,
    uses: ['Rich in vitamins A and C', 'Antioxidant properties', 'Digestive health (green mango)', 'Immune system support', 'Skin health', 'Eye health'],
    preparation: ['Eat ripe mangoes fresh', 'Make mango juice and smoothies', 'Use green mangoes for pickles', 'Dry mango slices for snacks', 'Make mango jam and preserves'],
    warnings: ['Sap may cause skin irritation', 'Mango peel contains urushiol (same as poison ivy)', 'Diabetics should monitor portion sizes'],
    category: 'Tree'
  },
  'Jackfruit': {
    description: 'Jackfruit (Artocarpus heterophyllus) is the largest tree-borne fruit in the world. Native to India but widely cultivated in the Philippines for its sweet, aromatic flesh.',
    dohApproved: false,
    uses: ['Meat substitute for vegetarians', 'Rich in vitamin C and potassium', 'Digestive health from fiber', 'Immune system support', 'Energy booster', 'Seeds edible when cooked'],
    preparation: ['Eat ripe fruit fresh', 'Cook young jackfruit as vegetable', 'Boil or roast seeds', 'Make jackfruit chips', 'Use in curries and stews'],
    warnings: ['Very sticky sap - use oil on hands and knife', 'Strong aroma when ripe', 'High sugar content - diabetics monitor intake'],
    category: 'Tree'
  },
  'Coconut': {
    description: 'Coconut (Cocos nucifera) is called the "Tree of Life" in the Philippines. Every part of the coconut palm has practical uses from food to construction.',
    dohApproved: false,
    uses: ['Source of coconut oil and milk', 'Hydration from coconut water', 'Fiber for ropes and mats', 'Shells for charcoal and crafts', 'Leaves for thatching', 'Trunk for timber'],
    preparation: ['Drink fresh coconut water', 'Extract coconut milk for cooking', 'Make virgin coconut oil', 'Use grated coconut in desserts', 'Dry coconut meat for copra'],
    warnings: ['Coconut oil high in saturated fat', 'Allergic reactions possible', 'Falling coconuts can cause injury'],
    category: 'Tree'
  },
  'Papaya': {
    description: 'Papaya (Carica papaya) is a fast-growing fruit tree native to Central America. The ripe fruit is rich in vitamin C and the enzyme papain aids digestion.',
    dohApproved: false,
    uses: ['Digestive aid (papain enzyme)', 'Rich in vitamin C and A', 'Anti-inflammatory properties', 'Skin health and wound healing', 'Meat tenderizer', 'Immune support'],
    preparation: ['Eat ripe papaya fresh', 'Use green papaya in salads (atchara)', 'Apply latex to warts', 'Make papaya smoothies', 'Use leaves for traditional medicine'],
    warnings: ['Unripe papaya may cause uterine contractions - avoid in pregnancy', 'Latex can irritate skin', 'May interact with blood thinning medications'],
    category: 'Tree'
  },
  'Avocado': {
    description: 'Avocado (Persea americana) is a evergreen tree producing nutrient-dense fruits rich in healthy monounsaturated fats. Native to Central America but widely grown in the Philippines.',
    dohApproved: false,
    uses: ['Heart-healthy monounsaturated fats', 'Rich in potassium and fiber', 'Vitamin E and K source', 'Cholesterol management', 'Eye health (lutein)', 'Weight management'],
    preparation: ['Eat fresh with salt and pepper', 'Make guacamole', 'Add to smoothies', 'Use in salads', 'Make avocado toast'],
    warnings: ['High calorie content - moderate portions', 'May cause latex allergy reactions', 'Persin toxin in seeds and skin - not edible'],
    category: 'Tree'
  },
  'Atis': {
    description: 'Atis (Annona squamosa), also known as Sugar Apple or Custard Apple, is a small tropical tree producing sweet, creamy fruits with distinct segments.',
    dohApproved: false,
    uses: ['Rich in vitamin C and B6', 'Magnesium and potassium source', 'Antioxidant properties', 'Traditional remedy for dysentery', 'Natural insecticide (seeds)', 'Energy booster'],
    preparation: ['Eat fresh fruit when soft', 'Blend into smoothies', 'Make fruit salads', 'Use seeds for natural insect repellent', 'Make traditional cough remedy'],
    warnings: ['Seeds are toxic - do not eat', 'High sugar content - diabetics monitor intake', 'May cause allergic reactions in some'],
    category: 'Tree'
  },
  
  // ==================== FLOWERS (10 plants) ====================
  'Sampaguita': {
    description: 'Sampaguita (Jasminum sambac) is the national flower of the Philippines. A fragrant jasmine species used in garlands, offerings, and traditional medicine.',
    dohApproved: false,
    uses: ['National flower of Philippines', 'Fragrant flower garlands', 'Aromatherapy and relaxation', 'Traditional headache remedy', 'Skin soothing properties', 'Tea flavoring'],
    preparation: ['String flowers into garlands (sampaguita)', 'Make fragrant tea', 'Use in aromatherapy', 'Apply crushed flowers to temples for headaches', 'Use in religious offerings'],
    warnings: ['Generally safe', 'Some people may have floral allergies', 'Essential oil should be diluted'],
    category: 'Flower'
  },
  'Rosal': {
    description: 'Rosal (Gardenia jasminoides) is an evergreen shrub with glossy dark green leaves and fragrant white flowers. Popular ornamental plant in the Philippines.',
    dohApproved: false,
    uses: ['Ornamental garden plant', 'Fragrant cut flowers', 'Traditional anxiety remedy', 'Natural dye from fruits', 'Essential oil production', 'Anti-inflammatory properties'],
    preparation: ['Plant as ornamental hedge', 'Display flowers indoors for fragrance', 'Make flower tea for relaxation', 'Use dried fruits for yellow dye'],
    warnings: ['Not for pregnant women', 'May cause drowsiness', 'Skin irritation from handling'],
    category: 'Flower'
  },
  'Champaca': {
    description: 'Champaca (Magnolia champaca) is a large evergreen tree with highly fragrant orange-yellow flowers. Used in perfumery and religious ceremonies.',
    dohApproved: false,
    uses: ['Perfume industry', 'Religious offerings', 'Aromatherapy', 'Anti-inflammatory properties', 'Ornamental shade tree', 'Essential oil production'],
    preparation: ['Harvest flowers for perfume making', 'Use in temple offerings', 'Make essential oil', 'Plant as ornamental garden tree'],
    warnings: ['Essential oil concentrated - use diluted', 'Rare and expensive', 'Protected in some areas'],
    category: 'Flower'
  },
  'Ylang-ylang': {
    description: 'Ylang-ylang (Cananga odorata) is a tropical tree producing fragrant flowers used in the famous Chanel No. 5 perfume. Native to the Philippines.',
    dohApproved: false,
    uses: ['Perfume industry staple', 'Aromatherapy for relaxation', 'Natural aphrodisiac', 'Blood pressure regulation', 'Antiseptic properties', 'Hair and skin care'],
    preparation: ['Make ylang-ylang oil infusion', 'Use in aromatherapy diffusers', 'Add to bath water', 'Make natural perfume', 'Use in massage oils'],
    warnings: ['Essential oil may irritate sensitive skin', 'Use in moderation', 'Pregnant women use with caution'],
    category: 'Flower'
  },
  'Bougainvillea': {
    description: 'Bougainvillea is a genus of thorny ornamental vines with vibrant papery bracts in pink, purple, red, orange, and white. Very common in Philippine gardens.',
    dohApproved: false,
    uses: ['Ornamental garden plant', 'Living fence', 'Drought-tolerant landscaping', 'Anti-inflammatory properties', 'Traditional cough remedy', 'Paper-like bracts for decoration'],
    preparation: ['Plant as colorful hedge', 'Train over arbors and fences', 'Make flower tea for coughs', 'Use bracts in floral arrangements'],
    warnings: ['Thorns can cause injury', 'Sap may irritate skin', 'Can be invasive'],
    category: 'Flower'
  },
  'Orchid': {
    description: 'Orchids (Orchidaceae) are one of the largest plant families with over 25,000 species. The Philippines has over 1,000 native orchid species including the Waling-waling.',
    dohApproved: false,
    uses: ['Ornamental flowers', 'Vanilla flavor from Vanilla planifolia', 'Traditional medicine', 'Cut flower industry', 'Dendrobium edible flowers', 'Natural fragrance'],
    preparation: ['Grow in orchid baskets', 'Use Dendrobium flowers in salads', 'Make vanilla extract', 'Display as ornamental plants'],
    warnings: ['Many species protected by law', 'Do not collect from wild', 'Vanilla processing labor-intensive'],
    category: 'Flower'
  },
  'Sunflower': {
    description: 'Sunflower (Helianthus annuus) is a tall annual plant with large yellow flower heads that track the sun. Seeds are edible and nutritious.',
    dohApproved: false,
    uses: ['Nutritious edible seeds', 'Sunflower oil production', 'Ornamental garden plant', 'Bird feed', 'Soil phytoremediation', 'Natural dye'],
    preparation: ['Roast seeds for snacks', 'Press seeds for oil', 'Eat sprouts in salads', 'Use petals for natural dye', 'Grow as ornamental backdrop'],
    warnings: ['Seed allergies possible', 'High calorie seeds', 'Birds love the seeds'],
    category: 'Flower'
  },
  'Marigold': {
    description: 'Marigold (Tagetes erecta) is a vibrant annual flower with orange, yellow, and red blooms. Used in religious ceremonies and natural pest control.',
    dohApproved: false,
    uses: ['Natural insect repellent', 'Religious offerings', 'Natural dye', 'Skin health remedy', 'Companion planting', 'Edible flower petals'],
    preparation: ['Plant around vegetables for pest control', 'Use in floral offerings', 'Add petals to salads', 'Make natural yellow dye', 'Create marigold tea'],
    warnings: ['Strong scent may bother some', 'Can trigger allergies', 'Not all marigold species edible'],
    category: 'Flower'
  },
  'Daisy': {
    description: 'Daisy (Bellis perennis) is a common European flower with white petals and yellow centers. Symbolizes innocence and purity.',
    dohApproved: false,
    uses: ['Ornamental garden flower', 'Traditional wound healing', 'Cough remedy', 'Edible flower petals', 'Natural decoration', 'Companion planting'],
    preparation: ['Make daisy chain garlands', 'Use petals in salads', 'Make wound poultice', 'Brew cough tea', 'Decorate cakes'],
    warnings: ['Mild toxicity if large amounts eaten', 'Skin irritation possible', 'Pregnant women avoid medicinal use'],
    category: 'Flower'
  },
  'Ixora': {
    description: 'Ixora (Ixora coccinea), known as Santan in the Philippines, is a flowering shrub with clusters of small tubular flowers in red, orange, yellow, or pink.',
    dohApproved: false,
    uses: ['Ornamental garden shrub', 'Traditional medicine for diarrhea', 'Religious offerings', 'Natural dye', 'Hedge plant', 'Butterfly attractor'],
    preparation: ['Plant as colorful hedge', 'Use flowers in religious offerings', 'Make flower tea for stomach issues', 'Root decoction for medicinal use'],
    warnings: ['Root decoction should be used carefully', 'Not for pregnant women', 'May cause allergic reactions'],
    category: 'Flower'
  },
  'Gumamela': {
    description: 'Gumamela (Hibiscus rosa-sinensis) is a tropical hibiscus with large, showy flowers. The national flower of Malaysia and common in Philippine gardens.',
    dohApproved: false,
    uses: ['Hair care and growth', 'Natural shampoo', 'Ornamental plant', 'Lowers blood pressure', 'Vitamin C source', 'Natural dye'],
    preparation: ['Make hibiscus tea', 'Use flowers for hair treatment', 'Make natural red dye', 'Eat flowers in salads', 'Use as ornamental hedge'],
    warnings: ['May lower blood pressure significantly', 'Not for pregnant women', 'May interact with medications'],
    category: 'Flower'
  },
  'Rose': {
    description: 'Rose (Rosa) is a perennial flowering shrub with fragrant blooms in many colors. Cultivated for 5,000 years for beauty and medicine.',
    dohApproved: false,
    uses: ['Aromatherapy and relaxation', 'Rose water for cooking and cosmetics', 'Vitamin C rich hips', 'Anti-inflammatory properties', 'Natural astringent', 'Edible petals'],
    preparation: ['Make rose water', 'Dry petals for tea', 'Use hips for vitamin C syrup', 'Make rose hip jam', 'Decorate desserts with petals'],
    warnings: ['Ensure no pesticides on edible roses', 'Thorns can cause injury', 'Some people allergic to rose pollen'],
    category: 'Flower'
  },
  'Chrysanthemum': {
    description: 'Chrysanthemum is a perennial flowering plant with showy blooms in autumn. The national flower of Japan and important in Chinese medicine.',
    dohApproved: false,
    uses: ['Traditional Chinese medicine', 'Natural insecticide (pyrethrins)', 'Ornamental garden plant', 'Chrysanthemum tea', 'Air purification', 'Companion planting'],
    preparation: ['Make chrysanthemum tea', 'Use in flower arrangements', 'Plant as pest deterrent', 'Use in traditional medicine'],
    warnings: ['Pyrethrin toxic to fish and cats', 'May cause allergic reactions', 'Pregnant women avoid medicinal use'],
    category: 'Flower'
  },
  "Angel's Trumpet": {
    description: 'Angel\'s Trumpet (Brugmansia) is a tropical shrub with large, pendulous trumpet-shaped flowers. Highly toxic but used traditionally in very small doses.',
    dohApproved: false,
    uses: ['Ornamental garden plant', 'Traditional medicine (controlled doses)', 'Shamanic rituals (historical)', 'Fragrant night-blooming flowers', 'Natural insecticide'],
    preparation: ['Plant as ornamental only', 'Extreme caution with any medicinal use', 'Handle with gloves'],
    warnings: ['ALL PARTS HIGHLY TOXIC', 'Can be fatal if ingested', 'Keep away from children and pets', 'Not for home medicinal use'],
    category: 'Flower'
  },
  
  // ==================== FRUITS (15 plants) ====================
  'Pineapple': {
    description: 'Pineapple (Ananas comosus) is a tropical fruit with spiky leaves and sweet, tangy flesh. Contains bromelain enzyme with anti-inflammatory properties.',
    dohApproved: false,
    uses: ['Rich in vitamin C and manganese', 'Bromelain aids digestion', 'Anti-inflammatory properties', 'Immune system support', 'Bone health', 'Meat tenderizer'],
    preparation: ['Eat fresh pineapple', 'Make pineapple juice', 'Use in marinades', 'Make pineapple vinegar', 'Dry as healthy snack'],
    warnings: ['Bromelain can irritate mouth with excessive consumption', 'May interact with blood thinners', 'Acidic - rinse mouth after eating'],
    category: 'Fruit'
  },
  'Watermelon': {
    description: 'Watermelon (Citrullus lanatus) is a refreshing summer fruit with high water content and sweet red or yellow flesh.',
    dohApproved: false,
    uses: ['Hydration (92% water)', 'Rich in lycopene and vitamin C', 'Heart health', 'Muscle soreness relief', 'Skin health', 'Low calorie snack'],
    preparation: ['Eat fresh chilled watermelon', 'Make watermelon juice', 'Add to fruit salads', 'Make watermelon sorbet', 'Grill watermelon slices'],
    warnings: ['High glycemic index - diabetics monitor portions', 'May cause digestive issues if overeaten', 'Seedless varieties safe to eat seeds'],
    category: 'Fruit'
  },
  'Strawberry': {
    description: 'Strawberry (Fragaria x ananassa) is a popular red fruit with tiny seeds on the outside. Rich in antioxidants and vitamin C.',
    dohApproved: false,
    uses: ['High vitamin C content', 'Antioxidant rich', 'Heart health', 'Blood sugar regulation', 'Anti-inflammatory', 'Skin health'],
    preparation: ['Eat fresh strawberries', 'Make strawberry jam', 'Add to smoothies', 'Use in desserts', 'Make strawberry vinegar'],
    warnings: ['Common allergen', 'Non-organic often heavily sprayed', 'Wash thoroughly before eating'],
    category: 'Fruit'
  },
  'Orange': {
    description: 'Orange (Citrus sinensis) is a citrus fruit known for its vitamin C content and refreshing juice. One of the most popular fruits worldwide.',
    dohApproved: false,
    uses: ['Excellent vitamin C source', 'Immune system support', 'Heart health from potassium', 'Fiber for digestion', 'Skin health', 'Cancer-fighting antioxidants'],
    preparation: ['Eat fresh oranges', 'Make fresh orange juice', 'Use zest in cooking', 'Make orange marmalade', 'Dry peel for tea'],
    warnings: ['Acidic - may irritate sensitive stomachs', 'Grapefruit drug interactions dont apply to oranges', 'Juice has less fiber than whole fruit'],
    category: 'Fruit'
  },
  'Lemon': {
    description: 'Lemon (Citrus limon) is a yellow citrus fruit with tart juice used in cooking, cleaning, and health remedies.',
    dohApproved: false,
    uses: ['High vitamin C content', 'Digestive aid', 'Natural cleaning agent', 'Skin lightening', 'Immune support', 'Flavor enhancer'],
    preparation: ['Make lemon water', 'Use juice in cooking', 'Make natural cleaner', 'Use zest in baking', 'Preserve lemons'],
    warnings: ['Highly acidic - rinse mouth after consuming', 'May erode tooth enamel over time', 'Can trigger heartburn'],
    category: 'Fruit'
  },
  'Rambutan': {
    description: 'Rambutan (Nephelium lappaceum) is a tropical fruit related to lychee with hairy red skin and sweet translucent flesh.',
    dohApproved: false,
    uses: ['Vitamin C source', 'Iron absorption', 'Antioxidant properties', 'Hydration', 'Bone health', 'Energy booster'],
    preparation: ['Eat fresh after peeling', 'Make rambutan juice', 'Add to fruit salads', 'Can in syrup', 'Make rambutan wine'],
    warnings: ['Seed toxic - do not eat', 'High sugar content', 'Allergic reactions possible'],
    category: 'Fruit'
  },
  'Lanzones': {
    description: 'Lanzones (Lansium parasiticum) is a tropical fruit with yellow-brown skin and sweet, juicy segments. Popular in the Philippines during harvest season.',
    dohApproved: false,
    uses: ['Rich in vitamin A', 'Antioxidant properties', 'Digestive health', 'Fever reduction (traditional)', 'Energy source', 'Natural remedy for intestinal worms'],
    preparation: ['Eat fresh segments', 'Make lanzones jam', 'Ferment into wine', 'Can in syrup', 'Dry as snacks'],
    warnings: ['Bitter seeds contain toxic compounds', 'Overconsumption may cause constipation', 'Not for pregnant women in large amounts'],
    category: 'Fruit'
  },
  'Durian': {
    description: 'Durian (Durio zibethinus) is known as the "King of Fruits" with strong aroma and custard-like flesh. Either loved or hated for its pungent smell.',
    dohApproved: false,
    uses: ['Energy dense fruit', 'Rich in B vitamins', 'Potassium for blood pressure', 'Tryptophan for sleep', 'Iron source', 'Healthy fats'],
    preparation: ['Eat fresh flesh', 'Make durian ice cream', 'Add to smoothies', 'Make durian candies', 'Use in traditional desserts'],
    warnings: ['Strong odor banned in some public places', 'High calorie - eat in moderation', 'Not for alcohol consumption (can cause bloating)', 'Heaty fruit - may cause sore throat'],
    category: 'Fruit'
  },
  'Star Fruit': {
    description: 'Star Fruit (Averrhoa carambola), also known as Balimbing, has distinctive five-ridged shape that creates star slices when cut.',
    dohApproved: false,
    uses: ['Low calorie snack', 'Vitamin C source', 'Fiber for digestion', 'Antioxidant properties', 'Diuretic effects', 'Decorative garnish'],
    preparation: ['Eat fresh when yellow', 'Add to fruit salads', 'Use as decorative garnish', 'Make juice', 'Pickle unripe fruit'],
    warnings: ['TOXIC for kidney patients (contains oxalic acid)', 'Can interfere with kidney medications', 'Medicinal amounts should be monitored'],
    category: 'Fruit'
  },
  'Mangosteen': {
    description: 'Mangosteen (Garcinia mangostana) is called the "Queen of Fruits" with sweet white segments inside thick purple rind. Highly prized in Southeast Asia.',
    dohApproved: false,
    uses: ['Xanthones - powerful antioxidants', 'Anti-inflammatory properties', 'Immune system support', 'Skin health', 'Digestive health', 'Anti-cancer research ongoing'],
    preparation: ['Eat fresh segments', 'Make mangosteen tea from rind', 'Add to fruit salads', 'Make juice', 'Use in smoothies'],
    warnings: ['May interact with blood thinning medications', 'Allergic reactions possible', 'Stains clothing easily'],
    category: 'Fruit'
  },
  'Soursop': {
    description: 'Soursop (Annona muricata), also known as Guyabano, has spiky green skin and creamy white flesh with tangy-sweet flavor.',
    dohApproved: false,
    uses: ['Graviola - anti-cancer research', 'Vitamin C and B vitamins', 'Immune system support', 'Natural sedative properties', 'Digestive health', 'Skin health'],
    preparation: ['Eat fresh when soft', 'Make soursop juice', 'Blend into smoothies', 'Make soursop tea from leaves', 'Use in ice cream'],
    warnings: ['Neurotoxic in very high doses', 'Not for Parkinsons patients', 'Pregnant women avoid medicinal doses'],
    category: 'Fruit'
  },
  'Dragon Fruit': {
    description: 'Dragon Fruit (Hylocereus undatus) is a cactus fruit with vibrant pink or yellow skin and white or red flesh with black seeds.',
    dohApproved: false,
    uses: ['Rich in antioxidants', 'Fiber for digestion', 'Vitamin C and iron', 'Prebiotic properties', 'Blood sugar regulation', 'Low calorie'],
    preparation: ['Eat fresh by scooping flesh', 'Add to smoothies', 'Make dragon fruit bowls', 'Use in fruit salads', 'Make refreshing drinks'],
    warnings: ['May cause pink/red urine (harmless)', 'High fiber may cause digestive issues if overeaten', 'Some people allergic to seeds'],
    category: 'Fruit'
  },
  'Pomegranate': {
    description: 'Pomegranate (Punica granatum) is an ancient fruit with jewel-like arils inside tough red skin. Rich in antioxidants and medicinal history.',
    dohApproved: false,
    uses: ['Extremely high antioxidants', 'Heart health', 'Anti-inflammatory', 'Memory and brain health', 'Cancer-fighting properties', 'Digestive health'],
    preparation: ['Eat arils fresh', 'Make pomegranate juice', 'Add to salads', 'Use in cooking', 'Make pomegranate molasses'],
    warnings: ['May interact with blood pressure medications', 'Can cause digestive upset in large amounts', 'Stains easily'],
    category: 'Fruit'
  },
  'Kiwi': {
    description: 'Kiwi (Actinidia deliciosa) is a small fruit with fuzzy brown skin and bright green flesh with tiny black seeds. Native to China.',
    dohApproved: false,
    uses: ['Very high vitamin C', 'Digestive enzyme actinidin', 'Sleep aid (serotonin)', 'Fiber for digestion', 'Low glycemic index', 'Vitamin K and potassium'],
    preparation: ['Eat with skin for extra fiber', 'Add to smoothies', 'Use in fruit salads', 'Make kiwi jam', 'Tenderize meat'],
    warnings: ['Allergic reactions common', 'Can irritate mouth', 'Blood thinner interaction possible'],
    category: 'Fruit'
  },
  'Blueberry': {
    description: 'Blueberry (Vaccinium) is a small round berry with deep blue-purple color. Native to North America and packed with antioxidants.',
    dohApproved: false,
    uses: ['Highest antioxidant of common fruits', 'Brain and memory health', 'Heart health', 'Blood sugar regulation', 'Anti-inflammatory', 'Eye health'],
    preparation: ['Eat fresh as snack', 'Add to smoothies', 'Bake in muffins and pies', 'Make blueberry jam', 'Freeze for later use'],
    warnings: ['Stains hands and clothing', 'Can interact with blood thinners', 'Wash well to remove pesticides'],
    category: 'Fruit'
  },
  
  // ==================== VEGETABLES (15 plants) ====================
  'Cabbage': {
    description: 'Cabbage (Brassica oleracea) is a leafy green, red, or white biennial plant grown as an annual vegetable crop for its dense-leaved heads.',
    dohApproved: false,
    uses: ['Vitamin C and K source', 'Fiber for digestion', 'Cancer-fighting compounds', 'Low calorie', 'Glutamine for stomach health', 'Antioxidant properties'],
    preparation: ['Make coleslaw', 'Steam or boil as side dish', 'Use in soups and stews', 'Make sauerkraut', 'Stuff cabbage rolls'],
    warnings: ['May cause gas and bloating', 'Can interfere with thyroid if eaten raw in large amounts', 'Goitrogenic properties'],
    category: 'Vegetable'
  },
  'Bitter Melon': {
    description: 'Bitter Melon (Momordica charantia), also known as Ampalaya, is a tropical vine with distinctive bumpy fruit known for its bitter taste and medicinal properties.',
    dohApproved: true,
    uses: ['Blood sugar regulation', 'Vitamin C and A source', 'Folate for pregnancy', 'Liver health', 'Immune system support', 'Cancer-fighting research'],
    preparation: ['Sauté with eggs (ginisang ampalaya)', 'Make stuffed bitter melon', 'Add to soups', 'Juice with other vegetables', 'Lightly salt to reduce bitterness'],
    warnings: ['Too bitter for some palates', 'Pregnant women should avoid medicinal amounts', 'May lower blood sugar too much'],
    category: 'Vegetable'
  },
  'Okra': {
    description: 'Okra (Abelmoschus esculentus) is a flowering plant valued for its edible green seed pods. Known for its mucilaginous texture when cooked.',
    dohApproved: false,
    uses: ['High fiber content', 'Vitamin C and K', 'Folate for pregnancy', 'Blood sugar regulation', 'Heart health', 'Digestive health'],
    preparation: ['Fry to reduce slime', 'Add to gumbo', 'Pickle okra pods', 'Grill whole pods', 'Add to soups and stews'],
    warnings: ['Mucilage texture bothers some people', 'Kidney stone sufferers avoid due to oxalates', 'High in vitamin K - affects blood thinners'],
    category: 'Vegetable'
  },
  'String Beans': {
    description: 'String Beans or Yardlong Beans (Vigna unguiculata) are long, slender pod vegetables popular in Asian cuisine. Also called Sitaw in the Philippines.',
    dohApproved: false,
    uses: ['Protein source', 'Fiber for digestion', 'Vitamin C and A', 'Low calorie', 'Folate for cell growth', 'Antioxidants'],
    preparation: ['Sauté with garlic', 'Add to stir-fries', 'Steam as side dish', 'Make adobong sitaw', 'Add to soups'],
    warnings: ['Raw beans can be toxic', 'Must be cooked before eating', 'Stringy fibers in older pods'],
    category: 'Vegetable'
  },
  'Winged Bean': {
    description: 'Winged Bean (Psophocarpus tetragonolobus), known as Sigarilyas, is a tropical legume with distinctive four-winged pods. Almost all parts are edible.',
    dohApproved: false,
    uses: ['High protein content', 'All parts edible (pods, leaves, flowers, tubers, seeds)', 'Vitamin C and A', 'Iron and calcium', 'Nitrogen-fixing plant', 'Complete protein source'],
    preparation: ['Sauté young pods', 'Eat leaves as greens', 'Cook tubers like potatoes', 'Eat flowers raw in salads', 'Cook mature seeds as beans'],
    warnings: ['Tubers must be cooked thoroughly', 'Raw mature beans contain toxins', 'Some people may be allergic'],
    category: 'Vegetable'
  },
  'Chayote': {
    description: 'Chayote (Sechium edule), known as Sayote, is a wrinkled, green, wrinkled fruit used as a vegetable. Related to melons and cucumbers.',
    dohApproved: false,
    uses: ['Low calorie vegetable', 'Vitamin C and B9', 'Fiber for digestion', 'Potassium for blood pressure', 'Antioxidants', 'Hydration'],
    preparation: ['Slice and sauté', 'Add to soups and stews', 'Boil and mash', 'Stuff with ground meat', 'Pickle young fruits'],
    warnings: ['Skin can be irritating to some', 'Seed is edible when cooked', 'Mild laxative effect'],
    category: 'Vegetable'
  },
  'Corn': {
    description: 'Corn (Zea mays) is a cereal grain domesticated in Mesoamerica. Sweet corn is eaten as a vegetable while field corn is used for animal feed and processing.',
    dohApproved: false,
    uses: ['Fiber source', 'B vitamins including thiamine', 'Antioxidants (especially yellow corn)', 'Eye health (lutein and zeaxanthin)', 'Gluten-free grain', 'Energy source'],
    preparation: ['Boil or grill corn on the cob', 'Make corn soup', 'Use in salads', 'Make cornmeal for baking', 'Pop popcorn'],
    warnings: ['Often GMO unless organic', 'High glycemic index', 'May be difficult to digest for some'],
    category: 'Vegetable'
  },
  'Eggplant': {
    description: 'Eggplant (Solanum melongena), known as Talong, is a purple, spongy fruit used as a vegetable. Member of the nightshade family.',
    dohApproved: false,
    uses: ['Low calorie', 'Fiber for digestion', 'Nasunin antioxidant (purple skin)', 'Heart health', 'Brain health', 'Blood sugar regulation'],
    preparation: ['Grill and make tortang talong', 'Use in ratatouille', 'Make eggplant parmesan', 'Use in curries', 'Roast for baba ganoush'],
    warnings: ['Nightshade - may bother those with sensitivities', 'Absorbs oil easily when fried', 'Some people allergic'],
    category: 'Vegetable'
  },
  'Pechay': {
    description: 'Pechay (Brassica rapa subsp. pekinensis) is a Chinese cabbage with thick white ribs and dark green leaves. Staple in Asian cooking.',
    dohApproved: false,
    uses: ['Low calorie', 'Vitamin C and K', 'Folate', 'Calcium for bones', 'Antioxidants', 'Fiber'],
    preparation: ['Sauté with garlic', 'Add to soups', 'Use in stir-fries', 'Make kimchi', 'Steam as side dish'],
    warnings: ['May interfere with thyroid function raw', 'High vitamin K affects blood thinners', 'Can cause gas'],
    category: 'Vegetable'
  },
  'Mustasa': {
    description: 'Mustasa or Mustard Greens (Brassica juncea) are peppery leafy greens related to cabbage. Popular in Asian and Southern US cuisine.',
    dohApproved: false,
    uses: ['Excellent vitamin K source', 'Vitamin A, C, and folate', 'Calcium and iron', 'Antioxidants', 'Detoxification support', 'Anti-inflammatory'],
    preparation: ['Sauté with garlic', 'Add to soups', 'Use in salads', 'Pickle stems', 'Blend into smoothies'],
    warnings: ['Very high vitamin K - affects blood thinners', 'Can interfere with thyroid', 'Bitter taste raw'],
    category: 'Vegetable'
  },
  'Bell Pepper': {
    description: 'Bell Pepper (Capsicum annuum) is a sweet pepper variety that comes in green, red, yellow, orange, and purple. Related to spicy peppers but without heat.',
    dohApproved: false,
    uses: ['Very high vitamin C', 'Vitamin A and B6', 'Antioxidants', 'Low calorie', 'Hydration', 'Heart health'],
    preparation: ['Eat raw in salads', 'Stuff with meat and rice', 'Sauté in stir-fries', 'Roast and peel', 'Make pepper relish'],
    warnings: ['Nightshade family', 'Green peppers harder to digest', 'May trigger heartburn'],
    category: 'Vegetable'
  },
  'Cauliflower': {
    description: 'Cauliflower (Brassica oleracea var. botrytis) is a white flowering vegetable related to broccoli. Popular low-carb substitute for rice and potatoes.',
    dohApproved: false,
    uses: ['Low calorie and low carb', 'Vitamin C and K', 'Folate and fiber', 'Choline for brain health', 'Antioxidants', 'Cancer-fighting compounds'],
    preparation: ['Make cauliflower rice', 'Roast with spices', 'Steam as side dish', 'Make cauliflower mash', 'Use in soups'],
    warnings: ['Can cause gas and bloating', 'Goitrogenic - may affect thyroid', 'High vitamin K'],
    category: 'Vegetable'
  },
  'Broccoli': {
    description: 'Broccoli (Brassica oleracea var. italica) is a green tree-like vegetable with dense flower heads. One of the most nutritious vegetables.',
    dohApproved: false,
    uses: ['High in vitamins C and K', 'Fiber for digestion', 'Potassium for blood pressure', 'Iron and folate', 'Cancer-fighting sulforaphane', 'Eye health'],
    preparation: ['Steam and serve with lemon', 'Roast with garlic', 'Add to stir-fries', 'Make broccoli soup', 'Eat raw with dip'],
    warnings: ['Can cause gas', 'Goitrogenic properties', 'High vitamin K - affects blood thinners'],
    category: 'Vegetable'
  },
  'Lettuce': {
    description: 'Lettuce (Lactuca sativa) is a leafy annual vegetable commonly used in salads. Comes in many varieties from crisp iceberg to leafy romaine.',
    dohApproved: false,
    uses: ['Low calorie hydration', 'Vitamin A and K', 'Folate', 'Small amounts of calcium and potassium', 'Sleep aid (lactucarium)', 'Fiber'],
    preparation: ['Use in salads', 'Add to sandwiches', 'Make lettuce wraps', 'Add to smoothies', 'Use as burger bun substitute'],
    warnings: ['Iceberg has minimal nutrition', 'Wash thoroughly to remove contaminants', 'Can spoil quickly'],
    category: 'Vegetable'
  },
  'Spinach': {
    description: 'Spinach (Spinacia oleracea) is a leafy green vegetable native to Persia. Famous for its iron content though not as high as once believed.',
    dohApproved: false,
    uses: ['Excellent vitamin K', 'Vitamin A, C, and folate', 'Iron and calcium', 'Antioxidants', 'Nitrates for blood pressure', 'Eye health (lutein)'],
    preparation: ['Sauté with garlic', 'Add to smoothies', 'Use in salads', 'Make creamed spinach', 'Add to soups'],
    warnings: ['Very high vitamin K - affects blood thinners', 'Oxalates may affect kidney stones', 'Cooking reduces oxalates'],
    category: 'Vegetable'
  },
  'Celery': {
    description: 'Celery (Apium graveolens) is a marshland plant with long fibrous stalks. Known as a low-calorie "diet food" but has nutritional value.',
    dohApproved: false,
    uses: ['Hydration (95% water)', 'Low calorie snack', 'Vitamin K and folate', 'Potassium', 'Fiber', 'Antioxidants'],
    preparation: ['Eat raw with dip', 'Add to soups and stews', 'Use in mirepoix (with onions and carrots)', 'Make celery juice', 'Add to salads'],
    warnings: ['High pesticide residue - buy organic', 'Stringy fibers may be hard to digest', 'Allergic reactions possible'],
    category: 'Vegetable'
  },
  
  // ==================== HERBS (10 plants) ====================
  'Cilantro': {
    description: 'Cilantro (Coriandrum sativum), also called Coriander leaves, is a herb with fresh, citrusy flavor used in salsa, curries, and many world cuisines.',
    dohApproved: false,
    uses: ['Rich in antioxidants', 'Digestive aid', 'Heavy metal detoxification', 'Vitamin K and A', 'Antibacterial properties', 'Flavor enhancer'],
    preparation: ['Use fresh in salsa', 'Add to curries', 'Make cilantro pesto', 'Garnish tacos and soups', 'Blend into smoothies'],
    warnings: ['Soapy taste to some people (genetic)', 'Can be contaminated - wash well', 'Allergic reactions possible'],
    category: 'Herb'
  },
  'Mint': {
    description: 'Mint (Mentha) is a genus of aromatic herbs including spearmint and peppermint. Known for cooling sensation and fresh flavor.',
    dohApproved: false,
    uses: ['Digestive aid', 'Breath freshener', 'Relieve IBS symptoms', 'Natural decongestant', 'Mental alertness', 'Antioxidants'],
    preparation: ['Make mint tea', 'Add to salads', 'Use in desserts', 'Make mint sauce', 'Use in cocktails'],
    warnings: ['May worsen GERD/heartburn', 'Can be invasive in gardens', 'Essential oil toxic in large amounts'],
    category: 'Herb'
  },
  'Thyme': {
    description: 'Thyme (Thymus vulgaris) is a Mediterranean herb with small leaves and woody stems. Essential in French and Middle Eastern cooking.',
    dohApproved: false,
    uses: ['Thymol - natural antiseptic', 'Respiratory health', 'Antioxidant properties', 'Vitamin C and A', 'Manganese and iron', 'Cough remedy'],
    preparation: ['Add to soups and stews', 'Use in herb blends', 'Make thyme tea', 'Use in marinades', 'Make infused oil'],
    warnings: ['Concentrated oil toxic', 'May slow blood clotting', 'Pregnant women avoid medicinal doses'],
    category: 'Herb'
  },
  'Parsley': {
    description: 'Parsley (Petroselinum crispum) is a bright green herb used as garnish and flavoring. Related to celery and carrots.',
    dohApproved: false,
    uses: ['Excellent vitamin K source', 'Vitamin C and A', 'Iron and folate', 'Antioxidants', 'Fresh breath', 'Diuretic properties'],
    preparation: ['Use as garnish', 'Make tabbouleh', 'Add to soups', 'Make pesto', 'Blend into green juice'],
    warnings: ['Very high vitamin K - affects blood thinners', 'Pregnant women avoid large medicinal amounts', 'Can be confused with toxic hemlock'],
    category: 'Herb'
  },
  'Chives': {
    description: 'Chives (Allium schoenoprasum) are a mild onion-flavored herb with long thin hollow leaves. Related to garlic, onions, and leeks.',
    dohApproved: false,
    uses: ['Vitamin K and C', 'Folate', 'Mild onion flavor', 'Digestive health', 'Antioxidants', 'Low calorie flavoring'],
    preparation: ['Chop over baked potatoes', 'Add to cream cheese', 'Use in omelets', 'Make herb butter', 'Add to soups'],
    warnings: ['Mild onion breath', 'Can trigger onion allergies', 'High vitamin K'],
    category: 'Herb'
  },
  'Dill': {
    description: 'Dill (Anethum graveolens) is an annual herb with feathery leaves and aromatic seeds. Essential in pickling and Scandinavian cuisine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Vitamin A and C', 'Bone health (calcium)', 'Antioxidants', 'Antibacterial properties', 'Calming effects'],
    preparation: ['Use in pickles', 'Add to fish dishes', 'Make dill sauce', 'Use in potato salad', 'Make dill tea'],
    warnings: ['Photosensitivity in some people', 'May interfere with blood thinners', 'Allergic reactions to carrot family'],
    category: 'Herb'
  },
  'Fennel': {
    description: 'Fennel (Foeniculum vulgare) is a flowering plant with a mild anise or licorice flavor. The bulb, leaves, and seeds are all edible.',
    dohApproved: false,
    uses: ['Digestive aid and gas relief', 'Vitamin C and fiber', 'Potassium and manganese', 'Antioxidants', 'Breath freshener', 'Galactagogue for nursing mothers'],
    preparation: ['Eat bulb raw in salads', 'Roast fennel bulb', 'Use seeds in sausage', 'Make fennel tea', 'Add to fish dishes'],
    warnings: ['May interact with estrogen-related conditions', 'Can cause allergic reactions', 'Not for pregnant women in medicinal amounts'],
    category: 'Herb'
  },
  'Laurel': {
    description: 'Laurel or Bay Leaf (Laurus nobilis) is an aromatic leaf used in cooking. Native to the Mediterranean region.',
    dohApproved: false,
    uses: ['Flavor enhancer for soups and stews', 'Digestive aid', 'Anti-inflammatory', 'Antioxidants', 'Aromatic properties', 'Insect repellent'],
    preparation: ['Add to soups and stews', 'Use in rice dishes', 'Make bay leaf tea', 'Add to marinades', 'Remove before eating'],
    warnings: ['Leaves are sharp - remove before eating', 'Can damage digestive tract if swallowed', 'Not the same as California bay'],
    category: 'Herb'
  },
  'Rosemary': {
    description: 'Rosemary (Salvia rosmarinus) is a woody, perennial herb with fragrant, evergreen, needle-like leaves. Native to Mediterranean region.',
    dohApproved: false,
    uses: ['Memory and concentration', 'Antioxidants', 'Anti-inflammatory', 'Digestive aid', 'Circulation improvement', 'Antibacterial'],
    preparation: ['Use in roasted meats', 'Make rosemary tea', 'Infuse in oil', 'Use in bread', 'Make potpourri'],
    warnings: ['Can interact with blood thinners', 'High blood pressure monitor', 'Seizure disorders avoid medicinal amounts'],
    category: 'Herb'
  },
  'Sage': {
    description: 'Sage (Salvia officinalis) is an evergreen shrub with grayish leaves and blue to purplish flowers. Sacred herb in many cultures.',
    dohApproved: false,
    uses: ['Memory and brain health', 'Anti-inflammatory', 'Sore throat remedy', 'Digestive aid', 'Menopause symptom relief', 'Antioxidants'],
    preparation: ['Make sage tea for sore throat', 'Use in stuffing', 'Fry leaves as garnish', 'Make sage butter', 'Use in meat dishes'],
    warnings: ['Can interact with diabetes medications', 'Seizure disorders use caution', 'Pregnant women avoid medicinal amounts'],
    category: 'Herb'
  },
  'Tarragon': {
    description: 'Tarragon (Artemisia dracunculus) is a perennial herb with slender leaves and an anise-like flavor. Essential in French cuisine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Appetite stimulant', 'Vitamin A, C, and B6', 'Minerals iron and calcium', 'Antioxidants', 'Flavor enhancer'],
    preparation: ['Make béarnaise sauce', 'Use in chicken dishes', 'Make tarragon vinegar', 'Add to fish', 'Use in herb butter'],
    warnings: ['May interact with blood thinners', 'Pregnant women avoid medicinal amounts', 'Russian tarragon less flavorful'],
    category: 'Herb'
  },
  'Lemongrass': {
    description: 'Lemongrass (Cymbopogon citratus), known as Tanglad in the Philippines, is an aromatic tropical grass with citrus flavor. It is essential in Southeast Asian cuisine and traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Stress and anxiety relief', 'Cholesterol reduction', 'Sleep improvement', 'Fever reduction', 'Natural mosquito repellent'],
    preparation: ['Brew as herbal tea', 'Add to soups and curries', 'Use essential oil for aromatherapy', 'Plant around home for insect control'],
    warnings: ['May lower blood glucose levels', 'Use caution during pregnancy', 'Essential oil may irritate skin'],
    category: 'Herb'
  },
  'Oregano': {
    description: 'Oregano (Origanum vulgare) is a woody perennial herb with aromatic leaves. A staple in Mediterranean and Mexican cuisine.',
    dohApproved: false,
    uses: ['Powerful antibacterial properties', 'Antioxidant rich', 'Anti-inflammatory', 'Digestive aid', 'Respiratory health', 'Vitamin K source'],
    preparation: ['Use in tomato sauces', 'Make oregano tea', 'Add to pizza', 'Use in marinades', 'Make infused oil'],
    warnings: ['Can interfere with blood clotting', 'Pregnant women avoid medicinal amounts', 'May interact with lithium'],
    category: 'Herb'
  },
  'Basil': {
    description: 'Basil (Ocimum basilicum), known as Balanoi in the Philippines, is an aromatic herb essential in Italian and Southeast Asian cuisines.',
    dohApproved: false,
    uses: ['Anti-inflammatory properties', 'Antioxidants', 'Stress reduction (adaptogen)', 'Digestive aid', 'Vitamin K source', 'Antibacterial'],
    preparation: ['Make pesto sauce', 'Add to salads', 'Use in tomato dishes', 'Make basil tea', 'Use in Thai curries'],
    warnings: ['May interact with blood thinners', 'Pregnant women avoid medicinal amounts', 'Holy basil different from sweet basil'],
    category: 'Herb'
  },
  
  // ==================== SPICES (5 plants) ====================
  'Turmeric': {
    description: 'Turmeric (Curcuma longa), known as Luyang Dilaw, is a flowering plant whose rhizomes are used fresh or boiled and ground into orange powder. Contains curcumin.',
    dohApproved: false,
    uses: ['Potent anti-inflammatory', 'Antioxidant properties', 'Brain health and memory', 'Heart health', 'Arthritis relief', 'Digestive aid'],
    preparation: ['Make golden milk', 'Add to curries', 'Make turmeric tea', 'Use in rice dishes', 'Add to smoothies'],
    warnings: ['Stains everything yellow', 'Can interact with blood thinners', 'Gallbladder issues use caution', 'High doses may cause digestive upset'],
    category: 'Spice'
  },
  'Ginger': {
    description: 'Ginger (Zingiber officinale), known as Luya, is a flowering plant whose rhizome is widely used as a spice and folk medicine.',
    dohApproved: false,
    uses: ['Nausea and motion sickness relief', 'Digestive aid', 'Anti-inflammatory', 'Pain reduction', 'Immune support', 'Blood sugar regulation'],
    preparation: ['Make ginger tea', 'Add to stir-fries', 'Use in baking', 'Make ginger ale', 'Add to smoothies'],
    warnings: ['Can interact with blood thinners', 'High doses may cause heartburn', 'Gallstone patients use caution'],
    category: 'Spice'
  },
  'Garlic': {
    description: 'Garlic (Allium sativum) is a species in the onion genus with a strong flavor and aroma. Used worldwide for cooking and medicine.',
    dohApproved: false,
    uses: ['Immune system support', 'Heart health', 'Antibacterial and antiviral', 'Blood pressure regulation', 'Cholesterol management', 'Antioxidant properties'],
    preparation: ['Use in almost all savory cooking', 'Make garlic bread', 'Roast whole heads', 'Make garlic oil', 'Eat raw for medicinal benefits'],
    warnings: ['Blood thinner interaction', 'Bad breath', 'May cause digestive upset', 'Pregnant women avoid medicinal doses'],
    category: 'Spice'
  },
  'Onion': {
    description: 'Onion (Allium cepa) is a vegetable that is the most widely cultivated species of the genus Allium. Foundation of savory cooking worldwide.',
    dohApproved: false,
    uses: ['Quercetin antioxidant', 'Heart health', 'Bone health', 'Cancer prevention research', 'Digestive health', 'Immune support'],
    preparation: ['Sauté as base for dishes', 'Caramelize for sweetness', 'Use raw in salads', 'Make onion soup', 'Grill onion slices'],
    warnings: ['Causes tears when cutting', 'Can trigger heartburn', 'Bad breath', 'Some people allergic'],
    category: 'Spice'
  },
  'Cinnamon': {
    description: 'Cinnamon is a spice obtained from the inner bark of several tree species from the genus Cinnamomum. Used in sweet and savory dishes.',
    dohApproved: false,
    uses: ['Blood sugar regulation', 'Antioxidant properties', 'Anti-inflammatory', 'Heart health', 'Antibacterial and antifungal', 'Brain health'],
    preparation: ['Use in baking', 'Add to coffee', 'Use in curries', 'Make cinnamon tea', 'Sprinkle on oatmeal'],
    warnings: ['Cassia cinnamon high in coumarin - limit intake', 'May interact with diabetes medications', 'Pregnant women avoid medicinal doses'],
    category: 'Spice'
  },
  'Black Pepper': {
    description: 'Black Pepper (Piper nigrum) is a flowering vine cultivated for its fruit, known as a peppercorn. The world\'s most traded spice.',
    dohApproved: false,
    uses: ['Enhances nutrient absorption (bioavailability)', 'Digestive aid', 'Antioxidant properties', 'Anti-inflammatory', 'Metabolism boost', 'Natural decongestant'],
    preparation: ['Grind fresh on everything', 'Use in spice blends', 'Make pepper sauce', 'Add to marinades', 'Use in pickling'],
    warnings: ['Can irritate stomach in large amounts', 'May interact with blood thinners', 'Piperine affects drug metabolism'],
    category: 'Spice'
  },
  'Cayenne Pepper': {
    description: 'Cayenne Pepper (Capsicum annuum) is a moderately hot chili pepper used to flavor dishes and for medicinal purposes.',
    dohApproved: false,
    uses: ['Metabolism boost', 'Pain relief (topical)', 'Digestive aid', 'Circulation improvement', 'Heart health', 'Anti-inflammatory'],
    preparation: ['Add to spicy dishes', 'Make hot sauce', 'Use in spice rubs', 'Make cayenne tea', 'Use in capsules'],
    warnings: ['Very hot - handle carefully', 'Can irritate stomach', 'Avoid touching eyes', 'May interact with blood thinners'],
    category: 'Spice'
  },
  'Clove': {
    description: 'Clove (Syzygium aromaticum) is an aromatic flower bud of a tree in the family Myrtaceae. Native to Indonesia.',
    dohApproved: false,
    uses: ['Highest antioxidant of all spices', 'Dental pain relief (eugenol)', 'Digestive aid', 'Liver health', 'Blood sugar regulation', 'Bone health'],
    preparation: ['Use in baking', 'Add to mulled wine', 'Make clove tea', 'Use in spice blends', 'Apply clove oil for toothache'],
    warnings: ['Clove oil toxic in large amounts', 'Can interact with blood thinners', 'Pregnant women avoid medicinal doses'],
    category: 'Spice'
  },
  'Cardamom': {
    description: 'Cardamom (Elettaria cardamomum) is known as the "Queen of Spices." Native to India with sweet, floral flavor.',
    dohApproved: false,
    uses: ['Digestive aid', 'Bad breath remedy', 'Antioxidant properties', 'Diuretic effects', 'Blood pressure regulation', 'Anti-inflammatory'],
    preparation: ['Use in chai tea', 'Add to rice dishes', 'Use in baking', 'Make cardamom coffee', 'Add to curry'],
    warnings: ['Third most expensive spice', 'May interact with medications', 'Allergic reactions rare but possible'],
    category: 'Spice'
  },
  'Nutmeg': {
    description: 'Nutmeg (Myristica fragrans) is the seed of an evergreen tree. Used in sweet and savory dishes, especially holiday baking.',
    dohApproved: false,
    uses: ['Pain relief', 'Digestive aid', 'Sleep aid', 'Brain health', 'Oral health', 'Anti-inflammatory'],
    preparation: ['Use in baking', 'Add to eggnog', 'Use in spice blends', 'Sprinkle on coffee', 'Make nutmeg tea'],
    warnings: ['TOXIC in large doses (myristicin)', 'Hallucinogenic in very high doses', 'Maximum 1/4 teaspoon per day', 'Pregnant women avoid medicinal doses'],
    category: 'Spice'
  },
  'Saffron': {
    description: 'Saffron is a spice derived from the flower of Crocus sativus. The world\'s most expensive spice by weight.',
    dohApproved: false,
    uses: ['Antioxidant properties', 'Mood enhancement', 'Memory improvement', 'PMS symptom relief', 'Aphrodisiac', 'Natural coloring'],
    preparation: ['Infuse in warm water or milk', 'Use in rice dishes', 'Add to desserts', 'Make saffron tea', 'Use in paella'],
    warnings: ['Extremely expensive', 'Often adulterated with fake products', 'Pregnant women avoid medicinal doses'],
    category: 'Spice'
  },
  
  // ==================== MEDICINAL PLANTS (10 plants) ====================
  'Aloe Vera': {
    description: 'Aloe Vera is a succulent plant species of the genus Aloe. The gel inside leaves has been used medicinally for thousands of years.',
    dohApproved: false,
    uses: ['Skin healing and burns', 'Digestive aid (latex)', 'Wound healing', 'Moisturizing', 'Anti-inflammatory', 'Oral health'],
    preparation: ['Apply gel to burns and wounds', 'Use in skin care products', 'Make aloe juice (internal use cautiously)', 'Add to smoothies'],
    warnings: ['Latex (yellow part) is a strong laxative', 'Not for pregnant women internally', 'May lower blood sugar'],
    category: 'Medicinal'
  },
  'Noni': {
    description: 'Noni (Morinda citrifolia) is a fruit-bearing tree in the coffee family. Native to Southeast Asia and Australasia.',
    dohApproved: false,
    uses: ['Immune system support', 'Anti-inflammatory', 'Pain relief', 'Antioxidant properties', 'Energy booster', 'Skin health'],
    preparation: ['Make noni juice', 'Use leaves for tea', 'Apply fruit to skin', 'Take as supplement', 'Make traditional medicine'],
    warnings: ['Very strong smell and taste', 'May interact with medications', 'High in potassium - kidney patients avoid'],
    category: 'Medicinal'
  },
  'Tsaang Gubat': {
    description: 'Tsaang Gubat (Ehretia microphylla) is a shrub native to the Philippines. One of the 10 herbs approved by DOH for medicinal use.',
    dohApproved: true,
    uses: ['Diarrhea treatment', 'Stomach problems', 'Anti-allergy', 'Antioxidant properties', 'Immune support', 'Traditional digestive aid'],
    preparation: ['Boil leaves as tea', 'Drink for stomach issues', 'Use as mouthwash', 'Make herbal extract'],
    warnings: ['Generally safe', 'Pregnant women consult doctor', 'May interact with medications'],
    category: 'Medicinal'
  },
  'Katakataka': {
    description: 'Katakataka (Bryophyllum pinnatum), also called Miracle Leaf, is a succulent plant known for its ability to grow plantlets on leaf edges.',
    dohApproved: false,
    uses: ['Wound healing', 'Anti-inflammatory', 'Kidney stone treatment', 'Cough and cold remedy', 'Hypertension', 'Anti-cancer research'],
    preparation: ['Apply crushed leaves to wounds', 'Make leaf tea', 'Use in traditional medicine', 'Eat young leaves cooked'],
    warnings: ['Not for pregnant women', 'May cause uterine contractions', 'Overconsumption toxic to livestock'],
    category: 'Medicinal'
  },
  'Sambong': {
    description: 'Sambong (Blumea balsamifera) is a shrub native to the Philippines. One of the 10 DOH-approved medicinal herbs.',
    dohApproved: true,
    uses: ['Diuretic properties', 'Kidney stone treatment', 'Hypertension', 'Anti-inflammatory', 'Antioxidant', 'Cold and cough remedy'],
    preparation: ['Boil leaves as tea', 'Drink for kidney health', 'Use in traditional medicine', 'Make herbal supplement'],
    warnings: ['Strong diuretic - stay hydrated', 'May lower blood pressure', 'Pregnant women avoid'],
    category: 'Medicinal'
  },
  'Bayabas': {
    description: 'Bayabas (Psidium guajava) or Guava is a tropical fruit tree. Leaves have powerful medicinal properties.',
    dohApproved: true,
    uses: ['Anti-diarrheal', 'Wound healing', 'Antibacterial', 'Oral health', 'Digestive aid', 'Antioxidant'],
    preparation: ['Make guava leaf tea', 'Chew leaves for toothache', 'Use as wound wash', 'Eat fresh fruit'],
    warnings: ['Generally safe', 'High vitamin C content', 'May interact with diabetes medications'],
    category: 'Medicinal'
  },
  'Niyog-niyogan': {
    description: 'Niyog-niyogan (Quisqualis indica) is a climbing vine with beautiful flowers. Seeds are used for intestinal worms.',
    dohApproved: true,
    uses: ['Anti-helminthic (anti-parasitic)', 'Antioxidant', 'Anti-inflammatory', 'Ornamental vine', 'Traditional dewormer'],
    preparation: ['Roasted seeds for deworming', 'Use as ornamental plant', 'Make traditional medicine'],
    warnings: ['Seeds toxic in large amounts', 'Pregnant women avoid', 'Children use only under supervision'],
    category: 'Medicinal'
  },
  'Tawa-tawa': {
    description: 'Tawa-tawa (Euphorbia hirta) is a common weed in the Philippines. One of the 10 DOH-approved medicinal herbs.',
    dohApproved: true,
    uses: ['Dengue fever support', 'Asthma relief', 'Anti-inflammatory', 'Diuretic', 'Wound healing', 'Anti-diarrheal'],
    preparation: ['Boil as tea for dengue', 'Use for respiratory issues', 'Apply to wounds', 'Make herbal extract'],
    warnings: ['Euphorbia family - milky sap', 'Pregnant women avoid', 'May interact with medications'],
    category: 'Medicinal'
  },
  'Ulasimang Bato': {
    description: 'Ulasimang Bato (Peperomia pellucida) is a small herb that grows in damp, shady areas. One of the 10 DOH-approved medicinal herbs.',
    dohApproved: true,
    uses: ['Arthritis and gout relief', 'Anti-inflammatory', 'Diuretic', 'Anti-hypertensive', 'Wound healing', 'Anti-bacterial'],
    preparation: ['Eat fresh in salads', 'Boil as tea', 'Pound and apply to joints', 'Make herbal medicine'],
    warnings: ['Generally safe when eaten as food', 'Pregnant women consult doctor', 'May lower blood pressure'],
    category: 'Medicinal'
  },
  'Yerba Buena': {
    description: 'Yerba Buena (Clinopodium douglasii) is a perennial herb in the mint family. One of the 10 DOH-approved medicinal herbs in the Philippines.',
    dohApproved: true,
    uses: ['Pain relief (analgesic)', 'Stomach ache relief', 'Headache remedy', 'Cough and cold', 'Anti-inflammatory', 'Antioxidant'],
    preparation: ['Make mint tea', 'Pound leaves for poultice', 'Inhale steam for colds', 'Apply to forehead for headache'],
    warnings: ['Generally safe', 'Pregnant women consult doctor', 'May interact with medications'],
    category: 'Medicinal'
  },
  'Akapulko': {
    description: 'Akapulko (Senna alata) is a shrub with distinctive yellow flower spikes. One of the 10 DOH-approved medicinal herbs.',
    dohApproved: true,
    uses: ['Anti-fungal (ringworm treatment)', 'Anti-bacterial', 'Laxative properties', 'Anti-inflammatory', 'Skin disease treatment', 'Anti-microbial'],
    preparation: ['Crush leaves for ringworm', 'Make decoction for bathing', 'Use for skin problems', 'Make herbal soap'],
    warnings: ['Strong laxative', 'Pregnant women avoid', 'Not for long-term use'],
    category: 'Medicinal'
  },
  
  // ==================== CALBAYOG SAMAR SPECIFIC PLANTS ====================
  'Calamansi': {
    description: 'Calamansi (Citrus microcarpa), known as Kalamansi in Calbayog Samar, is a small citrus fruit that thrives in the tropical climate of Western Samar. It grows abundantly in backyard gardens throughout Calbayog City and is a staple in local cuisine and traditional medicine.',
    dohApproved: false,
    uses: ['Rich in Vitamin C for immune support', 'Cough and cold remedy', 'Natural meat tenderizer in cooking', 'Skin lightening properties', 'Digestive aid', 'Natural cleaning agent'],
    preparation: ['Squeeze fresh juice for cooking', 'Make calamansi juice drink with honey', 'Use as marinade for fish and meat', 'Apply diluted juice to skin', 'Use juice for cleaning surfaces'],
    warnings: ['Acidic - may irritate sensitive stomachs', 'Can erode tooth enamel', 'Dilute before applying to skin', 'May interact with certain medications'],
    category: 'Fruit'
  },
  'Pili': {
    description: 'Pili (Canarium ovatum) is native to the Bicol Region and Eastern Visayas including Calbayog Samar. The tree produces delicious nuts and is an important crop in Samar province. Pili trees grow wild and cultivated throughout the region.',
    dohApproved: false,
    uses: ['Rich in healthy fats and protein', 'Vitamin E for skin health', 'Magnesium and potassium', 'Energy source', 'Antioxidant properties', 'Traditional medicine for various ailments'],
    preparation: ['Eat roasted pili nuts', 'Make pili nut brittle', 'Use pili oil for cooking', 'Make pili nut candy', 'Use in traditional desserts'],
    warnings: ['High calorie - consume in moderation', 'Nut allergies possible', 'Raw nuts may cause digestive issues'],
    category: 'Tree'
  },
  'Talisay': {
    description: 'Talisay (Terminalia catappa), known as Indian Almond or Umbrella Tree, is commonly found along the coasts and riverbanks of Calbayog Samar. The large leaves turn red before falling, creating beautiful landscapes in parks and coastal areas.',
    dohApproved: false,
    uses: ['Shade tree for coastal areas', 'Traditional medicine for dysentery', 'Leaves used for treating skin diseases', 'Antioxidant properties from leaves', 'Ornamental tree', 'Windbreak for coastal protection'],
    preparation: ['Boil leaves for tea', 'Apply crushed leaves to skin conditions', 'Use bark decoction for traditional medicine', 'Plant along coastlines for erosion control'],
    warnings: ['Not for pregnant women', 'Medicinal use should be supervised', 'May interact with medications'],
    category: 'Tree'
  },
  'Malunggay': {
    description: 'Malunggay (Moringa oleifera) grows everywhere in Calbayog Samar - in backyards, along fences, and in community gardens. Known as the "Miracle Tree," it is a nutritional powerhouse that thrives in the tropical climate of Samar.',
    dohApproved: true,
    uses: ['Excellent source of vitamins and minerals', 'Breastfeeding support', 'Anti-inflammatory properties', 'Blood sugar regulation', 'Cholesterol management', 'Immune system support'],
    preparation: ['Add leaves to tinola soup', 'Make malunggay pandesal', 'Blend leaves into smoothies', 'Make malunggay tea', 'Use in ginisang munggo'],
    warnings: ['May lower blood sugar - diabetics monitor levels', 'Not for pregnant women in medicinal amounts', 'May interact with thyroid medications'],
    category: 'Tree'
  },
  'Kangkong': {
    description: 'Kangkong (Ipomoea aquatica) or Water Spinach grows abundantly in the wetlands, riverbanks, and marshy areas around Calbayog Samar. It thrives in the humid tropical climate and is a staple vegetable in local households.',
    dohApproved: false,
    uses: ['Rich in iron and vitamins A and C', 'Low calorie vegetable', 'Fiber for digestion', 'Antioxidant properties', 'Traditional medicine for various ailments', 'Supports eye health'],
    preparation: ['Sauté with garlic (adobong kangkong)', 'Add to sinigang', 'Steam as side dish', 'Use in stir-fries', 'Make kangkong salad'],
    warnings: ['Grows in water - ensure clean source', 'May have parasites if not washed well', 'High vitamin K affects blood thinners'],
    category: 'Vegetable'
  },
  'Gabi': {
    description: 'Gabi (Colocasia esculenta) or Taro is widely cultivated in Calbayog Samar, both for its edible corms and leaves (laing). It thrives in the moist, fertile soils of the region and is a traditional staple food.',
    dohApproved: false,
    uses: ['Good source of carbohydrates and fiber', 'Vitamins C and E', 'Potassium for heart health', 'Calcium for bone health', 'Antioxidant properties', 'Gluten-free alternative'],
    preparation: ['Make laing with coconut milk', 'Boil gabi corms', 'Make pinangat', 'Use leaves in sinigang', 'Make gabi chips'],
    warnings: ['Must be cooked thoroughly - raw contains calcium oxalate crystals', 'Can irritate throat if undercooked', 'Some varieties more irritating than others'],
    category: 'Root Crop'
  },
  'Talong': {
    description: 'Talong (Solanum melongena) or Eggplant is extensively grown in Calbayog Samar\'s agricultural areas. The warm climate and fertile soil make it ideal for cultivating various eggplant varieties, from the long purple types to the round green varieties.',
    dohApproved: false,
    uses: ['Low calorie vegetable', 'High fiber for digestion', 'Nasunin antioxidant', 'Heart health', 'Brain health from phytonutrients', 'Blood sugar regulation'],
    preparation: ['Grill and make tortang talong', 'Use in pinakbet', 'Make ensaladang talong', 'Add to adobo', 'Use in kare-kare'],
    warnings: ['Nightshade family - avoid if sensitive', 'Absorbs oil easily when fried', 'Some people may be allergic'],
    category: 'Vegetable'
  },
  'Ampalaya': {
    description: 'Ampalaya (Momordica charantia) or Bitter Melon is a common vegetable in Calbayog Samar gardens. Its distinctive bumpy appearance and bitter taste make it recognizable, and it is valued for both culinary and medicinal uses.',
    dohApproved: true,
    uses: ['Blood sugar regulation', 'Rich in vitamins A and C', 'Folate for pregnancy', 'Liver health support', 'Immune system boost', 'Antioxidant properties'],
    preparation: ['Ginisang ampalaya with eggs', 'Make ampalaya salad', 'Stuff with ground meat', 'Add to pinakbet', 'Make ampalaya tea'],
    warnings: ['Very bitter taste', 'Pregnant women avoid medicinal amounts', 'May lower blood sugar significantly'],
    category: 'Vegetable'
  },
  'Sili': {
    description: 'Sili (Capsicum annuum) or Chili Pepper is an essential ingredient in Calbayog Samar cuisine. From the mild siling haba to the fiery siling labuyo, chilies grow abundantly in home gardens throughout the city.',
    dohApproved: false,
    uses: ['Metabolism boost from capsaicin', 'Pain relief', 'Vitamin C source', 'Blood circulation improvement', 'Natural food preservative', 'Anti-inflammatory properties'],
    preparation: ['Use in sinamak (spiced vinegar)', 'Make spicy dipping sauces', 'Add to adobo and tinola', 'Make chili garlic oil', 'Use in kinilaw'],
    warnings: ['Very hot - handle with care', 'Avoid touching eyes after handling', 'Can irritate sensitive stomachs', 'Wash hands thoroughly after handling'],
    category: 'Vegetable'
  },
  'Saba Banana': {
    description: 'Saba Banana (Musa acuminata × balbisiana) is the most common banana variety in Calbayog Samar. These thick, angular cooking bananas are used in countless Filipino dishes and grow in backyard gardens throughout the city.',
    dohApproved: false,
    uses: ['Excellent energy source', 'Rich in potassium', 'Fiber for digestion', 'Vitamin B6 for brain health', 'Natural sweetness', 'Versatile cooking ingredient'],
    preparation: ['Make banana cue', 'Cook minatamis na saging', 'Add to ginataang halo-halo', 'Make turon', 'Boil and eat with sugar', 'Use in nilaga'],
    warnings: ['High glycemic index when ripe', 'Diabetics should monitor portions', 'May cause constipation if overeaten'],
    category: 'Fruit'
  },
  'Lanzones': {
    description: 'Lanzones (Lansium parasiticum) or Langsat is grown in Calbayog Samar and the surrounding areas of Western Samar. The sweet, juicy fruits are harvested seasonally and sold in local markets throughout the city.',
    dohApproved: false,
    uses: ['Rich in vitamin A', 'Antioxidant properties', 'Digestive health', 'Traditional fever remedy', 'Energy source', 'Natural remedy for intestinal worms'],
    preparation: ['Eat fresh when ripe', 'Make lanzones jam', 'Ferment into wine', 'Preserve in syrup', 'Dry as snacks'],
    warnings: ['Bitter seeds contain toxic compounds', 'Overconsumption may cause constipation', 'Not for pregnant women in large amounts'],
    category: 'Fruit'
  },
  'Rambutan': {
    description: 'Rambutan (Nephelium lappaceum) thrives in the tropical climate of Calbayog Samar. These hairy red fruits are common in the region and sold fresh in local markets when in season.',
    dohApproved: false,
    uses: ['Vitamin C for immune support', 'Iron absorption', 'Antioxidant properties', 'Hydration', 'Bone health from minerals', 'Natural energy booster'],
    preparation: ['Eat fresh after peeling', 'Add to fruit salads', 'Make rambutan juice', 'Preserve in syrup', 'Make rambutan jelly'],
    warnings: ['Seed is toxic - do not eat', 'High sugar content', 'Allergic reactions possible'],
    category: 'Fruit'
  },
  'Guava': {
    description: 'Guava (Psidium guajava) or Bayabas grows wild and cultivated throughout Calbayog Samar. The fruit and especially the leaves have powerful medicinal properties recognized in traditional Filipino medicine.',
    dohApproved: true,
    uses: ['High vitamin C content', 'Anti-diarrheal properties', 'Oral health', 'Antibacterial effects', 'Digestive aid', 'Antioxidant properties'],
    preparation: ['Eat fresh fruit', 'Make guava leaf tea', 'Use leaves for toothache relief', 'Make bayabas paste for wounds', 'Use in traditional medicine'],
    warnings: ['Generally safe', 'High vitamin C may affect some medications', 'Seeds can be hard to digest'],
    category: 'Fruit'
  },
  'Atis': {
    description: 'Atis (Annona squamosa) or Sugar Apple is commonly grown in Calbayog Samar backyards. The sweet, creamy fruit with its distinctive segmented appearance is a favorite among locals.',
    dohApproved: false,
    uses: ['Rich in vitamin C and B6', 'Magnesium and potassium', 'Antioxidant properties', 'Traditional dysentery remedy', 'Natural insecticide from seeds', 'Energy booster'],
    preparation: ['Eat fresh when soft', 'Blend into smoothies', 'Make fruit salads', 'Use seeds for natural insect repellent', 'Make traditional cough remedy'],
    warnings: ['Seeds are toxic - do not eat', 'High sugar content - diabetics monitor intake', 'May cause allergic reactions in some'],
    category: 'Fruit'
  },
  'Duhat': {
    description: 'Duhat (Syzygium cumini) or Java Plum is common in Calbayog Samar, growing wild and in cultivated areas. The purple-black fruits are harvested seasonally and used for both eating fresh and making traditional products.',
    dohApproved: false,
    uses: ['Blood sugar regulation', 'Digestive health', 'Antioxidant-rich fruits', 'Ornamental shade tree', 'Timber for local construction', 'Bark for tanning'],
    preparation: ['Eat fresh fruits', 'Make duhat wine or vinegar', 'Dry seeds for herbal tea', 'Use bark for traditional medicine', 'Make jam from ripe fruits'],
    warnings: ['May lower blood sugar significantly', 'Excessive consumption may cause constipation', 'Stains clothing and surfaces'],
    category: 'Tree'
  },
  'Narra': {
    description: 'Narra (Pterocarpus indicus) is the national tree of the Philippines and grows in Calbayog Samar. Known for its beautiful wood and distinctive buttress roots, it is valued for both timber and ornamental purposes.',
    dohApproved: false,
    uses: ['National symbol of Philippines', 'High-quality timber for furniture', 'Traditional medicine for inflammation', 'Ornamental shade tree', 'Kino resin for dye and medicine', 'Nitrogen-fixing properties'],
    preparation: ['Use wood for fine furniture and carving', 'Make resin decoction for mouth ulcers', 'Plant as avenue tree for shade', 'Harvest flowers for ornamental purposes'],
    warnings: ['Endangered in wild - conservation status', 'Protected by law in Philippines', 'Sustainable plantation sources only'],
    category: 'Tree'
  },
  'Acacia': {
    description: 'Acacia trees are common in Calbayog Samar, found in parks, along roadsides, and in open areas. These fast-growing trees provide shade and have various traditional uses in the region.',
    dohApproved: false,
    uses: ['Source of gum arabic', 'Tannin production for leather', 'Soil improvement through nitrogen fixation', 'Traditional wound healing', 'Fodder for livestock', 'Quality timber'],
    preparation: ['Use gum arabic as food stabilizer', 'Make bark decoction for diarrhea', 'Apply crushed leaves to wounds', 'Use pods as animal feed', 'Harvest wood for furniture'],
    warnings: ['Some species have toxic compounds', 'Excessive bark consumption may cause digestive issues', 'Thorns can cause injury'],
    category: 'Tree'
  },
  'Kakawate': {
    description: 'Kakawate (Gliricidia sepium) or Madre de Cacao is widely used in Calbayog Samar as living fence posts and shade for cacao plantations. The tree is fast-growing and has multiple agricultural uses.',
    dohApproved: false,
    uses: ['Living fence posts (cuttings root easily)', 'Shade tree for cacao plantations', 'Green manure and mulch', 'Firewood source', 'Rat poison (seeds)', 'Traditional medicine for skin parasites'],
    preparation: ['Plant cuttings directly in ground for fences', 'Use leaves as green mulch', 'Make decoction for external parasite treatment', 'Prune regularly for firewood'],
    warnings: ['Seeds highly toxic to mammals', 'Not for internal consumption', 'Handle with care when using as rodenticide'],
    category: 'Tree'
  },
  'Banaba': {
    description: 'Banaba (Lagerstroemia speciosa) is found in Calbayog Samar, known for its beautiful purple flowers and traditional use in treating diabetes. The tree is both ornamental and medicinal.',
    dohApproved: false,
    uses: ['Blood sugar regulation', 'Kidney and bladder health', 'Weight management support', 'Antioxidant properties', 'Ornamental flowering tree', 'Diuretic effects'],
    preparation: ['Make banaba leaf tea', 'Take as herbal supplement capsules', 'Use extract in herbal medicine', 'Plant as ornamental garden tree'],
    warnings: ['May lower blood sugar - diabetics monitor levels', 'Pregnant women consult doctor', 'May interact with diabetes medications'],
    category: 'Tree'
  },
  'Sampaguita': {
    description: 'Sampaguita (Jasminum sambac) is the national flower of the Philippines and grows abundantly in Calbayog Samar. The fragrant white flowers are used for garlands and religious offerings throughout the city.',
    dohApproved: false,
    uses: ['National flower of Philippines', 'Fragrant flower garlands', 'Aromatherapy and relaxation', 'Traditional headache remedy', 'Skin soothing properties', 'Tea flavoring'],
    preparation: ['String flowers into garlands (sampaguita)', 'Make fragrant tea', 'Use in aromatherapy', 'Apply crushed flowers to temples for headaches', 'Use in religious offerings'],
    warnings: ['Generally safe', 'Some people may have floral allergies', 'Essential oil should be diluted'],
    category: 'Flower'
  },
  'Gumamela': {
    description: 'Gumamela (Hibiscus rosa-sinensis) or Tropical Hibiscus is a common ornamental plant in Calbayog Samar gardens. The large, showy flowers are also used for traditional hair care and medicine.',
    dohApproved: false,
    uses: ['Hair care and growth', 'Natural shampoo', 'Ornamental plant', 'Lowers blood pressure', 'Vitamin C source', 'Natural dye'],
    preparation: ['Make hibiscus tea', 'Use flowers for hair treatment', 'Make natural red dye', 'Eat flowers in salads', 'Use as ornamental hedge'],
    warnings: ['May lower blood pressure significantly', 'Not for pregnant women', 'May interact with medications'],
    category: 'Flower'
  },
  'Tanglad': {
    description: 'Tanglad (Cymbopogon citratus) or Lemongrass grows everywhere in Calbayog Samar - in backyards, gardens, and even wild. It is essential in local cuisine and traditional medicine.',
    dohApproved: false,
    uses: ['Digestive aid', 'Stress and anxiety relief', 'Cholesterol reduction', 'Sleep improvement', 'Fever reduction', 'Natural mosquito repellent'],
    preparation: ['Brew as herbal tea', 'Add to soups and curries', 'Use essential oil for aromatherapy', 'Plant around home for insect control'],
    warnings: ['May lower blood glucose levels', 'Use caution during pregnancy', 'Essential oil may irritate skin'],
    category: 'Relaxant'
  },
  'Oregano': {
    description: 'Oregano (Plectranthus amboinicus) or Cuban Oregano is a common herb in Calbayog Samar gardens. Its thick, fuzzy leaves are used for cooking cough remedies and adding flavor to dishes.',
    dohApproved: false,
    uses: ['Cough and cold remedy', 'Respiratory health', 'Anti-inflammatory properties', 'Digestive aid', 'Antioxidant properties', 'Flavor enhancer for cooking'],
    preparation: ['Make oregano tea for coughs', 'Add to soups and stews', 'Use leaves for herbal medicine', 'Add to fried dishes'],
    warnings: ['Pregnant women avoid medicinal amounts', 'May interact with blood thinners', 'Strong flavor - use in moderation'],
    category: 'Herb'
  },
  'Luya': {
    description: 'Luya (Zingiber officinale) or Ginger is a staple in Calbayog Samar cuisine and traditional medicine. It grows well in the region\'s tropical climate and is used daily in cooking and remedies.',
    dohApproved: false,
    uses: ['Nausea and motion sickness relief', 'Digestive aid', 'Anti-inflammatory', 'Pain reduction', 'Immune support', 'Blood sugar regulation'],
    preparation: ['Make ginger tea (salabat)', 'Add to tinola and arroz caldo', 'Use in cooking for flavor', 'Make ginger ale', 'Add to smoothies'],
    warnings: ['Can interact with blood thinners', 'High doses may cause heartburn', 'Gallstone patients use caution'],
    category: 'Spice'
  },
  'Bawang': {
    description: 'Bawang (Allium sativum) or Garlic is essential in Calbayog Samar cooking. It is used in almost every savory dish and is grown in home gardens throughout the city.',
    dohApproved: false,
    uses: ['Immune system support', 'Heart health', 'Antibacterial and antiviral', 'Blood pressure regulation', 'Cholesterol management', 'Antioxidant properties'],
    preparation: ['Use in almost all savory cooking', 'Make garlic rice (sinangag)', 'Roast whole heads', 'Make garlic oil', 'Eat raw for medicinal benefits'],
    warnings: ['Blood thinner interaction', 'Bad breath', 'May cause digestive upset', 'Pregnant women avoid medicinal doses'],
    category: 'Spice'
  },
  'Onion': {
    description: 'Onion (Allium cepa) or Sibuyas is a foundation of Calbayog Samar cuisine. Red onions (sibuyas na pula) are particularly prized for their strong flavor and medicinal properties.',
    dohApproved: false,
    uses: ['Quercetin antioxidant', 'Heart health', 'Bone health', 'Cancer prevention research', 'Digestive health', 'Immune support'],
    preparation: ['Sauté as base for dishes', 'Use raw in salads (ensalada)', 'Make onion soup', 'Grill onion slices', 'Use in kinilaw'],
    warnings: ['Causes tears when cutting', 'Can trigger heartburn', 'Bad breath', 'Some people allergic'],
    category: 'Spice'
  },
  'Tumeric': {
    description: 'Luyang Dilaw (Curcuma longa) or Turmeric is grown in Calbayog Samar for its bright yellow rhizomes. It is used in cooking, traditional medicine, and as a natural dye.',
    dohApproved: false,
    uses: ['Potent anti-inflammatory', 'Antioxidant properties', 'Brain health and memory', 'Heart health', 'Arthritis relief', 'Digestive aid'],
    preparation: ['Make golden milk', 'Add to curries and soups', 'Make turmeric tea', 'Use in rice dishes (java rice)', 'Add to smoothies'],
    warnings: ['Stains everything yellow', 'Can interact with blood thinners', 'Gallbladder issues use caution', 'High doses may cause digestive upset'],
    category: 'Spice'
  },
  'Kamoteng Kahoy': {
    description: 'Kamoteng Kahoy (Manihot esculenta) or Cassava is a major crop in Calbayog Samar and surrounding areas. It is a staple carbohydrate source and used in many traditional dishes.',
    dohApproved: false,
    uses: ['Major carbohydrate source', 'Gluten-free flour alternative', 'Source of resistant starch', 'Contains vitamin C and folate', 'Sustainable crop for food security'],
    preparation: ['Boil thoroughly until tender', 'Make cassava cake (bibingkang kamoteng kahoy)', 'Fry as chips or fries', 'Grate and squeeze out juice for baking', 'Make tapioca starch', 'Sun-dry for storage'],
    warnings: ['Must be properly cooked to remove cyanogenic compounds', 'Never consume raw', 'Bitter varieties are more toxic than sweet varieties', 'Soaking and thorough cooking essential', 'Pregnant women should consume in moderation'],
    category: 'Root Crop'
  },
  'Ube': {
    description: 'Ube (Dioscorea alata) or Purple Yam is widely cultivated in Calbayog Samar, known for its vibrant purple color and sweet, nutty flavor. It is a staple ingredient in Filipino desserts.',
    dohApproved: false,
    uses: ['Rich in carbohydrates and dietary fiber', 'High antioxidant content (anthocyanins)', 'Supports digestive health', 'Energy booster', 'Contains vitamins C and B6', 'Potassium source'],
    preparation: ['Make Ube halaya (jam/pudding)', 'Use in cakes and pastries', 'Make ice cream and desserts', 'Boil and eat as vegetable', 'Create Ube powder for flavoring', 'Add to halo-halo'],
    warnings: ['Must be thoroughly cooked', 'Some varieties may be toxic if not prepared correctly', 'High calorie content - consume in moderation', 'May cause blood sugar spikes'],
    category: 'Root Crop'
  },
  'Kamote': {
    description: 'Kamote (Ipomoea batatas) or Sweet Potato is extensively grown in Calbayog Samar. The orange and purple varieties are both popular, used in desserts, snacks, and as a vegetable.',
    dohApproved: false,
    uses: ['High in beta-carotene (vitamin A)', 'Fiber for digestion', 'Potassium for blood pressure', 'Vitamin C and B vitamins', 'Complex carbohydrates', 'Antioxidant properties'],
    preparation: ['Boil or steam and eat with sugar', 'Make kamote cue', 'Use in ginataang halo-halo', 'Bake and eat as snack', 'Make kamote chips', 'Add to soups'],
    warnings: ['High glycemic index', 'Diabetics should monitor portions', 'Some people may experience bloating'],
    category: 'Root Crop'
  }
};

export default dohPlantDatabase;
