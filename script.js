function init() {
  renderDishes(mainDishes, "dish-list", "mainDishes");
  renderDishes(dessertDishes, "dessert", "dessertDishes");
  renderDishes(drinkDishes, "drinks", "drinkDishes");
  renderBasket();
}

function renderDishes(dishes, dishlist, dishCategory) {
  let dishList = document.getElementById(dishlist);
  dishList.innerHTML = "";

  let ul = document.createElement("ul");
  ul.className = "ul_dishes";

  for (let i = 0; i < dishes.length; i++) {
    let dish = dishes[i];
    ul.innerHTML += templateDishes(dish, i, dishCategory);
  }
  dishList.appendChild(ul);
}

function addToBasket(dishCategory, dishIndex) {
  let dish;

  if (dishCategory === "mainDishes") {
    dish = mainDishes[dishIndex];
  } else if (dishCategory === "dessertDishes") {
    dish = dessertDishes[dishIndex];
  } else if (dishCategory === "drinkDishes") {
    dish = drinkDishes[dishIndex];
  }

  let existingItem = basket.find((item) => item.name === dish.name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    basket.push({
      name: dish.name,
      price: dish.price,
      quantity: 1,
    });
  }
  renderBasket();
}

function renderBasket() {
  let basketContent = document.getElementById("basket_content");
  basketContent.innerHTML = "";

  if (basket.length === 0) {
    basketContent.innerHTML = `<p>Dein Warenkorb ist noch leer.</p>`;
    return;
  }

  let ul = document.createElement("ul");
  ul.className = "ul_basket";

  let totalSum = 0;

  for (let i = 0; i < basket.length; i++) {
    let item = basket[i];
    let priceAsNumber = parseFloat(item.price.replace(",", "."));
    let itemSum = priceAsNumber * item.quantity;
    totalSum += itemSum;
    ul.innerHTML += templateBasketItem(item, itemSum);
  }

  basketContent.appendChild(ul);
  basketContent.innerHTML += templateBasketTotal(totalSum);
}

function order() {
  let orderDetails = basket
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(", ");
  let totalSum = basket
    .reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace(",", ".")) * item.quantity,
      0
    )
    .toFixed(2)
    .replace(".", ",");

  const dialog = document.getElementById("dialog");
  dialog.showModal();

  const confirmOrderButton = document.getElementById("confirm_order");
  confirmOrderButton.addEventListener("click", () => {
    basket = [];
    renderBasket();
    dialog.close();
  });

  const cancelOrderButton = document.getElementById("cancel_order_button");
  cancelOrderButton.addEventListener("click", () => {
    dialog.close();
  });
}

document.getElementById("theme-toggle").addEventListener("click", function () {
  const body = document.body;
  const currentMode = body.getAttribute("darkmode");
  body.setAttribute("darkmode", currentMode === "on" ? "off" : "on");
});
