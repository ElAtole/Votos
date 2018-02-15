// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
       
        document.getElementById("btnVotar").addEventListener('click', votar, false);
        
        $(".dentro").click(function () {
            $(this).parent(".imagen").children(".menu").slideToggle();
        })
        $(".imagen .menu").click(function (p) {
            p.stopPropagation();
        })
        $("#cerrarModal").click(function () {
            window.form1.reset();
        })
        $("#entrar").click(function () {
            document.location.href = "login.html";
        })
    };
    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
    
    function votar() {
        var algo = document.getElementsByName("Selectionado");
        var es;
        for (var i = 0; i < algo.length; i++) {
            if (algo[i].checked) {
                es = algo[i].value;
                break;
            }
        }
        votarYa(es)
    }
    
    function bus(algo) {
        var res;
        for (var i = 0; i < algo.length; i++) {
            if (algo[i].checked) {
                res = algo[i].value;
                break;
            }
        }
        return res;
    }
    function votarYa(espe) {
        var al = "";
        var guardar = {
            Nombre: ""+espe
        }
        $.ajax({
            type: 'Post',
            url: "http://192.168.137.195/web/ws_dapiii.asmx/Votar",
            data: JSON.stringify({ votar: guardar }),
            dataType: 'json',
            contentType: 'application/json',
            sucess: function (data) {
                var res = parseInt(data.d);
                if (res == 1) {
                    al = "<h5 id=\"msj\">Gracias por votar!</h5>";
                    $("#msj").remove();
                    $("#divLista").append(al);
                }
                else {

                    al = "<h5 id=\"msj\">No se realizo la operacion!</h5>";
                }
                $("#msj").remove();
                $("#divLista").append(al);
            },
            error: function (data) {
                al = "<h5 id=\"msj\">Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.</h5>";
                $("#msj").remove();
                $("#divLista").append(al);
            }
        });
    }
} )();