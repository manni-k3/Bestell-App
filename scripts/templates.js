function templateDishes(dish) {
  return `
           <li class="li_dishes">
           <div>
           <h4>${dish.name}</h4>
           <span class="price">${dish.price}</span>
           </div>
           <button class="add-button">+</button>
           <li/>
        `;
}
