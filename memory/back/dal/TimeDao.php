<?php

require_once "BddUtils.php";

/**
 * Composant d'accès aux données pour insérer et récuperer les meilleurs scrores.
 */
class TimeDao
{
    /**
     * Retourne les trois meilleurs scores.
     * 
     * @return array Tableau contenant les trois meilleurs scores
     */
    public function getTroisMeilleursScores()
    {
        //try catch utilisé car nous sommes dans un code à risque étant donné 
        // que l'on se connecte à une base de données. Une base de données est 
        // un élément extérieur que l'on ne maîtrise pas.
        try {
            // Récupération d'une variable représentant une connexion à la bdd.
            $cnx = BddUtils::getConnexion();

            // Création d'une requête sans marqueurs de substitution.
            $requete = $cnx->query('SELECT temps FROM Scores ORDER BY temps ASC LIMIT 3');

            // On exécute la requête.
            $requete->execute();

            // Récupération du résultat.
            $resultat = $requete->fetchAll(\PDO::FETCH_COLUMN);

            // On ferme la connexion
            $cnx = null;

            // On retourne le résultat.
            return $resultat;
        }
        // Si il y a une erreur
        catch (Exception $e) {
            // On log l'info afin de mieux comprendre le problème et pour la maintenance.
            error_log("Erreur dans la fonction getTroisMeilleursScores : " . $e);
            // On quitte le script.
            die();
        }
    }

    /**
     * Permet d'insérer un temps dans la table.
     * 
     * @param $temps Temps à insérer
     * 
     * @return void
     */
    public function insert($temps): void
    {
 
        // Code à risque étant donné que l'on se connecte à une base de données
        // La base de données est un élément exterieur que l'on ne maîtrise pas.
        try {
            // Récupération d'une variable représentant une connexion à la bdd.
            $cnx = BddUtils::getConnexion();

            $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Création d'une requête contenant un paramètre (?).
            // On met la valeur null pour la colonne id car elle est auto incrementée.
            $requete = $cnx->prepare("INSERT INTO Scores (`id`, `temps`) VALUES (NULL, ?)");

            // On remplace le paramètre 1 par la valeur du temps passé en paramètre de la fonction.
            $requete->bindValue(1, $temps, PDO::PARAM_INT);

            // On exécute la requete.
            $resultat = $requete->execute();

            // On ferme la connexion
            $cnx = null;
        }
        // Si il y a une erreur
        catch (Exception $e) {
            // On log l'info afin de mieux comprendre le problème et pour la maintenance.
            error_log("Erreur dans la fonction insert : " . $e);
            // On quitte le script.
            die();
        }
    }
}
