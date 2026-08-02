//!Fetch Address Functionality
let userLocation = document.getElementById("location")
userLocation.addEventListener("click", () => {
  userLocation.innerHTML = "Fetching Loaction..."
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let locationApi = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
    let fetchingArea = async () => {
      let response = await fetch(locationApi)
      let { address: { suburb, city } } = await response.json()
      userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${suburb}, ${city}`
    }
    fetchingArea()
  })
})


//!Displaying All Products
async function displayingProducts() {
  let response = await fetch("https://dummyjson.com/products?limit=194")
  let { products } = await response.json()
  let productsSection = document.getElementById("products-section-2")
  products.forEach((item) => {
    productsSection.innerHTML += `
    <article class="product-cards">
        <div class="product-card-one">
          <p class="discount-percentage">${item.discountPercentage}% Off</p>
          <img src=${item.thumbnail} alt=${item.title}>
          <p class="wishlist"><i class="fa-solid fa-heart"></i></p>
        </div>
        <div class="product-card-two">
          <p class="delivery-time">⚡ ${Math.floor(Math.random() * (10 - 5 + 1)) + 5}Mins</p>
          <p class="product-title">${item.title}</p>
          <p class="product-brand">${item.brand || "Imported"}</p>
          <div class="product-price">
            <p class="discount-price">$${Math.floor(item.price - (item.price * item.discountPercentage / 100))}</p>
            <p class="actual-price">$${item.price}</p>
            <button class="addBtn">Add</button>
          </div>
          <p class="ratings"><i class="fa-solid fa-star"></i> ${item.rating} (${item.stock})</p>
        </div>
      </article>
    `
  })
  wishlistIcons()
}
displayingProducts()

//! Wishlist
function wishlistIcons() {
  let wishListIcons = document.querySelectorAll(".wishlist>i")
  wishListIcons.forEach((item) => {
    console.log(item)
    item.addEventListener("click", () => {
      item.classList.toggle("clicked")
    })
  })
}

//!Add Button Events
function addButtonEvents() {
  let addBtns = document.querySelectorAll(".addBtn")
  addBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let product = {
        id: Number(btn.dataset.id),
        title: btn.dataset.title,
        price: Number(btn.dataset.price),
        img: btn.dataset.img
      }
      addToCart(product)
      renderProducts(allProducts)
    })
  })
}

//!Increase Button Events
function increaseButtonEvents() {
  let increaseBtns = document.querySelectorAll(".incrementBtn")
  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      incrementQuantity(Number(btn.dataset.id))
      renderProducts(allProducts)
    })
  })
}

//!Decrease Button Events
function decreaseButtonEvents() {
  let decreaseBtns = document.querySelectorAll(".decrementBtn")
  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      decrementQuantity(Number(btn.dataset.id))
      renderProducts(allProducts)
    })
  })
}