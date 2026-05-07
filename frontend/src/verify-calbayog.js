// Verification script to check Calbayog plants
import { translations } from './translations';

// Simulate the filtering logic for Calbayog
const verifyCalbayogPlants = (plants) => {
  console.log('=== CALBAYOG PLANTS VERIFICATION ===');
  
  // Count DOH-approved plants that are also Calbayog local
  const dohApprovedCalbayog = plants.filter(plant => 
    plant.doh_approved === true && plant.local_to_calbayog === true
  );
  
  // Count all Calbayog plants
  const allCalbayog = plants.filter(plant => 
    plant.local_to_calbayog === true
  );
  
  console.log(`DOH-approved Calbayog plants: ${dohApprovedCalbayog.length}`);
  console.log(`Total Calbayog plants: ${allCalbayog.length}`);
  
  // List DOH-approved Calbayog plants
  console.log('\nDOH-approved Calbayog plants:');
  dohApprovedCalbayog.forEach(plant => {
    console.log(`- ${plant.name} (${plant.is_herbal ? 'Herbal' : 'Non-Herbal'})`);
  });
  
  // Verify translations
  console.log('\nTranslation check:');
  console.log('English Calbayog label:', translations.en.plants.categories.calbayog);
  console.log('Waray Calbayog label:', translations.war.plants.categories.calbayog);
  
  return {
    dohApprovedCalbayog: dohApprovedCalbayog.length,
    totalCalbayog: allCalbayog.length,
    plants: dohApprovedCalbayog
  };
};

export default verifyCalbayogPlants;
