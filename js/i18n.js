/**
 * @fileoverview Configuration et initialisation de i18next
 * @author flozze
 * @version 1.0.0
 * @description Gère l'internationalisation de l'application avec i18next
 */

/**
 * Charge les traductions depuis les fichiers JSON
 * @param {string} language - Code de la langue
 * @returns {Promise<Object>} Les traductions chargées
 */
async function loadTranslations(language) {
  try {
    const response = await fetch(`./locales/${language}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${language}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading translations for ${language}:`, error);
    // Charger le français en fallback
    if (language !== 'fr') {
      const response = await fetch('./locales/fr.json');
      return await response.json();
    }
    return {};
  }
}

/**
 * Initialise i18next avec les traductions disponibles
 * @returns {Promise<void>}
 */
export async function initI18n() {
  // Récupérer la langue sauvegardée ou utiliser le français par défaut
  const savedLanguage = localStorage.getItem('app-language') || 'fr';
  
  // Charger les traductions
  const translations = await loadTranslations(savedLanguage);
  
  await window.i18next.init({
    lng: savedLanguage,
    fallbackLng: 'fr',
    resources: {
      [savedLanguage]: {
        translation: translations
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

  // Mettre à jour tous les éléments avec data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = window.i18next.t(key);
  });

  // Mettre à jour les placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = window.i18next.t(key);
  });

  // Mettre à jour les aria-labels
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    element.setAttribute('aria-label', window.i18next.t(key));
  });

  // Mettre à jour le sélecteur de langue
  updateLanguageSelector(savedLanguage);
}

/**
 * Change la langue de l'application
 * @param {string} language - Code de la langue (fr, en, de, es)
 * @returns {Promise<void>}
 */
export async function changeLanguage(language) {
  // Charger les traductions pour la nouvelle langue si pas déjà chargées
  if (!window.i18next.hasResourceBundle(language, 'translation')) {
    const translations = await loadTranslations(language);
    window.i18next.addResourceBundle(language, 'translation', translations);
  }
  
  await window.i18next.changeLanguage(language);
  localStorage.setItem('app-language', language);
  
  // Mettre à jour tous les éléments avec data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = window.i18next.t(key);
  });

  // Mettre à jour les placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = window.i18next.t(key);
  });

  // Mettre à jour les aria-labels
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    element.setAttribute('aria-label', window.i18next.t(key));
  });

  // Mettre à jour le sélecteur de langue
  updateLanguageSelector(language);
}

/**
 * Met à jour l'affichage du sélecteur de langue
 * @param {string} currentLanguage - Langue actuelle
 * @returns {void}
 */
function updateLanguageSelector(currentLanguage) {
  const languageText = document.getElementById('languageText');
  const currentLanguageFlag = document.getElementById('currentLanguageFlag');
  
  if (!languageText || !currentLanguageFlag) return;

  // Mapping des langues avec les codes flag-icons
  const languageMap = {
    'fr': { name: 'Français', flag: 'fi-fr' },
    'de': { name: 'Deutsch', flag: 'fi-de' },
    'es': { name: 'Español', flag: 'fi-es' },
    'en': { name: 'English', flag: 'fi-gb' }
  };

  const langInfo = languageMap[currentLanguage] || languageMap['fr'];
  languageText.textContent = langInfo.name;
  currentLanguageFlag.className = 'fi ' + langInfo.flag;
}

/**
 * Initialise le sélecteur de langue
 * @returns {void}
 */
export function initLanguageSelector() {
  const savedLanguage = localStorage.getItem('app-language') || 'fr';
  updateLanguageSelector(savedLanguage);
}

