// Botón hamburguesa
document.addEventListener('DOMContentLoaded',() => {
   
    // Captura de elementos
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const navbar = document.getElementById('navbar');
    
    // Agregar la clase 'active'
    bar.addEventListener('click', ()=>{
        navbar.classList.add('active');
    });

    // Quitar la clase
    close.addEventListener('click',()=>{
        navbar.classList.remove('active')
    })

})

// Agrega dinamismo al botón Enviar del newsletter del Home
document.getElementById("boton").addEventListener("submit", function(event) {
   event.preventDefault();
   document.getElementById("mensaje").textContent = "Gracias por enviar tu mail";
});

// Agrega dinamismo a las pildoras "tags" de la sección de BIENVENIDA
const pildoras = document.querySelectorAll(".tag")
function random(number) {
    return Math.floor(Math.random() * (number + 1))
}
pildoras.addEventListener("click", () => {
    const rdnCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`
    document.tags.tag.backgroundColor = rdnCol;
});

// Agregar al carrito productos del Home
document.addEventListener('DOMContentLoaded', () =>{
    const botonesAgregar = document.querySelectorAll('.btn-compra'); // All porque todos los botones son .btn-compra //

    botonesAgregar.forEach((boton,indice)=>{
        boton.addEventListener('click',(e)=>{
            e.preventDefault();
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;
            const id = 'home-$(indice)'; // para evitar conflicto de mismo indice con productos de tienda //

            agregarAlCarrito((id,nombre,precio,imagen))
            
        })
    })
})
// Misma función que en tienda, solo cambia title por nombre, price por precio y image por imagen.
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carritoDe Compras')) ||[];

    const indiceExistente = carrito.findIndex(item => item.id === producto.id);

    if (indiceExistente !== -1) {
        carrito[indiceExistente].canidad++;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.nombre,
            price: producto.precio,
            image: producto.imageb,
            cantidad: 1
        });
    }
    // Con alert:
    // localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
    // alert('${producto.nombre} agregado al carrito')

    // Con toast:
    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
    mostrarToast('${producto.nombre} agregado al carrito')
}


/* console.log("Holaa")
console.log("h")
const edad = 4
console.log(edad)

let nombre = "Santi"
console.log(nombre)

var apellido = "M"
console.log(apellido)
nombre = "Juan"
console.log(nombre)

// let nombre = "Pedro"  //

var apellido = "S"
console.log(apellido)

if (true) {
    let w = 10
    var x = 20
    console.log(w)
}
console.log(x) */