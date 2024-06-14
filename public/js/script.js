document.addEventListener('DOMContentLoaded', function () {
  const createButton = document.getElementById('btn-create');
  const searchButton = document.getElementById('btn-search');
  const productForm = document.getElementById('product-form');
  const searchForm = document.getElementById('search-form');

  // Função para pegar os dados do formulário
  function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  }

  // Função para limpar os dados do formulário
  function clearFormData(form) {
    form.reset();
  }

  // Função para adicionar uma nova linha na tabela
  function addTableRow(data) {
    const tableBody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');

    const keys = ['name', 'description', 'brand', 'category', 'price', 'cost'];
    keys.forEach(key => {
      const cell = document.createElement('td');
      cell.textContent = data[key];
      newRow.appendChild(cell);
    });

    tableBody.appendChild(newRow);
  }

  // Evento de clique no botão "Create"
  createButton.addEventListener('click', async () => {
    const productData = getFormData(productForm);
    const productJSON = JSON.stringify(productData);

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: productJSON,
      });

      if (!response.ok) {
        throw new Error('Erro ao criar produto');
      }

      const createdProduct = await response.json();
      console.log('Produto criado:', createdProduct);

      addTableRow(productData); // Adicione a linha na tabela, se necessário
      clearFormData(productForm); // Limpe o formulário após criação
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      // Trate o erro adequadamente, talvez mostrando uma mensagem ao usuário
    }
  });

  // Evento de clique no botão "Search"
  searchButton.addEventListener('click', function () {
    const searchData = getFormData(searchForm);
    const searchJSON = JSON.stringify(searchData);
    console.log("Search Data:", searchJSON);

    clearFormData(searchForm);
  });
});
