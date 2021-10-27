let usuarios = [];
let vehiculos = [];
let codigoVehiculo = 1000;

inicializar();

function inicializar() {
    precargaDeDatos();
    agregarEventoEnBotones();
    ocultarPantallas();
    toggleLogIn();
    updateSelectVehiculos();
    console.log(vehiculos)
}

function agregarEventoEnBotones() {
    document.querySelector("#btnRegistrarPersona").addEventListener("click", registroPersona);
    document.querySelector("#btnRegistrarEmpresa").addEventListener("click", registroEmpresa);
    // document.querySelector("#btnBuscarEmpresa").addEventListener("click", buscarEmpresa);
    document.querySelector("#btnTipoDeCuenta").addEventListener("click", seleccionarTipoDeCuentaARegistrar);
    document.querySelector("#btnLogIn").addEventListener("click", logIn);

}

// PRECARGA DE DATOS AL SISTEMA // 


function precargaDeDatos() {
    precargaDeVehiculos();
    precargaDeUsuariosPersona();
    precargaDeUsuariosEmpresa();
    precargaDeUsuariosAdmin();
}

function precargaDeVehiculos() {
    vehiculos.push(new Vehiculo("Moto"));
    vehiculos.push(new Vehiculo("Camioneta"));
    vehiculos.push(new Vehiculo("Camion"));
}

function precargaDeUsuariosPersona() {
    usuarios.push(new UsuarioPersona("bdiaz", 123, 12345678, "Bruno", "Diaz", []))
    usuarios.push(new UsuarioPersona("amayes", 456, 4928922, "Andres", "Mayes", []))
    usuarios.push(new UsuarioPersona("fcaillabet", 789, 87654321, "Felipe", "Caillabet", []))
    usuarios.push(new UsuarioPersona("lmirenda", 123, 14725836, "Luca", "Mirenda", []))
}

function precargaDeUsuariosEmpresa() {
    usuarios.push(new UsuarioEmpresa("Empresa1", "Empresa01", "Empresa Uno", 101, "Empresa Cero Uno", "Moto", true, 0, "Empleado 1"))
    usuarios.push(new UsuarioEmpresa("Empresa2", "Empresa02", "Empresa Dos", 102, "Empresa Cero Dos", "Camioneta", true, 0, "Empleado 2"))
    usuarios.push(new UsuarioEmpresa("Empresa3", "Empresa03", "Empresa Tres", 103, "Empresa Cero Tres", "Camion", true, 0, "Empleado 3"))
    usuarios.push(new UsuarioEmpresa("Empresa4", "Empresa04", "Empresa Cuatro", 104, "Empresa Cero Cuatro", "Camion", false, 0, "Empleado 4"))
    usuarios.push(new UsuarioEmpresa("Empresa5", "Empresa05", "Empresa Cinco", 105, "Empresa Cero Cinco", "Camion", false, 0, "Empleado 5"))
}

function precargaDeUsuariosAdmin() {
    usuarios.push(new UsuarioAdmin("Admin", "Admin01"))
}

function agregarVehiculo(tipo) {                                     // Agregar un nuevo vehiculo al sistema

    let vehiculoExitente = false;
    let i = 0;
    while (i < vehiculos.length || vehiculoExitente == false) {         // Verificar que el vehiculo no existe en el sistema
        if ((vehiculos[i].tipo).toUpperCase == tipo.toUpperCase()) {
            vehiculoExitente = true
        }
        i++
    }
    if (i == vehiculos.length) {
        let nuevoVehiculo = new Vehiculo(tipo, obtenerNuevoID(tipo))
        vehiculos.push(nuevoVehiculo)
    }
}

