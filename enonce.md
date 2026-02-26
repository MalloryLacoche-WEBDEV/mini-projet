# 📌 Projet React – Générateur dynamique de tableau de besoins en protéines

## 🎯 Objectif du projet

L’objectif de ce projet est de concevoir une **application web en React** permettant de générer **dynamiquement un tableau de besoins journaliers en protéines** en fonction de plusieurs paramètres choisis par l’utilisateur.

Ce projet vise à vous faire pratiquer :

* la manipulation des **composants React**
* la gestion de l’**état (state)**
* le **rendu conditionnel**
* la **génération dynamique de données**
* la création d’une **interface utilisateur interactive**

---

## 🧠 Contexte fonctionnel

Les besoins journaliers en protéines dépendent :

* du **poids de corps**
* de l’**objectif sportif**

Les recommandations utilisées dans ce projet sont exprimées en **grammes de protéines par kilogramme de poids corporel et par jour**, selon les objectifs suivants :

| Objectif                            | Besoin en protéines |
| ----------------------------------- | ------------------- |
| Sédentaire                          | 0,8 – 1,0 g/kg/jour |
| Endurance                           | 1,2 – 1,6 g/kg/jour |
| Conservation de la masse musculaire | 1,6 – 1,8 g/kg/jour |
| Prise de masse musculaire           | 1,8 – 2,2 g/kg/jour |

---

## 🧩 Fonctionnalités attendues

Votre application devra permettre à l’utilisateur de :

1. **Sélectionner un ou plusieurs objectifs** parmi ceux proposés
2. **Définir un poids minimum** (en kg)
3. **Définir un poids maximum** (en kg)
4. **Choisir le nombre de lignes** à afficher entre le poids minimum et le poids maximum

À partir de ces paramètres, l’application devra générer **automatiquement un tableau** contenant :

* une ligne par poids calculé
* pour chaque objectif sélectionné :

  * la **plage de besoins en protéines en grammes par jour**

---

## 📊 Rendu attendu

Le tableau généré devra contenir au minimum :

* une colonne **Poids (kg)**
* une colonne par **objectif sélectionné**
* pour chaque cellule :

  * une valeur sous forme de **plage** (exemple : `112 – 126 g/jour`)

👉 Exemple de poids générés :

* Poids minimum : 50 kg
* Poids maximum : 100 kg
* Nombre de lignes : 6
  → Poids affichés : 50, 60, 70, 80, 90, 100 kg

---

## ⚙️ Contraintes techniques

* Les calculs doivent être effectués **dynamiquement** à partir des données utilisateur
* Aucune valeur du tableau ne doit être écrite en dur (hardcodée)
* Le code doit être :

  * lisible
  * structuré
  * correctement commenté

---

## 🌟 Bonus (facultatif)

Pour aller plus loin, vous pouvez :

* ajouter une **validation des champs** (poids min < poids max, valeurs positives, etc.).
* rendre toute la web app **responsive**.
* permettre l’export du tableau (CSV, PDF, etc.).

