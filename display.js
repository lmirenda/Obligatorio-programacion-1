// SELECTORES // 
const btnMostrarLogIn = document.querySelector("#btnDisplayLogIn");
const btnMostrarRegister = document.querySelector("#btnDisplayRegistrar");
const btnCerrarSesion = document.querySelector("#btnDisplayCerrarSesion")
const selectTipoCuenta = document.querySelector("#tipoDeCuenta");
const btnAdminEmpresas = document.querySelector("#btnAdminListarEmpresas");
const btnAdminVehiculo = document.querySelector("#btnAdminCrearVehiculos")
const btnAdminEstadistica = document.querySelector("#btnAdminEstadistica")
const btnMostrarEmpresasFiltradas = document.querySelector("#btnMostrarEmpresasF2");
const pMensajeErrorFiltrarEmpresas = document.querySelector("#mensajeErrorFiltrarEmpresas");
const pMensajeErrorIngresarVehiculo = document.querySelector("#mensajeErrorVehiculos");
const btnDisplaySolicitudEnvio = document.querySelector("#btnPersonaRealizarSolicitudEnvio");
const btnSolicitudEnvio = document.querySelector("#btnEnviarSolicitudEnvio6");

// EVENT LISTENERS // 
btnMostrarLogIn.addEventListener('click', toggleLogIn);
btnMostrarRegister.addEventListener('click', toggleRegister);
btnCerrarSesion.addEventListener('click', cerrarSesion);
selectTipoCuenta.addEventListener('click', displayBtnSelect);

btnAdminEmpresas.addEventListener('click', adminDisplayEmpresas);
btnAdminVehiculo.addEventListener('click', adminDisplayVehiculos);
btnAdminEstadistica.addEventListener('click', adminDisplayEstadistica);
btnMostrarEmpresasFiltradas.addEventListener('click', adminDisplayEmpresasFiltradas);

btnDisplaySolicitudEnvio.addEventListener('click', personaDisplaySolicitudEnvio);





// FUNCIONES // 
function cerrarSesion() {
    usuarioLoggeado = null;
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
    pMensajeErrorFiltrarEmpresas.style.display = "none";
    pMensajeErrorIngresarVehiculo.style.display = "none";
    btnCerrarSesion.style.display = "none";
}

function displayRegistrarEmpresaPersona(usuario) {
    updateSelectVehiculos("#registroVehiculoEmpresa");
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
            document.querySelector("#panelAdmin").style.display = "block";
            document.querySelector("#panelLogInF1").style.display = "none";
            btnMostrarLogIn.style.display = "none";
            btnMostrarRegister.style.display = "none";
            btnCerrarSesion.style.display = "block";
            break;

        case "Empresa":
            document.querySelector("#panelEmpresa").style.display = "block";
            document.querySelector("#panelLogInF1").style.display = "none";
            btnMostrarLogIn.style.display = "none";
            btnMostrarRegister.style.display = "none";
            btnCerrarSesion.style.display = "block";
            break;

        case "Persona":
            document.querySelector("#panelPersona").style.display = "block";
            document.querySelector("#panelLogInF1").style.display = "none";
            btnMostrarLogIn.style.display = "none";
            btnMostrarRegister.style.display = "none";
            btnCerrarSesion.style.display = "block";
            break;

        default:
            break;
    }
}

function updateSelectVehiculos(id) {
    document.querySelector(id).innerHTML = ''
    for (let i = 0; i < vehiculos.length; i++) {
        document.querySelector(id).innerHTML += `<option value=${vehiculos[i].id}>${vehiculos[i].tipo}</option>`
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
    document.querySelector("#tableListadoEmpresasFiltrado").style.display = "none" // Ocultar las empresas filtradas
    document.querySelector("#tableListadoEmpresas").style.display = "table"         // Mostrar todas las empresas
    pMensajeErrorFiltrarEmpresas.style.display = "none"                             // Ocultar msj de error
    displayErrorBusquedaOFF();
}

function adminDisplayVehiculos() {
    document.querySelector("#listadoDeEmpresasF2").style.display = "none";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "block"
    document.querySelector("#verInfoEstadisticaF4").style.display = "none"
    crearListaDeVehiculos();
}

function adminDisplayEstadistica() {
    document.querySelector("#listadoDeEmpresasF2").style.display = "none";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "none"
    document.querySelector("#verInfoEstadisticaF4").style.display = "block"
}

function adminDisplayEmpresasFiltradas(){
    let criterioDeBusqueda = document.querySelector("#textoBusquedaEmpresaF2").value;    // Leer del HTML lo esrito en el input field
    let arrayEmpresas = buscadorEmpresas(criterioDeBusqueda)

        if (arrayEmpresas == "Error"){
            displayErrorBusquedaON();
        } else {
            displayErrorBusquedaOFF();
            document.querySelector("#tableListadoEmpresas").style.display = "none"              // Oculta la tabla con todas las empresas
            crearListaDeEmpresasFiltrado();                                                                 // Genera la tabla con los criterios de busqueda
            document.querySelector("#tableListadoEmpresasFiltrado").style.display = "table"     // Muestra unicamente las empresas de la tabla filtrada
        }
}

function displayErrorBusquedaON() {
    pMensajeErrorFiltrarEmpresas.style.display = "block"
    document.querySelector("#tableListadoEmpresas").style.display = "none"              // Oculta la tabla con todas las empresas
    document.querySelector("#tableListadoEmpresasFiltrado").style.display = "none"     // Muestra unicamente las empresas de la tabla filtrada
}
function displayErrorBusquedaOFF() {
    pMensajeErrorFiltrarEmpresas.style.sdisplay = "none"
}

function personaDisplaySolicitudEnvio() {
    updateSelectVehiculos("#solicitudEnvioVehiculo");
    document.querySelector("#solicitudEnvioF6").style.display = "block";     // Muestra unicamente las empresas de la tabla filtrada
    // TODO: Ocultar los otros paneles despues //
    document.querySelector("#listadoEnviosF7").style.display = "none";     // Muestra unicamente las empresas de la tabla filtrada
    document.querySelector("#infoEstadisticaUsuario").style.display = "none";     // Muestra unicamente las empresas de la tabla filtrada
}

function displayMensajeErrorVehiculoON(mensaje){
    pMensajeErrorIngresarVehiculo.innerHTML = mensaje;
    pMensajeErrorIngresarVehiculo.style.display = "block";
    // TODO: Agregar mensaje de error por estar vacio // 
}

function displayMensajeErrorVehiculoOFF(){
    pMensajeErrorIngresarVehiculo.style.display = "none";
}