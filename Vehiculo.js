class Vehiculo
{
    id = 0;
    modelo = "";
    anoFabricacion = 0;
    velMax = 0;

    constructor(id,modelo,anoFabricacion,velMax)
    {                
        this.id = id;  
        this.modelo = modelo;
        this.anoFabricacion = anoFabricacion; 
        this.velMax = velMax;                         
    }
    toString() 
    {
        return this.id + " - " + this.modelo + " - " + this.anoFabricacion + " - " + this.velMax;
    }         
  
}
class Auto extends Vehiculo
{
    cantidadPuertas = 0;
    asientos = 0;

    constructor(id,modelo,anoFabricacion,velMax,cantidadPuertas,asientos)
    {                
        super(id,modelo,anoFabricacion,velMax);
        this.cantidadPuertas = cantidadPuertas;
        this.asientos = asientos;

    }
    toString() 
    {
        return super.toString() + " - " + this.cantidadPuertas + " - " + this.asientos;
    }     
}
class Camion extends Vehiculo
{
    carga = 0;
    autonomia = 0;

    constructor(id,modelo,anoFabricacion,velMax,carga,autonomia)
    {                
        super(id,modelo,anoFabricacion,velMax);
        this.carga = carga;
        this.autonomia = autonomia;

    }
    toString() 
    {
        return super.toString() + " - " + this.carga + " - " + this.autonomia;
    }     
}

function CargarListaVehiculo()
{
    var xmlhttp = new XMLHttpRequest();
    MostrarSpinner();  
    xmlhttp.onreadystatechange = function ()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            let listaDeVehiculosJson = JSON.parse(xmlhttp.response);
            console.log(listaDeVehiculosJson);
            CrearListaDeVehiculos(listaDeVehiculosJson); 
            CrearTabla();
            MostrarSpinner();  
            alert("La tabla se cargó con exito");                     
        } 
    }
    xmlhttp.open("GET", url);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send();
}   
function LimpiarBody()
{
    let tbodyExistente = document.getElementById("tbodyVehiculo");

    while (tbodyExistente.firstChild) 
    {
        tbodyExistente.removeChild(tbodyExistente.firstChild);
    }
}
function LimpiarHeaders() 
{
    let theadExistente = document.getElementById("theadVehiculo");

    while (theadExistente.firstChild)
    {
        theadExistente.removeChild(theadExistente.firstChild);
    }
}
function CrearTabla()
{
    let tabla = document.getElementById("tablaVehiculos");
    let thead;

    if (document.getElementById("theadVehiculo") == null) 
    {
        thead = document.createElement("thead");
        thead.id = "theadVehiculo";
        tabla.appendChild(thead);
    }
    else 
    {
        LimpiarHeaders();
    }

    thead = document.getElementById("theadVehiculo");

    let trHead = document.createElement("tr");
    thead.appendChild(trHead);

    let arrayEncabezado = 
    [
        "ID",
        "Modelo",
        "Año Fabricacion",
        "Velocidad Maxima",
        "Cantidad Puertas",
        "Asientos",
        "Carga",
        "Autonomia",        
        "Modificar",
        "Eliminar"
    ];

    for (let i = 0; i < arrayEncabezado.length; i++) 
    {
        let th = document.createElement("th");
        let thTexto = document.createTextNode(arrayEncabezado[i]);
        th.appendChild(thTexto);
        trHead.appendChild(th);
    }

    tabla.appendChild(thead);

    let tbody

    if (document.getElementById("tbodyVehiculo") == null) 
    {
        tbody = document.createElement("tbody");
        tbody.id = "tbodyVehiculo";
        tabla.appendChild(tbody);
    }
    else 
    {
        LimpiarBody();
    }

    tbody = document.getElementById("tbodyVehiculo");

    let contador = 0;
    listaDeVehiculos.forEach(function (vehiculo) 
    {
        console.log(vehiculo);
        if (vehiculo instanceof Vehiculo) 
        {
            let tr = document.createElement("tr");
            tr.id = "tr" + contador;
            contador++;
            tbody.appendChild(tr);

            for (let i = 0; i < arrayEncabezado.length - 2; i++) 
            {

                let td = document.createElement("td");
                let tdTexto = document.createTextNode("N/A");
                switch (i) 
                {
                    case 0:
                        tdTexto = document.createTextNode(vehiculo.id);
                        break;
                    case 1:
                        tdTexto = document.createTextNode(vehiculo.modelo);
                        break;
                    case 2:
                        tdTexto = document.createTextNode(vehiculo.anoFabricacion);
                        break;
                    case 3:
                        tdTexto = document.createTextNode(vehiculo.velMax);
                        break;
                    case 4:
                        if (vehiculo instanceof Auto) 
                        {
                            tdTexto = document.createTextNode(vehiculo.cantidadPuertas);
                        }
                        break;
                    case 5:
                        if (vehiculo instanceof Auto) 
                        {
                            tdTexto = document.createTextNode(vehiculo.asientos);
                        }
                        break;                    
                    case 6:
                        if (vehiculo instanceof Camion) 
                        {
                            tdTexto = document.createTextNode(vehiculo.carga);
                        }
                        break;
                    case 7:
                        if (vehiculo instanceof Camion) 
                        {
                            tdTexto = document.createTextNode(vehiculo.autonomia);
                        }
                        break;                 
                    
                }
                td.appendChild(tdTexto);
                tr.appendChild(td);


            }
            let tdModificar = document.createElement("td");
            let botonModificar = document.createElement("input");
            botonModificar.type = "button";
            botonModificar.id = "modificar";
            botonModificar.value = "Modificar";
            botonModificar.addEventListener("click", function()
            { 
                document.getElementById("encabezadoFormularioABM").textContent = "Formulario de Modificación";
                document.getElementById('formularioABM').style.display = 'block';                
                document.getElementById('formLista').style.display = 'none';
                ObtenerDatosFila(tr, 'modificar'); 
                
            });
            tdModificar.appendChild(botonModificar);
            tr.appendChild(tdModificar);

            let tdEliminar = document.createElement("td");
            let botonEliminar = document.createElement("input");
            botonEliminar.type = "button";
            botonEliminar.id = "eliminar";
            botonEliminar.value = "Eliminar";
            tdEliminar.appendChild(botonEliminar);
            botonEliminar.addEventListener("click", function()
            { 
                document.getElementById("encabezadoFormularioABM").textContent = "Formulario de Eliminación";                
                document.getElementById('formLista').style.display = 'none';      
                ObtenerDatosFila(tr, 'eliminar');                         
            });
            tr.appendChild(tdEliminar);
        }
    });
}

