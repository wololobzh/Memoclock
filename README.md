# Memory

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  [![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](http://forthebadge.com)


## Objectifs
Ce jeu de mémoire sert de base pédagogique pour vous aider à réaliser vos futurs projets web. Il a été réalisé de la manière la plus simple possible avec beaucoup de commentaires en français pour un maximum de compréhension.

## Prérequis pour aborder ce projet

- Avoir les bases en HTML.
- Avoir les bases en CSS et SCSS.
- Avoir les bases en JavaScript.
- Avoir les bases en JQuery.
- Avoir les bases en PHP.
- Avoir les bases en SQL.
- Avoir une tasse de café ou de thé.

## Contenu

### Le jeu (partie front) : créé avec HTML / SCSS / JavaScript (JQuery + Ajax + JSon)

Le jeu est totalement géré en JavaScript, il y a des appels Ajax pour gérer les scores via des composants d'accès à une base de données.

Points notables :
- main.scss : Utilisation de variables, d'une mixin,d'une boucle for et deux concaténations de sélecteurs en scss.
- Ajax : Un accès en GET et une modification en POST.
- JSon : Récupération de données en JSon.
- JQuery : Utilisation de nombreuses fonctionnalités.

### Api : créée en PHP 100% Natif

On récupère les appels Ajax pour faire ensuite des appels aux composants d'accès aux données.

Points notables :
- Récupération d'un paramètre d'une requête de type POST.
- Utilisation d'une regex.
- Transformation d'un tableau en JSon.

### Les composants d'accès aux données : créés en PHP 100% Natif

Une première fonction permet d'insérer des valeurs en base de données et une seconde fonction permet de récupérer des informations en base de données.

Points notables :
- Utilisation de PDO.
- Gestion des erreurs.
- Utilisation des logs.
- Utilisation d'une requête préparée.
- Composants codés en objet.

### Serveur de base de données : MySQL

Ce projet a été développé avec un serveur de base de données MySQL et le client SQL PhpMyAdmin a été utilisé.

Points notables :
- La clé primaire de la table Scores est auto incrémentée.

### Déploiement

Le déploiement est possible avec Docker.

Conteneurs déployés :
- Un serveur de base de données MySQL.
- Un client de base de données PhpMyAdmin.
- Un module PHP 7.4.
- Un serveur web nginx.

## Mise en place

### Avec Docker

#### Prérequis

Avoir Docker sur votre poste.

#### Procédure

1. Clonez le repo ou vous voulez grâce à cette commande :

```
git clone git@github.com:wololobzh/Memoclock.git
```

2. Positionnez vous dans le dossier du repo puis exécutez ces deux commandes :

```
docker-compose build

docker-compose up
```

3. Jouez :)

En vous connectant à cette adresse : http://localhost:14540

### Sans Docker

Pour tester le jeu vous devez :

1. Avoir WAMP ou XAMP en cours d'exécution sur votre poste.

2. Créer une base de données nommée 'bdd_memory' sur votre serveur MySQL via phpMyAdmin.

3. Définir le contenu de la base de données grâce au script SQL du fichier [scripts/ddl.sql](https://github.com/wololobzh/Memoclock/blob/master/scripts/ddl.sql)  du repo git. 

4. Mettre le dossier memory dans le dossier nommé 'www' de votre WAMP ou XAMP.

5. Modifier le fichiers [www/memory/back/config/Settings.php](https://github.com/wololobzh/Memoclock/blob/master/memory/back/config/Settings.php) en indiquant vos propres paramètres pour accèder à votre serveur de base de données. (Un exemple de configuration en commentaire est disponible dans le fichier Settings.php)

6. Accéder au jeu via un navigateur à l'adresse http://localhost/memory

## Screenshot

### Commencement du jeu

![Commencement du jeu](/assets/screenshot001.PNG)

### Durant la partie

![Durant la partie](/assets/screenshot002.PNG)

### Partie gagnée

![Partie gagnée](/assets/screenshot003.PNG)

### Partie perdue

![Partie perdue](/assets/screenshot004.PNG)

Si vous avez des questions n'hésitez pas à questionner votre formateur.

**Ciao et bon dev !**

Anthony