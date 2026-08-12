const formulario = document.getElementById("formulario");
const botonesPrioridad = document.querySelectorAll('.btn-prioridad');
const inputPrioridad = document.getElementById('taskPrioridad');

botonesPrioridad.forEach(boton => {
    boton.addEventListener('click', function () {
        botonesPrioridad.forEach(boton => boton.classList.remove('active'));
        this.classList.add('active');
        inputPrioridad.value = this.getAttribute('data-value');
    });
});


formulario.addEventListener("submit", function (e) {
    e.preventDefault();


    const datosTarea = {
        nombreTarea: document.getElementById("nombreTarea").value,
        descripcionTarea: document.getElementById("descripcionTarea").value,
        taskFechaEntrega: document.getElementById("taskFechaEntrega").value,
        taskEstado: document.getElementById("taskEstado").value,
        taskPrioridad: document.getElementById("taskPrioridad").value

    }

    console.log(datosTarea);
    formulario.reset();





})