import { validarFormulario } from './validarFormulario.js';
import { Cita } from './Cita.js';
// Cargar citas desde Local Storage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarCitasDeLocalStorage();
});
/**
 * Cargar todas las citas desde Local Storage y mostrarlas en la tabla
 */
export const cargarCitasDeLocalStorage = () => {
    const citas = JSON.parse(localStorage.getItem("citas")) || [];
    const tablaCuerpo = document.querySelector(".tabla-citas tbody");
    const filaVacia = document.querySelector(".fila-vacia");

    // Limpia todas las filas excepto "fila-vacía"
    tablaCuerpo.querySelectorAll("tr:not(.fila-vacia)").forEach(fila => fila.remove());

    if (citas.length === 0) {
        filaVacia.style.display = "table-row";
        console.log(`No hay citas para cargar`)
    } else {
        filaVacia.style.display = "none";
        citas.forEach(cita => agregarCitaATabla(cita));
        console.log(`Citas cargadas desde Local Storage: ${JSON.stringify(citas)}`);
    }
};
/**
 * Crear un objeto Cita a partir de los datos del formulario
 * @returns {Cita} Nueva instancia de la clase Cita
 */
export const crearCitaDesdeFormulario = () => {
    const formulario = document.getElementById("formulario-citas");

    const datosCita = {
        fecha: formulario.querySelector("#fecha").value.trim(),
        nombre: formulario.querySelector("#nombre").value.trim(),
        apellidos: formulario.querySelector("#apellidos").value.trim(),
        dni: formulario.querySelector("#dni").value.trim(),
        telefono: formulario.querySelector("#telefono").value.trim(),
        nacimiento: formulario.querySelector("#nacimiento").value.trim(),
        observaciones: formulario.querySelector("#observaciones").value.trim()
    };

    const nuevaCita = new Cita(
        datosCita.fecha,
        datosCita.nombre,
        datosCita.apellidos,
        datosCita.dni,
        datosCita.telefono,
        datosCita.nacimiento,
        datosCita.observaciones
    );

    console.log(`Nueva cita creada: ${JSON.stringify(nuevaCita)}`);
    return nuevaCita;
};
/**
 * Guardar una cita en Local Storage
 * @param {Object} cita - Objeto de tipo Cita
 */
export const guardarCitaEnLocalStorage = (cita) => {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    if (!citas.some(c => c.id === cita.id)) {
        citas.push(cita);
        localStorage.setItem("citas", JSON.stringify(citas));
        console.log(`Cita guardada en Local Storage: ${JSON.stringify(cita)}`);
    } else {
        console.warn(`La cita con ID ${cita.id} ya existe en Local Storage.`);
    }
};
/**
 * Agregar una cita a la tabla HTML
 * @param {Object} cita - Objeto de tipo Cita
 */
export const agregarCitaATabla = (cita) => {
    const tablaCuerpo = document.querySelector(".tabla-citas tbody");
    const filaVacia = document.querySelector(".fila-vacia");

    if (filaVacia) {
        filaVacia.style.display = "none";
    }
    const fila = document.createElement("tr");
    fila.setAttribute("data-id", cita.id);

    fila.innerHTML = `
        <td>${tablaCuerpo.querySelectorAll("tr:not(.fila-vacia)").length + 1}</td>
        <td>${cita.fecha}</td>
        <td>${cita.nombre}</td>
        <td>${cita.apellidos}</td>
        <td>${cita.dni}</td>
        <td>${cita.telefono}</td>
        <td>${cita.nacimiento}</td>
        <td>${cita.observaciones}</td>
        <td>
            <button class="btn-editar" data-id="${cita.id}">Editar</button>
            <button class="btn-eliminar" data-id="${cita.id}">Borrar</button>
        </td>
    `;
    tablaCuerpo.appendChild(fila);
    console.log(`Cita agregada a la tabla: ${JSON.stringify(cita)}`);
};
/**
 * Manejar el envío del formulario
 * @param {Event} evento - Evento de envío del formulario
 */
