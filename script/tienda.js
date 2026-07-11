// Traer de API

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(productos => {
        productosGlobales = productos;
        const cardsHTML = productos.map(
            ({ id, title, category, price, image }) => {

                return `
            <div class="tarjeta">
                <img src="${image}" alt="${title}">
                <div class="card-name">
                    <span>${category}</span>
                    <h5>${title}</h5>
                    <h4>$${price.toFixed(2)}</h4>
                </div>
                <a id="btn-ver-${id}" class="ver-descripcion">
                    Ver descripción
                </a>
                <a id="btn-agregar-${id}" class="carrito">
                    <i class="fal fa-shopping-cart"></i> Agregar
                </a>
            </div>
        `;

            });

        contenedor.innerHTML = cardsHTML.join('');
        adjuntarEventos();

    });




// ============== RENDERIZADO DINAMICO CON JS ==============
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
    },
    {
        id: 4,
        nombre: 'Milano',
        categoria: 'Velón',
        precio: '$24.200',
        imagen: '../img/velas/VELÓN-MILANO.jpeg'
    },
    {
        id: 5,
        nombre: 'Torino',
        categoria: 'Difusor',
        precio: '$14.900',
        imagen: '../img/difusores/DIFUSOR-TORINO.jpeg'
    },
    {
        id: 6,
        nombre: 'Silver',
        categoria: 'Apagador de velas',
        precio: '$8.700',
        imagen: '../img/accesorios/Apagador de Velas Silver.jpeg'
    },
    {
        id: 7,
        nombre: 'Circular Mirror',
        categoria: 'Espejo',
        precio: '$24.200',
        imagen: '../img/accesorios/Espejo Circular.jpeg'
    },
    {
        id: 8,
        nombre: 'Growler',
        categoria: 'Jarrón',
        precio: '$14.900',
        imagen: '../img/accesorios/Jarrón Growler.jpeg'
    },
    {
        id: 9,
        nombre: 'Berlín Black',
        categoria: 'Vela de soja',
        precio: '$8.700',
        imagen: '../img/velas/VELA-BERLÍN_black.jpeg'
    },
    {
        id: 10,
        nombre: 'Home Spray',
        categoria: 'Spray',
        precio: '$14.200',
        imagen: '../img/homespray/Home Spray.jpeg'
    },
    {
        id: 11,
        nombre: 'Soap',
        categoria: 'Jabón',
        precio: '$14.900',
        imagen: '../img/accesorios/Jabon solido BOX 3.jpeg'
    },
    {
        id: 12,
        nombre: 'Berlín Gold',
        categoria: 'Vela de soja',
        precio: '$14.200',
        imagen: '../img/velas/VELA-BERLÍN_gold.jpeg'
    },
    {
        id: 13,
        nombre: 'Berlín Gold',
        categoria: 'Vela de soja',
        precio: '$14.200',
        imagen: '../img/velas/VELA-BERLÍN_gold.jpeg'
    },
    {
        id: 14,
        nombre: 'Firenze',
        categoria: 'Vela de soja',
        precio: '$14.200',
        imagen: '../img/velas/VELA-FIRENZE.jpeg'
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

let productosGlobales = []

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

// 2. Adjuntar los eventos despues del render
function adjuntarEventos() {
    productosGlobales.forEach(producto => {
        const boton = document.getElementById(`btn-agregar-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        }

        const btnVer = document.getElementById(`btn-ver-${producto.id}`);
        if (btnVer) {
            btnVer.addEventListener('click', () => {
                abrirModal(producto);
            });
        }
    });
}


// Modal

function abrirModal(producto) {
    document.getElementById('modalImagen').src = producto.image;
    document.getElementById('modalImagen').alt = producto.title;
    document.getElementById('modalTitulo').textContent = producto.title;
    document.getElementById('modalDescripcion').textContent = producto.description;
    document.getElementById('modalPrecio').textContent = `$${producto.price.toFixed(2)}`;
    document.getElementById('overlayModal').classList.add('visible');

}

function cerrarModal() {
    document.getElementById('overlayModal').classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal)
    document.getElementById('overlayModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('overlayModal')) {
            cerrarModal();
        }
    })
})
























