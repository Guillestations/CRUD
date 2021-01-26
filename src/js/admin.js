import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Funko from './funko.js';
import $ from 'jquery';


//Inicializo variables
let productos = [];
leerProductos();

window.agregarProducto = function () {
    
    console.log("desde agregar producto");

    //crear variables
    let codigo = document.getElementById('codigo'),
        nombre = document.getElementById('nombre'),
        numSerie = document.getElementById('numSerie'),
        categoria = document.getElementById('categoria'),
        descripcion = document.getElementById('descripcion'),
        precio = document.getElementById('precio'),
        stock = document.getElementById('stock'),
        imagen = document.getElementById('imagen')

    //validar formulario
    if (validarNumeros(codigo) && campoRequerido(nombre) && campoRequerido(numSerie) && campoRequerido(categoria) && campoRequerido(descripcion) && validarNumeros(precio) && validarNumeros(stock) && campoRequerido(imagen)) {
        //crear el objeto
        let productoFunko = new Funko(codigo.value, nombre.value, numSerie.value, categoria.value, descripcion.value, precio.value, stock.value, imagen.value);
        console.log(productoFunko);
        //guardo el objeto en el array
        productos.push(productoFunko);
        //guardar el array en localstorage
        localStorage.setItem("funkopopKey", JSON.stringify(productos));

        //limpiar formulario
        document.getElementById('formProducto').reset();

        leerProductos();
    }

}


window.campoRequerido = function (input) {
    if (input.value == "") {
        //si esta vacio el input
        input.className = "form-control is-invalid";
        return false;
    } else {
        //tiene datos
        input.className = "form-control is-valid";
        return true;
    }
}


window.validarNumeros = function (input) {
    //validar que no tome espacios vacios
    let numero = input.value.trim();
    if (numero != "" && !isNaN(numero)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function leerProductos() {
    //esta funcion lee los datos del localstprage
    if (localStorage.length > 0) {
        let _productos = JSON.parse(localStorage.getItem("funkopopKey"));

        //borrar filas
        borrarFilas();
        //dibujar las filas de la tabla
        dibujarFilas(_productos);
    }
}

function dibujarFilas(_productos) {
    let tbody = document.getElementById('listaProductos');
    let codHtml = '';
    for (let i in _productos) {
        codHtml = `<tr>
        <th scope="row">${_productos[i].codigo}</th>
        <td>${_productos[i].nombre}</td>
        <td>${_productos[i].numSerie}</td>
        <td>${_productos[i].categoria}</td>
        <td>${_productos[i].descripcion}</td>
        <td>${_productos[i].stock}</td>
        <td>$${_productos[i].precio}</td>
        <td>${_productos[i].imagen}</td>
        <td>
            <button class="btn btn-outline-info" onclick="editarProducto(${_productos[i].codigo})">Editar</button>
            <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_productos[i].codigo}">Borrar</button>
        </td>
    </tr>`
    tbody.innerHTML += codHtml; 
    }
}

function borrarFilas(){
    let tbody = document.getElementById('listaProductos');
    if(tbody.children.length > 0){
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }
    }
}

window.eliminarProducto = function(prod) {
    console.log(prod);

    //Opcion 1 buscar un objeto en el arreglo
    // for(let i in pproductos){
    //     if(productos[i].codigo == prod.id){
    //         //objeto encontrado
    //     }
    // }

    //Opcion 2
    let arregloFiltrado = productos.filter( function (items){
        return items.codigo != prod.id;
    })

    localStorage.setItem("funkopopKey", JSON.stringify(arregloFiltrado));
    productos = arregloFiltrado;
    leerProductos();

    console.log(arregloFiltrado);
}

window.editarProducto = function (codigo){
    console.log(codigo);

    let modalProducto = document.getElementById('modalProducto');
    //buscar producto usamos find -> trae el producto que corresponde a la condicion que le coloquemos
    
    let objetoEncontrado = productos.find(function (producto) {
        return productos.codigo == codigo; 
    })
    console.log(objetoEncontrado);

    //cargar en el modal los datos del objeto que quiero editar
    document.getElementById('codigo').value = objetoEncontrado.codigo;
    document.getElementById('nombre').value = objetoEncontrado.nombre;
    document.getElementById('numSerie').value = objetoEncontrado.numSerie;
    document.getElementById('categoria').value = objetoEncontrado.categoria;
    document.getElementById('descripcion').value = objetoEncontrado.descripcion;
    document.getElementById('stock').value = objetoEncontrado.stock;
    document.getElementById('precio').value = objetoEncontrado.precio;
    document.getElementById('imagen').value = objetoEncontrado.imagen;
    //abrir la ventana modal
    $(modalProducto).modal('show');
}