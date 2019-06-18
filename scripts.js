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
    },
    {
        titulo: 'Precio total en autos',
        valor () {
            let valor = 0
            autos.forEach(function (auto) {
                let precio = parseInt(auto.precio)
                valor = valor + precio
            })
            return '$' + valor
        }
    },
    {
        titulo: 'Auto mas caro',
        valor () {
            autoMasCaro = null
            autos.forEach(function (auto) {
                if (!autoMasCaro || autoMasCaro.precio < auto.precio)
                    autoMasCaro = auto
            })
            if (autoMasCaro)
                return autoMasCaro.marca + ' ($' + autoMasCaro.precio + ')'
            return 'Ninguno'
        }
    },
    {
        titulo: 'Auto mas economico',
        valor () {
            autoMasEconomico = null
            autos.forEach(function (auto) {
                if (!autoMasEconomico || autoMasEconomico.precio > auto.precio)
                    autoMasEconomico = auto
            })
            if (autoMasEconomico)
                return autoMasEconomico.marca + ' ($' + autoMasEconomico.precio + ')'
            return 'Ninguno'
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
