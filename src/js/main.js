const Typed = require('typed.js');
const $ = require('jquery');

$(window).on('load', function () {
    // Appeler la fonction pendant  2secondes
    const duree = 2000;
    setTimeout(counter, duree);
})

$(function () {
    navbar();
    home();
    validateForm()
})

function counter() {
    // fonction de compteur
    const counterElement       = $('.counter');
    const targetValue = 100;
    const duration    = 1500;

    let startValue    = 0;
    let startTime         = null;

    function updateCounter(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Calculer la progression

        const currentValue = Math.floor(progress * targetValue); // Calculer la valeur courante
        counterElement.text(currentValue + '%');

        if (progress < 1) {
            requestAnimationFrame(updateCounter); // Demander la prochaine mise à jour de l'animation
        }
    }

    requestAnimationFrame(updateCounter); // Démarrer l'animation du compteur

    setTimeout(function () {
        // Ajouter une animation de fondu (fade out)
        $('.loader-start').slideUp(2000, function () {
            // Code exécuté après la fin de l'animation
            console.log("L'élément a disparu !");
        });
    }, 1800)
    
}

function navbar() {
    let navbar      = $('#navbar');
    let header      = $('header');
    let btnMobile   = $('#btn-mobile');

    const home      =  $('#home');
    const about     = $('#about');
    const contact   = $('#contact');
    const portfolio = $('#portfolio');
    const blockTitle = $(".block-title");

    $('section').hide();
    home.show();

    // blockTitle.addClass('show')
    btnMobile.on('click', function () {
        $(this).toggleClass('show')
        navbar.toggleClass('show');
        header.toggleClass('show');
        // blockTitle.toggleClass('show')
    })

    $('.nav-link').on('click', function(e) {
        let dataLink = $(this).data('link')
        let $loader  = $('.loader');

        $loader.addClass('active');

        setTimeout(function () {
            btnMobile.removeClass('show');
            blockTitle.addClass('show')
            switch (dataLink) {
                case '#home':
                    home.fadeIn('100')
                    about.fadeOut('medium')
                    contact.fadeOut('medium')
                    portfolio.fadeOut('medium')
                    header.css('background', 'transparent')
                    break;
                case '#about':
                    about.fadeIn('100')
                    contact.fadeOut('medium')
                    // header.css('background', '#101010')
                    home.fadeOut('medium')
                    portfolio.fadeOut('medium')
                    break;
                case '#portfolio':
                    portfolio.fadeIn('100')
                    about.fadeOut('medium')
                    contact.fadeOut('medium')
                    home.fadeOut('medium')
                    // header.css('background', '#101010')
                    break;
                case '#contact':
                    contact.fadeIn('100')
                    about.fadeOut('medium')
                    home.fadeOut('medium')
                    portfolio.fadeOut('medium')
                    // header.css('background', '#101010')
                    break;
                default:
                    home.fadeIn('100')
                    about.fadeOut('medium')
                    contact.fadeOut('medium')
                    portfolio.fadeOut('medium')
                    header.css('background', 'transparent')
                    break;
            }
        }, 1200)

        if ($loader.hasClass('active')) {
            about.fadeOut(400)
            contact.fadeOut(400)
            portfolio.fadeOut(400)
            home.fadeOut(400)
        }

        // Ajoute la classe 'active'
        setTimeout(function () {
            navbar.removeClass('show');
            header.removeClass('show');
            
        }, 1)

        setTimeout(function() {
            $loader.removeClass('active');
        }, 2000);
    });
}

function home() {
    const typed = new Typed('#text-change', {
        strings: [
            "Développeur junior",
            "Freelencer",
            "étudiant"
        ],
        typeSpeed: 50,
        backSpeed: 60, // Vitesse de suppression des caractères
        backDelay: 1800,
        loop: true,
        smartBackspace: true, // Supprime seulement le texte qui a été tapé
        shuffle: false, // Désactive le mélange des phrases
    });
}

function validateForm() {
    // Validation du formulaire en temps réel
    $('#name').on('input', function() {
        let name = $(this).val();
        if (name.trim() === '' || name.length <= 2) {
            if (!$(this).hasClass('is-invalid')) {
                $(this).removeClass('valid').addClass('is-invalid');
                $(this).after('<span class="is-invalid">Veuillez renseigner votre nom et prénom</span>');
            }
        } else {
            $(this).removeClass('is-invalid').addClass('valid');
            $(this).next('.is-invalid').remove();
        }
    });

    $('#subject').on('input', function() {
        let subject = $(this).val();
        if (subject.trim() === '' || subject.length <= 2) {
            if (!$(this).hasClass('is-invalid')) {
                $(this).removeClass('valid').addClass('is-invalid');
                $(this).after('<span class="is-invalid">Pour quelle raison me contactez-vous ?</span>');
            }
        } else {
            $(this).removeClass('is-invalid').addClass('valid');
            $(this).next('.is-invalid').remove();
        }
    });

    $('#email').on('input', function() {
        let email = $(this).val();
        let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (email.trim() === '' || !emailRegex.test(email)) {
            if (!$(this).hasClass('is-invalid')) {
                $(this).removeClass('valid').addClass('is-invalid');
                $(this).after('<span class="is-invalid">Adresse email invalide !</span>');
            }
        } else {
            $(this).removeClass('is-invalid').addClass('valid');
            $(this).next('.is-invalid').remove();
        }
    });

    $('#message').on('input', function() {
        let message = $(this).val();
        if (message.trim() === '' || message.length <= 10) {
            if (!$(this).hasClass('is-invalid')) {
                $(this).removeClass('valid').addClass('is-invalid');
                $(this).after('<span class="is-invalid">Ce champ est obligatoire !</span>');
            }
        } else {
            $(this).removeClass('is-invalid').addClass('valid');
            $(this).next('.is-invalid').remove();
        }
    });

    // Soumission du formulaire
    $('.form').on('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        // Vérifier si tous les champs sont valides
        $('.form input, .form textarea').each(function() {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).removeClass('valid').addClass('is-invalid');
            }
        });

        if (isValid) {
            // Envoyer le formulaire
            $(this).off('submit').submit();
        }
    });
}






