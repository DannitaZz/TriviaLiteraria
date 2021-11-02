// Creamos arreglos donde se guardan las respuestas correctas
correctas_principito = [3, 4, 2, 1];
correctas_alicia = [2, 1, 4, 3];

// definiciones funciones principales
function inicio_programa(){
  /*Esta función ocultas los divs de preguntas y resultados, mostrando únicamente el de bienvenida. 
  */
    
    let pag_bienvenida = document.getElementById("pag-bienvenida");
    let pag_pregunta_principito = document.getElementById("pag-preguntas-principito");
    let pag_pregunta_alicia = document.getElementById("pag-preguntas-alicia");
    let pag_resultados = document.getElementById("pag-resultados");
    
    pag_bienvenida.style.display = "block";
    pag_pregunta_principito.style.display = "none";
    pag_pregunta_alicia.style.display = "none";
    pag_resultados.style.display = "none";

};

function inicio_juego(tipo){
  /* Esta función guarda en la memoria el nombre escrito por el usuario, oculta el div de la página de bienvenida y muestra el de las preguntas, recibe un argumento que bien puede ser 'alicia' o el 'principito' y dependiendo de cuál sea escogido, así mismo muestra el div correspondiente. También usa la rutina setTimeout para darle una duración de 30 s a la trivia (manda a ejecutar la función final del juego transcurrido ese tiempo) y muestra tres alertas de tiempo. 
  */

    let input_nombre = document.getElementById('nombre-usuario');
    memoria['nombre'] = input_nombre.value;

    let pag_bienvenida = document.getElementById("pag-bienvenida");
    pag_bienvenida.style.display = "none";

    if (tipo == 'principito'){
        let pag_pregunta_principito = document.getElementById("pag-preguntas-principito");
        pag_pregunta_principito.style.display = "block";
        memoria['correctas'] = correctas_principito;
    }
    else if (tipo == 'alicia'){
        let pag_pregunta_alicia = document.getElementById("pag-preguntas-alicia");
        pag_pregunta_alicia.style.display = "block";
        memoria['correctas'] = correctas_alicia;
    }
    
    console.log('Juego iniciado');
    console.log(memoria['nombre']);

    // // ahora creamos los timers con setTimeout()
    finalizar_juego = setTimeout(function(){final_juego(tipo)}, 30000); // evento del timer
    alerta_1 = setTimeout(function(){alert("tienes 30 segundos para contestar")}, 0); // eventos de notificacion
    alerta_2 = setTimeout(function(){alert("tienes 20 segundos para contestar")}, 10000);
    alerta_3 = setTimeout(function(){alert("tienes 10 segundos para contestar")}, 20000);

};

function final_juego(tipo){
  /* Esta función anula el setTimeout en caso de ser llamada a partir de botón "Terminé", oculta los divs de bienvenida y preguntas, mostrando solo el de resultados,  recibe como argumento 'alicia' o 'principito' para escoger qué respuestas dadas por el usuario extraer en cada uno de los radios "checked" y guarda las respuestas del usuario en la memoria, luego las compara con las respuestas correctas y escribe en texto-resultados el nombre y el puntaje obtenido por el usuario. 
  */


     //le decimos al evento de la cuenta atrás que pare los contadores
    clearTimeout(finalizar_juego);
    clearTimeout(alerta_1);
    clearTimeout(alerta_2);
    clearTimeout(alerta_3);

    if (tipo == 'principito'){
        let radio_1 = document.getElementsByName('pregunta-1-p');
        let radio_2 = document.getElementsByName('pregunta-2-p');
        let radio_3 = document.getElementsByName('pregunta-3-p');
        let radio_4 = document.getElementsByName('pregunta-4-p');
        
        var respuesta_1 = extraer_respuesta_radio(radio_1);
        var respuesta_2 = extraer_respuesta_radio(radio_2);
        var respuesta_3 = extraer_respuesta_radio(radio_3);
        var respuesta_4 = extraer_respuesta_radio(radio_4);
    }
    else if (tipo == 'alicia'){
        let radio_1 = document.getElementsByName('pregunta-1-a');
        let radio_2 = document.getElementsByName('pregunta-2-a');
        let radio_3 = document.getElementsByName('pregunta-3-a');
        let radio_4 = document.getElementsByName('pregunta-4-a');
        
        var respuesta_1 = extraer_respuesta_radio(radio_1);
        var respuesta_2 = extraer_respuesta_radio(radio_2);
        var respuesta_3 = extraer_respuesta_radio(radio_3);
        var respuesta_4 = extraer_respuesta_radio(radio_4);
    }

    memoria['respuestas_usuario'] = [respuesta_1,
                                     respuesta_2,
                                     respuesta_3,
                                     respuesta_4];
    
    let pag_pregunta_principito = document.getElementById("pag-preguntas-principito");
    let pag_pregunta_alicia = document.getElementById("pag-preguntas-alicia");
    let pag_resultados = document.getElementById("pag-resultados");
    
    pag_pregunta_principito.style.display = "none";
    pag_pregunta_alicia.style.display = "none";
    pag_resultados.style.display = "block";
    console.log(memoria['respuestas_usuario']);
    console.log(memoria['correctas']);
    
    var puntaje_principito = comparar_respuestas(memoria['respuestas_usuario'], correctas_principito);
    var puntaje_alicia = comparar_respuestas(memoria['respuestas_usuario'], correctas_alicia)

    let texto_resultados = document.getElementById('texto-resultados');
    if (tipo == 'principito'){
      texto_resultados.innerHTML = `${memoria['nombre']}, tuviste  ${puntaje_principito} acierto(s) de ${memoria['correctas'].length} preguntas en total`;
    }
    else if(tipo == 'alicia'){
    texto_resultados.innerHTML = `${memoria['nombre']}, tuviste  ${puntaje_alicia} acierto(s) de  ${memoria['correctas'].length} preguntas en total`;
    }
    

  

};

function extraer_respuesta_radio(radios){
  /* Esta función recorre los radios, se fija en los que están "checked" y retorna como un entero el value de cada radio checked. Función tomada de https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value/9618826#9618826
  */
    for (i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return parseInt(radios[i].value);
        }
    }
};

function comparar_respuestas(X,Y){
  /* Esta función compara elemento por elemento dos arreglos que recibe como argumento, sumando 1 cuando estos elementos son iguales y retorna la variable aciertos.
  */
  aciertos = 0;
  for (i=0; i< X.length; i++){
    if (X[i]==Y[i]){
      aciertos = aciertos + 1;
    }  
  }
  return aciertos;
}


memoria = {};
inicio_programa();
