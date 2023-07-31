/*  const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener('blur', (evento) => {
    validarNacimiento(evento.target);
}); */ 

 export function validar(input) {
    const tipoDeInput = input.dataset.tipo 
    if(validaciones[tipoDeInput]) {
        validaciones[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.queryElement(".input-message-error").innerHTML("")
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.queryElement(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Must have between 6 and 12 characters, at least 1 capital letter and not special characters."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: 'You must be an adult.'
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es xx xxxx xxxx 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener de 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener de 10 a 40 caracteres."
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener de 10 a 40 caracteres."
    },
}

const validaciones = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tiposDeErrores.forEach(error =>  {
        if(input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeError[tipoDeInput][error]);
            mensaje = mensajeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!adult(fechaCliente)) {
        mensaje = 'You must be an adult.';
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}