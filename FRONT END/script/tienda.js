// const productos = document.querySelector('.tarjetas_tienda');
// console.log(productos)

// Renderizado dinamico con JS
// Paso 1. Array de objetos con la información de los productos
const productos = [
    {
        id: 1,
        nombre: 'Pretoria Black',
        categoria: 'Florero',
        precio: '24200',
        imagen: '../img/Florero_Pretoria_Black.jpeg'
    },
    {
        id: 2,
        nombre: 'Matt Black',
        categoria: 'Difusor',
        precio: '14900',
        imagen: '../img/Difusor Matt Black.jpeg'
    },
    {
        id: 3,
        nombre: 'Bordeaux',
        categoria: 'Vela de soja',
        precio: '8700',
        imagen: '../img/velas/VELA-BORDEAUX.jpeg'
    }

];

// Paso 2. Crear el html de cada card
// usar map para recorrer el array y generar el HTML

const cardsHTML = productos.map(({ id, nombre, categoria, precio, imagen}) => {


    return `
    <div class="tarjeta tarjeta-uno">
        <img class="destacado" src="${imagen}" alt="${nombre}>
        <h2 class="card-name">${nombre}</h2>
        <p class="card-producto">${categoria}</p>
        <p class="card-precio">${precio}</p>
        <button class="btn-compra">Comprar</button>
    </div>
    `;

})
console.log(cardsHTML)

// Paso 3. tomar el elemento e insertar el array
const contenedor = document.querySelector('.tarjetas_tienda');

contenedor.innerHTML = cardsHTML.join('');

adjuntarEventos();  // adjuntar evento a botones (siempre despues del innerHTML)

// ----------------------------------------------------- //
// 1. Función para agregar productos al carrito

function agregarAlCarrito(producto) {
    // Recuperar el carrito actual o empezar con uno vacio
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];   // Si getItem devuelve null porque no existe la clave || [] usa un array vacío en su lugar

    // Buscar si el producto ya existe en el carrito
    const indiceExistente = carrito.findIndex(item => item.id ===producto.id);

    if (indiceExistente !== -1) {
        // El producto ya está: aumentar cantidad
        carrito[indiceExistente].cantidad++;
    } else {
        // El producto no está: agregarlo con cantidad 1
        carrito.push({
            id: producto.id,
            title: producto.nombre,     // clave en ingles para compatibilidad con la API
            price: producto.precio,
            Image: producto.imagen,
            cantidad: 1
        });
    }

    // Guardar el carrito actualizado
    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito!`);
}



// Adjuntar eventos
function adjuntarEventos() {
    productos.forEach(producto => {
        const boton = document.getElementById(`btn-compra-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        }
    });
}
























