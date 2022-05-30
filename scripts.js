//Clase unica para contener los datos de la palabra
class Paso {
    constructor(palabra_original, palabra_traducida, imagen, opciones) {
        this.palabra_original = palabra_original;
        this.palabra_traducida = palabra_traducida;
        this.imagen = imagen;
        this.opciones = opciones;
        
    }
}

//Casos de ejemplo para crear los pasos deseados
const paso1 = new Paso('Sol','Sun','sun.png',['Sunshine', 'Sun','Moon']);
const paso2 = new Paso('Auto','Car','car.png',['Car', 'Automovil','Truck']);
const paso3 = new Paso('Flor','Flower','flower.png',['Florsiña', 'Flowering','Flower']);

//Aca esta el array de pasos para utilizar durante el recorrido
const pasos = [paso1,paso2,paso3];

//Aca se inicializa el primer paso
let paso_actual = 0;

//Evento que se ejecuta cuando la pagina carga por primera vez
document.addEventListener("DOMContentLoaded", function(){
  renderPaso(paso_actual);
});

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
document.getElementById('btnValidar').addEventListener('click', function (e) {
  validarPaso(paso_actual);
})

//Evento que se ejecuta para avanzar de paso
document.getElementById('btnSiguiente').addEventListener('click', function (e) {
  /*
  Se incrementa el paso actual para poder dibujar la tarjeta y para 
  no dejar avanzar mas de los pasos posibles
  */
  paso_actual++;

  if (paso_actual < pasos.length){
    renderPaso(paso_actual);
  } else {
    mostarAlerta('exito','Ya no quedan preguntas. Ganaste!');
  }
})

//Función que se encarga de validar la respuesta seleccionada
const validarPaso = (numero) => {
  
  paso = pasos[numero];
  let opcion_elegida = document.querySelector(`input[name="pasoRadio${numero}"]:checked`);

  if (opcion_elegida !== null){
    if (opcion_elegida.value === paso.palabra_traducida){
      mostarAlerta('exito','La opción elegida es la correcta. Puedes avanzar!')
      document.querySelector('#btnSiguiente').disabled = false;
    } else {
      mostarAlerta('error','La opción elegida no es la correcta');
      document.querySelector('#btnSiguiente',).disabled = true;
    }
  } else {
      mostarAlerta('alerta','Debe seleccionar una opción para poder validar');
  } 
  
}

//Función que se encarga de dibujar la tarjeta con las opciones posibles
const renderPaso = (numero) => {
  paso = pasos[numero];
  let html = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./img/${paso.imagen}" class="img-fluid rounded-start" >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${paso.palabra_original}</h5>`;
        paso.opciones.forEach(function (opcion, indice) {
          html += `<div class="form-check">
          <input class="form-check-input" type="radio" name="pasoRadio${numero}" id="pasoRadio${numero}_${indice}" value="${opcion}">
          <label class="form-check-label" for="pasoRadio${numero}_${indice}">${opcion}</label>
        </div>`
        });
  html += `</div></div></div></div>`;
  
  document.querySelector('#divPaso').innerHTML = html;
  document.querySelector('#btnSiguiente').disabled = true;
}


//Función que solo se encarga de mostrar el alerta
const mostarAlerta = (tipo,texto) => {
  let background = '';
  if (tipo === 'exito'){
      background = '#00b09b, #96c93d';
  }
  if (tipo === 'error'){
    background = '#ff5f6d, #ffc371';
  }

  if (tipo === 'alerta'){
    background = '#ff5f6d, #ffc371';
  }

  Toastify({
    text: texto,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
        background: `linear-gradient(to right, ${background})`
      }
  }).showToast();
}

