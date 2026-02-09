const crearProducto = () => {
    event.preventDefault();

    const titulo = document.getElementById("nombre").value
    const precio = document.getElementById("precio").value
    const categoria = document.getElementById("categoria").value
    const descripcion = document.getElementById("descripcion").value
    const mensaje = document.getElementById("mensaje-exito")

    if (!titulo || !precio || !descripcion) {
        alert("Favor de llenar los campos obligatorios...")
        return
    }

    const producto = {
        title: titulo,
        price: parseFloat(precio),
        category: categoria,
        description: descripcion,
        thumbnail: 'ruta.jpg'
    }

    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then((respuesta) => respuesta.json())
        .then(producto => {
            console.log(producto)
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                window.location.href = "administrarProductos.html";
            }, 3000);
        })
        .catch(error => {
            console.error('Error al guardar producto:', error);
        });
}