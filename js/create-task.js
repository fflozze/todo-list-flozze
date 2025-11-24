/**
 * @fileoverview Gestion de la création et du rendu des tâches
 * @author [flozze]
 * @version 1.0.0
 * @description Module responsable de la création et de l'affichage des tâches dans l'interface utilisateur
 */

import { addTask, loadTasks } from "./local-storage.js";

/**
 * Gestion de l'ID unique des tâches
 * @type {number}
 * @private
 */
let taskId = 0;

// Initialisation de taskId à partir du localStorage
const tasks = loadTasks();
if (tasks.length > 0) {
  taskId = Math.max(...tasks.map((t) => t.id));
}

/**
 * Crée et affiche une nouvelle tâche dans le DOM
 * @param {Object} task - L'objet tâche à afficher
 * @param {number} task.id - Identifiant unique de la tâche
 * @param {string} task.content - Contenu textuel de la tâche
 * @param {boolean} task.completed - État de complétion de la tâche
 * @returns {void}
 * 
 * @example
 * renderTask({
 *   id: 1,
 *   content: "Faire les courses",
 *   completed: false
 * });
 */
export function renderTask(task) {
  // Récupération du conteneur de tâches
  const taskList = document.getElementById("taskList");
  
  // Création de l'élément de tâche
  const new_task = document.createElement("li");
  new_task.setAttribute("data-task-id", task.id);
  
  // Application de la classe de validation si nécessaire
  if (task.completed) new_task.classList.add("validated");

  // Récupérer les traductions pour les alt text
  const validateAlt = window.i18next ? window.i18next.t('validateTask', { content: task.content }) : `Bouton pour valider la tâche : ${task.content}`;
  const deleteAlt = window.i18next ? window.i18next.t('deleteTask', { content: task.content }) : `Bouton pour supprimer la tâche : ${task.content}`;
  
  // Construction du HTML de la tâche
  new_task.innerHTML = `
    <input id="task-validate-${task.id}" type="checkbox" ${
    task.completed ? "checked" : ""
  }/>
    <span class="todo-checkbox" data-task-id="${task.id}" alt="${validateAlt}">${
    task.completed ? "✓" : " "
  }</span>
    <button class="delete-button" data-task-id="${task.id}" alt="${deleteAlt}">&#128465;</button>
    <label for="task-validate-${task.id}">${task.content}</label>`;

  // Ajout de la tâche au DOM
  taskList.appendChild(new_task);

  // Application des styles visuels selon l'état de la tâche
  const checkboxSpan = new_task.querySelector(".todo-checkbox");
  if (task.completed) {
    // Styles pour une tâche validée - opacité modérée pour équilibrer
    new_task.style.boxShadow = "0px 0px 10px rgba(0, 255, 13, 0.3)";
    new_task.style.border = "2px solid rgba(0, 255, 13, 0.3)";
    checkboxSpan.style.backgroundColor = "rgba(135, 255, 133, 0.3)";
    checkboxSpan.style.boxShadow = "0px 0px 10px rgba(0, 255, 13, 0.3)";
    checkboxSpan.style.border = "2px solid rgba(0, 255, 13, 0.3)";
    checkboxSpan.style.textShadow = "0 0 5px rgba(0, 255, 13, 0.3)";
  } else {
    // Styles pour une tâche non validée - opacité modérée pour équilibrer
    new_task.style.boxShadow = "0px 0px 10px rgba(255, 0, 0, 0.3)";
    new_task.style.border = "2px solid rgba(255, 0, 0, 0.3)";
    checkboxSpan.style.backgroundColor = "rgba(240, 77, 77, 0.3)";
    checkboxSpan.style.boxShadow = "0px 0px 10px rgba(255, 0, 0, 0.3)";
    checkboxSpan.style.border = "2px solid rgba(255, 0, 0, 0.3)";
    checkboxSpan.style.textShadow = "none";
  }

  // Style du bouton de suppression - opacité modérée pour équilibrer
  const deleteButton = new_task.querySelector(".delete-button");
  deleteButton.style.border = "2px solid rgba(111, 0, 0, 0.3)";
}

/**
 * Crée une nouvelle tâche à partir de la saisie utilisateur
 * @returns {void}
 * 
 * @description
 * Cette fonction est appelée lors de la soumission du formulaire.
 * Elle récupère le contenu saisi, crée un nouvel ID, sauvegarde la tâche
 * et l'affiche dans l'interface.
 */
export function createTask() {
  // Récupération et nettoyage de la saisie
  let input = document.getElementById("taskInput").value.trim();
  if (!input) return;

  // Création de la nouvelle tâche
  taskId++;
  const task = { id: taskId, content: input, completed: false };

  // Sauvegarde et affichage
  addTask(task);
  renderTask(task);

  // Réinitialisation du champ de saisie
  document.getElementById("taskInput").value = "";
}
