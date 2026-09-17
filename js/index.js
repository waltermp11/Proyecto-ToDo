const taskManager = new TaskManager();


taskManager.load();
taskManager.render();

const formulario = document.getElementById("formulario");
const botonesPrioridad = document.querySelectorAll('.btn-prioridad');
const inputPrioridad = document.getElementById('taskPrioridad');
const contenedorLista = document.getElementById('listadoDeTareas');


botonesPrioridad.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesPrioridad.forEach(b => b.classList.remove('active', 'border', 'border-white'));
        e.target.classList.add('active', 'border', 'border-white');
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
    };

    const isValido = validarCampos(datosTarea);
    if (isValido) {
        taskManager.addTask(
            datosTarea.nombreTarea,
            datosTarea.descripcionTarea,
            datosTarea.taskFechaEntrega,
            datosTarea.taskEstado,
            datosTarea.taskPrioridad
        );

        
        taskManager.save();
        taskManager.render();

        formulario.reset();
        inputPrioridad.value = "";
        botonesPrioridad.forEach(b => b.classList.remove('active', 'border', 'border-white'));
    }
});


contenedorLista.addEventListener('click', (event) => {
    const parentTask = event.target.closest('.task-item');
    if (!parentTask) return;

    const taskId = Number(parentTask.dataset.taskId);

    
    if (event.target.classList.contains('done-button')) {
        const task = taskManager.getTaskById(taskId);

        if (task) {
            task.estado = 'DONE';
            
            
            taskManager.save();
            taskManager.render();

            Swal.fire({
                icon: 'info',
                title: '¡Tarea Completada!',
                text: `La tarea ${taskId}, fue marcada como DONE.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
    }

    
    const botonEliminar = event.target.closest('.delete-button');
    if (botonEliminar) {
        if (taskId) {
            taskManager.deleteTask(taskId);
            taskManager.save(); // Guardar cambios tras la eliminación
            taskManager.render();

            Swal.fire({
                icon: 'success',
                title: 'Tareaa eliminada',
                text: 'La tarea se ha eliminado ❌.',
                showConfirmButton: true,
                timer: 1500
            });
        }
    }
});



function validarCampos(datos) {
    if (datos.nombreTarea === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacío, ingrese un nombre para la tarea.' });
        return false;
    } else if (datos.nombreTarea.length < 8) {
        Swal.fire({ icon: 'error', title: 'Campo incompleto', text: 'El nombre de la tarea debe ser mayor o igual a 8 caracteres.' });
        return false;
    }

    if (datos.descripcionTarea === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacío, ingrese una descripción.' });
        return false;
    } else if (datos.descripcionTarea.length < 15) {
        Swal.fire({ icon: 'error', title: 'Campo incompleto', text: 'La descripción debe ser mayor o igual a 15 caracteres.' });
        return false;
    }

    if (datos.taskFechaEntrega === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'La fecha de entrega no puede estar vacía.' });
        return false;
    }

    if (datos.taskEstado === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'Seleccione un estado de la tarea para poder continuar.' });
        return false;
    }

    if (datos.taskPrioridad === "") {
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'Seleccione una prioridad para la tarea.' });
        return false;
    }

    Swal.fire({
        icon: 'success',
        title: '¡Tarea Creada!',
        text: 'La tarea se ha registrado con éxito.',
        showConfirmButton: true,
        timer: 2000
    });

    return true;
}