let mainDishes = [
  { name: "Spaghetti Bolognese", price: "11,99 €" },
  { name: "Pasta Quattro Formaggi", price: "12,99 €" },
  { name: "Spaghetti Carbonara", price: "12,99 €" },
  { name: "Pizza Salami", price: "8,99 €" },
  { name: "Pizza Schinken", price: "8,99 €" },
  { name: "Pizza Funghi", price: "8,99 €" },
];

let dessertDishes = [
  { name: "Tiramisu", price: "4,99 €" },
  { name: "Panna Cotta", price: "4,99 €" },
  { name: "Gelato", price: "3,99 €" },
];

let drinkDishes = [
  { name: "Cola", price: "2,49 €" },
  { name: "Fanta", price: "2,49 €" },
  { name: "Sprite", price: "2,49 €" },
];

function init() {
  renderDishes(mainDishes, "dish-list");
  renderDishes(dessertDishes, "dessert");
  renderDishes(drinkDishes, "drinks");
}

function renderDishes(dishes, dishlist) {
  let dishList = document.getElementById(dishlist);
  dishList.innerHTML = "";

  let ul = document.createElement("ul");
  ul.className = "ul_dishes";

  for (let i = 0; i < dishes.length; i++) {
    let dish = dishes[i];
    ul.innerHTML += templateDishes(dish);
  }
  dishList.appendChild(ul);
}
