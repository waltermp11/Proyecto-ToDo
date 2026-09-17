const taskManager = new TaskManager();

// Cargar datos guardados y renderizar al iniciar la aplicación
taskManager.load();
taskManager.render();

// Referencias a elementos del DOM
const formulario = document.getElementById("formulario");
const botonesPrioridad = document.querySelectorAll('.btn-prioridad');
const inputPrioridad = document.getElementById('taskPrioridad');
const contenedorLista = document.getElementById('listadoDeTareas');

// Manejo de la selección de prioridad usando currentTarget para evitar fallos de target
botonesPrioridad.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesPrioridad.forEach(b => b.classList.remove('active', 'border', 'border-white'));
        
        // e.currentTarget asegura tomar el <button> completo aunque tenga un icono dentro
        e.currentTarget.classList.add('active', 'border', 'border-white');
        inputPrioridad.value = e.currentTarget.getAttribute('data-value');
    });
});

// Evento Submit del Formulario
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const datosTarea = {
        nombreTarea: document.getElementById("nombreTarea").value.trim(),
        descripcionTarea: document.getElementById("descripcionTarea").value.trim(),
        taskFechaEntrega: document.getElementById("taskFechaEntrega").value,
        taskEstado: document.getElementById("taskEstado").value,
        taskPrioridad: document.getElementById("taskPrioridad").value
    };

    if (validarCampos(datosTarea)) {
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

// Delegación de eventos centralizada en el contenedor de tareas
contenedorLista.addEventListener('click', (event) => {
    const parentTask = event.target.closest('.task-item');
    if (!parentTask) return;

    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.getTaskById(taskId);

    // 1. Botón "Mark As Done"
    if (event.target.classList.contains('done-button')) {
        if (task) {
            task.estado = 'DONE';
            taskManager.save();
            taskManager.render();

            Swal.fire({
                icon: 'info',
                title: '¡Tarea Completada!',
                text: `La tarea ${taskId} fue marcada como DONE.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
        return;
    }

    // 2. Checkbox de la Tarea
    if (event.target.classList.contains('chk-tarea')) {
        if (task) {
            const isChecked = event.target.checked;
            task.estado = isChecked ? 'DONE' : 'Pendiente';
            
            taskManager.save();
            // Toggle visual dinámico sin re-renderizar toda la lista
            parentTask.classList.toggle('tarea-completada', isChecked);
        }
        return;
    }

    // 3. Botón Eliminar Tarea
    const botonEliminar = event.target.closest('.delete-button');
    if (botonEliminar && taskId) {
        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();

        Swal.fire({
            icon: 'success',
            title: '¡Tarea Eliminada!',
            text: 'La tarea se ha eliminado con éxito.',
            showConfirmButton: true,
            timer: 1500
        });
    }
});

// Función de validación (Devuelve booleano puro)
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
    } else if (new Date(datos.taskFechaEntrega) < new Date()) {
        Swal.fire({ icon: 'error', title: 'Fecha inválida', text: 'La fecha de entrega no puede ser anterior a la fecha actual.' });
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