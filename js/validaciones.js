export function valida(input){
    const tipodeInput = input.dataset.tipo;
    if(validadores[tipodeInput]){
        validadores[tipodeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipodeInput, input);
    }
}

const tipoDeErrores= [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

// $0.validity
const mensajesDeError = {
    nombre: {
        valueMissing: "Tu nombre no puede estar vacio"
    },
    email: {
        valueMissing: "Email no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "La contraseña no puede estar vacia",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError:"Debes tener al menos 18 años"
    },
    numero: {
        valueMissing:"El numero no puede estar vacio",
        patternMismatch:"El formato requerido son 10 numeros"
    },
    direccion: {
        valueMissing:"La direccion no puede estar vacia",
        patternMismatch:"El formato no es correcto"
    },
    ciudad: {
        valueMissing:"La ciudad no puede estar vacia",
        patternMismatch:"El formato no es correcto"
    },
    estado: {
        valueMissing:"El estado no puede estar vacio",
        patternMismatch:"El formato no es correcto"
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]) {
            console.log(input.validity[error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }    
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    };
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return fechaActual >= diferenciaFechas;       
}