let usuarios = [];
let vehiculos = [];
let codigoVehiculo = 1000;
let envios = [];
let idEnvio = 1;
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
    document.querySelector("#btnEnviarSolicitudEnvio6").addEventListener('click', realizarSolicitudEnvio);
    document.querySelector("#btnPersonaListadoEnvios").addEventListener('click', crearListadoEnvios);
    document.querySelector("#btnPersonaListadoEnvios").addEventListener('click', calcularInfoEstadisticaPersona);

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
    usuarios.push(new UsuarioEmpresa("Empresa1", "Empresa01", "Empresa Uno", 101, "Empresa Cero Uno", "Moto", true, 0, "Empleado 1"))
    usuarios.push(new UsuarioEmpresa("Empresa2", "Empresa02", "Empresa Dos", 102, "Empresa Cero Dos", "Camioneta", true, 0, "Empleado 2"))
    usuarios.push(new UsuarioEmpresa("Empresa3", "Empresa03", "Empresa Tres", 103, "Empresa Cero Tres", "Camion", true, 0, "Empleado 3"))
    usuarios.push(new UsuarioEmpresa("Empresa4", "Empresa04", "Empresa Cuatro", 104, "Empresa Cero Cuatro", "Camion", false, 0, "Empleado 4"))
    usuarios.push(new UsuarioEmpresa("Empresa5", "Empresa05", "Empresa Cinco", 105, "Empresa Cero Cinco", "Camion", false, 0, "Empleado 5"))
}

function precargaDeUsuariosAdmin() {
    usuarios.push(new UsuarioAdmin("Admin", "Admin01"))
}

function precargaDeEnvios() {
    let pedido = new Envio(1000, 5, "Envio de supermercado", "envioSuper.jpg", null, "Pendiente", usuarios[0])
    envios.push(pedido);
    usuarios[0].pedidos.push(pedido);
    
    pedido = new Envio(1001, 10, "Motosierra", "motosierra.jpg", null, "Pendiente", usuarios[1]);
    envios.push(pedido);
    usuarios[1].pedidos.push(pedido);
    
    pedido = new Envio(1002, 5, "Mudanza de muebles", "mudanza.jpg", null, "Pendiente", usuarios[2]);
    envios.push(pedido);
    usuarios[2].pedidos.push(pedido);
}

function agregarVehiculo(tipo) {                                     // Agregar un nuevo vehiculo al sistema. No agrega vehiculos ya existentes. Devuelve true si existe, false si no.
    let vehiculoExitente = false;
    let i = 0;
    while (i < vehiculos.length && vehiculoExitente == false) {         // Verificar que el vehiculo no existe en el sistema
        if ((vehiculos[i].tipo).toUpperCase() == tipo.toUpperCase()) {
            vehiculoExitente = true
        }
        i++
    }
    if (i == vehiculos.length) {
        let nuevoVehiculo = new Vehiculo(tipo)
        vehiculos.push(nuevoVehiculo)
    }
    return 
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
    let i=0;
    let objetoUsuario = null;
    while(!encontrado && i<usuarios.length){
        if((usuarios[i].username).toUpperCase() == username.toUpperCase()){
            encontrado = true;
            objetoUsuario = usuarios[i]
        }
        i++
    }
    return objetoUsuario
}
function posUsuarioPorUsuario(username){               // Recibe como parametro el nombre de un ususario y en caso de existir retorna la posicion en el array ususarios[]
    let encontrado = false;
    let i=0;
    while(!encontrado && i<usuarios.length){
        if((usuarios[i].username).toUpperCase() == username.toUpperCase()){
            encontrado = true;
            return i
        }
        i++
    }
}