function registroPersona() {            // Registra un nuevo usuario en el sistema
    let aliasIngresado = document.querySelector("#registroAliasUsuarioPersonaF5").value.trim();
    let passIngresado = document.querySelector("#registroPassUsuarioPersonaF5").value.trim();
    let ciIngresado = parseInt(document.querySelector("#registroCIUsuarioPersonaF5").value);
    let nombreIngresado = document.querySelector("#registroNombreUsuarioPersonaF5").value.trim();
    let apellidoIngresado = document.querySelector("#registroApellidoUsuarioPersonaF5").value.trim();

    let noEsNumero = isNaN(ciIngresado);

    if (aliasIngresado && passIngresado && ciIngresado && nombreIngresado && apellidoIngresado) {
        if (!validarPassword(passIngresado)) {
            document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "La contraseña debe tener por lo menos una mayúscula, una minúscula y un número." 
        } else if (existeUsuarioPorUsuario(aliasIngresado)) {
            document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "Ya existe un usuario con ese alias.";     
        } else if (noEsNumero) {
            document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "La cédula debe contener solo números";
        } else {
            registrarUsuarioPersona(aliasIngresado, passIngresado, ciIngresado, nombreIngresado, apellidoIngresado);
            toggleLogIn();
            document.querySelector("#mensajeLogInNuevoUsuario").innerHTML = `Bienviendo nuevo usuario ${aliasIngresado}. Puedes logearte en la app.`
        }
    } else {
        document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "Todos los campos son obligatorios.";
    }

}

