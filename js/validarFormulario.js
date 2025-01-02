/**
 * Validar los campos del formulario antes de crear una cita.
 * Resalta errores en los campos que no cumplen las reglas de validación.
 * @returns {boolean} - `true` si todos los campos son válidos, `false` de lo contrario.
 */
// Objeto de reglas de validación y mensajes de error
const reglasValidacion = {
    fecha: {
        validar: (valor) => valor.trim() !== "",
        mensaje: "La fecha es obligatoria."
    },
    nombre: {
        validar: (valor) => valor.trim() !== "" && /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(valor),
        mensajes: [
            "El nombre es obligatorio.",
            "El nombre no puede contener números."
        ]
    },
    apellidos: {
        validar: (valor) => valor.trim() !== "" && /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(valor),
        mensajes: [
            "Los apellidos son obligatorios.",
            "Los apellidos no pueden contener números."
        ]
    },
    dni: {
        validar: (valor) => valor.trim() !== "" && /^[0-9]{8}[A-Z]$/.test(valor),
        mensajes: [
            "El DNI es obligatorio.",
            "El DNI no es válido. Debe tener 8 dígitos y una letra mayúscula."
        ]
    },
    telefono: {
        validar: (valor) => valor.trim() !== "" && /^[0-9]{9}$/.test(valor),
        mensajes: [
            "El teléfono es obligatorio.",
            "El teléfono debe contener 9 dígitos."
        ]
    },
    nacimiento: {
        validar: (valor) => valor.trim() !== "",
        mensaje: "La fecha de nacimiento es obligatoria."
    }
};
// Función para validar el formulario
export const validarFormulario = () => {
    let esValido = true;
    // Limpiar errores previos
    limpiarErrores();
    // Obtener el formulario una vez
    const formulario = document.getElementById("formulario-citas");
    Object.entries(reglasValidacion).forEach(([campo, regla]) => {
        const elemento = formulario.querySelector(`#${campo}`);
        const valor = elemento?.value || "";

        if (!regla.validar(valor)) {
            const mensaje = Array.isArray(regla.mensajes)
                ? valor.trim() === "" ? regla.mensajes[0] : regla.mensajes[1]
                : regla.mensaje;
            mostrarError(elemento, mensaje);
            esValido = false;
        }
    });
    return esValido;
};
// Función para mostrar un mensaje de error
const mostrarError = (campo, mensaje) => {
    const mensajeError = document.createElement("small");
    mensajeError.classList.add("mensaje-error");
    mensajeError.textContent = mensaje;

    // Insertar mensaje de error justo después del campo
    campo.insertAdjacentElement("afterend", mensajeError);
    campo.classList.add("campo-error");
};
// Función para limpiar errores previos
const limpiarErrores = () => {
    document.querySelectorAll(".mensaje-error").forEach(error => error.remove());
    document.querySelectorAll(".campo-error").forEach(campo => campo.classList.remove("campo-error"));
};
