let nextItemId = 0;

function init() {
  renderDishes(mainDishes, "dish-list", "mainDishes");
  renderDishes(dessertDishes, "dessert", "dessertDishes");
  renderDishes(drinkDishes, "drinks", "drinkDishes");
  renderBasket();
}

function renderDishes(dishes, dishlist, dishCategory) {
  const dishList = document.getElementById(dishlist);
  dishList.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "ul_dishes";

  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];
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

  const existingItem = basket.find((item) => item.name === dish.name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    basket.push({
      id: nextItemId++,
      name: dish.name,
      price: dish.price,
      quantity: 1,
    });
  }
  renderBasket();
}

function renderBasket() {
  const basketContent = document.getElementById("basket_content");
  basketContent.innerHTML = "";

  if (basket.length === 0) {
    basketContent.innerHTML = `<p>Dein Warenkorb ist noch leer.</p>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "ul_basket";

  let totalSum = 0;

  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const priceAsNumber = parseFloat(item.price.replace(",", "."));
    const itemSum = priceAsNumber * item.quantity;
    totalSum += itemSum;
    ul.innerHTML += templateBasketItem(item);
  }

  basketContent.appendChild(ul);
  basketContent.innerHTML += templateBasketTotal(totalSum);
}

function order() {
  const orderDetails = basket
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(", ");
  const totalSum = basket
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

function plusInBasket(itemId) {
  const item = basket.find((item) => item.id === itemId);
  if (item) {
    item.quantity++;
    renderBasket();
  }
}

function minusInBasket(itemId) {
  const item = basket.find((item) => item.id === itemId);
  if (item) {
    item.quantity--;
    if (item.quantity < 1) {
      basket = basket.filter((item) => item.id !== itemId);
    }
    renderBasket();
  }
}
