let usuarios = [];
let vehiculos = [];
let codigoVehiculo = 1000;
let envios = [];
let idEnvio = 0;
let usuarioLoggeado = null;

inicializar();

function inicializar() {
    precargaDeDatos();
    agregarEventoEnBotones();
    ocultarPantallas();
    toggleLogIn();
    updateSelectVehiculos("#registroVehiculoEmpresa");
}

function agregarEventoEnBotones() {
    document.querySelector("#btnRegistrarPersona").addEventListener("click", registroPersona);
    document.querySelector("#btnRegistrarEmpresa").addEventListener("click", registroEmpresa);
    document.querySelector("#btnTipoDeCuenta").addEventListener("click", seleccionarTipoDeCuentaARegistrar);
    document.querySelector("#btnLogIn").addEventListener("click", logIn);
    document.querySelector("#btnIngresarVehiculo").addEventListener('click', agregarVehiculoAlSistemaHandler);
    document.querySelector("#btnEnviarSolicitudEnvio6").addEventListener('click', btnSolicitudEnvioHandler);
    document.querySelector("#btnPersonaListadoEnvios").addEventListener('click', crearListadoEnviosPersona);
    document.querySelector("#btnPersonaListadoEnvios").addEventListener('click', calcularInfoEstadisticaPersona);
    document.querySelector("#btnEmpresaEstadistica").addEventListener('click', calcularInfoEstadisticaEmpresa);
    document.querySelector("#btnResEnviosPorEstadoEmpresa").addEventListener('click', calcularCantidadEnviosPorEstadoEmpresa);
}

// PRECARGA DE DATOS AL SISTEMA // 


function precargaDeDatos() {
    precargaDeVehiculos();
    precargaDeUsuariosPersona();
    precargaDeUsuariosEmpresa();
    precargaDeUsuariosAdmin();
    precargaDeEnvios();
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
    usuarios.push(new UsuarioEmpresa("Empresa1", "Empresa01", "Empresa Uno", 101, "Empresa Cero Uno", 1000, true, 0, "Empleado 1",[0].id))
    usuarios.push(new UsuarioEmpresa("Empresa2", "Empresa02", "Empresa Dos", 102, "Empresa Cero Dos", 1001, true, 0, "Empleado 2",[]))
    usuarios.push(new UsuarioEmpresa("Empresa3", "Empresa03", "Empresa Tres", 103, "Empresa Cero Tres", 1002, true, 0, "Empleado 3",[]))
    usuarios.push(new UsuarioEmpresa("Empresa4", "Empresa04", "Empresa Cuatro", 104, "Empresa Cero Cuatro", 1002, false, 0, "Empleado 4",[]))
    usuarios.push(new UsuarioEmpresa("Empresa5", "Empresa05", "Empresa Cinco", 105, "Empresa Cero Cinco", 1002, false, 0, "Empleado 5",[]))
}

function precargaDeUsuariosAdmin() {
    usuarios.push(new UsuarioAdmin("Admin", "Admin01"))
}

