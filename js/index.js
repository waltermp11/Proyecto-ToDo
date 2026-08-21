const formulario = document.getElementById("formulario");
const botonesPrioridad = document.querySelectorAll('.btn-prioridad');
const inputPrioridad = document.getElementById('taskPrioridad');

botonesPrioridad.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesPrioridad.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        inputPrioridad.value = e.target.getAttribute('data-value');
    });
});


formulario.addEventListener("submit", function (e) {
    e.preventDefault();


    const datosTarea = {
        nombreTarea: document.getElementById("nombreTarea").value.trim(),
        descripcionTarea: document.getElementById("descripcionTarea").value.trim(),
        taskFechaEntrega: document.getElementById("taskFechaEntrega").value,
        taskEstado: document.getElementById("taskEstado").value,
        taskPrioridad: document.getElementById("taskPrioridad").value

    }


    validarCampos(datosTarea);

    if (validarCampos) {
        formulario.reset()
    }




})



function validarCampos(datos) {
    let cantidadErrores = {
        nombre: 0,
        descripcion: 0,
        fecha: 0,
        estado: 0,
        prioridad: 0
    };

    // Validaciones nombreTarea
    if (datos.nombreTarea === "") {
        console.log("El campo nombre no puede estar vacío ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacío, ingrese un nombre para la tarea.' });
        cantidadErrores.nombre++;
    }
    else if (datos.nombreTarea.length < 8) { // Cambiado a < 8 para que acepte 8 justo
        console.log("El nombre debe tener al menos 8 caracteres ❌");
        Swal.fire({ icon: 'error', title: 'Campo incompleto', text: 'El nombre de la tarea debe ser mayor o igual a 8 caracteres.' });
        cantidadErrores.nombre++;
    }

    // Validaciones descripcionTarea
    if (datos.descripcionTarea === "") {
        console.log("El campo descripción no puede estar vacío ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacío, ingrese una descripción.' });
        cantidadErrores.descripcion++;
    }
    else if (datos.descripcionTarea.length < 15) {
        console.log("La descripción debe tener al menos 15 caracteres ❌");
        Swal.fire({ icon: 'error', title: 'Campo incompleto', text: 'La descripción debe ser mayor o igual a 15 caracteres.' });
        cantidadErrores.descripcion++;
    }
    //validacion fechaEntrega

    if (datos.taskFechaEntrega === "") {
        console.log("La fecha no puede estar vacía ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'La fecha de entrega no puede estar vacía.' });
        cantidadErrores.fecha++;
    }

    // Validaciones taskEstado
    if (datos.taskEstado === "") {
        console.log("Seleccione un estado ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'Seleccione un estado de la tarea para poder continuar.' });
        cantidadErrores.estado++;
    }

    // validacion prioridad
    if (datos.taskPrioridad === "") {
        console.log("Seleccione una prioridad ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'Seleccione una prioridad para la tarea.' });
        cantidadErrores.prioridad++;
    }

    const totalErrores = cantidadErrores.nombre + cantidadErrores.descripcion + cantidadErrores.fecha + cantidadErrores.estado + cantidadErrores.prioridad;

    if (totalErrores === 0) {
        console.log("¡Todo está OK! No hay errores. Creando tarea... 🎉");

        Swal.fire({
            icon: 'success',
            title: '¡Tarea Creada!',
            text: 'La tarea se ha registrado con éxito.',
            showConfirmButton: true,
            timer: 2000
        });

        return true;
    } else {
        console.log(`Flujo detenido. Se encontraron ${totalErrores} errores en el formulario.`);
        return false;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    
    
    function activarCheckboxesTareas() {
        const checkboxes = document.querySelectorAll('.chk-tarea');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const tarjeta = e.target.closest('.task-item');

                if (e.target.checked) {
                    tarjeta.classList.add('tarea-completada');
                } else {
                    tarjeta.classList.remove('tarea-completada');
                }
            });
        });
    }

    // Inicializar listeners en el HTML existente
    activarCheckboxesTareas();
});