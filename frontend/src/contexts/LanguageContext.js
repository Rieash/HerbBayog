import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('herbbayog_language');
    return saved || 'en';
  });

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations['en'];
        for (const k2 of keys) {
          if (value && value[k2]) {
            value = value[k2];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return value;
  };

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('herbbayog_language', langCode);
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, currentLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};
