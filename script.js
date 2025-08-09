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
