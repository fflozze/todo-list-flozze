# Todo List Flozze 📝

Une application de gestion de tâches moderne et intuitive, développée avec HTML, CSS et JavaScript. ✅

## Description 📋

Ce projet est une application de gestion de tâches (Todo List) qui permet aux utilisateurs de créer, valider et supprimer des tâches. L'application utilise le localStorage pour persister les données et offre une interface utilisateur moderne et responsive. 🎨

## Fonctionnalités ✨

- Création de nouvelles tâches. ➕
- Validation/dévalidation des tâches. ✅
- Suppression des tâches. 🗑️
- Persistance des données avec localStorage. 💾
- Interface utilisateur moderne et responsive. 🎨
- Animations et effets visuels pour une meilleure expérience utilisateur. ✨
- Design adaptatif pour tous les appareils (desktop, tablette, mobile). 📱
- Effets de lueur (text-shadow) sur les éléments interactifs. ✨

## Structure du Projet 📂

todo-list-flozze/ \
│ \
├── css/ \
│ ├── style.css : Fichier CSS principal pour les styles de l'application. 🎨 \
│ ├── task/ \
│ │ ├── task.css : Styles spécifiques aux éléments de tâche. 📋 \
│ │ └── add-task.css : Styles pour le formulaire d'ajout de tâche. ➕ \
│ ├── root/ \
│ │ ├── color.css : Variables et constantes de couleurs. 🎨 \
│ │ └── font.css : Configuration des polices d'écriture. 🖌️ \
│ ├── media-query/ \
│ │ ├── media-handler.css : Fichier principal qui importe toutes les media queries. 📱 \
│ │ ├── media-992px.css : Styles pour écrans jusqu'à 992px (tablettes). 📱 \
│ │ ├── media-768px.css : Styles pour écrans jusqu'à 768px (grands mobiles). 📱 \
│ │ └── media-576px.css : Styles pour écrans jusqu'à 576px (petits mobiles). 📱 \
│ └── font/ \
│ └── Orbitron-VariableFont_wght.ttf : Police personnalisée Orbitron. 🖌️ \
│ \
├── js/ \
│ ├── index.js : Point d'entrée principal de l'application. 📜 \
│ ├── create-task.js : Gestion de la création et du rendu des tâches. ➕ \
│ ├── validate-task.js : Gestion de la validation des tâches. ✅ \
│ ├── delete-task.js : Gestion de la suppression des tâches. 🗑️ \
│ └── local-storage.js : Gestion du stockage local des données. 💾 \
│ \
├── index.html : Structure HTML principale de l'application. 📄 \
└── README.md : Documentation du projet. 📖

## Installation 🛠️

Pour exécuter ce projet localement, suivez ces étapes :

1. Clonez le dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/todo-list-flozze.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd todo-list-flozze
   ```

3. Ouvrez le fichier index.html dans votre navigateur web préféré. 🌐

## Utilisation 💻

1. Pour ajouter une nouvelle tâche :

   - Saisissez le texte de la tâche dans le champ de saisie
   - Cliquez sur le bouton "+" ou appuyez sur Entrée

2. Pour valider/dévalider une tâche :

   - Cliquez sur la case à cocher ou le symbole à côté de la tâche

3. Pour supprimer une tâche :
   - Cliquez sur l'icône de corbeille à côté de la tâche

## Responsive Design 📱

L'application s'adapte à différentes tailles d'écran :

- **Desktop** (> 992px) : Interface complète avec tailles de police standard
- **Tablettes** (≤ 992px) :
  - Labels : 1.4rem
  - Boutons : 40px
- **Grands mobiles** (≤ 768px) :
  - Labels : 1.2rem
  - Boutons : 36px
- **Petits mobiles** (≤ 576px) :
  - Titre : 2rem
  - Labels : 1rem
  - Champ de saisie : 200px de large avec ombre de texte de 3px
  - Boutons : 32px x 32px

## Effets Visuels 🎨

L'application utilise plusieurs effets visuels pour améliorer l'expérience utilisateur :

- **Text-shadow** :
  - Champ de saisie : 1px de lueur
  - Bouton de validation : 5px de lueur verte lors de la validation
  - Bouton de suppression : 4px de lueur
- **Box-shadow** :
  - Tâches validées : 10px de lueur verte
  - Tâches non validées : 10px de lueur rouge
  - Boutons : 10px de lueur adaptée à leur état
- **Border** :
  - Tâches validées : 2px de bordure verte
  - Tâches non validées : 2px de bordure rouge
  - Bouton de validation : 2px de bordure verte/rouge selon l'état
  - Bouton de suppression : 2px de bordure rouge foncé

## Documentation 📖

La documentation du code est générée avec JSDoc. Pour générer la documentation, suivez ces étapes :

1. Installez JSDoc globalement si ce n'est pas déjà fait :

   ```bash
   npm install -g jsdoc
   ```

2. Générez la documentation en exécutant la commande suivante dans le répertoire du projet :

   ```bash
   jsdoc js/index.js js/create-task.js js/validate-task.js js/delete-task.js js/local-storage.js
   ```

3. Ouvrez le fichier index.html dans le dossier out pour visualiser la documentation.

## Fonctionnalités Techniques 🔧

- Utilisation des modules ES6 pour une meilleure organisation du code
- Gestion d'état avec localStorage pour la persistance des données
- Manipulation du DOM pour une interface dynamique
- Gestion des événements pour l'interactivité
- Styles CSS modernes avec variables et animations
- Media queries pour un design responsive
- Organisation modulaire des fichiers CSS

## Auteur 👨‍💻

**Flozze**
