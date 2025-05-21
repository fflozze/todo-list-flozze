/**
 * @fileoverview Gestion de la création et du rendu des tâches
 * @module create-task
 */

import { addTask, loadTasks } from "./local-storage.js";

// Gestion de l'ID unique des tâches
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
 */
export function renderTask(task) {
  const taskList = document.getElementById("taskList");
  const new_task = document.createElement("li");
  new_task.setAttribute("data-task-id", task.id);
  if (task.completed) new_task.classList.add("validated");
  new_task.innerHTML = `
    <input id="task-validate-${task.id}" type="checkbox" ${
    task.completed ? "checked" : ""
  }/>
    <span class="todo-checkbox" data-task-id="${task.id}">${
    task.completed ? "✓" : "X"
  }</span>
    <button class="delete-button" data-task-id="${task.id}">&#128465;</button>
    <label for="task-validate-${task.id}">${task.content}</label>`;
  taskList.appendChild(new_task);

  // Application des styles visuels selon l'état de la tâche
  const checkboxSpan = new_task.querySelector(".todo-checkbox");
  if (task.completed) {
    new_task.style.boxShadow = "0px 0px 17px rgb(0, 255, 13)";
    checkboxSpan.style.backgroundColor = "rgb(135, 255, 133)";
    checkboxSpan.style.boxShadow = "0px 0px 17px rgb(0, 255, 13)";
  } else {
    new_task.style.boxShadow = "0px 0px 17px rgb(255, 0, 0)";
    checkboxSpan.style.backgroundColor = "rgb(240, 77, 77)";
    checkboxSpan.style.boxShadow = "0px 0px 17px rgb(255, 0, 0)";
  }
}

/**
 * Crée une nouvelle tâche à partir de la saisie utilisateur
 * @returns {void}
 */
export function createTask() {
  let input = document.getElementById("taskInput").value.trim();
  if (!input) return;
  taskId++;
  const task = { id: taskId, content: input, completed: false };
  addTask(task);
  renderTask(task);
  document.getElementById("taskInput").value = "";
}
