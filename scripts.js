var autos = [];

let formulario = document.getElementById("form-carga");

var estadisticas = [
    {
        titulo: 'Total de autos',
        valor () {
            return autos.length
        }
    },
    {
        titulo: 'Precio total en autos',
        valor () {
            var valorTemporal = 0;
            autos.forEach(auto => {
				valorTemporal += parseInt(auto.precio)
			});

			return valorTemporal;
        }
    },
    {
        titulo: 'Auto más caro',
        valor () {
            var max = 0;

            autos.forEach(auto => {
                if (auto.precio > max) {
                    var temp = auto.precio
                    max = auto.marca + " ($" + temp + ")" 
				}
			});
			return max
        }
    },
    {
        titulo: 'Auto más economico',
        valor () {

            var min = 9999999999999999999;
            autos.forEach(auto => {
                if (auto.precio < min) {
                    var temp = auto.precio
                    min = auto.marca + " ($" + temp + ")" 
                }
			});
			return min
        }
    }
];


function limpiarFormulario() {
    formulario.precio.value = '';
    formulario.marca.value = '';
}

function enviarFormulario(e) {
    e.preventDefault();
    //Variables
    var marca = formulario.marca.value;
    var precio = formulario.precio.value;
    agregarAuto(marca, precio);
    actualizarListaDeAutos();
    actualizarEstadisticas();
}

formulario.addEventListener('submit', enviarFormulario)

function Auto (marca, precio){
	this.marca = marca;
	this.precio = precio;
}

function actualizarEstadisticas () {
    //array llamado x, mostrar el html que muestre est. con datos de autos.
	let tabla = document.getElementById('estadisticas')
	let datos = [];

	estadisticas.forEach(function (obj) {
		datos.push(`<tr>
			<td>${obj.titulo}</td>
			<td>${obj.valor()}</td>
		</tr>`)
	})

	tabla.innerHTML = datos.join("")

}

function agregarAuto (marca, precio) {

	if(!marca || !precio) {
		alert("Complete ambos parametros")
	} else {
		var auto = new Auto(marca,precio);
		autos.push(auto);

	}
}

function actualizarListaDeAutos() {

	let carList = document.getElementById('car-list')
	let datos = []

    if (autos.length == 0) {
        datos.push(`<div class="car">
                <h3>No hay autos disponibles</h3>
        </div>`)
    } else {
        autos.forEach(function (auto) {
                datos.push(`<div class="car">
                        <h3>${auto.marca}</h3>
                        <p class="price">
                                <strong>Precio:</strong>
                                <span>$${auto.precio}</span>
                        </p>
                </div>`)
            })
    }

	carList.innerHTML = datos.join("")
}

actualizarListaDeAutos();

let eliminar = document.getElementById("eliminar")

function eliminarUltimo() {
	autos.pop()
	actualizarEstadisticas()
	actualizarListaDeAutos()
}

eliminar.addEventListener("click", eliminarUltimo)
