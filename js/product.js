console.log(window.location)
console.log(window.location.search)

let params = new URLSearchParams(window.location.search);
let id = params.get("id"); 
console.log(id)

const productElement = document.getElementById('product')
console.log(productElement);

const fetchProductById = async (e) => {
  try {
    const response =  await fetch('http://localhost:3000/products/' + id)
    // console.log(response)
    // if (!response.ok) {
    //   throw new Error('API is down')
    // }
    const product =  await response.json()
    console.log(product);
  
    productElement.innerHTML = `
      <div>
            <strong>${product.title}</strong><br />
            ${product.description}<br />
            Antal i lager: ${product.stock} ST<br />
            Pris: ${product.price} SEK<br />
          
      </div>`
  } catch (error) {
    productElement.innerHTML = "Opps something when wrong. Please try again later!"
    console.log(error)
  }
}

fetchProductById();