async function CrearVehiculo() 
{
    let modelo = document.getElementById("atributo1").value;
    let anoFabricacion = document.getElementById("atributo2").value;
    let velMax = document.getElementById("atributo3").value;
    let tipo = document.getElementById("tipoVehiculo").value;    
    let atributo4 = document.getElementById("atributo4").value;
    let atributo5 = document.getElementById("atributo5").value;    
    if (tipo == "auto") 
    {
        data = 
        {
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            cantidadPuertas: atributo4,
            asientos: atributo5,    
        }
    }
    else if (tipo == "camion") 
    {
        data = 
        {
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            carga: atributo4,
            autonomia: atributo5,
        }
    }

    console.log(data);
    MostrarSpinner();
    try 
    {
        const response = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        if (response.ok) 
        {
            response.json().then(resultado => 
            {
                if (resultado.id != null && !isNaN(resultado.id)) 
                {
                    
                    let nuevoVehiculo;
                    if (tipo == "auto" && modelo != null && modelo != "" && anoFabricacion > 1985 && velMax > 0 && atributo4 > 2 && atributo5 > 2)
                    {
                        nuevoVehiculo = new Auto(resultado.id, modelo, anoFabricacion, velMax, atributo4, atributo5);
                        listaDeVehiculos.push(nuevoVehiculo);
                        alert("El Auto con id " + resultado.id + " fue ingresada con exito");
                    }
                    else if (tipo == "camion" && modelo != null && modelo != "" && anoFabricacion != null && anoFabricacion != "" && velMax > 0 && atributo4 > 0 ) 
                    {
                        nuevoVehiculo = new Camion(resultado.id, modelo, anoFabricacion, velMax, atributo4, atributo5);
                        listaDeVehiculos.push(nuevoVehiculo);
                        alert("El Camion con id " + resultado.id + " fue ingresada con exito");
                    }
                    else 
                    {
                        alert("ERROR. DATOS INVALIDOS");
                    }        
                    CrearTabla();  
                }
    
                else 
                {
                    alert("El id no puede ser null y debe ser un numero");
                }
                MostrarSpinner();
                ResetearAbm();
                
            });
        }
        else 
        {
            let resultado = await response.text();
            throw new Error(resultado);

        }
    }
    catch (error) 
    {
        console.error("Error en la solicitud:", error);
        alert(error);
        MostrarSpinner();
        ResetearAbm();        
    }
}

