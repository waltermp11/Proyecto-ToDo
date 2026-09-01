// js/taskManager.js
class TaskManager {
    constructor(currentId = 6) {
        this.tasks = [];
        this.currentId = currentId;
    }

    // Método para crear y guardar la tarea
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

        console.log("Tarea agregada a la lista interna:", nuevaTarea);
        return nuevaTarea;
    }

    deleteTask(taskId) {
        const newTasks = [];
        for (let task of this.tasks) {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }





}