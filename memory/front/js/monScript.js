/******************************************************
 *                     IMPORTANT                      *
 *                                                    *
 *  Pour comprendre au mieux ces sources, veuillez    *
 *  commencer par lire la première fonction exécutée. *
 *  Elle se situe en toute fin de ce fichier pour des *
 *  raison d'optimisation d'exécution.                *  
 *                                                    *
 ******************************************************/

// Variables disponibles à l'ensemble des fonctions.
//Les constantes dont la valeur ne sera pas modifiée durant l'exécution du programme.
const tableauAleatoire = [];
const time = 200000;
const nbPaire = 14;

//Les variables dont la valeur sera modifiée durant l'exécution du programme.
let carteUne = null;
let carteDeux = null;
let resultat = 0;
let interval;
let premierClic = false;
let currentTime = 0;

/**
 * Fait évoluer la barre de progression.
 */
function miseAJourBarreDeProgression() {
    currentTime += 200;

    const tailleBarre = 100;
    // Nombre de secondes pour reussir le jeu.
    const tpsMaxSec = time / 1000;
    // Temps écloué en seconde.
    const tpsCourant = currentTime / 1000;
    // Taille de la barre de chargement dont la taille est proportionnelle au ratio temps écoulé / temps max.
    const progress = (tailleBarre * (tpsCourant)) / tpsMaxSec;

    // On modifie le remplissage de la barre de chargement.
    $('#progress-bar-remplissage').css('width', progress + '%');

    // Selon la valeur de la barre de chargement, on change de couleur. (vert puis orange puis rouge)
    switch (true) {
    case progress > 33 && progress < 66:
        $('#progress-bar-remplissage').css('background-color', '#FFA500');
        break;
    case progress > 66:
        $('#progress-bar-remplissage').css('background-color', '#FF0000');
        break;
    default: break;
    }

    // Si le temps est écoulé, on indique au joueur qu'il a perdu.
    // Puis on réinitialise le jeu.
    if (currentTime >= time) {
        window.clearInterval(interval);
        window.setTimeout(function () {
            alert('Vous avez perdu !');
            raz();
        }, 1000);
    }
}

/**
 * Démarre la barre de progression.
 */
function startTimer() {
    console.log('Entrée dans la fonction startTimer().');
    interval = window.setInterval(function () {
        miseAJourBarreDeProgression();
    }, 200);
}

/**
 * Cette fonction permet d'afficher les résultats.
 */
function afficherResultats() {
    console.log('Entrée dans la fonction afficherResultats().');
     let contenuMeilleursScores = '<b>Meilleurs scores</b>';
    $.ajax({
        url: 'back/Api.php', // La ressource ciblée.
        type: 'GET', // Le type de la requête HTTP.
    }).done(function( data ) { //Une fois le résultat recu
        //On transforme le contenu en JSON
        var test = JSON.parse(data);
        //On traite chaque élément (score) du JSON.
        for (let score of test) {
            contenuMeilleursScores += '<br>' + score/1000 + ' sec';
        }
        $('#scores').html(contenuMeilleursScores);
    });   
}

/**
 *
 * Permet de gérer les actions lors d'un clic sur une carte.
 *
 * @param carte carte sur laquelle on a cliqué.
 */
function gererClicSurCarte(carte) {
    console.log('Entrée dans la fonction gererClicSurCarte().');
    // Detecte si c'est le premier clic
    if (premierClic === false) {
        premierClic = true;
        startTimer();
    }

    // Désactive le clic sur les autres cartes cachées.
    $('.carte-cachee').off('click');
    // Fait apparaitre la carte sur laquelle on a cliqué.
    $(carte).hide();
    $(carte).parent().children('.carte-visible').show();

    // Si on retourne la premiere carte de la paire à analyser.
    if (carteUne == null) {
        carteUne = carte;
        console.log(carteUne + ' ' + $(carteUne).attr('class'));
        $('.carte-cachee').on('click',function () {
            gererClicSurCarte(this);
        });
    }
    // Si on retourne la seconde carte de la paire à analyser.
    else if (carteDeux == null) {
        carteDeux = carte;
        // Si les deux cartes sont identiques
        if ($(carteUne).parent().children('.carte-visible').attr('data-carte') === $(carteDeux).parent().children('.carte-visible').attr('data-carte')) {
            carteUne = null;
            carteDeux = null;
            resultat++;
            console.log('OK : ' + resultat);
            $('.carte-cachee').click(function () {
                gererClicSurCarte(this);
            });

            if (resultat === nbPaire) {
                window.setTimeout(function () {
                    gagner();
                }, 200);
            }
        }
        // Si les deux cartes ne sont pas identiques
        else {
            window.setTimeout(function () {
                cacher();
            }, 400);
        }
    }
}

