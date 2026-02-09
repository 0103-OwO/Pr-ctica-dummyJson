document.addEventListener('DOMContentLoaded', () => {
    const selectCategoria = document.getElementById('categoria');

    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(data => {
            selectCategoria.innerHTML = '<option value="">Selecciona una categoría</option>';

            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.slug; 
                option.textContent = categoria.name;  
                selectCategoria.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar categorías:', error);
            selectCategoria.innerHTML = '<option value="">No se pudieron cargar categorías</option>';
        });
});

