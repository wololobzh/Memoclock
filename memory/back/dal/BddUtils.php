<?php

/**
 * Classe contenant les fonctions génériques utiles pour manipuler la base de données.
 */
class BddUtils
{
    /**
     * Permet de récuperer une variable représentant la connexion à la bdd.
     * 
     * @return PDO
     */
    public static function getConnexion(): PDO
    {
        return $pdo = new PDO('mysql:host='.Configuration::getHost().';dbname='.Configuration::getBaseDeDonnees(), Configuration::getLogin(), Configuration::getMotDePasse());
    }
}