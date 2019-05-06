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
       `<div class="product-item">
          <div class="product-item__img-container">
            <div class="product-item__image">
              <img src="img/${product.image}" alt="${product.title}" />
            </div>
          </div>
          <div class="product-item__description-container">
            <div class="product-item__description">
              
            </div>
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
              <button class="btn btn-info" data-toggle="modal"
                 data-target="#productInfoModal" data-id="${product.id}">Info
              </button>
            
              <button class="btn btn-primary buy" data-id="${product.id}">
                 $${product.price} - Buy
              </button>
            </div>
           
          </div>
        </div>`
      
    });
    container.html(productListDomString);
  }
  addEventListeners() {
    $('#productInfoModal').on('show.bs.modal', event => {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const id  = String(button.data('id')); // Extract info from data-* attributes
        const product = this.getProductById(id);
        const modal = $('#productInfoModal');
        modal.find('.modal-body .card-img-top')
            .attr('src', 'img'+product.image)
            .attr('alt', product.title);
        modal.find('.modal-body .card-title').text(product.title);
        modal.find('.modal-body .card-text').text(product.description);
        modal.find('button.buy')
            .text(`${product.price} - Buy`)
            .data('id', id);
    });
    $('.product-item button.buy, #productInfoModal button.buy').click( event => {
        const button = $(event.target);
        const id  = button.data('id'); 
        this.cart.addProduct(id);
        window.showAlert('Product added to cart');
    });
  }
}