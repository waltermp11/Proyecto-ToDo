
const taskManager = new TaskManager();
const formulario = document.getElementById("formulario");
const botonesPrioridad = document.querySelectorAll('.btn-prioridad');
const inputPrioridad = document.getElementById('taskPrioridad');

botonesPrioridad.forEach(boton => {
    boton.addEventListener('click', (e) => {

        botonesPrioridad.forEach(b => b.classList.remove('active', 'border', 'border-white'));


        e.target.classList.add('active', 'border', 'border-white');

        // Guardar el valor en el input hidden
        inputPrioridad.value = e.target.getAttribute('data-value');
    });
});


formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar datos ingresados
    const datosTarea = {
        nombreTarea: document.getElementById("nombreTarea").value.trim(),
        descripcionTarea: document.getElementById("descripcionTarea").value.trim(),
        taskFechaEntrega: document.getElementById("taskFechaEntrega").value,
        taskEstado: document.getElementById("taskEstado").value,
        taskPrioridad: document.getElementById("taskPrioridad").value
    };

    const isValido = validarCampos(datosTarea);
    if (isValido) {
        const nuevaTarea = taskManager.addTask(
            datosTarea.nombreTarea,
            datosTarea.descripcionTarea,
            datosTarea.taskFechaEntrega,
            datosTarea.taskEstado,
            datosTarea.taskPrioridad
        );

        // Renderizar la nueva tarea en la lista del HTML
        renderizarTareaHTML(nuevaTarea);

        // Limpiar el formulario y la prioridad
        formulario.reset();
        inputPrioridad.value = "";
        botonesPrioridad.forEach(b => b.classList.remove('active', 'border', 'border-white'));
    }
});


function validarCampos(datos) {
    let cantidadErrores = 0;

    if (datos.nombreTarea === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacío, ingrese un nombre para la tarea.' });
        return false;
    } else if (datos.nombreTarea.length < 8) {
        Swal.fire({ icon: 'error', title: 'Campo incompleto', text: 'El nombre de la tarea debe ser mayor o igual a 8 caracteres.' });
        return false;
    }

    // Validación Descripción
    if (datos.descripcionTarea === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacío, ingrese una descripción.' });
        return false;
    } else if (datos.descripcionTarea.length < 15) {
        Swal.fire({ icon: 'error', title: 'Campo incompleto', text: 'La descripción debe ser mayor o igual a 15 caracteres.' });
        return false;
    }

    // Validación Fecha
    if (datos.taskFechaEntrega === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'La fecha de entrega no puede estar vacía.' });
        return false;
    }

    // Validación Estado
    if (datos.taskEstado === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'Seleccione un estado de la tarea para poder continuar.' });
        return false;
    }

    // Validación Prioridad
    if (datos.taskPrioridad === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'Seleccione una prioridad para la tarea.' });
        return false;
    }

    // Notificación de éxito
    Swal.fire({
        icon: 'success',
        title: '¡Tarea Creada!',
        text: 'La tarea se ha registrado con éxito.',
        showConfirmButton: true,
        timer: 2000
    });

    return true;
}

function renderizarTareaHTML(tarea) {
    const contenedorLista = document.getElementById('listadoDeTareas');

    let colorBadge = "bg-custom-yellow";
    if (tarea.prioridad === "Baja") colorBadge = "bg-custom-green";
    if (tarea.prioridad === "Alta") colorBadge = "bg-custom-red";

    const plantillaHTML = `
        <div class="task-item d-flex align-items-center justify-content-between px-3 py-2" data-id="${tarea.id}">
            <div class="contenido-tarea flex-grow-1 mx-3">
                <div class="form-check m-0">
                    <input class="form-check-input chk-tarea" type="checkbox" style="cursor: pointer;">
                </div>
                <div class="information-card">
                    <span><strong>Tarea ${tarea.id} - ${tarea.nombreTarea}</strong></span>
                    <p><strong>Descripción: </strong> ${tarea.descripcion}</p>

                    <div class="botton-card">
                        <p><strong>Fecha de Entrega: </strong> ${tarea.fecha}</p>
                        <button class="btn btn-outline-danger delete-button"><i class="bi bi-trash-fill"></i></button>
                    </div>
                    <p class="mb-0"><small>Estado: ${tarea.estado} | Prioridad: ${tarea.prioridad}</small></p>
                </div>
            </div>
            <span class="status-badge ${colorBadge}"></span>
        </div>
    `;

    contenedorLista.insertAdjacentHTML('afterbegin', plantillaHTML);
    activarCheckboxesTareas(); // Reactivar escucha de checkboxes para la nueva tarea
}

contenedorLista.addEventListener('click', (event) => {
    const botonEliminar = event.target.closest('.delete-button');

    if (botonEliminar) {
        const parentTask = botonEliminar.closest('.task-item');
        // Cambiamos dataset.taskId por dataset.id para que coincida con la plantilla
        const taskId = Number(parentTask.dataset.id);

        taskManager.deleteTask(taskId);
        parentTask.remove();
    }
});



function activarCheckboxesTareas() {
    const checkboxes = document.querySelectorAll('.chk-tarea');

    checkboxes.forEach(checkbox => {
        checkbox.onclick = (e) => {
            const tarjeta = e.target.closest('.task-item');
            if (e.target.checked) {
                tarjeta.classList.add('tarea-completada');
            } else {
                tarjeta.classList.remove('tarea-completada');
            }
        };
    });
}

document.addEventListener("DOMContentLoaded", () => {
    activarCheckboxesTareas();
});