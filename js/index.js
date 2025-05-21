/**
 * @fileoverview Point d'entrée principal de l'application Todo List
 * @module index
 */

import { createTask, renderTask } from "./create-task.js";
import { loadTasks } from "./local-storage.js";
import { handleTaskValidation } from "./validate-task.js";
import { handleTaskDeletion } from "./delete-task.js";

// Initialisation de l'application au chargement du DOM
window.addEventListener("DOMContentLoaded", () => {
  // Chargement et affichage des tâches existantes
  const tasks = loadTasks();
  tasks.forEach(renderTask);
});

// Gestion de la soumission du formulaire pour créer une nouvelle tâche
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  createTask();
});

// Gestion des événements de validation et suppression des tâches
document.getElementById("taskList").addEventListener("click", function (e) {
  handleTaskValidation(e);
  handleTaskDeletion(e);
});