function ObtenerDatosFila(fila, accion) 
{
    var datos = [];
    var celdas = fila.querySelectorAll('td');
    document.getElementById("tipoVehiculo").disabled = true;  

    celdas.forEach(function(celda) 
    {
        datos.push(celda.textContent || '');
    });
    
    
    if(datos[4] != 'N/A')
    {
        autoSeleccionado = new Auto(datos[0],datos[1],datos[2],datos[3],datos[4],datos[5]);
        console.log(autoSeleccionado.toString());
        document.getElementById("id").value = autoSeleccionado.id;
        document.getElementById("tipoVehiculo").value = "auto";
        document.getElementById("atributo1").value = autoSeleccionado.modelo;
        document.getElementById("atributo2").value = autoSeleccionado.anoFabricacion;
        document.getElementById("atributo3").value = autoSeleccionado.velMax;
        document.getElementById("atributo4").value = autoSeleccionado.cantidadPuertas;
        document.getElementById("atributo5").value = autoSeleccionado.asientos;        
        document.getElementById("formularioABM").style.display = 'block';
        CambiarAtributos();
    }
    else
    {        
        camionSeleccionado = new Camion(datos[0],datos[1],datos[2],datos[3],datos[6],datos[7]);
        console.log(camionSeleccionado.toString());
        document.getElementById("id").value = datos[0];
        document.getElementById("tipoVehiculo").value = "camion";
        document.getElementById("atributo1").value = camionSeleccionado.modelo;
        document.getElementById("atributo2").value = camionSeleccionado.anoFabricacion;
        document.getElementById("atributo3").value = camionSeleccionado.velMax;
        document.getElementById("atributo4").value = camionSeleccionado.carga;
        document.getElementById("atributo5").value = camionSeleccionado.autonomia;
        CambiarAtributos();
    }
    if(accion == 'modificar')
    {
        document.getElementById("agregarAbm").style.display = 'none';  
        document.getElementById("modificarAbm").style.display = 'block';    
        document.getElementById("eliminarAbm").style.display = 'none';   
    }
    else if(accion == 'eliminar')
    {
        document.getElementById("agregarAbm").style.display = 'none';  
        document.getElementById("modificarAbm").style.display = 'none';    
        document.getElementById("eliminarAbm").style.display = 'block';   
        document.getElementById("formularioABM").style.display = 'block';
    }
}
function ModificarVehiculo() 
{
    let id = document.getElementById("id").value;
    let modelo = document.getElementById("atributo1").value;
    let anoFabricacion = document.getElementById("atributo2").value;
    let velMax = document.getElementById("atributo3").value;
    let tipo = document.getElementById("tipoVehiculo").value;    
    let atributo4 = document.getElementById("atributo4").value;
    let atributo5 = document.getElementById("atributo5").value;
    console.log("ACA ESTÁN LOS DATOS DEL MODIFICAR VEHICULO: " + modelo + " - " +  anoFabricacion + " - " + velMax + " - " + atributo4 + " - " + atributo5 + " - " + tipo);

    if (tipo == "auto") 
    {
        data = 
        {
            id: id,
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            cantidadPuertas: atributo4,
            asientos: atributo5,
        }
    }
    else if (tipo == "camion") 
    {
        data = 
        {
            id: id,
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            carga: atributo4,
            autonomia: atributo5,
        }
    }

    MostrarSpinner();
    fetch(url,
        {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => 
            {
            if (!response.ok) 
                {
                return response.text().then(mensajeError => 
                {
                    throw new Error(mensajeError);
                });
            }
            else 
            {
                if (tipo == "auto" && modelo != null && modelo != "" && anoFabricacion > 1985 && velMax > 0 && atributo4 > 2 ) 
                {
                    CambiarAtributos();
                    response.text().then(mensajeExito => 
                    {
                        listaDeVehiculos.map(vehiculo => 
                        {
                            if (vehiculo.id == id) 
                            {
                                vehiculo.modelo = modelo;
                                vehiculo.anoFabricacion = anoFabricacion;
                                vehiculo.velMax = velMax;
                                vehiculo.cantidadPuertas = atributo4;
                                vehiculo.asientos = atributo5;                                                               
                            }
                        });
                        alert(mensajeExito);
                        CrearTabla();
                    })

                }
                else if (tipo == "camion" && modelo != null && modelo != "" && anoFabricacion > 1985 && velMax > 0 && atributo4 > 0 ) 
                {
                    CambiarAtributos();
                    response.text().then(mensajeExito => 
                    {
                        listaDeVehiculos.map(vehiculo => 
                        {
                            if (vehiculo.id == id) 
                            {
                                vehiculo.modelo = modelo;
                                vehiculo.anoFabricacion = anoFabricacion;
                                vehiculo.velMax = velMax;
                                vehiculo.cantidadPuertas = atributo4;
                                vehiculo.asientos = atributo5;                                                               
                            }
                        });
                        alert(mensajeExito);
                        CrearTabla();
                    })
                }
                else 
                {
                    alert("No se pudo modificar el Vehiculo, no paso la validacion");
                }
            }
        }).catch(error => 
        {
            console.error("Error en la solicitud:", error);
            alert(error);
        }).then(() => 
        {
            MostrarSpinner();           
            ResetearAbm();

        });
}

async function EliminarVehiculo() 
{
    idBorrar = document.getElementById("id").value;
    idBorrarObj = { id: idBorrar };
    MostrarSpinner();
    try 
    {
        const response = await fetch(url,
        {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(idBorrarObj)
        });
        let resultado = await response.text();
        if (!response.ok) 
        {
            throw new Error(resultado);
        }
        else 
        {
            listaDeVehiculos = listaDeVehiculos.filter(vehiculo => vehiculo.id != idBorrar);            
            alert(resultado);
            CrearTabla();
        }

    }
    catch (error) 
    {
        console.error("Error en la solicitud:", error);
        alert(error);
    }
    MostrarSpinner();
    CrearTabla();
}
function MostrarSpinner()
{
    if(document.getElementById("spinner").style.display == "flex")
    {
        document.getElementById("spinner").style.display = "none";
    }
    else
    {
        document.getElementById("spinner").style.display = "flex"
    }
}
function CrearListaDeVehiculos(listaDeVehiculosObj)
{
    listaDeVehiculos = listaDeVehiculosObj.map(vehiculo => 
    {
        
        let vehiculoCreado;
        
        if ("cantidadPuertas" in vehiculo && "asientos" in vehiculo)
        {
            vehiculoCreado = new Auto(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velMax, vehiculo.cantidadPuertas, vehiculo.asientos);
        }
        else if ("carga" in vehiculo && "autonomia" in vehiculo) 
        {
            vehiculoCreado = new Camion(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velMax, vehiculo.carga, vehiculo.autonomia);
        }
        
        return vehiculoCreado;
    });
}
function ResetearAbm()
{
    document.getElementById("id").value="";
    document.getElementById("atributo1").value="";
    document.getElementById("atributo2").value="";
    document.getElementById("atributo3").value="";    
    document.getElementById("atributo4").value="";    
    document.getElementById("atributo5").value="";    
    if(document.getElementById("tipoVehiculo").disabled == true)
    {
        document.getElementById("tipoVehiculo").disabled = false;
    }    
}
function CambiarAtributos() 
{
    
    const tipo = document.getElementById('tipoVehiculo').value;
    const labelAtributo1 = document.getElementById('labelAtributo1');
    const labelAtributo2 = document.getElementById('labelAtributo2');
    const labelAtributo3 = document.getElementById('labelAtributo3');
    const labelAtributo4 = document.getElementById('labelAtributo4');
    const labelAtributo5 = document.getElementById('labelAtributo5');

    switch(tipo) 
    {
        case "auto":
            labelAtributo1.textContent = 'Modelo:';
            labelAtributo2.textContent = 'Año Fabricacion:';
            labelAtributo3.textContent = 'Velocidad Maxima:';
            labelAtributo4.textContent = 'Cantidad Puertas:';
            labelAtributo5.textContent = 'Asientos:';
            break;   
        default:
            labelAtributo1.textContent = 'Modelo:';
            labelAtributo2.textContent = 'Año Fabricacion:';
            labelAtributo3.textContent = 'Velocidad Maxima:';
            labelAtributo4.textContent = 'Carga:';
            labelAtributo5.textContent = 'Autonomia:';
            break;     
    }
}
const url = "https://examenesutn.vercel.app/api/VehiculoAutoCamion";
window.onload = CargarListaVehiculo();
let listaDeVehiculos  = new Array();
document.getElementById('agregar').addEventListener('click', function() 
{
    document.getElementById('formularioABM').style.display = 'block';
    document.getElementById('formLista').style.display = 'none';
    document.getElementById("agregarAbm").style.display = 'block';  
    document.getElementById("modificarAbm").style.display = 'none';    
    document.getElementById("eliminarAbm").style.display = 'none'; 
    CambiarAtributos();
});
document.getElementById('agregarAbm').addEventListener('click', function() 
{
    document.getElementById('formularioABM').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';
});
document.getElementById('modificarAbm').addEventListener('click', function() 
{
    document.getElementById('formularioABM').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';
    ResetearAbm();
});
document.getElementById('eliminarAbm').addEventListener('click', function() 
{
    document.getElementById('formularioABM').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';
    document.getElementById("agregarAbm").style.display = 'none';  
    document.getElementById("modificarAbm").style.display = 'none';    
    document.getElementById("eliminarAbm").style.display = 'block'; 
    ResetearAbm();
});
document.getElementById('cancelar').addEventListener('click', function() 
{
    document.getElementById('formularioABM').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';
    ResetearAbm();
});