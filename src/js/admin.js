import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Funko from './funko.js';
import $ from 'jquery';
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/js/all.min.js';


//Inicializo variables
let productos = [];
leerProductos();

let productoExistente = false; // false = producto es nuevo; true = modificar producto

window.agregarProducto = function () {     // window.nombreDeVariable = function (event) -> para cuando queremos acceder a una función por fuera del archivo js cuando usamos webpack 

    console.log("desde agregar producto");

    // validar formulario
    // if (ingresarCodigo() && ingresarNombre() && ingresarNumSerie() && ingresarCategoria() && ingresarDescripcion() && ingresarStock() && ingresarPrecio() && ingresarImagen()) {
    // console.log("todo ok")

    // creo objeto
    let productoFunko = new Funko(codigo.value, nombre.value, numeroSerie.value, categoria.value, descripcion.value, stock.value, precio.value, imagen.value);

    console.log(productoFunko);

    // guardo objeto en el array: nombreArreglo.push(loQueQuieroGuardar)
    productos.push(productoFunko);

    // guardar array en localstorage
    localStorage.setItem('funkopopKey', JSON.stringify(productos));

    // limpiar form
    limpiarFormulario();

    leerProductos();

    let ventanaModal = document.getElementById('modalProducto');
    $(ventanaModal).modal('hide');

    Swal.fire(
        'Operación exitosa!',
        'Se agregó un nuevo producto al catálogo!',
        'success'
    );
    // }
}

// FUNCIONES PARA VALIDAR CAMPOS
let codigo = document.getElementById('codigo');
let nombre = document.getElementById('nombre');
let numeroSerie = document.getElementById('numSerie');
let categoria = document.getElementById('categoria');
let descripcion = document.getElementById('descripcion');
let stock = document.getElementById('stock');
let precio = document.getElementById('precio');
let imagen = document.getElementById('imagen');
codigo.addEventListener('blur', ingresarCodigo);
nombre.addEventListener('blur', ingresarNombre);
numeroSerie.addEventListener('blur', ingresarNumSerie);
categoria.addEventListener('blur', ingresarCategoria);
descripcion.addEventListener('blur', ingresarDescripcion);
stock.addEventListener('blur', ingresarStock);
precio.addEventListener('blur', ingresarPrecio);
imagen.addEventListener('blur', ingresarImagen);

