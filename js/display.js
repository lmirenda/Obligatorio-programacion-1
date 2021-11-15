// Archivo: display.js//

// SELECTORES // 
//--Log In & Registro--//
const btnMostrarLogIn = document.querySelector("#btnDisplayLogIn");
const btnMostrarRegister = document.querySelector("#btnDisplayRegistrar");
const btnCerrarSesion = document.querySelector("#btnDisplayCerrarSesion")
const selectTipoCuenta = document.querySelector("#tipoDeCuenta");

//--Usuario: Adminitrador--//
const btnAdminEmpresas = document.querySelector("#btnAdminListarEmpresas");
const btnAdminVehiculo = document.querySelector("#btnAdminCrearVehiculos")
const btnAdminEstadistica = document.querySelector("#btnAdminEstadistica")
const btnMostrarEmpresasFiltradas = document.querySelector("#btnMostrarEmpresasF2");
const pMensajeErrorFiltrarEmpresas = document.querySelector("#mensajeErrorFiltrarEmpresas");
const pMensajeErrorIngresarVehiculo = document.querySelector("#mensajeErrorVehiculos");

//--Usuario: Persona--//
const btnPersonaSolicitudEnvio = document.querySelector("#btnPersonaRealizarSolicitudEnvio");
const btnPersonaListadoEnvios = document.querySelector("#btnPersonaListadoEnvios");

//--Usuario: Empresa--//
const btnEmpresaListadoEnvios = document.querySelector("#btnEmpresaListadoEnvios");
const btnEmpresaEstadistica = document.querySelector("#btnEmpresaEstadistica");

// EVENT LISTENERS // 
btnMostrarLogIn.addEventListener('click', toggleLogIn);
btnMostrarRegister.addEventListener('click', toggleRegister);
btnCerrarSesion.addEventListener('click', cerrarSesion);
selectTipoCuenta.addEventListener('click', displayBtnSelect);

btnAdminEmpresas.addEventListener('click', adminDisplayEmpresas);
btnAdminVehiculo.addEventListener('click', adminDisplayVehiculos);
btnAdminEstadistica.addEventListener('click', adminDisplayEstadistica);
btnMostrarEmpresasFiltradas.addEventListener('click', adminDisplayEmpresasFiltradas);

btnPersonaSolicitudEnvio.addEventListener('click', personaDisplaySolicitudEnvio);
btnPersonaListadoEnvios.addEventListener('click', personaDisplayListadoEnvio);

btnEmpresaListadoEnvios.addEventListener('click', empresaDisplayListadoEnvio);
btnEmpresaEstadistica.addEventListener('click', empresaDisplayEstadisticaMejoresUsuarios)
btnEmpresaEstadistica.addEventListener('click', empresaDisplayEstadisticaEnviosPorEstado)



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
    document.querySelector("#ingresoUsuario").value = "";
    document.querySelector("#ingresoPassword").value = "";
    document.querySelector("#mensajeLogInNuevoUsuario").innerHTML = '';
    document.querySelector("#mensajeLogIn").innerHTML = '';
}

function toggleRegister() {
    document.querySelector("#btnTipoDeCuenta").style.display = "none";
    document.querySelector("#tipoDeCuenta").value = "0";
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
    document.querySelector("#infoEstadisticaEmpresaMejoresUsuarios").style.display = "none";
    document.querySelector("#infoEstadisticaEmpresaCantidadPorEstado").style.display = "none";
    pMensajeErrorFiltrarEmpresas.style.display = "none";
    pMensajeErrorIngresarVehiculo.style.display = "none";
    btnCerrarSesion.style.display = "none";
}

function displayRegistrarEmpresaPersona(usuario) {
    updateSelectVehiculos("#registroVehiculoEmpresa");
    if (usuario == "Empresa") {                                              // Muestra unicamente las opciones de registro de Empresa
        document.querySelector("#registroUsuario").style.display = "none";
        document.querySelector("#registroEmpresa").style.display = "block";
    } else if (usuario == "Persona") {                                       // Muestra unicamente las opciones de registro de Persona
        document.querySelector("#registroUsuario").style.display = "block";
        document.querySelector("#registroEmpresa").style.display = "none";
    } else if (usuario == "") {
        document.querySelector("#errorSelectTipocuenta").value = "Debe seleccionar un tipo de dato.";
    }
    displayBorradoCamposRegistroEmpresa();
    displayBorradoCamposRegistroPersona();
}

