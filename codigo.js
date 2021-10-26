let usuariosPersona = [];
let usuariosEmpresa = [];
let admins = [];
let vehiculos = [];

inicializar();

function inicializar(){
    precargaDeDatos();
    agregarEventoEnBotones();
    ocultarPantallas();
}

function agregarEventoEnBotones(){
    document.querySelector("#btnRegistrarPersona").addEventListener("click", registroPersona);
    // document.querySelector("#btnBuscarEmpresa").addEventListener("click", buscarEmpresa);
    document.querySelector("#btnTipoDeCuenta").addEventListener("click",seleccionarTipoDeCuentaARegistrar);
    document.querySelector("#btnLogIn").addEventListener("click",logIn);

}

// PRECARGA DE DATOS AL SISTEMA // 


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
    usuariosPersona.push(new UsuarioPersona("bdiaz", 123, 12345678, "Bruno", "Diaz",[]))
    usuariosPersona.push(new UsuarioPersona("amayes", 456, 4928922, "Andres", "Mayes",[]))
    usuariosPersona.push(new UsuarioPersona("fcaillabet", 789, 87654321, "Felipe", "Caillabet",[]))
    usuariosPersona.push(new UsuarioPersona("lmirenda", 123, 14725836, "Luca", "Mirenda",[]))
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

