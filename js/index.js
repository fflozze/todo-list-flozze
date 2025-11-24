/**
 * @fileoverview Point d'entrée principal de l'application Todo List
 * @author [flozze]
 * @version 1.0.0
 * @description Initialise l'application et gère les événements principaux
 */

import { createTask, renderTask } from "./create-task.js";
import { loadTasks } from "./local-storage.js";
import { handleTaskValidation } from "./validate-task.js";
import { handleTaskDeletion } from "./delete-task.js";
import { initI18n, changeLanguage, initLanguageSelector } from "./i18n.js";

/**
 * Initialisation de l'application au chargement du DOM
 * @event DOMContentLoaded
 * @listens window
 */
window.addEventListener("DOMContentLoaded", async () => {
  // Initialiser i18next (cela initialise aussi le sélecteur de langue)
  await initI18n();
  
  // Gérer l'ouverture/fermeture du menu déroulant
  const languageSelector = document.getElementById('languageSelector');
  const languageDropdown = document.getElementById('languageDropdown');
  const languageContainer = document.querySelector('.language-selector-container');
  
  if (languageSelector && languageDropdown && languageContainer) {
    let isMenuOpen = false;
    let closeTimeout = null;
    
    // Fonction pour ouvrir le menu
    const openMenu = () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      languageDropdown.classList.add('open');
      isMenuOpen = true;
    };
    
    // Fonction pour fermer le menu avec un délai
    const closeMenu = (delay = 150) => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
      closeTimeout = setTimeout(() => {
        if (isMenuOpen) {
          languageDropdown.classList.remove('open');
          isMenuOpen = false;
        }
      }, delay);
    };
    
    // Ouvrir/fermer au clic sur le bouton
    languageSelector.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMenuOpen) {
        closeMenu(0);
      } else {
        openMenu();
      }
    });
    
    // Garder le menu ouvert quand la souris est sur le conteneur
    languageContainer.addEventListener('mouseenter', () => {
      if (isMenuOpen) {
        openMenu();
      }
    });
    
    // Fermer le menu quand on quitte le conteneur (avec délai pour permettre le passage)
    languageContainer.addEventListener('mouseleave', (e) => {
      // Vérifier si on va vers le menu déroulant
      const relatedTarget = e.relatedTarget;
      if (!languageContainer.contains(relatedTarget)) {
        closeMenu();
      }
    });
    
    // Garder le menu ouvert quand la souris entre dans le menu déroulant
    languageDropdown.addEventListener('mouseenter', () => {
      openMenu();
    });
    
    // Garder le menu ouvert quand la souris quitte le menu (pour revenir au bouton)
    languageDropdown.addEventListener('mouseleave', (e) => {
      const relatedTarget = e.relatedTarget;
      if (!languageContainer.contains(relatedTarget)) {
        closeMenu();
      }
    });
    
    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', (e) => {
      if (!languageContainer.contains(e.target)) {
        closeMenu(0);
      }
    });
    
    // Gérer les clics sur les options de langue avec délégation d'événements
    languageContainer.addEventListener('click', async (e) => {
      const option = e.target.closest('.language-option');
      if (option) {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        if (lang) {
          // Fermer le menu avant de changer la langue
          closeMenu(0);
          isMenuOpen = false;
          
          await changeLanguage(lang);
          
          // Re-rendre les tâches pour mettre à jour les alt text
          const tasks = loadTasks();
          document.getElementById('taskList').innerHTML = '';
          tasks.forEach(renderTask);
        }
      }
    });
  }
  
  // Chargement et affichage des tâches existantes
  const tasks = loadTasks();
  tasks.forEach(renderTask);
});

/**
 * Gestion de la soumission du formulaire pour créer une nouvelle tâche
 * @event submit
 * @listens form
 * @param {Event} e - L'événement de soumission
 */
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  createTask();
});

/**
 * Gestion des événements de validation et suppression des tâches
 * @event click
 * @listens #taskList
 * @param {Event} e - L'événement de clic
 */
document.getElementById("taskList").addEventListener("click", function (e) {
  handleTaskValidation(e);
  handleTaskDeletion(e);
});
