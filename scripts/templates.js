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

function templateBasketItem(item, itemSum) {
  return `
      <li>
        <div>
          <span>${item.quantity}x</span>
          <span>${item.name}</span>
        </div>
        <span>${itemSum.toFixed(2).replace(".", ",")} €</span>
      </li>
    `;
}

function templateBasketTotal(totalSum) {
  return `
      <div class="basket-total">
        <span>Gesamtsumme:</span>
        <span>${totalSum.toFixed(2).replace(".", ",")} €</span>
      </div>
    `;
}
