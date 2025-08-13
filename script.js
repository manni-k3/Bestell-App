let basket = [];
let nextItemId = 0;

function init() {
  renderDishes(mainDishes, "dish-list", "mainDishes");
  renderDishes(dessertDishes, "dessert", "dessertDishes");
  renderDishes(drinkDishes, "drinks", "drinkDishes");
  renderBasket();
  setupDialogListeners();

  const draggableButton = document.getElementById("draggableButton");
  draggableButton.addEventListener("click", toggleBasket);
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
  const basketContentDialog = document.getElementById("basket_content_dialog");
  const basketItemCountBadge = document.getElementById("basketItemCount");

  let totalItems = 0;
  if (basket.length > 0) {
    totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  }

  if (totalItems > 0) {
    basketItemCountBadge.style.display = "flex";
    basketItemCountBadge.textContent = totalItems;
  } else {
    basketItemCountBadge.style.display = "none";
  }

  if (basket.length === 0) {
    basketContent.innerHTML = `<p>Dein Warenkorb ist noch leer.</p>`;
    basketContentDialog.innerHTML = `<p>Dein Warenkorb ist noch leer.</p>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "ul_basket";
  const ulDialog = ul.cloneNode(true);

  let totalSum = 0;

  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const priceAsNumber = parseFloat(item.price.replace(",", "."));
    const itemSum = priceAsNumber * item.quantity;
    totalSum += itemSum;
    const basketItemHTML = templateBasketItem(item);
    ul.innerHTML += basketItemHTML;
    ulDialog.innerHTML += basketItemHTML;
  }

  basketContent.innerHTML = "";
  basketContent.appendChild(ul);
  basketContent.innerHTML += templateBasketTotal(totalSum);

  const orderButton = basketContent.querySelector("#order-button");
  if (orderButton) {
    orderButton.addEventListener("click", order);
  }

  basketContentDialog.innerHTML = "";
  basketContentDialog.appendChild(ulDialog);
  basketContentDialog.innerHTML += templateBasketTotal(totalSum);

  const orderButtonDialog = basketContentDialog.querySelector("#order-button");
  if (orderButtonDialog) {
    orderButtonDialog.addEventListener("click", order);
  }
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
  const basketDialog = document.querySelector("#basketDialog");

  if (basketDialog && basketDialog.open) {
    basketDialog.close();
  }

  dialog.showModal();
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

function toggleBasket() {
  const basketDialog = document.getElementById("basketDialog");

  if (basketDialog) {
    if (window.innerWidth <= 1023) {
      if (basketDialog && basketDialog.open) {
        basketDialog.close();
      } else {
        basketDialog.showModal();
      }
    }
  }
}

function setupDialogListeners() {
  const confirmOrderButton = document.getElementById("confirm_order");
  const cancelOrderButton = document.getElementById("cancel_order_button");
  const dialog = document.getElementById("dialog");

  confirmOrderButton.addEventListener("click", () => {
    basket = [];
    renderBasket();
    dialog.close();
  });

  cancelOrderButton.addEventListener("click", () => {
    const basketElement = document.querySelector(".basket");
    if (basketElement) {
      basketElement.style.display = "block";
    }
    dialog.close();
  });

  if (closeBasketDialogButton && basketDialog) {
    closeBasketDialogButton.addEventListener("click", () => {
      basketDialog.close();
    });
  }
}
