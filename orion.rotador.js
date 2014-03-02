/*!
 * Orion Library
 * ROTADOR DE IMÁGENES
 * Autor: Alexis López (@AlexisThrasher)
 * Fecha de elaboración: 01/03/2014 20:39:28
 * Versión: 1.0
 * Licencia Pública GPLv3
 */
 
var Orion = function(identificador){
    if (identificador) {
        if (window === this)
            return new Orion(identificador);
            
        switch (identificador[0]) {
            case "#": //Tomo al elemento por su Id
                this.objeto = document.getElementById(identificador.substr(1));
                break;
            case ".": //Tomo al elemento por su Clase
                this.objeto = document.getElementsByClassName ? document.getElementsByClassName(identificador.substr(1)) : document.querySelectorAll ? document.querySelectorAll(identificador) : function(identificador){
                    var todos = document.getElementsByTagName("*"),
                        todosTotal = todos.length,
                        obj = [];
                    for (i = 0; i < todosTotal; i++)
                        if (todos[i].className == identificador.substr(1))
                            obj.push(todos[i]);
                    return obj;
                };
                break;        
            default: //Tomo al elemento por su etiqueta
                this.objeto = document.getElementsByTagName(identificador);
                break;
        }

        this.total = this.objeto.length;
        
        return this;
    }
};
 
Orion.prototype = {
    rotador: function(json){
        var aplicar = function(elObjeto){
            /*
                Tomo a todas las imágenes anexadas, les aplico estilos
                y las añado al elemento de referencia
            */
            for (var j in json.imagenes){
                var img = document.createElement("img");
                img.src = json.imagenes[j];
                img.style.position = "absolute";
                img.style.opacity = 0;
                img.style.width = json.ancho;
                img.style.height = json.alto;
                img.style.transition = ".75s";
                this.appendChild(img);
            }
            
            var velocidad = 1000; //Por defecto, el tiempo de transición será de 1 segundo
            
            //Control de velocidad de transición
            if (json.velocidad)
                switch (json.velocidad) {
                    case "lento":
                        velocidad = 5000;
                        break;
                    case "normal":
                        velocidad = 3000;
                        break;
                    case "rapido":
                        velocidad = 1500;
                        break;
                }
            
            var imagenes = this.getElementsByTagName("img"), //Tomo a todas las imágenes anexadas
                total = imagenes.length, //Calculo el total de imágenes anexadas
                contador = 0; //El contador que nos permitirá rotar a las imágenes
                
            //Mostramos a la primera imagen
            imagenes[contador].style.opacity = 1;
            
            var show = function(){
                imagenes[contador].style.opacity = 0; //Oculto a la imagen actual
                contador = contador == total - 1 ? 0 : ++contador; //Actualizo el valor del contador
                imagenes[contador].style.opacity = 1; //Muestro a la siguiente imagen en la secuencia
            };
            
            setInterval(show, velocidad); //El plugin se ejecutará cada "velocidad" segundos de manera indefinida
        }

        //Aplico el plugin en cada elemento
        for (i = 0; i < this.total; i++)
            aplicar.apply(this.objeto[i]);

        return this; //Retornamos el objeto
    }
};
