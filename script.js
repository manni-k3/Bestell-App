let basket = [];
let nextItemId = 0;

function init() {
  renderDishes(mainDishes, "dish-list", "mainDishes");
  renderDishes(dessertDishes, "dessert", "dessertDishes");
  renderDishes(drinkDishes, "drinks", "drinkDishes");
  renderBasket();
  setupDialogListeners();
  setupDraggableButton();
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

  updateBasketCount();

  if (basket.length === 0) {
    renderEmptyBasket(basketContent);
    renderEmptyBasket(basketContentDialog);
    return;
  }

  const { ul, totalSum } = createBasketList();
  renderBasketContent(basketContent, ul, totalSum);
  renderBasketContent(basketContentDialog, ul.cloneNode(true), totalSum);
}

function updateBasketCount() {
  const basketItemCount = document.getElementById("basketItemCount");
  const totalItem = basket.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItem > 0) {
    basketItemCount.style.display = "flex";
    basketItemCount.textContent = totalItem;
  } else {
    basketItemCount.style.display = "none";
  }
}

function renderEmptyBasket(element) {
  element.innerHTML = templateEmptyBasket();
}

function createBasketList() {
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
  return {
    ul,
    totalSum,
  };
}

function renderBasketContent(container, ulElement, totalSum) {
  container.innerHTML = "";
  container.appendChild(ulElement);
  container.innerHTML += templateBasketTotal(totalSum);
  const orderButton = container.querySelector("#order-button");

  if (orderButton) {
    orderButton.addEventListener("click", order);
  }
}

function calculateOrderDetails() {
  let orderDetails = "";
  let totalSum = 0;

  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];

    if (i > 0) {
      orderDetails += ", ";
    }
    orderDetails += `${item.quantity}x ${item.name}`;

    const priceAsNumber = parseFloat(item.price.replace(",", "."));
    totalSum += priceAsNumber * item.quantity;
  }
  const formattedtotalSum = totalSum.toFixed(2).replace(".", ",");
  return {
    orderDetails,
    formattedtotalSum,
  };
}

function order() {
  calculateOrderDetails();

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

function setupDraggableButton() {
  const draggableButton = document.getElementById("draggableButton");
  draggableButton.addEventListener("click", toggleBasket);
}