function displayBorradoCamposRegistroEmpresa() {
    document.querySelector("#registroAliasEmpresaF5").value = "";
    document.querySelector("#registroNombreEmpresaF5").value = "";
    document.querySelector("#registroRUTEmpresaF5").value = "";
    document.querySelector("#registroRazonSocialEmpresaF5").value = "";
    document.querySelector("#registroPassEmpresaF5").value = "";
    document.querySelector("#registroVehiculoEmpresa").value = 0;
    
    //Borrar error
    document.querySelector("#pParaDesplegarErroresEmpresa").innerHTML = "";
}

function displayBorradoCamposRegistroPersona() {
    document.querySelector("#registroAliasUsuarioPersonaF5").value = "";
    document.querySelector("#registroPassUsuarioPersonaF5").value = "";
    document.querySelector("#registroCIUsuarioPersonaF5").value = "";
    document.querySelector("#registroNombreUsuarioPersonaF5").value = "";
    document.querySelector("#registroApellidoUsuarioPersonaF5").value = "";
    
    //Borrar error
    document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "";
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
    document.querySelector(id).innerHTML = '';
    for (let i = 0; i < vehiculos.length; i++) {
        if (i == 0) {
            document.querySelector(id).innerHTML += `<option selected disabled value = 0>Ingrese una opcion</option>`
        }
        document.querySelector(id).innerHTML += `<option value=${vehiculos[i].id}>${vehiculos[i].tipo}</option>`
    }
}

function displayBtnSelect() {
    if (selectTipoCuenta.value == "Empresa" || selectTipoCuenta.value == "Persona") {
        document.querySelector("#btnTipoDeCuenta").style.display = "block";
    }
}

function adminDisplayEmpresas() {
    crearListaDeEmpresas();
    document.querySelector("#listadoDeEmpresasF2").style.display = "block";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "none"
    document.querySelector("#verInfoEstadisticaF4").style.display = "none"
    document.querySelector("#tableListadoEmpresasFiltrado").style.display = "none"  // Ocultar las empresas filtradas
    document.querySelector("#tableListadoEmpresas").style.display = "table"         // Mostrar todas las empresas
    document.querySelector("#textoBusquedaEmpresaF2").value = "";
    pMensajeErrorFiltrarEmpresas.style.display = "none"                             // Ocultar msj de error
    displayErrorBusquedaOFF();
}

function displayErrorBusquedaON() {
    pMensajeErrorFiltrarEmpresas.style.display = "block"
    document.querySelector("#tableListadoEmpresas").style.display = "none"              // Oculta la tabla con todas las empresas
    document.querySelector("#tableListadoEmpresasFiltrado").style.display = "none"     // Muestra unicamente las empresas de la tabla filtrada
}
function displayErrorBusquedaOFF() {
    pMensajeErrorFiltrarEmpresas.style.display = "none"
}

function adminDisplayVehiculos() {
    displayMensajeErrorVehiculoOFF();
    document.querySelector("#tipoNuevoVehiculo").value = "";
    document.querySelector("#listadoDeEmpresasF2").style.display = "none";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "block";
    document.querySelector("#verInfoEstadisticaF4").style.display = "none";
    crearListaDeVehiculos();
}

function displayMensajeErrorVehiculoON(mensaje){
    pMensajeErrorIngresarVehiculo.innerHTML = mensaje;
    pMensajeErrorIngresarVehiculo.style.display = "block";
}

function displayMensajeErrorVehiculoOFF(){
    pMensajeErrorIngresarVehiculo.style.display = "none";
}

function adminDisplayEstadistica() {
    calcularInfoEstadisticaAdmin();                                                     // Actualizar la tabla con informacion 
    document.querySelector("#listadoDeEmpresasF2").style.display = "none";
    document.querySelector("#panelCreacionVehiculosF3").style.display = "none"
    document.querySelector("#verInfoEstadisticaF4").style.display = "block"
}

