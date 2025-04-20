const categoryElement = document.getElementById('category');
const genderElement = document.getElementById('gender');
const productElement = document.getElementById('products');
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
      // Filtrera bort tomma eller ogiltiga kategorier
      const genders = data.rows.filter(gender => gender.gender && gender.gender.trim() !== '');
      genders.forEach(gender => {
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
  const category = categoryElement.value;

  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);
  if (gender) params.append('gender', gender);
  if (category) params.append('category', category);

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
      productElement.innerHTML = data.rows.map((product) => {
        // Storleksalternativ beroende på kategori
        let sizeOptions = '';
        if (product.category === 'T-shirt') {
          sizeOptions = ['XS', 'S', 'M', 'L', 'XL']
            .map(size => `<option value="${size}">${size}</option>`).join('');
        } else if (product.category === 'shoes') {
          sizeOptions = Array.from({ length: 10 }, (_, i) => i + 36)
            .map(size => `<option value="${size}">${size}</option>`).join('');
        }
      
        return `
          <div class="product-card" data-product-id="${product.products_id}">
            <a href="products.html?id=${product.products_id}">
              <img src="${product.image}" alt="${product.title}" class="product-image" />
            </a>
            <p class="title">${product.title}</p>
            <p class="price">Pris: ${product.price} SEK</p>
      
            ${sizeOptions ? `
              <label for="size-${product.products_id}">Storlek:</label>
              <select id="size-${product.products_id}" class="size-select">
                ${sizeOptions}
              </select>
            ` : ''}
      
            <div class="quantity-control">
              <button class="decrease-btn">-</button>
              <span class="quantity">0</span>
              <button class="increase-btn">+</button>
            </div>
      
            <a class="read-more-btn" href="products.html?id=${product.products_id}">Visa mer</a>
          </div>
        `;
      }).join('');
    } else {
      productElement.innerHTML = "Inga produkter hittades.";
    }
  } catch (error) {
    productElement.innerHTML = "Något gick fel. Försök igen senare!";
    console.error(error);
  }
};

// Hämta kategorier
async function loadCategories() {
  try {
    const response = await fetch('http://localhost:3000/categories');
    const data = await response.json();
    const select = document.getElementById('category');

    // Filtrera bort tomma eller ogiltiga kategorier
    const categories = data.rows.filter(category => category.category_name && category.category_name.trim() !== '');
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.category_id;
      option.textContent = category.category_name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Fel vid hämtning av kategorier:', error);
  }
}

// Event listeners
searchInput.addEventListener('keyup', fetchProduct);
sortSelect.addEventListener('change', fetchProduct);
categoryElement.addEventListener('change', fetchProduct);
genderElement.addEventListener('change', fetchProduct);

// Initiera sida
document.addEventListener('DOMContentLoaded', async () => {
  await fetchGenders();
  await loadCategories();
  fetchProduct(); // Körs när både genders och categories är laddade

  // Dark / light mode
  const checkbox = document.getElementById('checkbox');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
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