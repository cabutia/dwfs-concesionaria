// Elementos a utilizar
let listaDeAutos = document.getElementById('car-list')
let formulario = document.getElementById('form-carga')
let listaDeEstadisticas = document.getElementById('estadisticas')

// Variables globales
let autos = []
let estadisticas = [
    {
        titulo: 'Total de autos',
        valor () {
            return autos.length
        }
    }
]

// Declaracion de funciones
function actualizarListaAutos () {
    if (autos.length === 0) {
        listaDeAutos.innerHTML = 'Aun no hay autos en la base de datos.'
        return false
    }
    let autosHtml = []
    autos.forEach(function (auto) {
        autosHtml.push(`
            <div class="car">
                <h3>${auto.marca}</h3>
                <p class="price">
                    <strong>Precio:</strong>
                    <span>$ ${auto.precio}</span>
                </p>
            </div>
        `)
    })
    listaDeAutos.innerHTML = autosHtml.join("\n")
}

function actualizarEstadisticas () {
    let estadisticasHtml = []
    estadisticas.forEach(function (estadistica) {
        estadisticasHtml.push(`
            <tr>
                <td>${estadistica.titulo}</td>
                <td>${estadistica.valor()}</td>
            </tr>
        `)
    })
    listaDeEstadisticas.innerHTML = estadisticasHtml.join("\n")
}

function agregarAuto (marca, precio) {
    if (!marca || !precio)
        return alert('Marca o precio invalidos.')
    autos.push({
        marca: marca,
        precio: precio
    })
}

function limpiarFormulario () {
    formulario.precio.value = null
    formulario.marca.value = null
    formulario.marca.focus()
}

function enviarFormulario (evento) {
    evento.preventDefault()
    agregarAuto(formulario.marca.value, formulario.precio.value)
    actualizarListaAutos()
    actualizarEstadisticas()
    limpiarFormulario()
}

// Procedimiento
actualizarListaAutos()
actualizarEstadisticas()
formulario.addEventListener('submit', enviarFormulario)
