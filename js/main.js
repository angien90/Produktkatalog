const productElement = document.getElementById('products');
const genderElement = document.getElementById('gender');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

// Hämta kön från API och fyll dropdown
const fetchGenders = async () => {
  try {
    const response = await fetch('http://localhost:3000/genders');
    const data = await response.json();

    // Töm dropdown innan nya alternativ läggs till
    genderElement.innerHTML = '<option value="">Välj kön</option>'; // Lägg till standardoption

    if (Array.isArray(data.rows)) {
      data.rows.forEach(gender => {
        const option = document.createElement('option');
        option.value = gender.genders_id; // Förutsatt att du använder 'genders_id' för att representera könet
        option.textContent = gender.gender; // Här använder vi 'gender' för att visa namnet på könet
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
    const queryString = getQueryString();  // Bygg query string
    console.log("Query string before fetch:", queryString);  // Logga query string innan förfrågan

    const response = await fetch('http://localhost:3000/products' + queryString);
    const data = await response.json();

    console.log("Data from API:", data); // Logga data från API

    if (Array.isArray(data.rows) && data.rows.length > 0) {
      productElement.innerHTML = data.rows.map((product) => `
        <div class="product-card">
          <a href="products.html?id=${product.products_id}">
            <img src="${product.image}" alt="${product.title}" class="product-image" />
          </a>
          <p class="title">${product.title}</p>
          <p class="price">Pris: ${product.price} SEK</p>
          <a class="read-more-btn" href="products.html?id=${product.products_id}">Visa mer</a>
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

// Dark / light mode
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('checkbox');
  const body = document.body;

  // Kolla om det finns en tidigare inställning i localStorage
  if (localStorage.getItem('theme') === 'dark') {
      checkbox.checked = true;
      body.classList.add('dark-mode');
  } else {
      checkbox.checked = false;
      body.classList.add('light-mode');
  }

  checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
          body.classList.remove('light-mode');
          body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark'); // Spara i localStorage
      } else {
          body.classList.remove('dark-mode');
          body.classList.add('light-mode');
          localStorage.setItem('theme', 'light'); // Spara i localStorage
      }
  });
});  
