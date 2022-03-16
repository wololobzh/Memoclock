 -- On se positionne dans la base de données bdd_memory afin 
 -- que les reqêtes suivantes soient prises en comptes par la base de données bdd_memory.
USE bdd_memory;

-- Création d'une table pour enregistrer les scrores
-- colonne id pour respect de la 2 deuxième forme normale et une colonne pour enregistrer le temps.
CREATE TABLE `Scores` ( `id` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT , `temps` INT NOT NULL);