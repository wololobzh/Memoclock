<?php

/**
 * Classe contenant les accesseurs statiques pour récupérer les paramètres de configuration.
 */
class Configuration
{
    /**
     * Retourne l'adresse du serveur de base de données.
     * 
     * @return string représentant l'adresse du serveur de base de données.
     */
    public static function getHost():string
    {
        return self::_get('mysql_host');
    }

    /**
     * Retourne le nom de la base de données.
     * 
     * @return string représentant le nom de la base de données.
     */
    public static function getBaseDeDonnees():string
    {
        return self::_get('mysql_db');
    }

    /**
     * Retourne le login pour accèder à la base de données.
     * 
     * @return string représentant le login pour accèder à la base de données.
     */
    public static function getLogin():string
    {
        return self::_get('mysql_user');
    }

    /**
     * Retourne le mot de passe pour accèder à la base de données.
     * 
     * @return string représentant le mot de passe pour accèder à la base de données.
     */
    public static function getMotDePasse():string
    {
        return self::_get('mysql_pwd');
    }

    /**
     * Fonction générique pour récupérer un paramètre de configuration.
     * Cette fonction est succeptible de remonter une erreur en cas d'absence d'un paramètre.
     * 
     * @param $name représente le nom du paramètre à récupérer.
     * 
     * @return string représente la valeur du paramètre fournit à la fonction _get.
     */
    private static function _get(String $name):string
    {
        if (!isset($GLOBALS['memoryConfig'][$name])) {
            throw new Exception("Configuration pour $name manquante.");
        }
        return $GLOBALS['memoryConfig'][$name];
    }
}