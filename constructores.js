class UsuarioPersona{
    constructor(_username,_pass,_CI,_nombre,_apellido,_pedidos){
        this.username = _username;
        this.pass = _pass;
        this.cedula = _CI;
        this.nombre = _nombre;
        this.apellido = _apellido;
        this.pedidos = [];
    }
}


class UsuarioEmpresa {
    constructor(_username,_pass,_fantasia,_rut,_razonSocial,_vehiculo,_habilitacion,_totalKM,_empleado,){
        this.username = _username;
        this.pass = _pass;
        this.fantasia = _fantasia;
        this.rut = _rut;
        this.razonSocial = _razonSocial;
        this.vehiculo = _vehiculo;
        this.habilitacion = _habilitacion;  // True = empresa habilitada. False = empresa deshabilitada. 
        this.km = _totalKM;
        this.empleado = _empleado;
    }
}

class UsuarioAdmin {
    constructor(_username,_pass){
        this.username = _username;
        this.pass = _pass;
    }
}


class Envio {
    constructor(_vehiculo,_distancia,_descripcion,_img,_empresa,_estado){
        this.vehiculo = _vehiculo;
        this.distancia = _distancia;
        this.descripcion = _descripcion;
        this.img = _img;
        this.empresa= _empresa;             // Corresponde a la empresa que toma el pedido
        this.estado = _estado;              // Estado corresponde a: no aceptado, en transito, o completado

    }
}

class Vehiculo {
    constructor(_tipo,_codigo){
        this.tipo = _tipo;
        this.id = _codigo;
    }
}



