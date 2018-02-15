$('#form1').validate({
    rules: {
        User: { required: true },
        Pass: { required: true, minlength: 6 }
    },
    messages: {
        User: { required: "El usuario es obligatorio" },
        Pass: {
            required: "El usuario es obligatorio",
            minlength: "Longitud mínima de 6 caracteres"
        }
    },
    submitHandler: function (form) {
        iniciarSesion();
    }
});

function iniciarSesion() {
    // creamos un objeto de inicio de sesion
    var login = {
        UserName: document.getElementById("User").value,
        Password: document.getElementById("Pass").value
    }
    // Peticion de ajax
    $.ajax({
        type: 'POST',
        url: "http://192.168.137.195/web/ws_dapiii.asmx/Login",
        data: JSON.stringify(login),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var user = JSON.parse(data.d)
            // validamos la cuenta a partir de la respuesta
            if (user.Estado == true) {
                // Guardamos el usuario en una variable de sesion del navegador
                sessionStorage.user = login.Username;
                sessionStorage.iduser = login.Id;
                // Redirigimos a la pagina de menu.html
                document.location.href = "ad.html";
            }
            else // Si no es valido envia un mensaje al usuario
                bootbox.alert("Usuario/Contraseña incorrectos!");
        }
    });

}

