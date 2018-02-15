$('#ListadoAlumnos').DataTable();

$('#form1').validate({
    rules: {
        Codigo: { required: true },
        Nombre: { required: true },
        Fecha: { required: true },
        Edad: { required: true, Range: [18, 50] },
        Domicilio: { required: true },
        Telefono: { required: true, Range: [7, 10] }
    },
    messages: {
        Codigo: { required: "El codigo es obligatorio" },
        Nombre: { required: "El nombre es obligatorio" },
        Fecha: { required: "La fecha debe ser obligatoria" },
        Edad: {
            required: "La edad debe ser obligatoria",
            Range: "La edad debe ser entre 18-50 años"
        },
        Domicilio: { required: "El domicilio es obligatorio" },
        Telefono: {
            required: "El telefono debe ser obligatorio",
            Range: "El telefono debe tener entre 7 y 10 caracteres"
        }

    },
    submitHandler: function (form) {
        registrarAlumno();
    }
});
function registrarAlumno() {
    var guardar = {
        Id: 0,
        Codigo: document.getElementById("Codigo").value,
        Nombre: document.getElementById("Nombre").value,
        FechaNac: document.getElementById("FechaNac").value,
        Edad: parseInt(document.getElementById("Edad").value),
        Domicilio: document.getElementById("Domicilio").value,
        Telefono: document.getElementById("Telefono").value,
        IdUsuario: "166A109064"
    }
    $.ajax({
        type: 'Post',
        url: "http://ticutt.mx/dap/ws_dapiii.asmx/AgregarAlumno",
        data: JSON.stringify({ alumno: guardar }),
        dataType: 'json',
        contentType: 'application/json',
        sucess: function (data) {
            var res = parseInt(data.d);
            if (res == 1) {
                bootbox.alert("Alumno Registrado");
                window.form1.reset();
            }
            else
                bootbox.alert("No se realizo la operación!");
        }
    });

}