function adminDisplayEmpresasFiltradas(){
    let criterioDeBusqueda = document.querySelector("#textoBusquedaEmpresaF2").value;    // Leer del HTML lo escrito en el input field
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

function personaDisplaySolicitudEnvio() {
    displayErrorSolicitudEnvioOFF();
    displaySuccessSolicitudEnvioOFF();
    displayBorradoCamposSolicitudEnvioPersona();
    updateSelectVehiculos("#solicitudEnvioVehiculo");
    document.querySelector("#solicitudEnvioF6").style.display = "block";            
    document.querySelector("#listadoEnviosF7").style.display = "none";                       
}

function displayBorradoCamposSolicitudEnvioPersona() {
    document.querySelector("#solicitudEnvioVehiculo").value = 0;
    document.querySelector("#solicitudEnvioDistancia").value = "";
    document.querySelector("#solicitudEnvioDescripcion").value = "";
    document.querySelector("#solicitudEnvioFoto").value = "";
}

function displayErrorSolicitudEnvioON(mensaje){                                                 // Display el error correspondiente en el panel de persona para ingresar pedido
    let mensajeError = document.querySelector("#pErrorSolicitudEnvio")
    mensajeError.style.display = "block";
    mensajeError.innerHTML = mensaje;
}

function displayErrorSolicitudEnvioOFF(){
    document.querySelector("#pErrorSolicitudEnvio").style.display = "none";
    
}

function displaySuccessSolicitudEnvioON(){
    displayBorradoCamposSolicitudEnvioPersona()
    document.querySelector("#pSuccessSolicitudEnvio").style.display = "block"
}

function displaySuccessSolicitudEnvioOFF(){
    document.querySelector("#pSuccessSolicitudEnvio").style.display = "none"
}

function personaDisplayListadoEnvio(){
    document.querySelector("#solicitudEnvioF6").style.display = "none";
    displayBorradoCamposSolicitudEnvioPersona()
    
    document.querySelector("#listadoEnviosF7").style.display = "block";  
    
}

function personaDisplayEstadistica(){
    document.querySelector("#solicitudEnvioF6").style.display = "none";
    document.querySelector("#solicitudEnvioVehiculo").value = 0;
    document.querySelector("#solicitudEnvioDistancia").value = "";
    document.querySelector("#solicitudEnvioDescripcion").value = "";
    document.querySelector("#solicitudEnvioFoto").value = "";
    document.querySelector("#pErroresSolicitudEnvio").innerHTML = ""; 
    document.querySelector("#listadoEnviosF7").style.display = "none";  
    document.querySelector("#infoEstadisticaUsuario").style.display = "block";   
}

function displayMensajeErrorSolicitudesPendientesON() {
}

function displayMensajeErrorSolicitudesEnTransitoYFinalizadosON(mensaje) {
    document.querySelector("#pErrorListadoEnviosTomadosF9").style.display = "block";
    document.querySelector("#pErrorListadoEnviosTomadosF9").innerHTML = mensaje;
    document.querySelector("#tablaEnviosTomadosF9").style.display = "none";
}
function displayMensajeErrorSolicitudesEnTransitoYFinalizadosOFF() {
    document.querySelector("#pErrorListadoEnviosTomadosF9").style.display = "block";
    document.querySelector("#pErrorListadoEnviosTomadosF9").innerHTML = '';
    document.querySelector("#tablaEnviosTomadosF9").style.display = "table";
}

function empresaDisplayListadoEnvio() {
    document.querySelector("#listadoEnviosPendientesF8").style.display = "block";
    document.querySelector("#listadoEnviosTomadosF9").style.display = "block";
    document.querySelector("#infoEstadisticaEmpresaMejoresUsuarios").style.display = "none";
    document.querySelector("#infoEstadisticaEmpresaCantidadPorEstado").style.display = "none";
    crearListaDeSolicitudesPendientesEmpresa();                                                 // Actualizar el listado de pedidos pendientes especificos
    crearListadoDeSolicitudesTomadasEmpresa();                                                  // Actualizar listado de solicitudes en transito + finalizadas
}

function empresaDisplayEstadisticaMejoresUsuarios(mensaje) {
    document.querySelector("#listadoEnviosPendientesF8").style.display = "none";
    document.querySelector("#listadoEnviosTomadosF9").style.display = "none";
    document.querySelector("#infoEstadisticaEmpresaMejoresUsuarios").style.display = "block";
    document.querySelector("#pInfoEstadisticaEmpresaMejoresUsuarios").innerHTML = mensaje;
}

function empresaDisplayEstadisticaEnviosPorEstado() {
    crearTablaDeEnviosPorEstadoEmpresa();
    document.querySelector("#listadoEnviosPendientesF8").style.display = "none";
    document.querySelector("#listadoEnviosTomadosF9").style.display = "none";
    document.querySelector("#infoEstadisticaEmpresaCantidadPorEstado").style.display = "block";
}

function displayErrorEnviosPorEstadoEmpresaON(mensaje) {
    document.querySelector("#pSuccessEstadisticaCantPorEstadoEmpresa").style.display = "none";
}

function displaySuccessEnviosPorEstadoEmpresaON(mensaje) {
    document.querySelector("#pSuccessEstadisticaCantPorEstadoEmpresa").style.display = "block";
    document.querySelector("#pSuccessEstadisticaCantPorEstadoEmpresa").innerHTML = mensaje;
}