function ingresarCodigo() {
    let quitarEspacios = / /;
    if (codigo.value != "" && !isNaN(codigo.value) && !quitarEspacios.test(codigo.value)) {
        codigo.className = 'form-control is-valid';
        return true;
    } else {
        codigo.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarNombre() {
    if (nombre.value != "") {
        nombre.className = 'form-control is-valid';
        return true;
    } else {
        nombre.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarNumSerie() {
    if (numeroSerie.value != "") {
        numeroSerie.className = 'form-control is-valid';
        return true;
    } else {
        numeroSerie.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarCategoria() {
    if (isNaN(categoria.value)) {
        categoria.className = 'form-control is-valid';
        return true;
    } else {
        categoria.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarDescripcion() {
    if (isNaN(descripcion.value)) {
        descripcion.className = 'form-control is-valid';
        return true;
    } else {
        descripcion.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarStock() {
    let quitarEspacios = / /;
    if (stock.value != "" && !isNaN(stock.value) && !quitarEspacios.test(stock.value)) {
        stock.className = 'form-control is-valid';
        return true;
    } else {
        stock.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarPrecio() {
    let quitarEspacios = / /;
    if (precio.value != "" && !isNaN(precio.value) && !quitarEspacios.test(precio.value)) {
        precio.className = 'form-control is-valid';
        return true;
    } else {
        precio.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarImagen() {
    let quitarEspacios = / /;
    let expresion = /[a-z]+\.+(jpeg|jpg|png)/;
    if (isNaN(imagen.value) && expresion.test(imagen.value) && !quitarEspacios.test(imagen.value)) {
        imagen.className = 'form-control is-valid';
        return true;
    } else {
        imagen.className = 'form-control is-invalid';
        return false;
    }
}

function leerProductos() {
    // funcion leer datos de lacalstorage
    if (localStorage.length > 0) {
        let _productos = JSON.parse(localStorage.getItem('funkopopKey'));

        if (productos.length == 0) {
            productos = _productos;
        }

        // borrar filas
        borrarFilas();

        // dibujo las fils de la tabla
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
        <td>${_productos[i].numeroSerie}</td>
        <td>${_productos[i].categoria}</td>
        <td>${_productos[i].descripcion}</td>
        <td>${_productos[i].stock}</td>
        <td>$ ${_productos[i].precio}</td>
        <td>${_productos[i].imagen}</td>
        <td>
            <button class="btn btn-outline-info" onclick="editarProducto(${_productos[i].codigo})"><i class="fas fa-edit"></i></button>
            <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_productos[i].codigo}"><i class="fas fa-trash"></i></button>
        </td>
    </tr>`

        tbody.innerHTML += codHtml;
    }
}

function borrarFilas() {
    let tbody = document.getElementById('listaProductos');
    if (tbody.children.length > 0) {
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
}


window.eliminarProducto = function (prod) {
    console.log(prod);

    Swal.fire({
        title: 'Está seguro de eliminar el producto?',
        text: "No puedes volver esta operación atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
    }).then((result) => {
        if (result.value) {
            console.log(result.value);

            // BUSCAR UN OBJETO EN EL ARREGLO (OPCION 1)
            // for(let i in productos){
            //     if (productos[i].codigo == prod.id){
            //         // OBJETO ENCONTRADO

            //     }
            // }

            // filter: DEVUELVE UN ARREGLO
            let arregloFiltrado = productos.filter(function (item) {
                return item.codigo != prod.id;   // indico que quiero conservar todos los items cuyo código sea distinto del código "2" supongamos. Por lo tanto la variable arregloFiltrado guardará los items que no cumplan con la condición (en este caso, es que NO cumplan porque tiene !=)
            })

            console.log(arregloFiltrado);

            localStorage.setItem('funkopopKey', JSON.stringify(arregloFiltrado));
            productos = arregloFiltrado;
            leerProductos();

            console.log(arregloFiltrado);

            Swal.fire(
                'Producto eliminado!',
                'El producto fue eliminado satisfactoriamente',
                'success'
            )
        }
    })


}

window.editarProducto = function (codigo) {
    console.log(codigo);

    let modalProducto = document.getElementById('modalProducto');
    // Buscar producto: usamos find -> trae el producto que corresponde a la condicion que le coloquemos
    let objetoEncontrado = productos.find(function (producto) {
        return producto.codigo == codigo;
    })

    console.log(objetoEncontrado);

    // Cargar en el modal los datos del objetos que quiero editar
    document.getElementById('codigo').value = objetoEncontrado.codigo;
    document.getElementById('nombre').value = objetoEncontrado.nombre;
    document.getElementById('numSerie').value = objetoEncontrado.numeroSerie;
    document.getElementById('categoria').value = objetoEncontrado.categoria;
    document.getElementById('descripcion').value = objetoEncontrado.descripcion;
    document.getElementById('stock').value = objetoEncontrado.stock;
    document.getElementById('precio').value = objetoEncontrado.precio;
    document.getElementById('imagen').value = objetoEncontrado.imagen;

    // Cambio el valor de la bandera
    productoExistente = true;

    // Abro el modal
    $(modalProducto).modal('show');
}

window.guardarDatos = function (event) {
    event.preventDefault();

    // agregar validaciones
    if (ingresarCodigo() && ingresarNombre() && ingresarNumSerie() && ingresarCategoria() && ingresarDescripcion() && ingresarStock() && ingresarPrecio() && ingresarImagen()) {

        if (productoExistente == false) {
            // agregar un nuevo producto
            agregarProducto();
        } else {
            // modificar el producto existente
            productoModificado();
        }
    } else {
        alert('completar todos los campos');
    }
}

function productoModificado() {

    console.log("guardando datos del producto");

    // Tomo los datos modificados del form
    let codigo = document.getElementById('codigo').value,
        nombre = document.getElementById('nombre').value,
        numeroSerie = document.getElementById('numSerie').value,
        categoria = document.getElementById('categoria').value,
        descripcion = document.getElementById('descripcion').value,
        stock = document.getElementById('stock').value,
        precio = document.getElementById('precio').value,
        imagen = document.getElementById('imagen').value;

    // Actulizo esos datos del arreglo
    for (let i in productos) {
        if (productos[i].codigo == codigo) {
            // encontramos el producto
            productos[i].nombre = nombre;
            productos[i].numeroSerie = numeroSerie;
            productos[i].categoria = categoria;
            productos[i].descripcion = descripcion;
            productos[i].stock = stock;
            productos[i].precio = precio;
            productos[i].imagen = imagen;
        }
    }

    // Actualizamos localstorage
    localStorage.setItem("funkopopKey", JSON.stringify(productos));
    limpiarFormulario();

    // Actulizo las filas de la tabla
    leerProductos();

    let modalProducto = document.getElementById('modalProducto');
    $(modalProducto).modal('hide');
}

// Limpio formulario
window.limpiarFormulario = function () {
    document.getElementById('formProducto').reset();
    productoExistente = false;
}