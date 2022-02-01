/**
 * 2C = TWO OF CLUBS
 * 2H = TWO OF HEARTS
 * 2D = TWO OF DIAMONDS
 * 2S = TWO OF SPADES
 */

(() => {
    'use strict'


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    const puntosHTML = document.querySelectorAll('small');
    const alerts = document.querySelector('#alert');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck;
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

    }

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        deck = []:
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        return _.shuffle(deck);
    };

    const pedirCarta = () => {
        if (deck.length == 0) {
            throw 'There are no cards on the deck';
        }
        return deck.pop();
    };

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
    };

    const acumularPuntos = () => {


    }
    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const cartas = document.createElement('img');
            cartas.classList.add('carta');
            cartas.src = `assets/cartas/${carta}.png`;

            divCartasComputadora.append(cartas);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        const cartas = document.createElement('img');
        const alert = document.createElement('div');
        cartas.classList.add('carta');
        cartas.src = `assets/cartas/${carta}.png`;

        divCartasJugador.append(cartas);

        if (puntosJugador > 21) {
            alert.classList.add('alert');
            alert.classList.add('alert-danger');
            alert.innerText = 'Perdiste';
            alert.role = 'alert';
            alerts.append(alert);
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('genial');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }


    });

    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);

    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });

})();

