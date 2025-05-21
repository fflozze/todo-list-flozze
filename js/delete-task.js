/**
 * @fileoverview Gestion de la suppression des tâches
 * @author [flozze]
 * @version 1.0.0
 * @description Module responsable de la suppression des tâches de l'interface et du stockage
 */

import { removeTask } from "./local-storage.js";

/**
 * Gère la suppression d'une tâche suite à un clic sur le bouton de suppression
 * @param {Event} e - L'événement de clic
 * @returns {void}
 * 
 * @description
 * Cette fonction est appelée lors du clic sur le bouton de suppression d'une tâche.
 * Elle supprime la tâche du DOM et du localStorage.
 * 
 * @example
 * handleTaskDeletion(event);
 */
export function handleTaskDeletion(e) {
  if (e.target.classList.contains("delete-button")) {
    // Récupération de l'ID de la tâche
    const taskId = Number(e.target.getAttribute("data-task-id"));
    
    // Récupération de l'élément de tâche
    const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
    
    // Suppression de la tâche si elle existe
    if (taskItem) {
      taskItem.remove(); // Suppression de l'élément du DOM
      removeTask(taskId); // Suppression de la tâche du localStorage
    }
  }
}
