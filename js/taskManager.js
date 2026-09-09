class TaskManager {
    constructor(currentId = 1) {
        this.tasks = [];
        this.currentId = currentId;
    }

  
    addTask(nombreTarea, descripcionTarea, fecha, estado, prioridad) {
        const nuevaTarea = {
            id: this.currentId,
            nombreTarea: nombreTarea,
            descripcion: descripcionTarea,
            fecha: fecha,
            estado: estado,
            prioridad: prioridad
        };

        this.tasks.push(nuevaTarea);
        this.currentId++;
        return nuevaTarea;
    }

  
    getTaskById(taskId) {
        let foundTask;
        for (let task of this.tasks) {
            if (task.id === taskId) {
                foundTask = task;
            }
        }
        return foundTask;
    }

    // Eliminar tarea
    deleteTask(taskId) {
        const newTasks = [];
        for (let task of this.tasks) {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }


    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);

        const currentId = String(this.currentId);
        localStorage.setItem('currentId', currentId);

        // Opcional: Ver en consola cómo se guardó en formato JSON
        console.log(tasksJson);
        console.log("id siguiente", currentId);
    }

    load() {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
        this.tasks = JSON.parse(tasksJson);
        // Opcional: Ver en consola lo que se cargó desde LocalStorage
        console.log(" informacion cargada ", this.tasks);
    }

    const currentId = localStorage.getItem('currentId');
    if (currentId) {
        this.currentId = Number(currentId);
    }
}

    
    render() {
        const contenedorLista = document.getElementById('listadoDeTareas');
        if (!contenedorLista) return;

        contenedorLista.innerHTML = ''; // Limpiar HTML previo

        this.tasks.forEach(tarea => {
            let colorBadge = "bg-custom-yellow";
            if (tarea.prioridad === "Baja") colorBadge = "bg-custom-green";
            if (tarea.prioridad === "Alta") colorBadge = "bg-custom-red";

            const estaCompletada = tarea.estado === 'DONE' ? 'tarea-completada' : '';

            const plantillaHTML = `
                <div class="task-item d-flex align-items-center justify-content-between px-3 py-2 ${estaCompletada}" data-task-id="${tarea.id}">
                    <div class="contenido-tarea flex-grow-1 mx-3">
                        <div class="information-card">
                            <span><strong style="color: #10b981;">Tarea ${tarea.id} - ${tarea.nombreTarea}</strong></span>
                            <p><strong>Descripción: </strong> ${tarea.descripcion}</p>

                            <div class="botton-card">
                                <p><strong>Fecha de Entrega: </strong> ${tarea.fecha}</p>
                                <div class="d-flex gap-2">
                                    <button class="done-button btn btn-success btn-sm">Mark As Done</button>
                                    <button class="btn btn-outline-danger delete-button"><i class="bi bi-trash-fill"></i></button>
                                </div>
                            </div>
                            <p class="mb-0"><small class="estado-texto">Estado: ${tarea.estado} | Prioridad: ${tarea.prioridad}</small></p>
                        </div>
                    </div>
                    <span class="status-badge ${colorBadge}"></span>
                </div>
            `;
            contenedorLista.insertAdjacentHTML('beforeend', plantillaHTML);
            activarCheckboxesTareas();
        });


    }
}