function obtenerNuevoID(){            // Genera un ID (diferente a los existentes) a partir de la primera letra del vehiculo y un numero random entre 0  y 1000
    let i = 0;
    let nuevoID = '';        
    while (i < vehiculos.length){
        if (i == 0){
            nuevoID = Math.floor((Math.random()*1000 - 100)) + 100; //Fuente https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        }
        if (vehiculos[i].id === nuevoID){
            i = 0
        } else {
            i++
        }
    }
    return nuevoID
}

function registroPersona(){            // Registra un nuevo usuario en el sistema
    let aliasIngresado = document.querySelector("#registroAliasUsuarioPersonaF5").value.trim();
    let passIngresado = document.querySelector("#registroPassUsuarioPersonaF5").value.trim();
    let ciIngresado = parseInt(document.querySelector("#registroCIUsuarioPersonaF5").value);
    let nombreIngresado = document.querySelector("#registroNombreUsuarioPersonaF5").value.trim();
    let apellidoIngresado = document.querySelector("#registroApellidoUsuarioPersonaF5").value.trim();

    let noEsNumero = isNaN(ciIngresado);
    
    if (aliasIngresado && passIngresado && ciIngresado && nombreIngresado && apellidoIngresado) {
        let contraseniaNoEsValida = !validarPassword(passIngresado)
        let usuarioExistente = existeUsuarioPorUsuario(aliasIngresado);
        
        if (contraseniaNoEsValida) {
            alert("La contraseña no cumple con los requisitos.");
        } else if (usuarioExistente) {
            alert("Ya existe un usuario con ese nickname.");
        } else if (noEsNumero){
            alert("la cédula debe contener solo números");
        } else {
            registrarUsuarioPersona(aliasIngresado, passIngresado, ciIngresado, nombreIngresado, apellidoIngresado);
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
    while (!existe && i < usuariosPersona.length) {
        if (alias === usuariosPersona[i].alias) {
            existe = true;
        }
        i++;
    }

    while (!existe && i < usuariosEmpresa.length) {
        if (alias === usuariosEmpresa[i].alias) {
            existe = true;
        }
        i++;
    }
    
    while (!existe && i < admins.length) {
        if (alias === admins[i].alias) {
            existe = true;
        }
        i++;
    }
     
    return existe;
}

function registrarUsuarioPersona(alias, pass, ci, nombre, apellido) {            //Agregar una nueva persona al sistema
    let nuevoUsuarioPersona = new UsuarioPersona(alias, pass, ci, nombre, apellido);
    usuariosPersona.push(nuevoUsuarioPersona);
}


function registroEmpresa(){
    let aliasIngresado = document.querySelector("#registroAliasUsuarioEmpresa").value.trim();
    let passIngresado = document.querySelector("#registroPassUsuarioEmpresa").value.trim();
    let fantasiaIngresada = document.querySelector("#registroFantasiaUsuarioEmpresa").value.trim();
    let rutIngresado = parseInt(document.querySelector("#registroRutUsuarioEmpresa").value);
    let razonSocialIngresada = document.querySelector("#registroRazSocUsuarioEmpresa").value.trim();
    let vehiculoAsociado = document.querySelector("#registroVehiculoUsuarioEmpresa").value.trim();
    
    if (aliasIngresado && passIngresado && fantasiaIngresada && rutIngresado && razonSocialIngresada && vehiculoAsociado) {
        let contraseniaNoEsValida = !validarPassword(passIngresado);
        let usuarioExistente = existeUsuarioPorUsuario(aliasIngresado);
        let razonSocialUnica = existeRazonSocialPorUsuarioEmpresa(razonSocialIngresada);
        let rutUnico = existeRUTPorUsuarioEmpresa(rutIngresado);
        
        if (contraseniaNoEsValida) {
            alert("La contraseña no cumple con los requisitos.");
        } else if (usuarioExistente) {
            alert("Ya existe un usuario con ese nickname.");
        } else if (razonSocialUnica){
            alert("Ya existe un usuario con esa razón social.");
        } else if (rutUnico){
            alert("Ya existe un usuario con ese RUT.");
        } else {
            registrarUsuarioEmpresa(aliasIngresado, passIngresado, fantasiaIngresada, rutIngresado, razonSocialIngresada, vehiculoAsociado);
            alert("Usuario registrado con exito.");
        }
    } else {
       alert("Se deben ingresar todos los datos");
    }

    
}

function existeRazonSocialPorUsuarioEmpresa(razonSocial) {            // Checkear entre las empresas registradas si ya existe la razón social ingresada. SI existe devuelve 'true', sino exite 'false'
    let existe = false;
    let i = 0;
    while (!existe && i < usuariosEmpresa.length) {
        if (razonSocial === usuariosEmpresa[i].razonSocial) {
            existe = true;
        }
        i++;
    }
    return existe;
}

function existeRUTPorUsuarioEmpresa(rut) {            // Checkear entre las empresas registradas si ya existe el rut ingresado. Si existe devuelve 'true', sino exite 'false'
    let existe = false;
    let i = 0;
    while (!existe && i < usuariosEmpresa.length) {
        if (rut === usuariosEmpresa[i].rut) {
            existe = true;
        }
        i++;
    }
    return existe;
}


function registrarUsuarioEmpresa(alias, pass, fantasia, rut, razonSocial, vehiculo) {            //Agregar una nueva empresa al sistema
    let nuevoUsuarioEmpresa = new UsuarioEmpresa(alias, pass, fantasia, rut, razonSocial, vehiculo);
    usuariosEmpresa.push(nuevoUsuarioEmpresa);
}

function cambiarEstadoDeEmpresa(empresa) {
    return !empresa.habilitacion
}

function buscarEmpresa() {
    
}

function seleccionarTipoDeCuentaARegistrar(){
    let tipoDeCuenta = document.querySelector("#tipoDeCuenta").value;
    displayRegistrarEmpresaPersona(tipoDeCuenta);
}

function logIn(){
    let user = document.querySelector("#ingresoUsuario").value;
    let pass = document.querySelector("#ingresoPassword").value
    let i = 0;
    let j = 0;
    let k = 0;
    let encontrado = false;
    let mensaje = '';
    while(i<admins.length || !encontrado){
        if((admins[i].username).toUpperCase() === (user).toUpperCase()){
            if (admins[i].pass === pass){
                mensaje = "Bienvenido "+ admins[i].username;
                encontrado = true;
                displayNavPanel("Admin");
            } else {
                document.querySelector("#mensajeLogIn").innerHTML = "El nombre de ususario y/o contraseña no son correctos.";
            }
        }
        i++;
    }
    document.querySelector("#ingresoUsuario").value = ''
    document.querySelector("#ingresoPassword").value = ''
}