/* ---------------------------------- Cart ---------------------------------- */

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeIcon = document.querySelector("#close-cart");

/* -------------------------------- Open cart ------------------------------- */
cartIcon.onclick = () => {
  cart.classList.add("active");
};

/* ------------------------------- close cart ------------------------------- */
closeIcon.onclick = () => {
  cart.classList.remove("active");
};

/* ----------------------------- Cart Working JS ---------------------------- */

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

/* -------------------------- Making Fucntion Ready ------------------------- */
function ready() {
  //Remove items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);

  //Remove items from cart
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //Quantity changed
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartChanged);
  }

  //Buy Botton
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyBtnClicked);
}

//Remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

/* ------------------------------ Update Totral ----------------------------- */
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
    total = total + price * quantity;
    //if total contains some Cents value
    total = Math.round((total * 100) / 100);
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

/* ------------------------ quantityChanged Function ------------------------ */
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

/* ------------------------- addCartChanged Function ------------------------ */
function addCartChanged(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var priceElement = shopProducts.getElementsByClassName("price")[0];
  priceProduct = priceElement.innerText;
  var productImg = shopProducts.getElementsByClassName("product-image")[0].src;
  addProductToCart(title, priceProduct, productImg);
}

/* ------------------------ addProductToCart Function ----------------------- */
function addProductToCart(title, priceProduct, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.className = "cart-box";
  //cartShopBox.classList("cart-box");

  // check for item is already selected or not
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsName = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsName.length; i++) {
    if (title == cartItemsName[i].innerText) {
      alert("You have already added this item to your cart");
      return;
    }
  }

  var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">

                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${priceProduct}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>

                            <!--Romeve Cart-->
                            <i class='bx bxs-trash cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  updatetotal();
}

/* --------------------------- //Buy Botton Action -------------------------- */
function buyBtnClicked() {
  var cartContent = document.getElementsByClassName("cart-content")[0];

  if (cartContent.hasChildNodes()) {
    alert("Your order is placed!");
    while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
    }
  } else {
    alert("Your cart is empty!");
  }
  updatetotal();
}
