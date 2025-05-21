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

  // Construction du HTML de la tâche
  new_task.innerHTML = `
    <input id="task-validate-${task.id}" type="checkbox" ${
    task.completed ? "checked" : ""
  }/>
    <span class="todo-checkbox" data-task-id="${task.id}" alt="Bouton pour valider la tâche : ${task.content}">${
    task.completed ? "✓" : " "
  }</span>
    <button class="delete-button" data-task-id="${task.id}" alt="Bouton pour supprimer la tâche : ${task.content}">&#128465;</button>
    <label for="task-validate-${task.id}">${task.content}</label>`;

  // Ajout de la tâche au DOM
  taskList.appendChild(new_task);

  // Application des styles visuels selon l'état de la tâche
  const checkboxSpan = new_task.querySelector(".todo-checkbox");
  if (task.completed) {
    // Styles pour une tâche validée
    new_task.style.boxShadow = "0px 0px 10px rgb(0, 255, 13)";
    checkboxSpan.style.backgroundColor = "rgb(135, 255, 133)";
    checkboxSpan.style.boxShadow = "0px 0px 10px rgb(0, 255, 13)";
    checkboxSpan.style.textShadow = "0 0 5px rgb(0, 255, 13)";
  } else {
    // Styles pour une tâche non validée
    new_task.style.boxShadow = "0px 0px 10px rgb(255, 0, 0)";
    checkboxSpan.style.backgroundColor = "rgb(240, 77, 77)";
    checkboxSpan.style.boxShadow = "0px 0px 10px rgb(255, 0, 0)";
    checkboxSpan.style.textShadow = "none";
  }
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
