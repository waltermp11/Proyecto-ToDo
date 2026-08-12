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
        nombreTarea: document.getElementById("nombreTarea").value.trim(),
        descripcionTarea: document.getElementById("descripcionTarea").value.trim(),
        taskFechaEntrega: document.getElementById("taskFechaEntrega").value,
        taskEstado: document.getElementById("taskEstado").value,
        taskPrioridad: document.getElementById("taskPrioridad").value

    }


    validarCampos(datosTarea);

    console.log("¡Tarea validada y capturada con éxito! ✅", datosTarea);
    Swal.fire({
        icon: 'success',
        title: '¡Tarea Agregada!',
        text: 'La tarea se ha registrado y renderizado correctamente.',
        timer: 2000,
        showConfirmButton: false
    });


})



function validarCampos(datos) {



    //Validaciones nombreTarea
    if (datos.nombreTarea == "") {
        console.log("El campo no puede estar vacio, ingrese un nombre para la tarea ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacio, ingrese un nombre para la tarea' });

    }
    else if (datos.nombreTarea.length <= 8) {
        console.log("El nombre de la tarea debe ser mayor o igual a 8 caracteres ❌");
        Swal.fire({
            icon: 'error', title: 'Campo incompleto', text: 'El nombre de la tarea debe ser mayor o igual a 8 caracteres'

        });
    }

    //validaciones  descripcionTarea

    if (datos.descripcionTarea == "") {
        console.log("El campo no puede estar vacio, ingrese una descripcion de la tarea ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'El campo no puede estar vacio, ingrese una descripcion de la tarea' });

    } else if (datos.descripcionTarea.length <= 15) {
        console.log("La Descripcion de la tarea debe ser mayor o igual a 15 caracteres ❌");
        Swal.fire({
            icon: 'error', title: 'Campo incompleto', text: 'La Descripcion de la tarea debe ser mayor o igual a 15 caracteres'
        });
    }



    //validaciones taskFechaEntrega

    if (datos.taskFechaEntrega == "") {
        console.log("El campo no puede estar vacio, ingrese una descripcion de la tarea ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'La  fecha no puede estar vacia' });

    }



    //validaciones taskEstado

    if (datos.taskEstado == "") {
        console.log("Seleccione un estado de la tarea para poder continuar ❌");
        Swal.fire({ icon: 'error', title: 'Campo requerido', text: 'Seleccione un estado de la tarea para poder continuar' });

    }


}