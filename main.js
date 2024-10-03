let pantalla = document.getElementById('pantalla');
let operacionActual = '';
let operador = '';
let primerNumero = '';
let segundoNumero = '';
let resultado = '';

const botonesNumericos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operadores = {
    sumar: '+',
    restar: '-',
    multiplicar: 'x',
    dividir: '÷'
};

function actualizarPantalla(valor) {
    pantalla.textContent = valor;
}

function limpiar() {
    pantalla.textContent = '0';
    operacionActual = '';
    operador = '';
    primerNumero = '';
    segundoNumero = '';
    resultado = '';
}

function agregarNumero(numero) {
    if (operacionActual !== '') {
        segundoNumero += numero;
        actualizarPantalla(operacionActual + segundoNumero);
    } else {
        primerNumero += numero;
        actualizarPantalla(primerNumero);
    }
}

function agregarDecimal() {
    if (operacionActual !== '') {
        if (!segundoNumero.includes('.')) {
            segundoNumero += '.';
            actualizarPantalla(operacionActual + segundoNumero);
        }
    } else {
        if (!primerNumero.includes('.')) {
            primerNumero += '.';
            actualizarPantalla(primerNumero);
        }
    }
}

function operar(op) {
    if (primerNumero === '') return;
    
    if (segundoNumero !== '') {
        calcular();
        primerNumero = resultado.toString();
        segundoNumero = '';
    }
    
    operador = op;
    operacionActual = primerNumero + ' ' + operador + ' ';
    actualizarPantalla(operacionActual);
}

function calcular() {
    if (segundoNumero === '') return;
    
    const num1 = parseFloat(primerNumero);
    const num2 = parseFloat(segundoNumero);
    
    switch (operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case 'x':
            resultado = num1 * num2;
            break;
        case '÷':
            resultado = num1 / num2;
            break;
    }
    
    actualizarPantalla(resultado);
    primerNumero = resultado.toString();
    segundoNumero = '';
    operacionActual = '';
}

function cambiarSigno() {
    if (operacionActual === '') {
        primerNumero = (-parseFloat(primerNumero)).toString();
        actualizarPantalla(primerNumero);
    } else {
        segundoNumero = (-parseFloat(segundoNumero)).toString();
        actualizarPantalla(operacionActual + segundoNumero);
    }
}

function porcentaje() {
    if (operacionActual === '') {
        primerNumero = (parseFloat(primerNumero) / 100).toString();
        actualizarPantalla(primerNumero);
    } else {
        segundoNumero = (parseFloat(segundoNumero) / 100).toString();
        actualizarPantalla(operacionActual + segundoNumero);
    }
}

document.getElementById('ac').addEventListener('click', limpiar);
document.getElementById('cambiarSigno').addEventListener('click', cambiarSigno);
document.getElementById('porcentaje').addEventListener('click', porcentaje);
document.getElementById('igual').addEventListener('click', calcular);
document.getElementById('decimal').addEventListener('click', agregarDecimal);

for (let numero of botonesNumericos) {
    document.getElementById(numero).addEventListener('click', function() {
        agregarNumero(numero);
    });
}

for (let [operadorId, simbolo] of Object.entries(operadores)) {
    document.getElementById(operadorId).addEventListener('click', function() {
        operar(simbolo);
    });
}