const manejarEnvioFormulario = (evento) => {
    evento.preventDefault();
    const formulario = document.getElementById("formulario-citas");
    if (formulario.dataset.idEdicion) {
        if (validarFormulario()) {
            const datosActualizados = {
                fecha: formulario.querySelector("#fecha").value.trim(),
                nombre: formulario.querySelector("#nombre").value.trim(),
                apellidos: formulario.querySelector("#apellidos").value.trim(),
                dni: formulario.querySelector("#dni").value.trim(),
                telefono: formulario.querySelector("#telefono").value.trim(),
                nacimiento: formulario.querySelector("#nacimiento").value.trim(),
                observaciones: formulario.querySelector("#observaciones").value.trim()
            };

            guardarCambiosEnCita(datosActualizados);
            formulario.reset();
        } else {
            console.warn("El formulario contiene errores. Revisa los campos.");
        }
    } else {
        if (validarFormulario()) {
            const nuevaCita = crearCitaDesdeFormulario();
            guardarCitaEnLocalStorage(nuevaCita);
            agregarCitaATabla(nuevaCita);
            formulario.reset();
            console.log("Cita procesada correctamente.");
        } else {
            console.warn("El formulario contiene errores. Revisa los campos.");
        }
    }
};
// Asociar el event listener al formulario
const formularioCitas = document.getElementById("formulario-citas");
formularioCitas.addEventListener("submit", manejarEnvioFormulario);
/**
 * Cargar los datos de una cita en el formulario para su edición
 * @param {string} id - Identificador único de la cita
 */
export const cargarCitaEnFormulario = (id) => {
    const citas = JSON.parse(localStorage.getItem("citas")) || [];
    const citaSeleccionada = citas.find(cita => cita.id === id);
    if (citaSeleccionada) {
        const formulario = document.getElementById("formulario-citas");

        formulario.querySelector("#fecha").value = citaSeleccionada.fecha;
        formulario.querySelector("#nombre").value = citaSeleccionada.nombre;
        formulario.querySelector("#apellidos").value = citaSeleccionada.apellidos;
        formulario.querySelector("#dni").value = citaSeleccionada.dni;
        formulario.querySelector("#telefono").value = citaSeleccionada.telefono;
        formulario.querySelector("#nacimiento").value = citaSeleccionada.nacimiento;
        formulario.querySelector("#observaciones").value = citaSeleccionada.observaciones;

        formulario.dataset.idEdicion = id;
        console.log(`Cita cargada en el formulario para edición: ${JSON.stringify(citaSeleccionada)}`);
    } else {
        console.error(`Cita con ID ${id} no encontrada.`);
    }
};
/**
 * Guardar cambios en una cita existente
 * @param {Object} datosActualizados - Datos actualizados de la cita
 */
export const guardarCambiosEnCita = (datosActualizados) => {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    const formulario = document.getElementById("formulario-citas");
    const idEdicion = formulario.dataset.idEdicion;

    if (idEdicion) {
        const indice = citas.findIndex(cita => cita.id === idEdicion);

        if (indice !== -1) {
            citas[indice] = { ...citas[indice], ...datosActualizados };

            localStorage.setItem("citas", JSON.stringify(citas));
            cargarCitasDeLocalStorage();
            console.log(`Cita con ID ${idEdicion} actualizada: ${JSON.stringify(citas[indice])}`);
        } else {
            console.error(`Cita con ID ${idEdicion} no encontrada para actualizar.`);
        }

        delete formulario.dataset.idEdicion;
    }
};
/**
 * Eliminar una cita de la tabla y del Local Storage
 * @param {string} id - Identificador único de la cita
 */
export const eliminarCita = (id) => {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    const tablaCuerpo = document.querySelector(".tabla-citas tbody");

    citas = citas.filter(cita => cita.id !== id);
    localStorage.setItem("citas", JSON.stringify(citas));

    const fila = tablaCuerpo.querySelector(`tr[data-id="${id}"]`);
    if (fila) {
        fila.remove();
    }

    if (citas.length === 0) {
        const filaVacia = document.querySelector(".fila-vacia");
        if (filaVacia) {
            filaVacia.style.display = "table-row";
        }
    }

    console.log(`Cita con ID ${id} eliminada.`);
};
// Delegación de eventos para los botones de eliminar
document.querySelector(".tabla-citas tbody").addEventListener("click", (evento) => {
    if (evento.target.classList.contains("btn-eliminar")) {
        const id = evento.target.dataset.id;
        eliminarCita(id);
    }
});
// Delegación de eventos para los botones de editar
document.querySelector(".tabla-citas tbody").addEventListener("click", (evento) => {
    if (evento.target.classList.contains("btn-editar")) {
        const id = evento.target.dataset.id;
        cargarCitaEnFormulario(id);
    }
});


