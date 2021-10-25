let usuariosPersona = [];
let usuariosEmpresa = [];
let admins = [];
let vehiculos = [];

inicializar();

function inicializar(){
    precargaDeDatos();
    agregarEventoEnBotones();
}

function agregarEventoEnBotones(){
    document.querySelector("#btnRegistrarPersona").addEventListene("click", registroPersona);
    document.querySelector("#btnRegistrarEmpresa").addEventListene("click", registroEmpresa);
}

function precargaDeDatos(){
    precargaDeVehiculos();
    precargaDeUsuariosPersona();
    precargaDeUsuariosEmpresa();
    precargaDeUsuariosAdmin();
}

function precargaDeVehiculos(){
    vehiculos.push(new Vehiculo("Moto",obtenerNuevoID("Moto")))
    vehiculos.push(new Vehiculo("Camioneta",obtenerNuevoID("Camioneta")))
    vehiculos.push(new Vehiculo("Camion",obtenerNuevoID("Camion")))
    
}

function precargaDeUsuariosPersona() {
    usuariosPersona.push(new UsuarioPersona("bdiaz", 123, 12345678, "Bruno", "Diaz"))
    usuariosPersona.push(new UsuarioPersona("amayes", 456, 4928922, "Andres", "Mayes"))
    usuariosPersona.push(new UsuarioPersona("fcaillabet", 789, 87654321, "Felipe", "Caillabet"))
    usuariosPersona.push(new UsuarioPersona("lmirenda", 123, 14725836, "Luca", "Mirenda"))
}

function precargaDeUsuariosEmpresa() {
    usuariosEmpresa.push(new UsuarioEmpresa("Empresa1","Empresa01","Empresa Uno",1001,"Empresa Cero Uno", "Moto", true, 0, "Empleado 1"))
    usuariosEmpresa.push(new UsuarioEmpresa("Empresa2","Empresa02","Empresa Dos",1002,"Empresa Cero Dos", "Camioneta", true, 0, "Empleado 2"))
    usuariosEmpresa.push(new UsuarioEmpresa("Empresa3","Empresa03","Empresa Tres",1003,"Empresa Cero Tres", "Camion", true, 0, "Empleado 3"))
    usuariosEmpresa.push(new UsuarioEmpresa("Empresa4","Empresa04","Empresa Cuatro",1004,"Empresa Cero Cuatro", "Camion", false, 0, "Empleado 4"))
    usuariosEmpresa.push(new UsuarioEmpresa("Empresa5","Empresa05","Empresa Cinco",1005,"Empresa Cero Cinco", "Camion", false, 0, "Empleado 5"))
}

function precargaDeUsuariosAdmin() {
    admins.push(new UsuarioAdmin("Admin","Admin01"))
}

function agregarVehiculo(tipo){                                     // Agregar un nuevo vehiculo al sistema
    
    let vehiculoExitente = false;
    let i = 0;
    while(i<vehiculos.length || vehiculoExitente == false){         // Verificar que el vehiculo no existe en el sistema
        if((vehiculos[i].tipo).toUpperCase == tipo.toUpperCase()){
            vehiculoExitente = true
        }
        i++
    }
    if (i == vehiculos.length){
        let nuevoVehiculo = new Vehiculo(tipo,obtenerNuevoID(tipo))
        vehiculos.push(nuevoVehiculo)
    }
    
}

function obtenerNuevoID(nombreVehiculo){            // Genera un ID (diferente a los existentes) a partir de la primera letra del vehiculo y un numero random entre 0  y 1000
    let i = 0;
    let nuevoID = '';        
    while (i < vehiculos.length){
        if (i == 0){
            nuevoID = nombreVehiculo[0] + Math.floor(Math.random()*1000);
        }
        if (vehiculos[i].id === nuevoID){
            i = 0
        } else {
            i++
        }
    }
    return nuevoID
}

function registroPersona(){
    let aliasIngresado = document.querySelector("#registroAliasUsuarioPersonaF5").value;
    let passIngresado = document.querySelector("#registroPassUsuarioPersonaF5").value;
    let ciIngresado = document.querySelector("#registroCIUsuarioPersonaF5").value;
    let nombreIngresado = document.querySelector("#registroNombreUsuarioPersonaF5").value;
    let apellidoIngresado = document.querySelector("#registroApellidoUsuarioPersonaF5").value;
    aliasIngresado = aliasIngresado.trim();
    passIngresado = passIngresado.trim();
    ciIngresado = ciIngresado.trim();
    nombreIngresado = nombreIngresado.trim();
    apellidoIngresado = apellidoIngresado.trim();
    
    if (aliasIngresado && passIngresado && ciIngresado && nombreIngresado && apellidoIngresado) {
        let contraseniaValida = !validarPassword(passIngresado)
        let usuarioExistente = existeUsuarioPorUsuario(aliasIngresado);
        
        if (contraseniaValida) {
            alert("La contraseña no cumple con los requisitos.");
        } else if (usuarioExistente) {
            alert("Ya existe un usuario con ese nickname.");
        } else {
            registrarUsuario(aliasIngresado, passIngresado, ciIngresado, nombreIngresado, apellidoIngresado);
            alert("Usuario registrado con exito.");
        }
    } else {
        alert("Todos los campos son obligatorios.");
    }
    
}

function validarPassword(password) {            //Verificar si la contraseña es valida
    let esValida = true;

    if (!passwordTieneMayuscula(password) || !passwordTieneNumero(password) || password.length < 6) {
        esValida = false;
    }

    return esValida
}

function passwordTieneMayuscula(password) {            //Verificar si un texto contiene mayúsculas 
    let tieneMayuscula = false;

    let i = 0;
    while (!tieneMayuscula && i < password.length) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
            tieneMayuscula = true;
        }
        i++
    }

    return tieneMayuscula
}

function passwordTieneNumero(password) {            //Verificar si un texto contiene un número
    let tieneNumero = false;

    let i = 0;
    while (!tieneNumero && i < password.length) {
        if (!isNaN(password[i])) {
            tieneNumero = true;
        }
        i++
    }

    return tieneNumero
}


function existeUsuarioPorUsuario(alias) {            //Verificar si ya existe un usuario con ese alias
    let existe = false;
    let i = 0;
    while (!existe && i < alias.length) {
        let aliasGuardado = alias[i];
        if (alias === usuarioGuardado.alias) {
            existe = true;
        }
        i++;
    }
    return existe;
}

function registrarUsuario(alias, pass, ci, nombre, apellido) {            //Agregar un nuevo usuario al sistema
    let nuevoUsuario = new UsuarioPersona(alias, pass, ci, nombre, apellido);
    usuariosPersona.push(nuevoUsuario);
}

function registroEmpresa(){
    let mensaje = "";
    let aliasIngresado = document.querySelector("#registroAliasUsuarioEmpresa").value.trim();
    let passIngresado = document.querySelector("#registroPassUsuarioEmpresa").value.trim();
    let fantasiaIngresada = document.querySelector("#registroFantasiaUsuarioEmpresa").value.trim();
    let rutIngresado = document.querySelector("#registroRutUsuarioEmpresa").value.trim();
    let razonSocialIngresada = document.querySelector("#registroRazSocUsuarioEmpresa").value.trim();
    let vehiculoAsociado = document.querySelector("#registroVehiculoUsuarioEmpresa").value.trim();

    if (aliasIngresado && passIngresado && fantasiaIngresada && rutIngresado && razonSocialIngresada && vehiculoAsociado) {

    } else {
        mensaje = "Se deben ingresar todos los datos"
    }
}