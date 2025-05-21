/**
 * @fileoverview Gestion du stockage local des tâches
 * @author [flozze]
 * @version 1.0.0
 * @description Module responsable de la persistance des données dans le localStorage
 */

/**
 * Clé utilisée pour stocker les tâches dans le localStorage
 * @type {string}
 * @constant
 * @private
 */
const TASKS_KEY = "todo-tasks";

/**
 * Sauvegarde la liste des tâches dans le localStorage
 * @param {Array<Object>} tasks - Liste des tâches à sauvegarder
 * @returns {void}
 * 
 * @example
 * saveTasks([
 *   { id: 1, content: "Faire les courses", completed: false }
 * ]);
 */
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Récupère la liste des tâches depuis le localStorage
 * @returns {Array<Object>} Liste des tâches sauvegardées
 * 
 * @example
 * const tasks = loadTasks();
 * console.log(tasks); // [{ id: 1, content: "Faire les courses", completed: false }]
 */
export function loadTasks() {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

/**
 * Ajoute une nouvelle tâche à la liste
 * @param {Object} task - La tâche à ajouter
 * @returns {void}
 * 
 * @example
 * addTask({
 *   id: 1,
 *   content: "Faire les courses",
 *   completed: false
 * });
 */
export function addTask(task) {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

/**
 * Supprime une tâche de la liste
 * @param {number} taskId - L'identifiant de la tâche à supprimer
 * @returns {void}
 * 
 * @example
 * removeTask(1);
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
 * 
 * @example
 * updateTask({
 *   id: 1,
 *   content: "Faire les courses",
 *   completed: true
 * });
 */
export function updateTask(updatedTask) {
  let tasks = loadTasks();
  tasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(tasks);
}
