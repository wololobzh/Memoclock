<?php

// Récupération des sources nécessaires.
require_once "config/Settings.php";
require_once "config/Configuration.php";
require_once "dal/TimeDao.php";




//Création d'une instance de notre composant d'accès aux données.
$dao = new TimeDao();

// Si Api.php est appelé avec le paramètre 'temps' 
// alors on est dans le cas ou l'on désire enregistrer un temps sinon $temps
// sera éqal à false
$temps = $_POST['temps'] ?? false;

//On test aussi que le paramètre est bien un entier.
if ($temps !== false && preg_match('/^\d+$/', $temps, $matches)) {
    $dao->insert($temps);
} else { // Sinon on est dans le cas ou l'on désire récupérer les meilleurs temps.
    // Récupération d'un tableau avec les meilleurs résultats.
    
    $meilleursTemps = $dao->getTroisMeilleursScores();
    // Retourne les meilleurs scors sous forme de json.
    echo json_encode($meilleursTemps);
}
