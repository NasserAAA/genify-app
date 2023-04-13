const form = document.getElementById('input-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const age = document.getElementById('age').value;
  const antiguedad = document.getElementById('antiguedad').value;
  const segmento = document.getElementById('segmento').value;
  const sexo = document.getElementById('sexo').value;
  const tiprel_1mes = document.getElementById('tiprel_1mes').value;
  const renta = document.getElementById('renta').value;
  const ind_actividad_cliente = document.getElementById('ind_actividad_cliente').value;
  const pais_residencia = document.getElementById('pais_residencia').value;
  const canal_entrada = document.getElementById('canal_entrada').value;

  const data = {
    age: age,
    antiguedad: antiguedad,
    segmento: segmento,
    sexo: sexo,
    tiprel_1mes: tiprel_1mes,
    renta: renta,
    ind_actividad_cliente: ind_actividad_cliente,
    pais_residencia: pais_residencia,
    canal_entrada: canal_entrada
  };

  fetch('/predict', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Handle JSON response
      return response.json().then(products => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(productGroup => {
          const productItem = document.createElement('li');
          productItem.innerText = productGroup.join(', ');
          productList.appendChild(productItem);
        });
      });
    } else {
      // Handle HTML response
      return response.text().then(html => {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = html;
      });
    }
  })
  .catch(error => {
    console.error(error);
  });
});
