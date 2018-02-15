// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        document.getElementById("activar").addEventListener('click', graficar, false);

    };
    var tabla = [0,0,0,0,0,0,0,0];
    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
    function encriptar(algo, pa) {
        var res = "" + btoa(pa);
        var datos = algo.split(",");
        for (var i = 0; i < datos.length; i++) {
            res = res + "," + btoa(datos[i]);
        }
        return res;
    }
    function CargarLista(quer) {
        var query = quer;
        var cadena = "<table id=\"datos\" border=0 cellpadding=2 cellspacing=0><tr><th>id</th><th>Nombre</th><th>Apellidos</th><th>Correo</th></tr>";
        var res;
        document.getElementById("correo").value = quer;
        //agregando evento Ajax
        $.ajax({
            type: "GET",
            url: "http://192.168.137.195/web/default.aspx?query="+query,
            crossDomain: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (result) {
                $.each(result, function (i, field) {
                    tabla[i] = field.votos;
                });
            },
            error: function (result) {
                bootbox.alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
            }
        });
    }
    //grafica
    function graficar() { 
        var opcion = document.getElementById("carr").value;
        var bor = "<div id=\"myfirstchart\" style=\"height: 250px;\"></div>";
        $("#myfirstchart").remove();
        $("#container").append(bor);
        var res = encriptar(opcion, "graficas");
        CargarLista(res);
        var algo;
        switch (opcion) {
            case "1": {
                algo = [
                    { year: 'Sistemas', value: tabla[0] },
                    { year: 'Redes', value: tabla[1] },
                    { year: 'Multimedia', value: tabla[2] }
                ]
                break;
            }
            case "2": {
                algo = [
                    { year: 'Soldadura', value: tabla[0] },
                    { year: 'Mtto Indust', value: tabla[1] },
                    { year: 'Refris', value: tabla[2] },
                    { year: 'maq p', value: tabla[3] },
                    { year: 'Petroleos', value: tabla[4] }
                ]
                break;
            }
            case "3": {
                algo = [
                    { year: 'Manu flex', value: tabla[0] },
                    { year: 'Auto', value: tabla[1] },
                    { year: 'Instalaciones', value: tabla[2] }
                ]
                break;
            }
            case "4": {
                algo = [
                    { year: 'Manufactura', value: tabla[0] },
                    { year: 'Plasticos', value: tabla[1] }
                ]
                break;
            }
            case "5": {
                algo = [
                    { year: 'Form proyec', value: tabla[0] },
                    { year: 'Capital Humano', value: tabla[1] }
                ]
                break;
            }
            case "6": {
                algo = [
                    { year: 'Calidad y ahorro de energia', value: tabla[0] }
                ]
                break;
            }
            case "7": {
                algo = [
                    { year: 'TIC', value: tabla[0] },
                    { year: 'MTTO', value: tabla[1] },
                    { year: 'Meca', value: tabla[2] },
                    { year: 'Proc', value: tabla[3] },
                    { year: 'Admon', value: tabla[4] },
                    { year: 'ER', value: tabla[5] }
                ]
                break;
            }
            default:
                break;
        }
        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'myfirstchart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: algo,
            // The name of the data record attribute that contains x-values.
            xkey: 'year',
            // A list of names of data record attributes that contain y-values.
            ykeys: ['value'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: ['Votos'],
            stacked: true,
            resize:true
        });
    }
} )();