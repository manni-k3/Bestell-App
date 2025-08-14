function templateDishes(dish, index, dishCategory) {
  return `
           <li class="li_dishes">
           <div>
           <h4>${dish.name}</h4>
           <span class="price">${dish.price}</span>
           </div>
           <button onclick="addToBasket('${dishCategory}', ${index})" id="add-button" class="add-button">+</button>
           </li>
        `;
}

function templateBasketItem(item) {
  const itemSum = parseFloat(item.price.replace(",", ".")) * item.quantity;
  return `
      <li>
        <div class="basket_item">
            <button onclick="minusInBasket(${
              item.id
            })" id="remove-button" class="basket-button">-</button>
              <span>${item.quantity}x</span>
            <button onclick="plusInBasket(${
              item.id
            })" id="plus-button" class="basket-button">+</button>
            <br>
          <span>${item.name}</span>
        </div>
        <span>${itemSum.toFixed(2).replace(".", ",")} €</span>
      </li>
    `;
}

function templateBasketTotal(totalSum) {
  return `
      <div class="basket_total">
        <span>Gesamtsumme:</span>
        <span>${totalSum.toFixed(2).replace(".", ",")} €</span>
        <button id="order-button" class="order-button">Bestellen</button>
      </div>
    `;
}

function templateEmptyBasket() {
  return `
       <p>Dein Warenkorb ist noch leer.</p>
    `;
}
