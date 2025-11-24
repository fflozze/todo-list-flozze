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
  const languageOptions = languageDropdown.querySelectorAll('.language-option');
  
  if (languageSelector && languageDropdown) {
    // Gérer l'ouverture/fermeture du menu de langue
    languageSelector.addEventListener('click', (e) => {
      e.stopPropagation();
      languageDropdown.classList.toggle('open');
    });
    
    // Gérer la sélection de langue
    languageOptions.forEach(option => {
      option.addEventListener('click', async (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        if (lang) {
          await changeLanguage(lang);
          languageDropdown.classList.remove('open');
          
          // Re-rendre les tâches pour mettre à jour les alt text
          const tasks = loadTasks();
          document.getElementById('taskList').innerHTML = '';
          tasks.forEach(renderTask);
        }
      });
    });
    
    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', () => {
      languageDropdown.classList.remove('open');
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
