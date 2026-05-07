// Test file to verify Waray translations are working
import { translations } from './translations';

// Test Waray translations for new categories
console.log('Testing Waray translations:');
console.log('Waray categories:');
console.log('- all:', translations.war.plants.categories.all);
console.log('- herbal:', translations.war.plants.categories.herbal);
console.log('- nonHerbal:', translations.war.plants.categories.nonHerbal);
console.log('- calbayog:', translations.war.plants.categories.calbayog);

console.log('\nEnglish categories:');
console.log('- all:', translations.en.plants.categories.all);
console.log('- herbal:', translations.en.plants.categories.herbal);
console.log('- nonHerbal:', translations.en.plants.categories.nonHerbal);
console.log('- calbayog:', translations.en.plants.categories.calbayog);

// Test language codes
console.log('\nLanguage codes:');
console.log('en:', translations.en ? '✓' : '✗');
console.log('war:', translations.war ? '✓' : '✗');
