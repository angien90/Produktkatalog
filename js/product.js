// Dark / light mode
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('checkbox');
  const body = document.body;

  // Kolla om det finns en tidigare inställning i localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      checkbox.checked = true;
      body.classList.add('dark-mode');
  } else {
      checkbox.checked = false;
      body.classList.add('light-mode');
  }

  checkbox.addEventListener('change', () => {
    body.classList.remove('dark-mode', 'light-mode');
    if (checkbox.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
  });
});  

console.log(window.location);
console.log(window.location.search);

let params = new URLSearchParams(window.location.search);
let id = params.get("id"); 
console.log(id);

const productElement = document.getElementById('products');
console.log(productElement);

const fetchProductById = async () => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    console.log(response);

    if (!response.ok) {
      throw new Error('API is down');
    }

    const product = await response.json();
    console.log(product);

    productElement.innerHTML = `
      <div class="product-card">
        <h2 class="product_name">${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" />
        <h3 class="product_description">${product.description}</h3>
        <p>Antal i lager: ${product.stock} ST</p>
        <p>Pris: ${product.price} SEK</p>

        <!-- Plus och minus knapp -->
          <div class="quantity-control">
            <button class="decrease-btn">-</button>
            <span class="quantity">0</span>
            <button class="increase-btn">+</button>
          </div>
      </div>`;
  } catch (error) {
    productElement.innerHTML = "Oops, something went wrong. Please try again later!";
    console.log(error);
  }
}

if (id) {
  fetchProductById();
} else {
  productElement.innerHTML = "No product ID found in URL.";
}
