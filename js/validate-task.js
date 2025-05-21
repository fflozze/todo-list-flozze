/**
 * @fileoverview Gestion de la validation et de la modification des tâches
 * @module validate-task
 */

import { updateTask, loadTasks } from "./local-storage.js";

/**
 * Initialise l'écouteur d'événements pour la validation des tâches
 * @returns {void}
 */
export function taskValidate() {
  document.addEventListener("click", handleTaskValidation);
}

/**
 * Gère la validation/dévalidation d'une tâche
 * @param {Event} e - L'événement de clic
 * @returns {void}
 */
export function handleTaskValidation(e) {
  if (e.target.classList.contains("todo-checkbox")) {
    const taskId = Number(e.target.getAttribute("data-task-id"));
    const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
    const checkboxSpan = taskItem.querySelector(".todo-checkbox");
    let completed;

    // Gestion de l'état visuel et logique de la tâche
    if (taskItem.classList.contains("validated")) {
      // Dévalidation de la tâche
      taskItem.classList.remove("validated");
      taskItem.style.boxShadow = "0px 0px 10px rgb(255, 0, 0)";
      checkboxSpan.style.backgroundColor = "rgb(240, 77, 77)";
      checkboxSpan.style.boxShadow = "0px 0px 10px rgb(255, 0, 0)";
      checkboxSpan.textContent = " ";
      completed = false;
    } else {
      // Validation de la tâche
      taskItem.classList.add("validated");
      taskItem.style.boxShadow = "0px 0px 10px rgb(0, 255, 13)";
      checkboxSpan.textContent = "✓";
      checkboxSpan.style.backgroundColor = "rgb(135, 255, 133)";
      checkboxSpan.style.boxShadow = "0px 0px 10px rgb(0, 255, 13)";
      completed = true;
    }

    // Mise à jour de l'état dans le localStorage
    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = completed;
      updateTask(task);
    }
  }
}

/**
 * Met à jour l'état d'une tâche dans le localStorage
 * @param {Object} task - La tâche à mettre à jour
 * @returns {void}
 */
function validateTask(task) {
  updateTask(task);
}
