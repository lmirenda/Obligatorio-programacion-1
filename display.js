// SELECTORES // 
const btnMostrarLogIn = document.querySelector("#btnDisplayLogIn");
const btnMostrarRegister = document.querySelector("#btnDisplayRegistrar");
const btnCerrarSesion = document.querySelector("#btnDisplayCerrarSesion")

// EVENT LISTENERS // 
btnMostrarLogIn.addEventListener('click',toggleLogIn);
btnMostrarRegister.addEventListener('click', toggleRegister);
btnCerrarSesion.addEventListener('click', cerrarSesion);

// FUNCIONES // 

function cerrarSesion(){
    ocultarPantallas();
    btnMostrarRegister.style.display = "inline-block"
    btnCerrarSesion.style.display = "none";
    btnMostrarLogIn.style.display = "inline-block"

}
function toggleLogIn(){
    ocultarPantallas();
    document.querySelector("#funcionalidad1").style.display="block";       
}

function toggleRegister(){
    ocultarPantallas();
    document.querySelector("#funcionalidad5").style.display="block";
}

function ocultarPantallas() {                                               // Ocultar todas las pantallas
    document.querySelector("#funcionalidad1").style.display="none"        // Log In
    document.querySelector("#funcionalidad2").style.display="none"        // Habilitar/Deshabilitar empresa
    document.querySelector("#funcionalidad3").style.display="none"         // Crear tipos de vehiculos
    document.querySelector("#funcionalidad4").style.display="none"        // Visualizar info estadistica
    document.querySelector("#funcionalidad5").style.display="none"       // Registrarse en la app
    document.querySelector("#funcionalidad6").style.display="none"         // Realizar solicitud de envio
    document.querySelector("#funcionalidad7").style.display="none"         // Listado de envios
    document.querySelector("#funcionalidad8").style.display="none"         // Listado de sol pendientes (empresas)
    document.querySelector("#funcionalidad9").style.display="none"         // Listado de sol tommdas (empresas)
    document.querySelector("#registroUsuario").style.display="none"         
    document.querySelector("#registroEmpresa").style.display="none"         
    document.querySelector("#panelAdmin").style.display="none"         
    document.querySelector("#panelEmpresa").style.display="none"         
    document.querySelector("#panelPersona").style.display="none"         
    btnCerrarSesion.style.display = "none";
}

function displayRegistrarEmpresaPersona(usuario){
    if (usuario == "Empresa"){                                              // Muestra unicamente las opciones de registro de Empresa
        document.querySelector("#registroUsuario").style.display="none" 
        document.querySelector("#registroEmpresa").style.display="block"
    }                                                                       // Muestra unicamente las opciones de registro de Persona
    if (usuario == "Persona"){
        document.querySelector("#registroUsuario").style.display="block" 
        document.querySelector("#registroEmpresa").style.display="none"
    }
}

function displayNavPanel(tipo){
    switch (tipo) {
        case "Admin":
            document.querySelector("#panelAdmin").style.display="block"
            document.querySelector("#funcionalidad1").style.display="none"
            btnMostrarLogIn.style.display = "none"
            btnMostrarRegister.style.display = "none"
            btnCerrarSesion.style.display = "block"
            break;
    
        case "Empresa":
            document.querySelector("#panelEmpresa").style.display="block"
            break;
    
        case "Persona":
            document.querySelector("#panelPersona").style.display="block"
            break;
    
        default:
            break;
    }
}



/*---------------------------------Bruno-------------------------------------*/ 
// function ocultarPantallas() {
//     ocultarPantallaLogin();
//     document.querySelector("#pantallaGestionUsuarios").style.display = "none";
//     ocultarPantallaRegistroUsuario();
// }

// function ocultarPantallaLogin() {
//     document.querySelector("#pantallaLogin").style.display = "none";
//     document.querySelector("#txtLoginUsuario").value = 'bdiaz';
//     document.querySelector("#txtLoginPassword").value = '123';
//     document.querySelector("#divLoginMensajes").innerHTML = '';
// }

// function ocultarPantallaRegistroUsuario() {
//     document.querySelector("#pantallaRegistroUsuario").style.display = "none";
//     document.querySelector("#txtRegistroUsuarioUsuario").value = '';
//     document.querySelector("#txtRegistroUsuarioPassword").value = '';
//     document.querySelector("#divRegistroUsuarioMensajes").innerHTML = '';
// }

// function mostrarPantallaLogin() {
//     ocultarPantallas();
//     document.querySelector("#pantallaLogin").style.display = "block";
// }

// function mostrarPantallaRegistroUsuario() {
//     ocultarPantallas();
//     document.querySelector("#pantallaRegistroUsuario").style.display = "block";
// }

// function mostrarPantallaGestionUsuarios() {
//     ocultarPantallas();
//     actualizarTablaDeUsuarios();
//     document.querySelector("#pantallaGestionUsuarios").style.display = "block";
// }
// /*--------------------------------------------------------------------------------------------*/