function objUsuarioPorRazonSocial(razonSocial){               // Recibe como parametro una razon social y en caso de existir retorna un AI con los objetos con dicha RZ.
    let arrayObjetos = [];
    let i=0;
    while(i<usuarios.length){
        if(usuarios[i].tipo == "Empresa"){
            if((usuarios[i].razonSocial).toUpperCase() == razonSocial.toUpperCase()){
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
    let i=0;
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

function realizarSolicitudEnvio() {
    let tipoVehiculoIngresado = document.querySelector("#solicitudEnvioVehiculo").value;
    let distanciaIngresada = document.querySelector("#solicitudEnvioDistancia").value;
    let descripcionIngresada = document.querySelector("#solicitudEnvioDescripcion").value;
    let fotoIngresada = document.querySelector("#solicitudEnvioFoto").value;
    
    if (tipoVehiculoIngresado && distanciaIngresada && descripcionIngresada && fotoIngresada) {
        if (!isNaN(distanciaIngresada)) {
            let distanciaNumerica = parseInt(distanciaIngresada);
            if (distanciaNumerica > 0) {
                btnSolicitudEnvioHandler(tipoVehiculoIngresado, distanciaNumerica, descripcionIngresada, fotoIngresada);
                document.querySelector("#solicitudEnvioVehiculo").value = 0;
                document.querySelector("#solicitudEnvioDistancia").value = "";
                document.querySelector("#solicitudEnvioDescripcion").value = "";
                document.querySelector("#solicitudEnvioFoto").value = "";
                document.querySelector("#pErroresSolicitudEnvio").innerHTML = "Envio ingresado";
            } else {
                document.querySelector("#pErroresSolicitudEnvio").innerHTML = "La cantidad de km ingresada debe ser mayor a cero";
            }
        } else {
            document.querySelector("#pErroresSolicitudEnvio").innerHTML = "La distancia ingresada debe ser numerica";
        }
    } else {
        document.querySelector("#pErroresSolicitudEnvio").innerHTML = "Debe completar todos los datos";
    }
}

function crearListadoEnvios() {
    console.log("click")
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
    <body id="bodyListadoDeEnvios">`;
    
    let bodyListado = armarBodyListadoEnvios();
    if (!bodyListado) {
        resultado = "No tiene pedidos asignados";
    } else {
        resultado = tableListadoEnvios + bodyListado
    }
    
    table.innerHTML = resultado
}

function armarBodyListadoEnvios() {
    let bodyListadoEnvios = ``;
    for (let i = 0; i < envios.length; i++) {
        let envioActual = envios[i];
        if (usuarioLoggeado.username == envioActual.persona.username) {
            bodyListadoEnvios += `  
            <tr>
                <td><img alt="Foto de envio" src="img/${envioActual.img}"></td>
                <td>${envioActual.descripcion}</td>
                <td>${envioActual.estado}</td>
                <td>${envioActual.empresa}</td>
            </tr>`
        }
    }
    bodyListadoEnvios += `</tbody>`
    return bodyListadoEnvios
}

function calcularInfoEstadisticaPersona() {
    let contadorPendientes = 0;
    let contadorEnTransito = 0;
    let contadorFinalizado = 0;

    for (let i = 0; i < envios.length; i++) {
        let envioActual = envios[i];
        if (envioActual.persona.username == usuarioLoggeado.username) {
            if (envioActual.estado = "Pendiente") {
                contadorPendientes++;
            } else if (envioActual.estado = "Transito") {
                contadorEnTransito++;
            } else if (envioActual.estado = "Finalizado") {
                contadorFinalizado++;
            }
        }
    }

    let pedidosTotales = contadorPendientes + contadorEnTransito + contadorFinalizado;
    let porcentajeTomados = (contadorEnTransito + contadorFinalizado) / pedidosTotales * 100 + "%";

    let resultado = `Envios totales: ${pedidosTotales}<br>
    Envios pendientes: ${contadorPendientes}<br>
    Envios en transito: ${contadorEnTransito}<br>
    Envios finalizados: ${contadorFinalizado}<br>
    Porcentaje de solicitud de envios tomados: ${porcentajeTomados}`

    document.querySelector("#infoEstadistica").innerHTML = resultado;
}

function btnSolicitudEnvioHandler(tipoVehiculo, distancia, descripcion, foto) {
    let pedido = new Envio(tipoVehiculo, distancia, descripcion, foto, null, "Pendiente", usuarioLoggeado);
    envios.push(pedido);
    let i = posUsuarioPorUsuario(usuarioLoggeado.username);
    usuarios[i].pedidos.push(pedido);
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

