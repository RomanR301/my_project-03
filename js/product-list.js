class ProductList {
  constructor (productsUrl, renderContainer, cart) {
    this.cart = cart;
    fetch(productsUrl)
      .then(result => result.json() )
      .then(products => {
        this.products = products;
        this.renderProducts(renderContainer, products);
        this.addEventListeners();
      })
  } 
  getProductById(id) {
    return this.products.find (el => el.id === id);
  }
  renderProducts(container, products) {
    let productListDomString = ''
    products.forEach(product => {
      productListDomString +=
       `<div class="product-item" data-toggle="modal"
       data-target="#productInfoModal data-id="${product.id}">
          <div class="product-item__img-container">
            <div class="product-item__image">
              <img src="img/${product.image}" alt="${product.title}" />
            </div>
          </div>
          <div class="product-item__description-container">
            <div class="product-item__description">
              <p>${product.title}</p>
            </div>
            <div class="product-item__price">
              <span class="product-price">$${product.price}</span>
            </div>
            <div class="product-order__container">
              <input type="image" src="img/buy.png">
            </div>
          </div>
        </div>`
      
    });
    container.html(productListDomString);
  }
  addEventListeners() {
    $('#productInfoModal').on('show.bs.modal', event => {
      const button = $(event.relatedTarget); 
      const id = String(button.data('id'));
      const product = this.getProductById(id);
      const modal = $ ('#productInfoModal');
      modal.find('.modal-body .card-img-top')
        .attr('src', 'img'+product.image)
        .attr('alt', product.title);
      // modal.find('.modal-body .card-title').text(product.title);
      modal.find('.modal-body .card-text').text(product.description);
      modal.find('button.buy')
        // .text(`${product.price} - Buy`)
        .data('id', id);
    });
    $('.card.product button.buy, #productInfoModal button.buy').click( event => {
      const button = $(event.target);
      const id = button.data('id');
      this.cart.addProduct(id);
      window.showAlert('Product added to card');
    });
  }
 }