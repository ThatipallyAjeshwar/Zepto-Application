let cartContainer = document.querySelector(".cart_container_two")
let billContainer = document.querySelector(".cart_container_three")
let cartProducts = getCartItems()
function displayCartProducts() {
  cartProducts = getCartItems()
  cartContainer.innerHTML = ""
  if (cartProducts.length == 0) {
    billContainer.innerHTML=""
    cartContainer.innerHTML = `
    <h2>Your Cart is Empty 🛒</h2>
    <a href="./Products.html">Browse Products</a>
    `
    return
  }
  cartProducts.forEach((item) => {
    let totalPrice = Math.round(item.qty * item.price)
    cartContainer.innerHTML += `
      <div class="cart_item">
        <aside class="cart_item_one">
          <img src=${item.img} alt=${item.title}>
        </aside>
        <aside class="cart_item_two">
          <h2 class="item_title">${item.title}</h2>
          <p class="item_qty">Qty: ${item.qty}</p>
          <p class="item_price">Price: $${totalPrice}</p>
        </aside>
        <aside class="cart_item_three">
          <i class="fa-regular fa-trash-can delete-btn" data-id=${item.id}></i>
        </aside>
      </div>
    `
  })
  deleteProduct()
}
displayCartProducts()

function deleteProduct() {
  let deleteBtns = document.querySelectorAll(".delete-btn")
  deleteBtns.forEach((button) => {
    button.addEventListener("click", () => {
      let ProductId = Number(button.dataset.id)
      cartProducts = cartProducts.filter((item) => {
        return item.id!==ProductId
      })
      saveCartItems(cartProducts)
      displayCartProducts()
    })
  })
}
deleteProduct()