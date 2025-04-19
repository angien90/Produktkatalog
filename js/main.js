const productElement = document.getElementById('products');
const genderElement = document.getElementById('gender');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

// Hämta kön från API och fyll dropdown
const fetchGenders = async () => {
  try {
    const response = await fetch('http://localhost:3000/genders');
    const data = await response.json();

    if (Array.isArray(data.rows)) {
      data.rows.forEach(gender => {
        const option = document.createElement('option');
        option.value = gender.genders_id;
        option.textContent = gender.gender;
        genderElement.appendChild(option);
      });
    }
  } catch (err) {
    console.error("Kunde inte hämta genders:", err);
  }
};

// Bygg query string utifrån alla filter
const getQueryString = () => {
  const search = searchInput.value.trim();
  const sort = sortSelect.value;
  const gender = genderElement.value;

  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);
  if (gender) params.append('gender', gender);

  return `?${params.toString()}`;
};

// Hämta produkter
const fetchProduct = async () => {
  try {
    const response = await fetch('http://localhost:3000/products' + getQueryString());
    const data = await response.json();

    if (Array.isArray(data.rows) && data.rows.length > 0) {
      productElement.innerHTML = data.rows.map((product) => `
        <div>
          <img src="${product.image}" alt="${product.title}" />
          <p>${product.title}</p>
          <p>Pris: ${product.price} SEK<p/>
          <p><a href="products.html?id=${product.products_id}">Visa mer</a></p>
        </div>
      `).join('');
    } else {
      productElement.innerHTML = "Inga produkter hittades.";
    }

  } catch (error) {
    productElement.innerHTML = "Något gick fel. Försök igen senare!";
    console.error(error);
  }
};

// Event listeners
searchInput.addEventListener('keyup', fetchProduct);
sortSelect.addEventListener('change', fetchProduct);
genderElement.addEventListener('change', fetchProduct);

// Initiera sida
document.addEventListener('DOMContentLoaded', () => {
  fetchGenders().then(fetchProduct); // Ladda genders först, sen produkter
});
