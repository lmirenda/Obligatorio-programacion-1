// SELECTORES // 
const btnMostrarLogIn = document.querySelector("#btnDisplayLogIn");
const btnMostrarRegister = document.querySelector("#btnDisplayRegistrar");
const btnCerrarSesion = document.querySelector("#btnDisplayCerrarSesion")
const selectTipoCuenta = document.querySelector("#tipoDeCuenta");
const btnAdminEmpresas = document.querySelector("#btnAdminListarEmpresas");
const btnAdminVehiculo = document.querySelector("#btnAdminCrearVehiculos")
const btnAdminEstadistica = document.querySelector("#btnAdminEstadistica")

// EVENT LISTENERS // 
btnMostrarLogIn.addEventListener('click', toggleLogIn);
btnMostrarRegister.addEventListener('click', toggleRegister);
btnCerrarSesion.addEventListener('click', cerrarSesion);
selectTipoCuenta.addEventListener('click', displayBtnSelect);

btnAdminEmpresas.addEventListener('click', adminDisplayEmpresas);
btnAdminVehiculo.addEventListener('click', adminDisplayVehiculos);
btnAdminEstadistica.addEventListener('click', adminDisplayEstadistica);

// FUNCIONES // 

function cerrarSesion() {
    ocultarPantallas();
    btnMostrarRegister.style.display = "inline-block"
    btnCerrarSesion.style.display = "none";
    btnMostrarLogIn.style.display = "inline-block"
    document.querySelector("#panelLogInF1").style.display = "block"
    document.querySelector("#mensajeLogIn").innerHTML = '';
}

function toggleLogIn() {
    ocultarPantallas();
    document.querySelector("#panelLogInF1").style.display = "block";
    document.querySelector("#mensajeLogInNuevoUsuario").innerHTML = '';
}

function toggleRegister() {
    document.querySelector("#btnTipoDeCuenta").style.display = "none"
    ocultarPantallas();
    document.querySelector("#panelRegistroF5").style.display = "block";
}

function ocultarPantallas() {                                                   // Ocultar todas las pantallas
    document.querySelector("#panelLogInF1").style.display = "none"
    document.querySelector("#listadoDeEmpresasF2").style.display = "none"
    document.querySelector("#panelCreacionVehiculosF3").style.display = "none"    // Crear tipos de vehiculos
    document.querySelector("#verInfoEstadisticaF4").style.display = "none"        // Visualizar info estadistica
    document.querySelector("#panelRegistroF5").style.display = "none"             // Registrarse en la app
    document.querySelector("#solicitudEnvioF6").style.display = "none"            // Realizar solicitud de envio
    document.querySelector("#listadoEnviosF7").style.display = "none"             // Listado de envios
    document.querySelector("#listadoEnviosPendientesF8").style.display = "none"   // Listado de sol pendientes (empresas)
    document.querySelector("#listadoEnviosTomadosF9").style.display = "none"      // Listado de sol tommdas (empresas)
    document.querySelector("#registroUsuario").style.display = "none"
    document.querySelector("#registroEmpresa").style.display = "none"
    document.querySelector("#panelAdmin").style.display = "none"
    document.querySelector("#panelEmpresa").style.display = "none"
    document.querySelector("#panelPersona").style.display = "none"
    btnCerrarSesion.style.display = "none";
}

function displayRegistrarEmpresaPersona(usuario) {
    updateSelectVehiculos();
    if (usuario == "Empresa") {                                              // Muestra unicamente las opciones de registro de Empresa
        document.querySelector("#registroUsuario").style.display = "none"
        document.querySelector("#registroEmpresa").style.display = "block"
    } else if (usuario == "Persona") {                                       // Muestra unicamente las opciones de registro de Persona
        document.querySelector("#registroUsuario").style.display = "block"
        document.querySelector("#registroEmpresa").style.display = "none"
    } else if (usuario == "") {
        document.querySelector("#errorSelectTipocuenta").value = "Debe seleccionar un tipo de dato.";
    }
}

function displayNavPanel(tipo) {
    switch (tipo) {
        case "Administrador":
            document.querySelector("#panelAdmin").style.display = "block"
            document.querySelector("#panelLogInF1").style.display = "none"
            btnMostrarLogIn.style.display = "none"
            btnMostrarRegister.style.display = "none"
            btnCerrarSesion.style.display = "block"
            break;

        case "Empresa":
            document.querySelector("#panelEmpresa").style.display = "block"
            document.querySelector("#panelLogInF1").style.display = "none"
            btnMostrarLogIn.style.display = "none"
            btnMostrarRegister.style.display = "none"
            btnCerrarSesion.style.display = "block"
            break;

        case "Persona":
            document.querySelector("#panelPersona").style.display = "block"
            document.querySelector("#panelLogInF1").style.display = "none"
            btnMostrarLogIn.style.display = "none"
            btnMostrarRegister.style.display = "none"
            btnCerrarSesion.style.display = "block"
            break;

        default:
            break;
    }
}

function updateSelectVehiculos() {
    document.querySelector("#registroVehiculoEmpresa").innerHTML = ''
    for (let i = 0; i < vehiculos.length; i++) {
        document.querySelector("#registroVehiculoEmpresa").innerHTML += `<option value=${vehiculos[i].id}>${vehiculos[i].tipo}</option>`
    }
}

function displayBtnSelect() {
    if (selectTipoCuenta.value == "Empresa" || selectTipoCuenta.value == "Persona") {
        document.querySelector("#btnTipoDeCuenta").style.display = "block"
    }
}

function adminDisplayEmpresas() {
    crearListaDeEmpresas();
    document.querySelector("#listadoDeEmpresasF2").style.display = "block";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "none"
    document.querySelector("#verInfoEstadisticaF4").style.display = "none"
}
function adminDisplayVehiculos() {
    document.querySelector("#listadoDeEmpresasF2").style.display = "none";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "block"
    document.querySelector("#verInfoEstadisticaF4").style.display = "none"
}
function adminDisplayEstadistica() {
    document.querySelector("#listadoDeEmpresasF2").style.display = "none";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "none"
    document.querySelector("#verInfoEstadisticaF4").style.display = "block"
}