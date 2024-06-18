import axios from 'axios';

// Base URL of the API
const api = axios.create({
    baseURL: "https:/localhost:3333/",
    headers: {
        "Content-Type": "application/json",
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const createButton = document.getElementById('btn-create');
    const updateButton = document.getElementById('btn-update');
    const deleteButton = document.getElementById('btn-delete');
    const productForm = document.getElementById('product-form');
    const searchButton = document.getElementById('btn-search');
    const searchForm = document.getElementById('search-form');

    // Create 
    createButton.addEventListener('click', function () {
        const productData = getFormData();
        api.post('/Create', productData)
            .then(response => {
                console.log('Product created:', response.data);
                clearData();
            })
            .catch(error => {
                console.error('Error creating product:', error);
            });
    });

    // Update
    updateButton.addEventListener('click', function () {
        const productData = getFormData();
        api.put('/Update', productData)
            .then(response => {
                console.log('Product updated:', response.data);
                clearData();
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    });

    // Delete
    deleteButton.addEventListener('click', function () {
        const productData = getFormData();
        api.delete('/Delete', { data: productData })
            .then(response => {
                console.log('Product deleted:', response.data);
                clearData();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    });

    // Search
    searchButton.addEventListener('click', function () {
        const nameSearch = document.getElementById('search-name').value;
        api.get(`/getName/${nameSearch}`)
            .then(response => {
                console.log('Search result:', response.data);
            })
            .catch(error => {
                console.error('Error searching product:', error);
            });
    });

    function getFormData() {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const brand = document.getElementById('brand').value;
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const cost = document.getElementById('cost').value;

        return { name, description, brand, category, price, cost };
    }

    function clearData() {
        productForm.reset();
    }
});
