document.addEventListener("DOMContentLoaded", () => {
    // highlight current page in navbar
    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === current || (linkPage === "index.html" && current === "")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    function getProductsData() {
        return {
            burgers: {
                icon: "fa-hamburger",
                items: [
                    {
                        name: "Classic Burger",
                        price: 8.99,
                        description: "Delicious homemade burger with fresh ingredients.",
                        image: "img/burgers/burger1.jpg"
                    },
                    {
                        name: "Cheese Burger",
                        price: 9.49,
                        description: "Juicy burger topped with cheddar cheese and lettuce.",
                        image: "img/burgers/burger2.jpg"
                    },
                    {
                        name: "Veggie Burger",
                        price: 7.99,
                        description: "Healthy veggie patty with avocado and tomato.",
                        image: "img/burgers/burger3.jpg"
                    },
                    {
                        name: "Double Burger",
                        price: 10.99,
                        description: "Two juicy patties with cheese and bacon.",
                        image: "img/burgers/burger4.jpg"
                    },
                    {
                        name: "BBQ Burger",
                        price: 9.99,
                        description: "Smoky BBQ sauce with crispy onions.",
                        image: "img/burgers/burger5.jpg"
                    }
                ]
            },
            pizza: {
                icon: "fa-pizza-slice",
                items: [
                    {
                        name: "Margherita Pizza",
                        price: 12.99,
                        description: "Classic pizza with tomato, mozzarella, and basil.",
                        image: "img/pizza/margherita.jpg"
                    },
                    {
                        name: "Pepperoni Pizza",
                        price: 13.99,
                        description: "Pizza loaded with pepperoni and cheese.",
                        image: "img/pizza/pepperoni.jpg"
                    },
                    {
                        name: "Veggie Pizza",
                        price: 11.99,
                        description: "Colorful veggie toppings on fresh dough.",
                        image: "img/pizza/veggie.jpg"
                    }
                ]
            },
            salads: {
                icon: "fa-leaf",
                items: [
                    {
                        name: "Caesar Salad",
                        price: 7.99,
                        description: "Fresh salad with crispy lettuce and parmesan.",
                        image: "img/salads/caesar.jpg"
                    },
                    {
                        name: "Garden Salad",
                        price: 6.99,
                        description: "Mixed greens with cherry tomatoes and cucumber.",
                        image: "img/salads/garden.jpg"
                    }
                ]
            },
            desserts: {
                icon: "fa-cake-candles",
                items: [
                    {
                        name: "Chocolate Cake",
                        price: 5.99,
                        description: "Rich chocolate cake with frosting.",
                        image: "img/desserts/chocolate_cake.jpg"
                    },
                    {
                        name: "Cheesecake",
                        price: 6.99,
                        description: "Creamy cheesecake with cherry topping.",
                        image: "img/desserts/cheesecake.jpg"
                    }
                ]
            },
            beverages: {
                icon: "fa-glass-martini-alt",
                items: [
                    {
                        name: "Iced Tea",
                        price: 2.99,
                        description: "Refreshing iced tea with lemon.",
                        image: "img/beverages/iced_tea.jpg"
                    },
                    {
                        name: "Soft Drink",
                        price: 2.49,
                        description: "Cold and bubbly soft drink.",
                        image: "img/beverages/soft_drink.jpg"
                    }
                ]
            },
            appetizers: {
                icon: "fa-apple-alt",
                items: [
                    {
                        name: "Chicken Wings",
                        price: 8.99,
                        description: "Crispy wings with spicy sauce.",
                        image: "img/appetizers/chicken_wings.jpg"
                    },
                    {
                        name: "Mozzarella Sticks",
                        price: 5.99,
                        description: "Golden fried mozzarella with marinara sauce.",
                        image: "img/appetizers/mozzarella_sticks.jpg"
                    }
                ]
            },
            seafood: {
                icon: "fa-fish",
                items: [
                    {
                        name: "Grilled Fish",
                        price: 14.99,
                        description: "Fresh grilled fish fillet with herbs.",
                        image: "img/seafood/grilled_fish.jpg"
                    },
                    {
                        name: "Shrimp Pasta",
                        price: 13.99,
                        description: "Pasta with succulent shrimp and garlic sauce.",
                        image: "img/seafood/shrimp_pasta.jpg"
                    }
                ]
            }
        };
    }

    const productsData = getProductsData();
    let cart = [];

    const container = document.getElementById("card_container");

    // Update cart badge
    function updateCartBadge() {
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById("cartBadge");
        if (badge) {
            badge.textContent = itemCount;
            if (itemCount === 0) {
                badge.style.display = 'none';
            } else {
                badge.style.display = 'flex';
            }
        }
    }

    // create cards for each category
    Object.keys(productsData).forEach(category => {
        const { icon, items } = productsData[category];

        // add category header
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("col-12", "category-header");
        headerDiv.setAttribute("data-category", category);
        headerDiv.innerHTML = `
      <h3 class="mt-3 mb-3">
        <i class="fas ${icon}"></i> ${capitalize(category)}
      </h3>
      <hr>
    `;
        container.appendChild(headerDiv);

        // add product cards for this category
        items.forEach(product => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("col-md-4", "product-card");
            cardDiv.setAttribute("data-category", category);
            cardDiv.innerHTML = createProductCard(product);
            container.appendChild(cardDiv);
        });
    });

    // category filter setup - handle both desktop and mobile
    const filterLinks = document.querySelectorAll('#categoryFilter a, #categoryFilterMobile a');
    const productCards = document.querySelectorAll('.product-card');
    const categoryHeaders = document.querySelectorAll('.category-header');

    function handleCategoryFilter(category) {
        // Remove active from all links (desktop and mobile)
        filterLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to corresponding links in both desktop and mobile
        filterLinks.forEach(l => {
            if (l.getAttribute('data-category') === category) {
                l.classList.add('active');
            }
        });

        if (category === 'all') {
            productCards.forEach(card => card.style.display = 'block');
            categoryHeaders.forEach(header => header.style.display = 'block');
        } else {
            productCards.forEach(card => card.style.display = 'none');
            categoryHeaders.forEach(header => header.style.display = 'none');

            productCards.forEach(card => {
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                }
            });
            categoryHeaders.forEach(header => {
                if (header.getAttribute('data-category') === category) {
                    header.style.display = 'block';
                }
            });
        }

        // Close mobile category menu after selection
        const categoryCollapse = document.getElementById('collapseCat');
        if (categoryCollapse && window.innerWidth < 768) {
            const bsCollapse = bootstrap.Collapse.getInstance(categoryCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    }

    filterLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            handleCategoryFilter(category);
        });
    });

    function createProductCard(product) {
        return `
        <div class="card mb-4" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" height="180" style="object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <h6 class="card-subtitle mb-2 text-white">$${product.price.toFixed(2)}</h6>
            <p class="card-text">${product.description}</p>
            <button class="btn btn-success w-100 add-to-cart" data-name="${product.name}" data-price="${product.price}">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      `;
    }

    function createOrderItem(item, index) {
        return `
        <div class="mb-2">
          <strong>${item.name}</strong>
          <br>
          <small class="text-muted">$${item.price.toFixed(2)} each</small>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-secondary decrease-qty" data-index="${index}">
              <i class="fas fa-minus"></i>
            </button>
            <button class="btn btn-secondary" disabled style="min-width: 40px;">
              ${item.quantity}
            </button>
            <button class="btn btn-secondary increase-qty" data-index="${index}">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div>
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
            <button class="btn btn-sm btn-danger ms-2 remove-item" data-index="${index}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
    }

    function buildShippingForm() {
        return `
        <div class="card">
            <div class="card-header text-white">
                <h5 class="mb-0"><i class="fa-solid fa-motorcycle"></i> Shipping Details</h5>
            </div>
            <div class="card-body">
                <form id="shippingForm" novalidate>
                    <div class="mb-3">
                        <label for="fullName" class="form-label">Full Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="fullName" required>
                        <div class="invalid-feedback">Please enter your full name.</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" required>
                        <div class="invalid-feedback">Please enter a valid email address.</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone Number <span class="text-danger">*</span></label>
                        <input type="tel" class="form-control" id="phone" required pattern="[0-9]{10,}">
                        <div class="invalid-feedback">Please enter a valid phone number (at least 10 digits).</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="address" class="form-label">Street Address <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="address" required>
                        <div class="invalid-feedback">Please enter your street address.</div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="city" class="form-label">City <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="city" required>
                            <div class="invalid-feedback">Please enter your city.</div>
                        </div>
                    
                    </div>
                    
                    <div class="mb-3">
                        <label for="specialInstructions" class="form-label">Special Instructions (Optional)</label>
                        <textarea class="form-control" id="specialInstructions" rows="3"></textarea>
                    </div>
                    
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-success btn-lg">
                            <i class="fas fa-check-circle"></i> Complete Order
                        </button>
                        <button type="button" class="btn btn-secondary" id="backToCart">
                            <i class="fas fa-arrow-left"></i> Back to Cart
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `;
    }

    function buildConfirmationPage(orderDetails) {
        const { subtotal, itemCount, discount, discountAmount, taxRate, tax, total, items } = orderDetails;

        let itemsHTML = '';
        items.forEach(item => {
            itemsHTML += `
                <div class="d-flex justify-content-between mb-2">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });

        return `
        <div class="card">
            <div class="card-header bg-success text-white text-center">
                <h4 class="mb-0"><i class="fas fa-check-circle"></i> Order Confirmed!</h4>
            </div>
            <div class="card-body">
                <div class="alert alert-success text-center">
                    <h5>Thank you for your order!</h5>
                    <p class="mb-0">Your order has been successfully placed.</p>
                </div>
                
                <h6 class="mt-4 mb-3">Order Summary:</h6>
                <div class="border-bottom pb-3 mb-3">
                    ${itemsHTML}
                </div>
                
                <div class="mb-2">
                    <div class="d-flex justify-content-between">
                        <span>Subtotal (${itemCount} items):</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                </div>
                
                ${discount > 0 ? `
                <div class="mb-2 text-success">
                    <div class="d-flex justify-content-between">
                        <span><i class="fas fa-tag"></i> Discount (${discount}%):</span>
                        <span>-$${discountAmount.toFixed(2)}</span>
                    </div>
                    ${itemCount >= 3 ? `<small class="text-muted">🎉 Auto-applied: 3+ items discount!</small>` : ''}
                </div>
                ` : ''}
                
                <div class="mb-2">
                    <div class="d-flex justify-content-between">
                        <span>Tax (${(taxRate * 100).toFixed(1)}%):</span>
                        <span>$${tax.toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="border-top pt-3 mt-3">
                    <div class="d-flex justify-content-between">
                        <strong class="h5">Total:</strong>
                        <strong class="h5 text-success">$${total.toFixed(2)}</strong>
                    </div>
                </div>
                
                <div class="alert alert-info mt-4">
                    <i class="fas fa-info-circle"></i> 
                    <strong>Estimated Delivery:</strong> 30-45 minutes
                </div>
                
                <div class="d-grid gap-2 mt-4">
                    <button class="btn btn-primary" id="newOrder">
                        <i class="fas fa-shopping-cart"></i> Start New Order
                    </button>
                </div>
            </div>
        </div>
        `;
    }

    // calculate total, tax, discounts etc
    function calculateTotal() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        // 10% off when you buy 3 or more items
        let discount = 0;
        if (itemCount >= 3) {
            discount = 10;
        }

        const discountAmount = (subtotal * discount) / 100;
        const subtotalAfterDiscount = subtotal - discountAmount;

        const taxRate = 0.085; // 8.5% tax
        const tax = subtotalAfterDiscount * taxRate;

        const total = subtotalAfterDiscount + tax;

        return {
            subtotal,
            itemCount,
            discount,
            discountAmount,
            taxRate,
            tax,
            total,
            items: cart
        };
    }

    function displayShippingForm() {
        const orderSummary = document.getElementById("order_summary");
        const mobileOrderSummary = document.getElementById("mobile_order_summary");
        
        const formHTML = buildShippingForm();
        orderSummary.innerHTML = formHTML;
        mobileOrderSummary.innerHTML = formHTML;

        // Add event listeners for both desktop and mobile forms
        document.querySelectorAll("#shippingForm").forEach(form => {
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                if (form.checkValidity()) {
                    const orderDetails = calculateTotal();
                    displayConfirmation(orderDetails);
                } else {
                    form.classList.add("was-validated");
                }
            });
        });

        document.querySelectorAll("#backToCart").forEach(btn => {
            btn.addEventListener("click", function () {
                refreshOrderSummary();
            });
        });
    }

    function displayConfirmation(orderDetails) {
        const orderSummary = document.getElementById("order_summary");
        const mobileOrderSummary = document.getElementById("mobile_order_summary");
        
        const confirmationHTML = buildConfirmationPage(orderDetails);
        orderSummary.innerHTML = confirmationHTML;
        mobileOrderSummary.innerHTML = confirmationHTML;

        document.querySelectorAll("#newOrder").forEach(btn => {
            btn.addEventListener("click", function () {
                cart = [];
                refreshOrderSummary();
                
                // Close mobile cart offcanvas
                const mobileCart = document.getElementById('mobileCart');
                if (mobileCart) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileCart);
                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                    }
                }
            });
        });
    }

    function refreshOrderSummary() {
        const orderSummary = document.getElementById("order_summary");
        const mobileOrderSummary = document.getElementById("mobile_order_summary");
        
        orderSummary.innerHTML = "";
        mobileOrderSummary.innerHTML = "";

        if (cart.length === 0) {
            const emptyHTML = `
                <div class="list-group-item text-center text-muted">
                    <p class="mb-0">Your cart is empty</p>
                </div>
            `;
            orderSummary.innerHTML = emptyHTML;
            mobileOrderSummary.innerHTML = emptyHTML;
            updateCartBadge();
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("list-group-item");
            itemDiv.innerHTML = createOrderItem(item, index);
            orderSummary.appendChild(itemDiv);

            const itemDivMobile = document.createElement("div");
            itemDivMobile.classList.add("list-group-item");
            itemDivMobile.innerHTML = createOrderItem(item, index);
            mobileOrderSummary.appendChild(itemDivMobile);
        });

        const totalDiv = document.createElement("div");
        totalDiv.classList.add("list-group-item", "bg-light");
        totalDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <strong>Subtotal:</strong>
                <strong class="text-success">$${total.toFixed(2)}</strong>
            </div>
        `;
        orderSummary.appendChild(totalDiv);

        const totalDivMobile = document.createElement("div");
        totalDivMobile.classList.add("list-group-item", "bg-light");
        totalDivMobile.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <strong>Subtotal:</strong>
                <strong class="text-success">$${total.toFixed(2)}</strong>
            </div>
        `;
        mobileOrderSummary.appendChild(totalDivMobile);

        const checkoutDiv = document.createElement("div");
        checkoutDiv.classList.add("list-group-item");
        checkoutDiv.innerHTML = `
            <button class="btn btn-primary w-100" id="checkoutBtn">
                <i class="fas fa-credit-card"></i> Proceed to Checkout
            </button>
        `;
        orderSummary.appendChild(checkoutDiv);

        const checkoutDivMobile = document.createElement("div");
        checkoutDivMobile.classList.add("list-group-item");
        checkoutDivMobile.innerHTML = `
            <button class="btn btn-primary w-100 mobile-checkout-btn">
                <i class="fas fa-credit-card"></i> Proceed to Checkout
            </button>
        `;
        mobileOrderSummary.appendChild(checkoutDivMobile);

        updateCartBadge();
    }

    // handle all button clicks
    document.addEventListener("click", e => {
        // add to cart button
        if (e.target.closest(".add-to-cart")) {
            const button = e.target.closest(".add-to-cart");
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            refreshOrderSummary();

            // show "added" msg
            button.innerHTML = '<i class="fas fa-check"></i> Added!';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            }, 1000);
        }

        // increase quantity button
        if (e.target.closest(".increase-qty")) {
            const index = parseInt(e.target.closest(".increase-qty").getAttribute("data-index"));
            cart[index].quantity++;
            refreshOrderSummary();
        }

        // decrease quantity button
        if (e.target.closest(".decrease-qty")) {
            const index = parseInt(e.target.closest(".decrease-qty").getAttribute("data-index"));
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            refreshOrderSummary();
        }

        // remove item button
        if (e.target.closest(".remove-item")) {
            const index = parseInt(e.target.closest(".remove-item").getAttribute("data-index"));
            cart.splice(index, 1);
            refreshOrderSummary();
        }

        // checkout button (desktop and mobile)
        if (e.target.closest("#checkoutBtn") || e.target.closest(".mobile-checkout-btn")) {
            displayShippingForm();
        }
    });

    refreshOrderSummary();

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});