/**
 * @fileoverview Gestion du stockage local des tâches
 * @module local-storage
 */

// Clé utilisée pour stocker les tâches dans le localStorage
const TASKS_KEY = "todo-tasks";

/**
 * Sauvegarde la liste des tâches dans le localStorage
 * @param {Array<Object>} tasks - Liste des tâches à sauvegarder
 * @returns {void}
 */
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Récupère la liste des tâches depuis le localStorage
 * @returns {Array<Object>} Liste des tâches
 */
export function loadTasks() {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

/**
 * Ajoute une nouvelle tâche à la liste
 * @param {Object} task - La tâche à ajouter
 * @returns {void}
 */
export function addTask(task) {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

/**
 * Supprime une tâche de la liste par son ID
 * @param {number} taskId - ID de la tâche à supprimer
 * @returns {void}
 */
export function removeTask(taskId) {
  let tasks = loadTasks();
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks(tasks);
}

/**
 * Met à jour une tâche existante
 * @param {Object} updatedTask - La tâche mise à jour
 * @returns {void}
 */
export function updateTask(updatedTask) {
  let tasks = loadTasks();
  tasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(tasks);
}
