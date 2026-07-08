// 1. Función para agregar al carrito

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

2. // Adjuntar los eventos despues del render