/**
 * Permet de construire l'ihm.
 */
function distribuerLesCartes() {
    console.log('Entrée dans la fonction distribuerLesCartes().');
    for (let i = 0; i < tableauAleatoire.length; i++) {
        $('#jeu').html($('#jeu').html() + getCodeDUneCarte(tableauAleatoire[i]));
    }
    $('.carte-visible').hide();
}

/**
* Permet de remplir le tableau tableauAleatoire avec des nombres aléatoires compris entre 1 et 14.
*/
function melanger() {
    console.log('Entrée dans la fonction melanger().');
    let index = 0;
    for (let y = 1; y <= 2; y++) {
        for (let i = 1; i <= nbPaire; i++) {
            tableauAleatoire[index++] = i;
        }
    }

    tableauAleatoire.sort(()=> Math.random() - 0.5);
}

/**
 * Initialise le jeu
 */
function initialisation() {
    console.log('Entrée dans la fonction initialisation().');
    // Mélange les cartes
    melanger();
    // Affiche les cartes de manière cachée.
    distribuerLesCartes();
    // Ajoute un évènement sur chaque carte cachée.
    $('.carte-cachee').on('click', function () {
        gererClicSurCarte(this);
    });
    // Permet d'afficher les résultats.
    afficherResultats();
}

/**
 * Remet le jeu à zéro;
 */
function raz() {
    console.log('Entrée dans la fonction raz().');
    carteUne = null;
    carteDeux = null;
    resultat = 0;
    premierClic = false;
    currentTime = 0;
    // Met la barre de chargement à zéro.
    $('#progress-bar-remplissage').css('width', '0%');
    // Supprime les evenements sur les images cachées.
    $('.hidden').off();
    // Vide le contenu du jeu
    $('#jeu').html('');
    // Initialise le jeu
    initialisation();
}

/**
*Fournit le code HTML d'une carte.
*
* @param index index de la carte entre 1 et 14
* @returns {string} le code html permettant l'affichage de la carte.
*/
function getCodeDUneCarte(index) {
    let indexLocal = index;
    if (indexLocal > 14) {
        indexLocal -= 14;
    }
    return '<div class="zone-de-selection"><div class="carte carte-cachee"></div><div class="carte carte-visible fruit'+index+'" data-carte="' + index + '" ></div></div>';
}

/**
 * Permet de cacher la paire d'image non identique.
 */
function cacher() {
    console.log('Entrée dans la fonction cacher().');
    $(carteUne).parent().children('.carte-cachee').show();
    $(carteUne).parent().children('.carte-visible').hide();

    $(carteDeux).parent().children('.carte-cachee').show();
    $(carteDeux).parent().children('.carte-visible').hide();
    carteUne = null;
    carteDeux = null;
    $('.carte-cachee').on('click', function () {
        gererClicSurCarte(this);
    });
}

/**
 * Cette fonction permet d'insérer un résultat dans la bdd.
 */
function insererResultat(temps) {
    console.log('Entrée dans la fonction insererResultat(temps). temps = ' + temps);
    var $t = $.post({
        url: "back/Api.php", // La ressource ciblée.
        type: "POST", // Le type de la requête HTTP.
        data: "temps=" + temps // Un paramètre.
    }).promise();
}

/**
 * Action effectuée lorsque le joueur gagne.
 */
function gagner() {
    console.log('Entrée dans la fonction gagner().');
    insererResultat(currentTime);
    alert('Vous avez gagné !');
    window.clearInterval(interval);
    raz();
}

// Première fonction executée et executée après le chargement de la page html.
$(function () {
    console.log('Entrée dans la fonction ready().');
    //Appele de la fonction qui initialise le jeu.
    initialisation();
});