/**
 * Clase Cita: Modelo de datos para cada cita
 */
export class Cita {
    /**
     * Constructor para crear una nueva cita
     * @param {string} fecha - Fecha de la cita
     * @param {string} nombre - Nombre del paciente
     * @param {string} apellidos - Apellidos del paciente
     * @param {string} dni - DNI del paciente
     * @param {string} telefono - Teléfono del paciente
     * @param {string} nacimiento - Fecha de nacimiento del paciente
     * @param {string} observaciones - Observaciones adicionales sobre la cita
     */
    constructor(fecha, nombre, apellidos, dni, telefono, nacimiento, observaciones) {
        this.id = this.generarId(); // Generar identificador único
        this.fecha = fecha;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.telefono = telefono;
        this.nacimiento = nacimiento;
        this.observaciones = observaciones;
    }
    /**
     * Genera un identificador único basado en el instante de grabación y un componente aleatorio
     * que evita que 2 citas se generen en el mismo instante de tiempo (altamente improbable)
     * @returns {string} ID único basado en el tiempo Epoch y un número aleatorio para evitar que se generen
     */
    generarId() {
        return `${Date.now()}-${Math.floor(Math.random() * 100)}`;
    }
    /**
     * Obtener un resumen de la cita
     * @returns {object} Resumen de los datos de la cita
     */
    obtenerResumen() {
        return {
            id: this.id,
            fecha: this.fecha,
            nombre: this.nombre,
            apellidos: this.apellidos,
            dni: this.dni,
            telefono: this.telefono,
            nacimiento: this.nacimiento,
            observaciones: this.observaciones
        };
    }
}