function validarPassword(password) {            //Verificar si la contraseña es valida
    let esValida = true;

    if (!passwordTieneMayuscula(password) || !passwordTieneNumero(password) || password.length < 6 || !passwordTieneMinuscula(password)) {
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

function passwordTieneMinuscula(password) {            //Verificar si un texto contiene mayúsculas 
    let tieneMinuscula = false;

    let i = 0;
    while (!tieneMinuscula && i < password.length) {
        if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
            tieneMinuscula = true;
        }
        i++
    }

    return tieneMinuscula
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

    while (!existe && i < usuarios.length) {
        if ((alias.toUpperCase()) === (usuarios[i].username.toUpperCase())) {
            existe = true;
        }
        i++;
    }

    return existe;
}

function registrarUsuarioPersona(alias, pass, ci, nombre, apellido) {            //Agregar una nueva persona al sistema
    let nuevoUsuarioPersona = new UsuarioPersona(alias, pass, ci, nombre, apellido);
    usuarios.push(nuevoUsuarioPersona);
}


function registroEmpresa() {
    let aliasIngresado = document.querySelector("#registroAliasUsuarioEmpresa").value.trim();
    let passIngresado = document.querySelector("#registroPassUsuarioEmpresa").value.trim();
    let fantasiaIngresada = document.querySelector("#registroFantasiaUsuarioEmpresa").value.trim();
    let rutIngresado = parseInt(document.querySelector("#registroRutUsuarioEmpresa").value);
    let razonSocialIngresada = document.querySelector("#registroRazSocUsuarioEmpresa").value.trim();
    let vehiculoAsociado = document.querySelector("#registroVehiculoUsuarioEmpresa").value;

    if (aliasIngresado && passIngresado && fantasiaIngresada && rutIngresado && razonSocialIngresada && vehiculoAsociado) {
        let contraseniaNoEsValida = !validarPassword(passIngresado);
        let usuarioExistente = existeUsuarioPorUsuario(aliasIngresado);
        let razonSocialUnica = existeRazonSocialPorUsuarioEmpresa(razonSocialIngresada);
        let rutUnico = existeRUTPorUsuarioEmpresa(rutIngresado);

        if (contraseniaNoEsValida) {
            document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "La contraseña debe tener por lo menos una mayúscula, una minúscula y un número.";
        } else if (usuarioExistente) {
            document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "Ya existe un usuario con ese alias.";
        } else if (razonSocialUnica) {
            document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "Ya existe un usuario con esa razón social.";
        } else if (rutUnico) {
            document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "Ya existe un usuario con ese RUT.";
        } else {
            registrarUsuarioEmpresa(aliasIngresado, passIngresado, fantasiaIngresada, rutIngresado, razonSocialIngresada, vehiculoAsociado);
            toggleLogIn();
            document.querySelector("#mensajeLogInNuevoUsuario").innerHTML = `Bienviendo nuevo usuario ${aliasIngresado}. Puedes logearte en la app.`
        }
    } else {
        document.querySelector("#pParaDesplegarErroresPersona").innerHTML = "Se deben ingresar todos los datos";
    }


}

function existeRazonSocialPorUsuarioEmpresa(razonSocial) {            // Checkear entre las empresas registradas si ya existe la razón social ingresada. SI existe devuelve 'true', sino exite 'false'
    let existe = false;
    let i = 0;
    while (!existe && i < usuarios.length) {
        if (razonSocial === usuarios[i].razonSocial) {
            existe = true;
        }
        i++;
    }
    return existe;
}

function existeRUTPorUsuarioEmpresa(rut) {            // Checkear entre las empresas registradas si ya existe el rut ingresado. Si existe devuelve 'true', sino exite 'false'
    let existe = false;
    let i = 0;
    while (!existe && i < usuarios.length) {
        if (rut === usuarios[i].rut) {
            existe = true;
        }
        i++;
    }
    return existe;
}


function registrarUsuarioEmpresa(alias, pass, fantasia, rut, razonSocial, vehiculo) {            //Agregar una nueva empresa al sistema
    let nuevoUsuarioEmpresa = new UsuarioEmpresa(alias, pass, fantasia, rut, razonSocial, vehiculo);
    usuarios.push(nuevoUsuarioEmpresa);
}

function cambiarEstadoDeEmpresa(empresa) {
    return !empresa.habilitacion
}

function buscarEmpresa() {

}

function seleccionarTipoDeCuentaARegistrar() {
    let tipoDeCuenta = document.querySelector("#tipoDeCuenta").value;
    displayRegistrarEmpresaPersona(tipoDeCuenta);
}

function logIn() {
    let user = document.querySelector("#ingresoUsuario").value;
    let pass = document.querySelector("#ingresoPassword").value
    let i = 0;
    let encontrado = false;

    while (i < usuarios.length && !encontrado) {
        if (usuarios[i].pass == pass && (usuarios[i].username).toUpperCase() === (user).toUpperCase()) {
            mensaje = "Bienvenido " + usuarios[i].username;
            let displayPanel = usuarios[i].tipo;
            displayNavPanel(displayPanel);
            encontrado = true;
        } else if(pass =='' || user==''){
            document.querySelector("#mensajeLogIn").innerHTML = 'Se deben completar todos los campos.'
        } else {
            document.querySelector("#mensajeLogIn").innerHTML = "El nombre de ususario y/o contraseña no son correctos.";
        }
        
        i++;
        document.querySelector("#ingresoUsuario").value = ''
        document.querySelector("#ingresoPassword").value = ''
        document.querySelector("#mensajeLogInNuevoUsuario").innerHTML = '';

    }

}

function crearListaDeEmpresas() {
    let table = document.querySelector("#tableListadoEmpresas")
    let tablaEmpresas = `
        
            <theader>
                <tr>
                    <th>Nombre de fantasia</th>
                    <th>RUT</th>
                    <th>Razon social</th>
                    <th>Estado</th>
                    <th>Habilitar/Deshabilitar</th>
                </tr>
            <tbody>
            `;
    
    for (let i = 0; i < usuarios.length; i++) {
        let usuarioActual = usuarios[i];
        
        if (usuarioActual.tipo == "Empresa") {
            tablaEmpresas += `
            <tr>
                <td>${usuarioActual.fantasia}</td>
                <td>${usuarioActual.rut}</td>
                <td>${usuarioActual.razonSocial}</td>
                <td>${usuarioActual.habilitacion}</td>
                <td><button>BTN</button></td>
            </tr>`
        } 
    }
    tablaEmpresas += `</tbody>`
    table.innerHTML = tablaEmpresas;
}