function precargaDeEnvios() {
    let pedido = new Envio(1000, 5, "Envio de supermercado", "envioSuper.jpg", "Empresa Cero Uno", "Pendiente", usuarios[0].username)
    envios.push(pedido);
    usuarios[0].pedidos.push(pedido.id);
    usuarios[4].pedidos.push(pedido.id);
    
    pedido = new Envio(1001, 10, "Motosierra", "motosierra.jpg", "Empresa Cero Uno", "En tránsito", usuarios[1].username);
    envios.push(pedido);
    usuarios[1].pedidos.push(pedido.id);
    
    pedido = new Envio(1002, 5, "Mudanza de muebles", "mudanza.jpg", "Empresa Cero Uno", "Finalizado", usuarios[0].username);
    envios.push(pedido);
    usuarios[0].pedidos.push(pedido.id);
    usuarios[4].pedidos.push(pedido.id);
    
    pedido = new Envio(1002, 5, "Mudanza de muebles", "mudanza.jpg", "Empresa Cero Uno", "En tránsito", usuarios[2].username);
    envios.push(pedido);
    usuarios[2].pedidos.push(pedido.id);
    usuarios[4].pedidos.push(pedido.id);
    
    pedido = new Envio(1002, 5, "Mudanza de muebles", "mudanza.jpg", "Empresa Cero Uno", "Finalizado", usuarios[2].username);
    envios.push(pedido);
    usuarios[2].pedidos.push(pedido.id);
    usuarios[4].pedidos.push(pedido.id);

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

function objUsuarioPorUsuario(username){               // Recibe como parametro el nombre de un ususario y en caso de existir retorna el objeto con ese nombre de usuario
    let encontrado = false;
    let i = 0;
    let objetoUsuario = null;
    while (!encontrado && i<usuarios.length){
        if (usuarios[i].username.toUpperCase() == username.toUpperCase()){
            encontrado = true;
            objetoUsuario = usuarios[i]
        }
        i++
    }
    return objetoUsuario
}
function posUsuarioPorUsuario(username){               // Recibe como parametro el nombre de un ususario y en caso de existir retorna la posicion en el array ususarios[]
    let encontrado = false;
    let i = 0;
    while (!encontrado && i<usuarios.length){
        if (usuarios[i].username.toUpperCase() == username.toUpperCase()){
            encontrado = true;
            return i
        }
        i++
    }
}

function objUsuarioPorRazonSocial(razonSocial){               // Recibe como parametro una razon social y en caso de existir retorna un AI con los objetos con dicha RZ.
    let arrayObjetos = [];
    let i = 0;
    while (i < usuarios.length){
        if (usuarios[i].tipo == "Empresa"){
            if (usuarios[i].razonSocial.toUpperCase() == razonSocial.toUpperCase()){
                arrayObjetos.push(usuarios[i]);
            }

        }
        i++
    }
    if(arrayObjetos.length>0){
        return arrayObjetos
    }
}

function objUsuarioPorNombreFantasia(nombreFantasia){          // Recibe como parametro un nombde de fantasia y en caso de existir retorna un AI con los objetos con dicha NF.
    let i = 0;
    let arrayObjetos = [];
    
    while(i<usuarios.length){
        if(usuarios[i].tipo == "Empresa"){

            if((usuarios[i].fantasia).toUpperCase() == nombreFantasia.toUpperCase()){
                arrayObjetos.push(usuarios[i]);
            }
        }
        i++
    }
    if(arrayObjetos.length>0){
        return arrayObjetos
    }
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

function seleccionarTipoDeCuentaARegistrar() {
    let tipoDeCuenta = document.querySelector("#tipoDeCuenta").value;
    displayRegistrarEmpresaPersona(tipoDeCuenta);
}

function logIn() {
    let user = document.querySelector("#ingresoUsuario").value;
    let pass = document.querySelector("#ingresoPassword").value
    let i = 0;
    let encontrado = false;
    let mensaje = document.querySelector("#mensajeLogIn");

    while (i < usuarios.length && !encontrado) {
       
        if (usuarios[i].pass == pass && (usuarios[i].username).toUpperCase() === (user).toUpperCase()) {
            if (usuarios[i].tipo == "Empresa" && usuarios[i].habilitacion == false){
                mensaje.innerHTML = "Su cuenta aun no ha sido activada por el administrador."
            }else {
                let displayPanel = usuarios[i].tipo;
                displayNavPanel(displayPanel);
                usuarioLoggeado = usuarios[i];
            }
            encontrado = true;
        } else if(pass =='' || user==''){
           mensaje.innerHTML = 'Se deben completar todos los campos.'
        } else {
            mensaje.innerHTML = "El nombre de ususario y/o contraseña no son correctos.";
        }
        
        i++;
        document.querySelector("#ingresoUsuario").value = '';
        document.querySelector("#ingresoPassword").value = '';
        document.querySelector("#mensajeLogInNuevoUsuario").innerHTML = '';
    }
}

function crearListaDeEmpresas() {
    displayErrorBusquedaOFF();
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
        let estadoParaModificar = mostrarTextoHabilitarDeshabilitar(usuarioActual)
        let estadoActual = leerEstado(usuarioActual);

        if (usuarioActual.tipo == "Empresa") {
            tablaEmpresas += `
            <tr>
                <td>${usuarioActual.fantasia}</td>
                <td>${usuarioActual.rut}</td>
                <td>${usuarioActual.razonSocial}</td>
                <td>${estadoActual}</td>
                <td><button class="btn btn-warning btnCambioEstado" btnempresaUsername="${usuarioActual.username}">${estadoParaModificar}</button></td>
            </tr>`
        } 
    }
    tablaEmpresas += `</tbody>`
    table.innerHTML = tablaEmpresas;
    activarBotonesCambioDeEstado();
}

function mostrarTextoHabilitarDeshabilitar(usuarioEmpresa) {        // Leer el estado (habilitado o deshabilitado) de la empresa. Devuelve "habilitar" o "deshabilitar"
    if (usuarioEmpresa.tipo=="Empresa"){
        if (usuarioEmpresa.habilitacion){
            return "Deshabilitar"
        } else {
            return "Habilitar"
        }
    }
}

function leerEstado(usuarioEmpresa){        // Leer el estado de la empresa y devolverlo
    if (usuarioEmpresa.tipo=="Empresa"){
        if (usuarioEmpresa.habilitacion){
            return "Habilitado"
        } else {
            return "Deshabilitado"
        }
    }
}

function cambiarEstadoDeEmpresa(){   // Recibe como parametro una empresa, cambia su estado de habilitado a deshabilitado o viceversa
    let empresaUsernameClickeado = this.getAttribute("btnempresaUsername")
    let empresa = objUsuarioPorUsuario(empresaUsernameClickeado);
   
    if (empresa.habilitacion){
        empresa.habilitacion = false;
    }else{
        empresa.habilitacion = true;
    }
    crearListaDeEmpresas();                                                                     // Actualizar el listado de empresas
    crearListaDeEmpresasFiltrado();                                                                     // Actualizar el listado de empresas
}

function activarBotonesCambioDeEstado(){                                                        // Activa todos los botones de "Habilitar/Deshabilitar" en la lista de empresas del panel de administrador
    let listaBotones = document.querySelectorAll(".btnCambioEstado");                           // guardar todos los botones con el Tag indicado en un array
    for(let i = 0; i<listaBotones.length;i++){
        listaBotones[i].addEventListener('click',cambiarEstadoDeEmpresa);
    }
    
}

function buscadorEmpresas(input){                                                                    // Generar una tabla con todas las empresas que cumplan el criterio de busqueda
    let criterioDeBusqueda = input.trim();
    let empresasEncontradasPorRZ = objUsuarioPorRazonSocial(criterioDeBusqueda) 
    let empresasEncontradasPorNF = objUsuarioPorNombreFantasia(criterioDeBusqueda)
    
    if(empresasEncontradasPorRZ){                                                               // Buscamos primero por Razon Social
        return empresasEncontradasPorRZ;                                 // En caso de encontrar generamos la tabla con las empresas encontradas
    }
    else if (empresasEncontradasPorNF){                                                         // En caso de no encontrar nada por RZ buscamos por NF
        return empresasEncontradasPorNF;                                 // En caso de encontrar generamos la tabla con las empresas encontradas

    } else {                                                                                    // En caso de no encontrar resultados por ningun metodo desplegar msj de error
        return "Error";
    }
}

function crearListaDeEmpresasFiltrado() {
    let criterioDeBusqueda = document.querySelector("#textoBusquedaEmpresaF2").value;           // Leer del HTML lo esrito en el input field
    let arrayEmpresas = buscadorEmpresas(criterioDeBusqueda)
    if (arrayEmpresas != 'Error'){
        let table = document.querySelector("#tableListadoEmpresasFiltrado");
        table.innerHTML = ` <theader>
                                <tr>
                                    <th>Nombre de fantasia</th>
                                    <th>RUT</th>
                                    <th>Razon social</th>
                                    <th>Estado</th>
                                    <th>Habilitar/Deshabilitar</th>
                                </tr>
                            <tbody>
        `;
                        
        for (let i = 0; i < arrayEmpresas.length; i++) {
            let estadoParaModificar = mostrarTextoHabilitarDeshabilitar(arrayEmpresas[i])
            let estadoActual = leerEstado(arrayEmpresas[i]);
    
            table.innerHTML += `  <tr>
                            <td>${arrayEmpresas[i].fantasia}</td>
                            <td>${arrayEmpresas[i].rut}</td>
                            <td>${arrayEmpresas[i].razonSocial}</td>
                            <td>${estadoActual}</td>
                            <td><button class="btn btn-warning btnCambioEstado" btnempresaUsername="${arrayEmpresas[i].username}">${estadoParaModificar}</button></td>
                        </tr>`
                    
                
        }
        table.innerHTML += `</tbody>`
    }
    activarBotonesCambioDeEstado();    
}

function cortarPath(path) {
    let posDeArranquePath = posicionUltimoSlash(path) + 1;

    let nuevoPath = path.slice(posDeArranquePath);

    return nuevoPath
}

function posicionUltimoSlash(path) {
    let posUltimoBackSlash = -1;

    for (let i = 0; i < path.length; i++) {
        if (path[i] == "\\") {
            posUltimoBackSlash = i;
        }
    }

    console.log(path.slice(posUltimoBackSlash))
    return posUltimoBackSlash
}

function btnSolicitudEnvioHandler() {
    let tipoVehiculoIngresado = document.querySelector("#solicitudEnvioVehiculo").value;
    let distanciaIngresada = document.querySelector("#solicitudEnvioDistancia").value;
    let descripcionIngresada = document.querySelector("#solicitudEnvioDescripcion").value;
    let fotoIngresada = document.querySelector("#solicitudEnvioFoto").value;
    
    if (tipoVehiculoIngresado && distanciaIngresada && descripcionIngresada && fotoIngresada) {
        if (!isNaN(distanciaIngresada)) {
            let distanciaNumerica = parseInt(distanciaIngresada);
            let fotoIngresadaValidada = cortarPath(fotoIngresada)
            if (distanciaNumerica > 0) {
                realizarSolicitudEnvio(tipoVehiculoIngresado, distanciaNumerica, descripcionIngresada, fotoIngresadaValidada);
                displaySuccessSolicitudEnvioON();
                displayErrorSolicitudEnvioOFF();
            } else {
                displayErrorSolicitudEnvioON("La cantidad de km ingresada debe ser mayor a cero");
                displaySuccessSolicitudEnvioOFF();
            }
        } else {
           displayErrorSolicitudEnvioON("La distancia ingresada debe ser numerica");
           displaySuccessSolicitudEnvioOFF();
        }
    } else {
        displayErrorSolicitudEnvioON("Completar todos los datos");
        displaySuccessSolicitudEnvioOFF();
    }
}

function realizarSolicitudEnvio(tipoVehiculo, distancia, descripcion, foto) {
    let pedido = new Envio(tipoVehiculo, distancia, descripcion, foto, null, "Pendiente", usuarioLoggeado.username);
    envios.push(pedido);
    let i = posUsuarioPorUsuario(usuarioLoggeado.username);
    usuarios[i].pedidos.push(pedido.id);
}

function crearListadoEnviosPersona() {
    let table = document.querySelector("#listadoDeEnviosPersona");
    let tableListadoEnvios = ` 
    <header>
        <tr>
            <th>Foto</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Empresa</th>
        </tr>
    </header>
    <body id="bodyListadoDeEnviosPersona"></tbody>`;
                
    let hayEnvios = hayEnviosParaAgregar();
    if (!hayEnvios) {
        resultado = "No tiene pedidos asignados";
    } else {
        let bodyListado = armarBodyListadoEnviosPersona();
        resultado = tableListadoEnvios + bodyListado
    }
    
    table.innerHTML = resultado
}

function hayEnviosParaAgregar() {
    let hayEnvios = false;

    let i = 0;
    while (i < envios.length && !hayEnvios) {
        let envioActual = envios[i];
        if (usuarioLoggeado.username == envioActual.persona) {
            hayEnvios = true;
        }
        i++
    }  

    return hayEnvios
}

function armarBodyListadoEnviosPersona() {
    let bodyListadoEnvios = ``;
    for (let i = 0; i < envios.length; i++) {
        let envioActual = envios[i];
        if (usuarioLoggeado.username == envioActual.persona) {
            bodyListadoEnvios += `  
            <tr>
                <td><img alt="Foto de envio" src="../img/${envioActual.img}"></td>
                <td>${envioActual.descripcion}</td>
                <td>${envioActual.estado}</td>
                <td>${envioActual.empresa}</td>
            </tr>`
        }
    }
    return bodyListadoEnvios
}


function calcularInfoEstadisticaPersona() {
    let contadorPendientes = 0;
    let contadorEnTransito = 0;
    let contadorFinalizado = 0;

    for (let i = 0; i < envios.length; i++) {
        let envioActual = envios[i];
        if (envioActual.persona == usuarioLoggeado.username) {
            if (envioActual.estado == "Pendiente") {
                contadorPendientes++;
            } else if (envioActual.estado == "En tránsito") {
                contadorEnTransito++;
            } else if (envioActual.estado == "Finalizado") {
                contadorFinalizado++;
            }
        }
    }

    let pedidosTotales = contadorPendientes + contadorEnTransito + contadorFinalizado;
    let porcentajeTomados = (contadorEnTransito + contadorFinalizado) / pedidosTotales * 100 + "%";

    let resultado = `Envios totales: ${pedidosTotales}<br>
    Envios pendientes: ${contadorPendientes}<br>
    Envios en tránsito: ${contadorEnTransito}<br>
    Envios finalizados: ${contadorFinalizado}<br>
    Porcentaje de solicitud de envios tomados: ${porcentajeTomados}`

    document.querySelector("#infoEstadistica").innerHTML = resultado;
}

function agregarVehiculo(tipo) {                                     // Agregar un nuevo vehiculo al sistema. No agrega vehiculos ya existentes. Devuelve true si existe, false si no.
    let vehiculoExistente = false;
    let i = 0;
    while (i < vehiculos.length && vehiculoExistente == false) {         // Verificar que el vehiculo no existe en el sistema
        if ((vehiculos[i].tipo).toUpperCase() == tipo.toUpperCase()) {
            vehiculoExistente = true
        }
        i++
    }
    if (i == vehiculos.length) {
        let nuevoVehiculo = new Vehiculo(tipo)
        vehiculos.push(nuevoVehiculo)
    }
}


function agregarVehiculoAlSistemaHandler(){
    let vehiculoLeido = document.querySelector("#tipoNuevoVehiculo").value;
    if (vehiculoLeido == '') {
        displayMensajeErrorVehiculoON("Se debe completar el campo.")
    } else {
        if(!checkVehiculoPorTipo(vehiculoLeido)){
            agregarVehiculo(vehiculoLeido);
            displayMensajeErrorVehiculoOFF();
            crearListaDeVehiculos();
        } else {
            displayMensajeErrorVehiculoON("El vehiculo ya existe en el sistema.");
        }
    }
    document.querySelector("#tipoNuevoVehiculo").value = ""
}

function checkVehiculoPorTipo(tipo){                    // Verifica si existe un vehiculo por nombre
    let existe = false;
    let i = 0;
    while(!existe && i < vehiculos.length){
        if((vehiculos[i].tipo).toUpperCase() == tipo.toUpperCase()){
            existe = true;
        }
        i++
    }
    return existe
}

function tipoVehiculoPorId(id){                             // Recibe como parametro un id y busca a que vehiculo corresponde (ej 1000 corresponde a Moto)
    let existe = false;
    let i=0;
    while(i<vehiculos.length && !existe) {
        if(vehiculos[i].id == id){
            existe = true;
            return vehiculos[i].tipo
        }
        i++
    }
}

function crearListaDeVehiculos(){
    let table = document.querySelector("#listadoVehiculos");
    table.innerHTML = ` <theader>
                                <tr>
                                    <th>Tipo</th>
                                    <th>ID</th>
                                </tr>
                        </theader>
                        <tbody>
        `;
    for(let i = 0; i < vehiculos.length; i++){
        table.innerHTML += `<tr>
                                <td>${vehiculos[i].tipo}</td>
                                <td>${vehiculos[i].id}</td>
                            </tr>`
    }
    table.innerHTML += `</tbody>`
}

// -- Listado solicitudes pendientes para usuario tipo empresa -- // 

function buscarPedidosDisponiblesPorVehiculo(objEmpresa){      // Recibe como parametro un objeto empresa y retorna un array con los objetos de pedidos que puede tomar (segun tipo vehiculo y disp)
    let arrayPedidos = [];
    for (let i = 0; i<envios.length; i++){
        if(envios[i].estado == "Pendiente" && envios[i].vehiculo == objEmpresa.vehiculo){
            arrayPedidos.push(envios[i]);
        }
    }
    return arrayPedidos
}


function crearListaDeSolicitudesPendientesEmpresa(){                    // Genera la tabla con los pedidos que puede aceptar la empresa loggeada
    let enviosPosibles = buscarPedidosDisponiblesPorVehiculo(usuarioLoggeado);
    let tableBody = document.querySelector("#bodyListadoEnviosPendientesEmpresa");
    tableBody.innerHTML = ``;
    
    if(enviosPosibles.length > 0){
        for(let i = 0; i< enviosPosibles.length; i++){
            let j = buscarPosEnvioPorId(enviosPosibles[i].id);
            let vehiculo = tipoVehiculoPorId(envios[j].vehiculo);
            let usuarioPersona = objUsuarioPorUsuario(envios[j].persona);
            tableBody.innerHTML += `<tr>
                                        <td><img alt="Foto de envio" src="../img/${envios[j].foto}"></td>
                                        <td>${vehiculo}</td>
                                        <td>${envios[j].distancia}</td>
                                        <td>${envios[j].estado}</td>
                                        <td>${usuarioPersona.nombre}</td>
                                        <td>${usuarioPersona.apellido}</td>
                                        <td><button class="btn btn-success btnAceptarPedido" btnEnvioId="${envios[j].id}">Aceptar</button></td>
                                    </tr>`
        }
        
    } else {
        displayMensajeErrorSolicitudesPendientesON()
    }
    activarBotonesAceptarSolicitudesPendientes();
}

function activarBotonesAceptarSolicitudesPendientes(){                                           // Activa todos los botones de "Aceptar" en la lista de solicitudes pendientes para empresa
    let listaBotones = document.querySelectorAll(".btnAceptarPedido");                           // guardar todos los botones con el Tag indicado en un array
    for(let i = 0; i < listaBotones.length;i++){
        listaBotones[i].addEventListener('click',aceptarPedido);
    }
}

function aceptarPedido(){
    let envioIdClickeado = this.getAttribute("btnEnvioId")
    let j = buscarPosEnvioPorId(envioIdClickeado);
    envios[j].estado = "En tránsito";
    
    envios[j].empresa = usuarioLoggeado.razonSocial;
    
    crearListaDeSolicitudesPendientesEmpresa();                                                 // Actualizar el listado de pedidos pendientes especificos
    crearListadoDeSolicitudesTomadasEmpresa();                                                  // Actualizar listado de solicitudes en transito + finalizadas
}

function buscarPosEnvioPorId(id){       // Recibe como parametro el id de un envio, busca en el array de envios la posicion del obj con ese id
    let i = 0;
    let existe = false;
    while(i<envios.length && !existe){
        if(envios[i].id == id){
            existe = true;
            return i
        }
        i++
    }
}


function buscarEnviosPorEmpresa(objEmpresa) {
    let arrayPedidos = [[],[]];
    for (let i = 0; i < envios.length; i++){
        if (envios[i].estado == "En tránsito" && envios[i].empresa == objEmpresa.razonSocial) {
            arrayPedidos[0].push(envios[i]);
        } else if ((envios[i].estado == "Finalizado" && envios[i].empresa == objEmpresa.razonSocial)) {
            arrayPedidos[1].push(envios[i]);
        }
    }
    return arrayPedidos
}

function crearListadoDeSolicitudesTomadasEmpresa(){
    let table = document.querySelector("#tablaEnviosTomadosF9")
    let enviosEnTransitoYFinalizados = buscarEnviosPorEmpresa(usuarioLoggeado);
    let enviosEnTransito = enviosEnTransitoYFinalizados[0];
    let enviosFinalizados = enviosEnTransitoYFinalizados[1];

    if (enviosEnTransito.length > 0 || enviosFinalizados.length > 0){
        let tablaPedidosTomados =   `<header>
                                        <tr>
                                            <td><strong>Foto</strong></td>
                                            <td><strong>Vehiculo</strong></td>
                                            <td><strong>Distancia (Km)</strong></td>
                                            <td><strong>Estado</strong></td>
                                            <td><strong>Nombre</strong></td>
                                            <td><strong>Apellido</strong></td>
                                            <td><strong>Cambiar estado de envio</strong></td>
                                        </tr>
                                    </header>
                                    <body>`
        for(let i = 0; i < enviosEnTransito.length; i++){
            let j = buscarPosEnvioPorId(enviosEnTransito[i].id);
            let usuarioPersona = objUsuarioPorUsuario(envios[j].persona)
            let vehiculo = tipoVehiculoPorId(envios[j].vehiculo);
            tablaPedidosTomados += `<tr>
                                        <td><img alt="Foto de envio" src="..\\img\\${envios[j].foto}"></td>
                                        <td>${vehiculo}</td>
                                        <td>${envios[j].distancia}</td>
                                        <td>${envios[j].estado}</td>
                                        <td>${usuarioPersona.nombre}</td>
                                        <td>${usuarioPersona.apellido}</td>
                                        <td><button class="btn btn-success btnAceptarPedido" btnempresaUsername="${usuarioPersona.username}">Finalizar</button></td>
                                    </tr>`
        }
        
        for(let i = 0; i < enviosFinalizados.length; i++){
            let j = buscarPosEnvioPorId(enviosFinalizados[i].id);
            let usuarioPersona = objUsuarioPorUsuario(envios[j].persona);
            let vehiculo = tipoVehiculoPorId(envios[j].vehiculo);
            tablaPedidosTomados += `<tr>
                                        <td><img alt="Foto de envio" src="..\\img\\${envios[j].foto}"></td>
                                        <td>${vehiculo}</td>
                                        <td>${envios[j].distancia}</td>
                                        <td>${envios[j].estado}</td>
                                        <td>${usuarioPersona.nombre}</td>
                                        <td>${usuarioPersona.apellido}</td>
                                        <td></td>
                                    </tr>`;
        };
        tablaPedidosTomados += `</body>`;
        table.innerHTML = tablaPedidosTomados;
    } else {
        displayMensajeErrorSolicitudesEnTransitoYFinalizadosON("No hay envios asignados a su empresa.");
    }
}

function calcularInfoEstadisticaEmpresa() {
    let infoEstadisticaMejoresUsuarios;

    let usuariosConMasEnvios = encontrarUsuariosConMasEnvios();

    if (usuariosConMasEnvios.length > 0) {
        infoEstadisticaMejoresUsuarios = `La/s personas con mas envios realizados es/son: <br>`;
        for (let i = 0; i < usuariosConMasEnvios.length; i++) {
            let usuarioActual = usuariosConMasEnvios[i];
            infoEstadisticaMejoresUsuarios += `${i + 1}. ${usuarioActual.nombre} ${usuarioActual.apellido}.<br>`
        }
    } else {
        infoEstadisticaMejoresUsuarios = "No hay pedidos finalizados asignados a esta empresa.";
    }

    empresaDisplayEstadisticaMejoresUsuarios(infoEstadisticaMejoresUsuarios);
}

function encontrarUsuariosConMasEnvios() {
    let cantPedidosFinalizadosPorUsuario = [];

    for (let i = 0; i < usuarios.length; i++) {
        let usuarioActual = usuarios[i];
        
        if (usuarioActual.tipo == "Persona") {
            let contEnviosFinalizados = 0;
            
            for (let j = 0; j < usuarioActual.pedidos.length; j++) {
                let idPedidoActual = usuarioActual.pedidos[j];
                let pedidoActual = buscarPedidoPorId(idPedidoActual);
                console.log(pedidoActual.estado == "Finalizado")
                console.log(`${idPedidoActual}: ${pedidoActual.empresa} =? ${usuarioLoggeado.razonSocial} = ${pedidoActual.empresa == usuarioLoggeado.razonSocial}`)
                if (pedidoActual.estado == "Finalizado" && pedidoActual.empresa == usuarioLoggeado.razonSocial) {
                    contEnviosFinalizados++
                }
            }

            cantPedidosFinalizadosPorUsuario.push(contEnviosFinalizados)

        } else {
            cantPedidosFinalizadosPorUsuario.push(null)
        }
    }

    let mayorCantEnvios = encontrarNumMasGrande(cantPedidosFinalizadosPorUsuario);

    let mejoresUsuarios = [];

    if (mayorCantEnvios != 0) {
        mejoresUsuarios = armarArrayConMejoresUsuarios(mayorCantEnvios, cantPedidosFinalizadosPorUsuario);
    }
    
    return mejoresUsuarios
}

function buscarPedidoPorId(idABuscar) {
    let pedido;
    let pedidoEncontrado = false;
    
    let i = 0
    while (i < envios.length && !pedidoEncontrado) {
        let pedidoActual = envios[i];
        if (pedidoActual.id == idABuscar) {
            pedido = pedidoActual;
            pedidoEncontrado = true;
        }
        i++
    }
    
    return pedido
}

function encontrarNumMasGrande(arrayNumerico) {
    let numMasGrande = 0;
    
    for (let i = 0; i < envios.length; i++) {
        let numActual = arrayNumerico[i];
        if (numActual != null && numActual > numMasGrande ) {
            numMasGrande = numActual
        }
    }
    
    return numMasGrande
}

function armarArrayConMejoresUsuarios(numMasGrande, pedidosPorUsuario) {
    let mejoresUsuarios = [];

    for (let i = 0; i < pedidosPorUsuario.length; i++) {
        let numActual = pedidosPorUsuario[i];
        if (numActual == numMasGrande) {
            mejoresUsuarios.push(usuarios[i])
        }
    }

    return mejoresUsuarios
}

function calcularCantidadEnviosPorEstadoEmpresa() {
    let estadoElegidoNumerico = document.querySelector("#selEstadisticaPorEstadoEmpresa").value;
    let estadoElegido
    let cantEstadoElegido;
    let mensaje

    if (estadoElegidoNumerico == 0) {
        mensaje = "Elija un estado para mostrar.";
        displayErrorEnviosPorEstadoEmpresaON(mensaje)
    } else {
        if (estadoElegidoNumerico == 1) {
            estadoElegido = "Pendiente"
        } else if (estadoElegidoNumerico == 2) {
            estadoElegido = "En tránsito"
        } else if (estadoElegidoNumerico == 3) {
            estadoElegido = "Finalizado"
        }
        cantEstadoElegido = cantEnviosDeEstado(estadoElegido);
        mensaje = `Hay ${cantEstadoElegido} envio/s en el estado "${estadoElegido}".`;
        displaySuccessEnviosPorEstadoEmpresaON(mensaje);
    }
}

function cantEnviosDeEstado(estadoElegido) {
    let contDeEnvios = 0;

    if (usuarioLoggeado.pedidos.length > 0) {
        let arrIdsDeEnviosDeEmpresa = usuarioLoggeado.pedidos;

        for (let i = 0; i < arrIdsDeEnviosDeEmpresa.length; i++) {
            let idActual = arrIdsDeEnviosDeEmpresa[i]
            let pedidoActual = buscarPedidoPorId(idActual)
            
            if (pedidoActual.estado == estadoElegido) {
                contDeEnvios++
            }
        }
    }

    return contDeEnvios
}