export const translations = {
  en: {
    // Navbar
    nav: {
      home: 'Home',
      scan: 'Scan Plant',
      plants: 'Plant Library',
      about: 'About',
      login: 'Login'
    },
    // Landing Page
    landing: {
      hero: {
        badge: '🌿 Trusted by 1,000+ Herbal Enthusiasts',
        title: 'Your Pocket Herbal Expert in Calbayog',
        subtitle: 'Identify 40 Philippine medicinal plants instantly. Learn traditional remedies. Preserve Filipino heritage.',
        highlights: {
          accuracy: '98.6% AI Accuracy',
          free: '100% Free',
          doh: 'DOH Approved',
          herbal: 'Herbal Medicine',
          nonHerbal: 'Non-Herbal Plant'
        },
        cta: {
          primary: 'Start Scanning Free',
          secondary: 'How It Works'
        },
        stats: {
          images: '7,900+ Training Images',
          accuracy: '98.6% AI Accuracy',
          plants: 'DOH Approved Plants',
          location: 'Calbayog Heritage',
          ai: 'DenseNet121 AI'
        }
      },
      features: {
        instant: {
          title: 'Instant Plant ID',
          description: 'Point, scan, identify! Our AI recognizes 40 Philippine medicinal plants in seconds with 98.6% accuracy using your camera.',
          stat: '< 2 sec',
          statLabel: 'Scan Time'
        },
        ai: {
          title: 'Deep Learning AI',
          description: 'Powered by DenseNet121 neural network trained on 7,900+ images. Learns leaf patterns, textures, shapes for perfect identification.',
          stat: '98.6%',
          statLabel: 'Accuracy'
        },
        wisdom: {
          title: 'Herbal Wisdom',
          description: 'Access traditional Filipino remedies, preparation methods, and cultural significance passed down through generations.',
          stat: '112',
          statLabel: 'Plants'
        },
        trusted: {
          title: 'Trusted & Verified',
          description: 'All plant information verified against DOH-approved traditional medicines and scientific research databases.',
          stat: 'DOH',
          statLabel: 'Approved'
        }
      }
    },
    // Scan Page
    scan: {
      title: 'Plant Scanner',
      subtitle: 'Use your camera or upload an image to identify medicinal plants',
      error: {
        title: 'Photo Not Clear Enough',
        tips: 'Try these tips:',
        tip1: 'Move closer so the leaf fills most of the frame',
        tip2: 'Hold the camera steady to avoid blur',
        tip3: 'Use natural daylight (avoid shade or shadows)',
        tip4: 'Focus on a single leaf, not the whole plant',
        tip5: 'Make sure the leaf details (veins, edges) are visible'
      },
      tips: {
        title: 'Photo Tips for Best Results',
        lighting: 'Good Lighting - Use natural daylight, avoid harsh shadows',
        frame: 'Fill the Frame - Make the leaf take up 50%+ of the image',
        details: 'Show Details - Capture leaf veins, edges, and stem clearly',
        single: 'Single Leaf - Focus on one leaf, avoid cluttered backgrounds'
      },
      supported: 'Supported Plants'
    },
    // Plants Page
    plants: {
      title: 'Discover 10 DOH-Approved Medicinal Plants',
      subtitle: 'Explore our comprehensive library of DOH-approved traditional medicines. Search by name, ailment, or category.',
      search: 'Search plants, ailments, or remedies...',
      categories: {
        all: 'All Plants',
        herbal: 'Herbal Plants',
        nonHerbal: 'Non-Herbal Plants',
        calbayog: 'Calbayog Local Plants'
      },
      loading: 'Loading herbal library...',
      error: 'Failed to load plants. Please try again.',
      retry: 'Try Again'
    },
    // About Page
    about: {
      hero: {
        badge: 'Made in Calbayog, Philippines',
        title: 'Bridging Tradition & Technology',
        subtitle: 'HerbBayog is dedicated to preserving Filipino herbal wisdom through cutting-edge AI, making traditional medicine accessible to everyone.',
        heritage: 'Filipino Heritage',
        ai: 'AI-Powered',
        doh: 'DOH Verified'
      },
      mission: {
        title: 'Why HerbBayog Exists',
        subtitle: 'Three pillars that drive everything we do',
        preserve: {
          title: 'Preserve Heritage',
          description: 'Document and safeguard traditional Filipino herbal knowledge that has been passed down through generations, ensuring it never fades away.'
        },
        innovation: {
          title: 'AI Innovation',
          description: 'Leverage DenseNet121 neural networks trained on 7,900+ images to identify plants with 98.6% accuracy, making identification instant and reliable.'
        },
        safety: {
          title: 'Verified Safety',
          description: 'All plants are verified against DOH-approved lists with detailed preparation methods and safety guidelines for every remedy.'
        }
      }
    },
    // Plant Details
    plantDetails: {
      loading: 'Loading plant information...',
      notFound: 'Plant Not Found',
      backToPlants: 'Back to Plants',
      category: 'Medicinal Herb',
      tabs: {
        overview: 'Overview',
        medicinal: 'Medicinal Uses',
        preparation: 'How to Prepare',
        cultural: 'Cultural Info'
      },
      stats: {
        preparation: 'Preparation',
        preparationValue: '15-30 min',
        storage: 'Storage',
        storageValue: 'Cool, Dry',
        safety: 'Safety',
        safetyValue: 'Generally Safe'
      },
      overview: {
        description: 'Description',
        benefits: 'Key Benefits'
      },
      medicinal: {
        title: 'Traditional Medicinal Uses',
        notes: 'Important Notes',
        notesText: 'Always consult with a healthcare provider before using herbal remedies, especially if you are pregnant, nursing, or taking medications.'
      },
      preparation: {
        title: 'Preparation Methods',
        tips: 'Pro Tips',
        tip1: 'Use fresh leaves for best potency',
        tip2: 'Harvest in the morning after dew dries',
        tip3: 'Store in a cool, dry place away from sunlight',
        tip4: 'Label preparations with date and plant name'
      },
      cultural: {
        title: 'Cultural Significance',
        noInfo: 'Information about cultural significance coming soon.',
        heritage: 'Calbayog Heritage',
        heritageText: 'This plant is part of the rich botanical heritage of Calbayog City, Samar province. Traditional healers (herbolarios) have used these remedies for generations, passing down knowledge through oral tradition.'
      },
      cta: {
        title: 'Ready to identify this plant?',
        subtitle: 'Use our AI scanner to identify plants instantly',
        button: 'Scan Plant Now'
      }
    },
    // Scan Result Page
    scanResult: {
      loading: 'Analyzing your plant...',
      notFound: 'Plant Not Identified',
      tryAgain: 'Try Again',
      backToScan: 'Back to Scanner',
      confidence: 'Confidence',
      matches: 'Top Matches',
      medicinalUses: 'Medicinal Uses',
      preparation: 'How to Prepare',
      safety: 'Safety Information',
      disclaimer: 'Disclaimer: This is AI-generated information. Always consult a healthcare professional before using any herbal remedy.',
      scanAnother: 'Scan Another Plant',
      viewDetails: 'View Full Details'
    },
    // Common
    common: {
      back: 'Back',
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Try Again',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      share: 'Share',
      favorite: 'Favorite',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      viewAll: 'View All',
      showMore: 'Show More',
      showLess: 'Show Less'
    }
  },
  war: {
    // Navbar
    nav: {
      home: 'Balay',
      scan: 'Iscan an Tanom',
      plants: 'Library hin Tanom',
      about: 'Mahiunong',
      login: 'Sakob'
    },
    // Landing Page
    landing: {
      hero: {
        badge: '🌿 Ginpag-umahan hin 1,000+ Mga Tagahilig han Herbal',
        title: 'An Imo Herbal nga Eksperto ha Calbayog',
        subtitle: 'Mag-ila hin 40 nga medicinal nga tanom han Pilipinos ha direkta. Mag-aram hin mga tradisyonal nga tambal. Preserbaron an Filipino nga heritage.',
        highlights: {
          accuracy: '98.6% AI nga Karahasaan',
          free: '100% Libre',
          doh: 'DOH Ginpaborohan',
          herbal: 'Herbal nga Tambal',
          nonHerbal: 'Diri-Herbal nga Tanom'
        },
        cta: {
          primary: 'Mag-Scan Na Libre',
          secondary: 'Paano Ini Ginhahimo'
        },
        stats: {
          images: '7,900+ Mga Litrato para ha Pag-aram',
          accuracy: '98.6% AI nga Karahasaan',
          plants: 'Mga Tanom nga Ginpaborohan han DOH',
          location: 'Heritage han Calbayog',
          ai: 'DenseNet121 AI'
        }
      },
      features: {
        instant: {
          title: 'Direkta nga Pag-ila hin Tanom',
          description: 'Punto, scan, mag-ila! An aton AI nakakaila hin 40 nga medicinal nga tanom han Pilipinos ha mga segundo nga may 98.6% nga karahasaan gamit an imo camera.',
          stat: '< 2 seg',
          statLabel: 'Oras han Pag-scan'
        },
        ai: {
          title: 'Deep Learning AI',
          description: 'Ginpapadalagan han DenseNet121 neural network nga ginar-aran ha 7,900+ mga litrato. Nag-aaram hin mga pattern hin dahon, texture, shapes para ha perpekto nga pag-ila.',
          stat: '98.6%',
          statLabel: 'Karahasaan'
        },
        wisdom: {
          title: 'Herbal nga Karaham-an',
          description: 'Gawas an mga tradisyonal nga Filipino nga tambal, mga paagi hin pag-andam, ngan cultural significance nga ginpasa ha mga henerasyon.',
          stat: '112',
          statLabel: 'Mga Tanom'
        },
        trusted: {
          title: 'Ginpagtiwalaan ngan Gintsek-an',
          description: 'Tanan nga impormasyon hin tanom gintsek-an labi ha DOH-approved traditional medicines ngan scientific research databases.',
          stat: 'DOH',
          statLabel: 'Ginpaborohan'
        }
      }
    },
    // Scan Page
    scan: {
      title: 'Scanner hin Tanom',
      subtitle: 'Gamita an imo camera o pag-upload hin litrato para mag-ila hin medicinal nga tanom',
      error: {
        title: 'An Litrato Diri Maupay',
        tips: 'Sulayi ini nga mga tips:',
        tip1: 'Lumakpak harani para an dahon puno an kadak-an han frame',
        tip2: 'Pagdugang an camera para diri magblur',
        tip3: 'Gamita an natural nga adlaw (likay an shade o shadows)',
        tip4: 'Fokus ha usa nga dahon, diri an bug-os nga tanom',
        tip5: 'Siguraduhon nga an mga detalye han dahon (veins, edges) makita'
      },
      tips: {
        title: 'Mga Tips para ha Maupay nga Resulta',
        lighting: 'Maupay nga Lighit - Gamita an natural nga adlaw, likay an harsh shadows',
        frame: 'Punon an Frame - Daraon an dahon nga 50%+ han litrato',
        details: 'Ipakita an mga Detalye - Kuhaan an mga veins han dahon, edges, ngan stem nga klaro',
        single: 'Usa nga Dahon - Fokus ha usa nga dahon, likay an cluttered backgrounds'
      },
      supported: 'Mga Suportado nga Tanom'
    },
    // Plants Page
    plants: {
      title: 'Diskubre 10 nga DOH-Approved Medicinal nga Tanom',
      subtitle: 'Esplora an aton comprehensive library han DOH-approved traditional medicines. Pag-baklay ha ngaran, sakit, o kategorya.',
      search: 'Baklayon an mga tanom, sakit, o tambal...',
      categories: {
        all: 'Tanan nga Tanom',
        herbal: 'Herbal nga Tanom',
        nonHerbal: 'Diri-Herbal nga Tanom',
        calbayog: 'Mga Tanom ha Calbayog'
      },
      loading: 'Nag-load han herbal library...',
      error: 'Diri ma-load an mga tanom. Palihug sulayi liwat.',
      retry: 'Sulayi Liwat'
    },
    // About Page
    about: {
      hero: {
        badge: 'Ginhimo ha Calbayog, Pilipinas',
        title: 'Pag-ugnay han Tradisyon ngan Teknolohiya',
        subtitle: 'An HerbBayog gindudesign para preserbaron an Filipino herbal wisdom gamit an cutting-edge AI, paghimo han traditional medicine nga accessable ha tanan.',
        heritage: 'Filipino Heritage',
        ai: 'AI-Powered',
        doh: 'DOH Gintsek-an'
      },
      mission: {
        title: 'Basi Ato Ginbuhat an HerbBayog',
        subtitle: 'Tulo nga pillars nga nagdara hit tanan nga aton ginhahimo',
        preserve: {
          title: 'Preserbaron an Heritage',
          description: 'Dokumentar ngan protektaran an tradisyonal nga Filipino herbal knowledge nga ginpasa ha mga henerasyon, para diri ini mawara.'
        },
        innovation: {
          title: 'AI nga Pag-inobasyon',
          description: 'Gamita an DenseNet121 neural networks nga ginar-aran ha 7,900+ mga litrato para mag-ila hin tanom nga may 98.6% nga karahasaan, paghimo han pag-ila nga direkta ngan mapagtiwalaan.'
        },
        safety: {
          title: 'Gintsek-an nga Kaluwasan',
          description: 'Tanan nga tanom gintsek-an labi ha DOH-approved lists nga may detalyado nga preparation methods ngan safety guidelines para ha tagsa nga tambal.'
        }
      }
    },
    // Plant Details
    plantDetails: {
      loading: 'Nag-load han impormasyon han tanom...',
      notFound: 'An Tanom Diri Nakita',
      backToPlants: 'Balik ha Mga Tanom',
      category: 'Medicinal nga Tanom',
      tabs: {
        overview: 'Overview',
        medicinal: 'Medicinal nga Gamit',
        preparation: 'Paano I-andam',
        cultural: 'Cultural nga Impormasyon'
      },
      stats: {
        preparation: 'Pag-andam',
        preparationValue: '15-30 min',
        storage: 'Pagtagay',
        storageValue: 'Malip-ot, Marugit',
        safety: 'Kaluwasan',
        safetyValue: 'Kasagaran nga Luwas'
      },
      overview: {
        description: 'Deskripsyon',
        benefits: 'Mga Importante nga Benefisyo'
      },
      medicinal: {
        title: 'Tradisyonal nga Medicinal nga Gamit',
        notes: 'Mga Importante nga Nota',
        notesText: 'Palihug konsulta ha usa nga healthcare provider before paggamit han herbal remedies, labi na kon nagbados, nagpapasuso, o nagkuha hin mga tambal.'
      },
      preparation: {
        title: 'Mga Paagi han Pag-andam',
        tips: 'Mga Pro Tips',
        tip1: 'Gamita an fresh nga dahon para ha maupay nga potency',
        tip2: 'Anom ha aga pagkatapos magtugob an dew',
        tip3: 'I-tagay ha malip-ot ngan marugit nga lugar waray adlaw',
        tip4: 'I-label an mga andam nga may petsa ngan ngaran han tanom'
      },
      cultural: {
        title: 'Cultural nga Significance',
        noInfo: 'Impormasyon about cultural significance darudto na.',
        heritage: 'Heritage han Calbayog',
        heritageText: 'Ini nga tanom parte han rich botanical heritage han Calbayog City, Samar province. An mga traditional healers (herbolarios) nagamit hini nga mga tambal para ha mga henerasyon, nagpasa han knowledge through oral tradition.'
      },
      cta: {
        title: 'Listo na para mag-ila hini nga tanom?',
        subtitle: 'Gamita an aton AI scanner para mag-ila hin tanom ha direkta',
        button: 'Iscan an Tanom Na'
      }
    },
    // Scan Result Page
    scanResult: {
      loading: 'Nag-analyze han imo tanom...',
      notFound: 'An Tanom Diri Ma-ila',
      tryAgain: 'Sulayi Liwat',
      backToScan: 'Balik ha Scanner',
      confidence: 'Karahasaan',
      matches: 'Mga Top nga Match',
      medicinalUses: 'Medicinal nga Gamit',
      preparation: 'Paano I-andam',
      safety: 'Impormasyon han Kaluwasan',
      disclaimer: 'Disclaimer: Ini AI-generated nga impormasyon. Palihug konsulta ha usa nga healthcare professional before paggamit hin bisan ano nga herbal remedy.',
      scanAnother: 'Iscan an Iba nga Tanom',
      viewDetails: 'Kitaa an Bug-os nga Detalye'
    },
    // Common
    common: {
      back: 'Balik',
      loading: 'Nag-load...',
      error: 'May nakatama nga diri maupay',
      retry: 'Sulayi Liwat',
      close: 'Sirad',
      cancel: 'Kansela',
      save: 'Save',
      delete: 'Buraha',
      edit: 'Edit',
      view: 'Kitaa',
      share: 'Ibahagi',
      favorite: 'Favorite',
      search: 'Baklay',
      filter: 'Filter',
      sort: 'Sort',
      viewAll: 'Kitaa Tanan',
      showMore: 'Ipakita Pa',
      showLess: 'Ipakita La'
    }
  }
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'war', name: 'Waray', flag: '🇵🇭' }
];
