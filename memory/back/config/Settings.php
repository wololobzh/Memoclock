<?php

// Définition de variables globales afin d'être utilisées 
// dans les fonctions de configuration de la base de données.
global $memoryConfig;

$memoryConfig = [
    'mysql_host' => getenv('MYSQL_HOST'),
    'mysql_pwd' => getenv('MYSQL_PWD'),
    'mysql_user' => getenv('MYSQL_USER'),
    'mysql_db' => getenv('MYSQL_DB'),
];

/*
    Exemple d'utilisation si vous n'utilisez pas Docker.

    global $memoryConfig;

    $memoryConfig = [
        'mysql_host' => 'localhost', //Nom du serveur.
        'mysql_pwd' => '', // Mot de passe de l'utilisateur.
        'mysql_user' => 'root', // Nom de l'utilisateur.
        'mysql_db' => 'bdd_memory', // Nom de la base de données.
    ];

*/
