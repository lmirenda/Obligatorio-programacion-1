class UsuarioPersona{
    constructor(_username, _pass, _CI, _nombre, _apellido, _pedidos){
        this.username = _username;
        this.pass = _pass;
        this.cedula = _CI;
        this.nombre = _nombre;
        this.apellido = _apellido;
        this.pedidos = [];
        this.tipo = "Persona";
    }
}


class UsuarioEmpresa {
    constructor(_username, _pass, _fantasia, _rut, _razonSocial, _vehiculo, _habilitacion, _totalKM){
        this.username = _username;
        this.pass = _pass;
        this.fantasia = _fantasia;
        this.rut = _rut;
        this.razonSocial = _razonSocial;
        this.vehiculo = _vehiculo;
        this.habilitacion = _habilitacion;  // True = empresa habilitada. False = empresa deshabilitada. 
        this.km = _totalKM;
        this.pedidos = [];
        this.tipo = "Empresa"
    }
}

class UsuarioAdmin {
    constructor(_username, _pass){
        this.username = _username;
        this.pass = _pass;
        this.tipo = "Administrador"
    }
}


class Envio {
    constructor(_vehiculo, _distancia, _descripcion, _img, _empresa, _estado, _persona){
        this.vehiculo = _vehiculo;
        this.distancia = _distancia;
        this.descripcion = _descripcion;
        this.img = _img;
        this.empresa = _empresa;             // Corresponde a la empresa que toma el pedido
        this.estado = _estado;              // Estado corresponde a: no aceptado, en transito, o completado
        this.persona = _persona;
        this.id = idEnvio;
        idEnvio++;
    }
}

class Vehiculo {
    constructor(_tipo){
        this.tipo = _tipo;
        this.id = codigoVehiculo;
        codigoVehiculo++
    }
}
