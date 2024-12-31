//base de datos local de preguntas
const bd_juego = [
    {
        id: 0,
        pregunta: "¿Como se mide un grafo de arbol?",
        op0: "De la raiz hasta la ultima hoja",
        op1: "Desde el tronco hasta la ultima hoja",
        op2: "De la raiz hasta la ultima rama",
        correcta: "0"
    },
    {
        id: 1,
        pregunta: "Resolver (-1)^20",
        op0: "20",
        op1: "1",
        op2: "-1",
        correcta: "1"
    },
    {
        id: 2,
        pregunta: "Calcula la primer derivada de f(x) = 2x + 4x^2",
        op0: "2x + 8x^2",
        op1: "2 + 4x",
        op2: "2 + 8x",
        correcta: "2"
    },
    {
        id: 3,
        pregunta: "Resuelve la siguiente operacion (2x + 8)(4x^5 - 6)",
        op0: "8x^6 - 12x + 35x^5 - 48",
        op1: "12x^5 + 48 - 12x^3",
        op2: "2x + 8 + 4x^5 - 6",
        correcta: "0"
    },
    {
        id: 4,
        pregunta: "¿Cuál es el conjunto al que se le nombra El que contiene todo?",
        op0: "Vacio",
        op1: "Todo",
        op2: "Universo",
        correcta: "2"
    },
    {
        id: 5,
        pregunta: "Ejemplos de numeros naturales",
        op0: "1/3,- 2/3, - 4/5",
        op1: "1,2,3",
        op2: "-1,-2,-3",
        correcta: "1"
    },
    {
        id: 6,
        pregunta: "¿Cuáles son ejemplos de numeros perfectos?",
        op0: "28,496",
        op1: "27,495",
        op2: "3,5",
        correcta: "0"
    },
    {
        id: 7,
        pregunta: "¿Ejemplos de numeros primos?",
        op0: "4,8,16",
        op1: "20,24,36",
        op2: "2,3,5",
        correcta: "2"
    },
    {
        id: 8,
        pregunta: "¿Cual es el simbolo de la negacion en conjuntos?",
        op0: "U",
        op1: "^",
        op2: "~",
        correcta: "2"
    },
    {
        id: 9,
        pregunta: "Resuelve el siguiente binomio (4x + 8)^2",
        op0: "16x^2 + 64x + 64",
        op1: "20x^2 + 30 + 34",
        op2: "16x^2 + 64x + 34",
        correcta: "0"
    },
    {
        id: 10,
        pregunta: "Resuelve (-2) - (+7) - (-12) + (5)",
        op0: "17",
        op1: "6",
        op2: "8",
        correcta: "2"
    },
    {
        id: 11,
        pregunta: "Nombre con el que se le conoce a al sistema numerico en base 8",
        op0: "Base 8",
        op1: "Octal",
        op2: "Hexadecimal",
        correcta: "1"
    },
    {
        id: 12,
        pregunta: "Tabla que se usa para corroborar que algo es verdad",
        op0: "Tabla",
        op1: "Tabla de verdad",
        op2: "Diagrama de verdad",
        correcta: "1"
    },
    {
        id: 13,
        pregunta: "¿Que es un grafo plano?",
        op0: "Aquel que se puede dibujar",
        op1: "Aquel que se dibuja sin que sus aristas se toquen",
        op2: "Aquel que tiene un ciclo",
        correcta: "1"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas() {
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0", pregunta.op0);
    const label2 = crearLabel("1", pregunta.op1);
    const label3 = crearLabel("2", pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que retornará el label con todo su contenido
function crearLabel(num, txtOpcion) {
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta + "," + num + ")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for (i = 0; i < bd_juego.length; i++) {
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida) {
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function () {
    //recorro el arreglo que tiene las respuestas y comparo
    for (i = 0; i < bd_juego.length; i++) {
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if (pregunta.correcta == respuestas[i]) { //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        } else {//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0, 0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (14 - cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}