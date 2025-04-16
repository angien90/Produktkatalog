const postElement = document.getElementById('products');

const getQueryString = (e) => {
  if (e !== undefined) {
    console.log("Event target:", e.target);
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    return `/?${e.target.name}=${e.target.value}`;
  }
  return "";
};

const fetchProduct = async (e) => {
  try {
    const response = await fetch('http://localhost:3000/products' + getQueryString(e));
    const data = await response.json();

    if (data.rows && Array.isArray(data.rows)) {
      postElement.innerHTML = data.rows.map((product) => `
        <div>
          <img src="${product.image}" alt="${product.title}" />
          <p>
            <span><a href="products.html?id=${product.id}">View</a></span>
          </p>
        </div>
      `).join('');
    } else {
      postElement.innerHTML = "No products available.";
    }
  } catch (error) {
    postElement.innerHTML = "Oops, something went wrong. Please try again later!";
    console.error(error);
  }
};

fetchProduct();
