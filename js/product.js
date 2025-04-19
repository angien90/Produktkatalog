console.log(window.location)
console.log(window.location.search)

let params = new URLSearchParams(window.location.search);
let id = params.get("id"); 
console.log(id)

const productElement = document.getElementById('products')
console.log(productElement);

const fetchProductById = async (e) => {
  try {
    const response =  await fetch('http://localhost:3000/products/' + id)
    console.log(response)
    if (!response.ok) {
    throw new Error('API is down')
    }

    const product =  await response.json()
    console.log(product);
  
    productElement.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.title}" />
        <h2 class="product_name">${product.title}</h2>
        <h3 class="product_description">${product.description}</h3>
        <p>Antal i lager: ${product.stock} ST<p/>
        <p>Pris: ${product.price} SEK<p/>
      </div>`
  } catch (error) {
    productElement.innerHTML = "Opps something when wrong. Please try again later!"
    console.log(error)
  }
}

fetchProductById();