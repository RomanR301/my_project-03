class Cart {
  constructor(cartContainer) {
    this.cartContainer = cartContainer;
    this.cart = JSON.parse(localStorage['cart'] || '{}');
    this.addEventListeners();
    this.updateBadge();
  }
  addEventListeners() {
    this.cartContainer.on('show.bs.modal', () => this.renderCart() ); 
    this.cartContainer.find('.order').click( ev => this.order(ev) );
  }
}