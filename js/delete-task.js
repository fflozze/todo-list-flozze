/**
 * @fileoverview Gestion de la suppression des tâches
 * @module delete-task
 */

import { removeTask } from "./local-storage.js";

/**
 * Gère la suppression d'une tâche suite à un clic sur le bouton de suppression
 * @param {Event} e - L'événement de clic
 * @returns {void}
 */
export function handleTaskDeletion(e) {
  if (e.target.classList.contains("delete-button")) {
    const taskId = Number(e.target.getAttribute("data-task-id"));
    const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
    if (taskItem) {
      taskItem.remove(); // Suppression de l'élément du DOM
      removeTask(taskId); // Suppression de la tâche du localStorage
    }
  }
}
