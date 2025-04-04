// ----------------------- Data -----------------------
const products = {
    "Wines": [
        { name: "Red Wine", image: "1.jpeg" },
        { name: "White Wine", image: "2.jpeg" },
        { name: "Rose Wine", image: "3.jpeg" },
        { name: "Sparkling Wine", image: "4.jpeg" },
        { name: "Dessert Wine", image: "5.jpeg" },
        { name: "Table Wine", image: "6.jpeg" },
        { name: "Fruit Wine", image: "7.jpeg" },
        { name: "Ice Wine", image: "8.jpeg" },
        { name: "Dry Wine", image: "9.jpeg" },
        { name: "Organic Wine", image: "10.jpeg" }
    ],
    "Spirits": [
        { name: "Gin", image: "11.jpeg" },
        { name: "Rum", image: "12.jpeg" },
        { name: "Brandy", image: "13.jpeg" },
        { name: "Absinthe", image: "14.jpeg" },
        { name: "Mezcal", image: "15.jpeg" },
        { name: "Pisco", image: "16.jpeg" },
        { name: "Cachaca", image: "17.jpeg" },
        { name: "Schnapps", image: "18.jpeg" },
        { name: "Soju", image: "19.jpeg" },
        { name: "Grappa", image: "20.jpeg" }
    ],
    "Tequila": [
        { name: "Blanco", image: "21.jpeg" },
        { name: "Reposado", image: "22.jpeg" },
        { name: "Anejo", image: "23.jpeg" },
        { name: "Extra Anejo", image: "24.jpeg" },
        { name: "Cristalino", image: "25.jpeg" },
        { name: "Gold Tequila", image: "26.jpeg" },
        { name: "Silver Tequila", image: "27.jpeg" },
        { name: "Agave Tequila", image: "28.jpeg" },
        { name: "Mixto Tequila", image: "29.jpeg" },
        { name: "Reserva Tequila", image: "30.jpeg" }
    ],
    "Soft Drinks": [
        { name: "Coca-Cola", image: "31.jpeg" },
        { name: "Pepsi", image: "32.jpeg" },
        { name: "Sprite", image: "33.jpeg" },
        { name: "Fanta", image: "34.jpeg" },
        { name: "Mountain Dew", image: "35.jpeg" },
        { name: "Ginger Ale", image: "36.jpeg" },
        { name: "Root Beer", image: "37.jpeg" },
        { name: "Tonic Water", image: "38.jpeg" },
        { name: "Club Soda", image: "39.jpeg" },
        { name: "Lemonade", image: "40.jpeg" }
    ],
    "Vodka": [
        { name: "Classic Vodka", image: "51.jpeg" },
        { name: "Flavored Vodka", image: "52.jpeg" },
        { name: "Premium Vodka", image: "53.jpeg" },
        { name: "Wheat Vodka", image: "54.jpeg" },
        { name: "Potato Vodka", image: "55.jpeg" },
        { name: "Corn Vodka", image: "56.jpeg" },
        { name: "Grape Vodka", image: "57.jpeg" },
        { name: "Rye Vodka", image: "58.jpeg" },
        { name: "Organic Vodka", image: "59.jpeg" },
        { name: "Crystal Vodka", image: "60.jpeg" }
    ],
    "Brandy": [
        { name: "Cognac", image: "61.jpeg" },
        { name: "Armagnac", image: "62.jpeg" },
        { name: "American Brandy", image: "63.jpeg" },
        { name: "Spanish Brandy", image: "64.jpeg" },
        { name: "Fruit Brandy", image: "65.jpeg" },
        { name: "Grape Brandy", image: "66.jpeg" },
        { name: "Aged Brandy", image: "67.jpeg" },
        { name: "Fine Brandy", image: "68.jpeg" },
        { name: "XO Brandy", image: "69.jpeg" },
        { name: "VSOP Brandy", image: "70.jpeg" }
    ],
    "Whiskey": [
        { name: "Scotch Whisky", image: "71.jpeg" },
        { name: "Irish Whiskey", image: "72.jpeg" },
        { name: "Bourbon", image: "73.jpeg" },
        { name: "Rye Whiskey", image: "74.jpeg" },
        { name: "Japanese Whisky", image: "75.jpeg" },
        { name: "Single Malt", image: "76.jpeg" },
        { name: "Blended Whiskey", image: "77.jpeg" },
        { name: "Tennessee Whiskey", image: "78.jpeg" },
        { name: "Corn Whiskey", image: "79.jpeg" },
        { name: "Canadian Whisky", image: "80.jpeg" }
    ]
};

let stock = {};
let price = 250;
let ratings = {};
let customers = [];
let currentCustomer = null;
let customerPurchases = [];
let cart = [];
let adminActivityLog = [];

// Initialize stock and ratings
for (let category in products) {
    stock[category] = {};
    ratings[category] = {};
    products[category].forEach(product => {
        stock[category][product.name] = { quantity: 40, price: price };
        ratings[category][product.name] = { totalStars: 0, totalRatings: 0 };
    });
}

// ----------------------- DOM Elements -----------------------
const loginPage = document.getElementById('loginPage');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const registerSection = document.getElementById('registerSection');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const viewCartBtn = document.getElementById('viewCartBtn');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

const categories = document.querySelectorAll('.category');
const productsSection = document.getElementById('products');
const productList = document.querySelector('.product-list');
const productTitle = document.getElementById('product-title');
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const adminPass = document.getElementById('adminPass');
const loginAdmin = document.getElementById('loginAdmin');
const adminPanel = document.getElementById('adminPanel');
const stockList = document.getElementById('stockList');
const backBtn = document.getElementById('backBtn');
const logoutAdmin = document.getElementById('logoutAdmin');
const addProductForm = document.getElementById('addProductForm');
const newProductImage = document.getElementById('newProductImage');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const customerList = document.getElementById('customerList');
const purchaseList = document.getElementById('purchaseList');
const customerPurchaseInfo = document.getElementById('customerPurchaseInfo');
const activityLogList = document.getElementById('activityLogList');

// ----------------------- Event Listeners -----------------------

// Image preview functionality
newProductImage.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            imagePreview.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.classList.add('hidden');
    }
});

// Show registration form
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerSection.classList.remove('hidden');
});

// Show login form
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Handle Registration Form Submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;

    if (customers.some(customer => customer.email === email)) {
        alert("Email already registered. Please login.");
        return;
    }

    customers.push({ email, phone, password, purchases: [] });
    alert("Registration successful! Please login.");
    registerSection.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Handle Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = customers.find(customer => customer.email === username && customer.password === password);

    if (user) {
        currentCustomer = user;
        loginPage.classList.add('hidden');
        mainApp.classList.remove('hidden');
        loginError.classList.add('hidden');
        welcomeMessage.textContent = `Welcome, ${user.email}!`;
    } else {
        loginError.classList.remove('hidden');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    currentCustomer = null;
    cart = [];
    mainApp.classList.add('hidden');
    loginPage.classList.remove('hidden');
    loginForm.reset();
});

// Open Admin Login Modal
adminBtn.addEventListener('click', () => {
    adminModal.classList.remove('hidden');
});

// Close Admin Login Modal
document.querySelector('#adminModal .close').addEventListener('click', () => {
    adminModal.classList.add('hidden');
});

// Admin Login Validation
loginAdmin.addEventListener('click', () => {
    if (adminPass.value === "admin123") {
        adminModal.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        updateAdminPanel();
    } else {
        alert("Wrong password! Access Denied.");
    }
});

// Admin Logout
logoutAdmin.addEventListener('click', () => {
    adminPanel.classList.add('hidden');
    adminPass.value = "";
});

// Handle Add New Product Form Submission
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const category = document.getElementById('newProductCategory').value;
    const name = document.getElementById('newProductName').value;
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const quantity = parseInt(document.getElementById('newProductQuantity').value);
    const imageFile = document.getElementById('newProductImage').files[0];
    
    if (products[category].some(p => p.name === name)) {
        alert("Product already exists in this category!");
        return;
    }
    
    // Generate a unique filename
    const fileName = `product_${Date.now()}_${imageFile.name}`;
    const imageUrl = URL.createObjectURL(imageFile);
    
    // Add the new product
    products[category].push({ name, image: imageUrl });
    stock[category][name] = { quantity, price };
    ratings[category][name] = { totalStars: 0, totalRatings: 0 };
    
    // Log the activity
    adminActivityLog.push({
        action: "Product Added",
        details: `${name} added to ${category} category (${quantity} @ Ksh ${price})`,
        timestamp: new Date().toLocaleString()
    });
    
    alert(`${name} added to ${category} category successfully!`);
    addProductForm.reset();
    imagePreview.classList.add('hidden');
    updateAdminPanel();
    
    if (productTitle.textContent === category) {
        updateProductDisplay(category);
    }
});

// Handle Category Selection
categories.forEach(btn => {
    btn.addEventListener('click', () => {
        let category = btn.dataset.category;
        productTitle.innerText = category;
        updateProductDisplay(category);
        productsSection.classList.remove('hidden');
        document.getElementById('categories').classList.add('hidden');
    });
});

// Add to Cart Function
function addToCart(category, productName, price) {
    const product = products[category].find(p => p.name === productName);
    const quantity = stock[category][productName].quantity;
    
    if (quantity <= 0) {
        alert(`Sorry, ${productName} is out of stock and cannot be added to cart!`);
        return;
    }
    
    const item = { category, product: product.name, price, image: product.image };
    cart.push(item);
    alert(`${product.name} added to cart!`);
}

// View Cart Functionality
viewCartBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById('cartModal').classList.remove('hidden');
    updateCartModal();
});

// Function to update the cart modal
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.product} - Ksh ${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = `Total: Ksh ${total}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartModal();
}

// Proceed to Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Check stock before checkout
    for (const item of cart) {
        if (stock[item.category][item.product].quantity <= 0) {
            alert(`Sorry, ${item.product} is out of stock and cannot be purchased!`);
            return;
        }
    }

    buyNow();
    document.getElementById('cartModal').classList.add('hidden');
});

// Close Cart Modal
document.querySelector('#cartModal .close').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('hidden');
});

// Buy Now Function
function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you, ${currentCustomer.email}! Your total is Ksh ${total}.`);

    cart.forEach(item => {
        stock[item.category][item.product].quantity -= 1;

        // Check if stock reached 0 after purchase
        if (stock[item.category][item.product].quantity === 0) {
            adminActivityLog.push({
                action: "Stock Alert",
                details: `${item.product} stock has reached 0`,
                timestamp: new Date().toLocaleString()
            });
        }

        const purchase = {
            product: item.product,
            category: item.category,
            price: item.price,
            date: new Date().toLocaleString()
        };

        // Add to customer's purchases
        currentCustomer.purchases.push(purchase);

        // Add to global purchase history
        customerPurchases.push({
            customer: currentCustomer.email,
            ...purchase
        });
    });

    cart = [];
    updateProductDisplay(productTitle.innerText);

    if (adminPanel.classList.contains('hidden') === false) {
        updateAdminPanel();
    }
}

// Rate Drink Function
function rateDrink(category, drink, stars) {
    ratings[category][drink].totalStars += stars;
    ratings[category][drink].totalRatings++;
    alert(`You rated ${drink} with ${stars} stars!`);
    updateStockView();
}

// Remove Product Function
function removeProduct(category, productName) {
    if (confirm(`Are you sure you want to remove ${productName} from ${category}?`)) {
        // Remove from products
        products[category] = products[category].filter(p => p.name !== productName);
        
        // Remove from stock
        delete stock[category][productName];
        
        // Remove from ratings
        delete ratings[category][productName];
        
        // Log the activity
        adminActivityLog.push({
            action: "Product Removed",
            details: `${productName} removed from ${category} category`,
            timestamp: new Date().toLocaleString()
        });
        
        alert(`${productName} removed from ${category} successfully!`);
        updateAdminPanel();
        
        if (productTitle.textContent === category) {
            updateProductDisplay(category);
        }
    }
}

// Update Stock View in Admin Panel
function updateStockView() {
    const stockList = document.getElementById('stockList');
    stockList.innerHTML = "";

    for (let category in stock) {
        for (let drink in stock[category]) {
            const quantity = stock[category][drink].quantity;
            const price = stock[category][drink].price;
            const avgRating = ratings[category][drink].totalRatings > 0 ?
                (ratings[category][drink].totalStars / ratings[category][drink].totalRatings).toFixed(1) : "No Ratings";

            // Check for low stock and alert admin
            if (quantity === 0 && !adminPanel.classList.contains('hidden')) {
                alert(`ALERT: ${drink} in ${category} is out of stock!`);
            }

            stockList.innerHTML += `
                <tr>
                    <td>${category}</td>
                    <td>${drink}</td>
                    <td class="${quantity === 0 ? 'out-of-stock' : ''}">${quantity}</td>
                    <td>${price}</td>
                    <td>${avgRating}⭐</td>
                    <td>
                        <input type="number" id="increase-${drink}" placeholder="Add Stock">
                        <button onclick="increaseStock('${category}', '${drink}')">Increase</button>
                        <input type="number" id="price-${drink}" placeholder="New Price">
                        <button onclick="modifyPrice('${category}', '${drink}')">Update Price</button>
                        <button onclick="removeProduct('${category}', '${drink}')" class="remove-btn">Remove</button>
                    </td>
                </tr>`;
        }
    }
}

// View Customer List in Admin Panel
function viewCustomerList() {
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = "";

    if (customers.length === 0) {
        customerList.innerHTML = `<tr><td colspan="5">No customers registered yet.</td></tr>`;
    } else {
        customers.forEach(customer => {
            const totalPurchases = customer.purchases.length;
            const totalSpent = customer.purchases.reduce((sum, purchase) => sum + purchase.price, 0);
            
            customerList.innerHTML += `
                <tr>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${totalPurchases}</td>
                    <td>Ksh ${totalSpent}</td>
                    <td><button onclick="viewCustomerPurchases('${customer.email}')">View Purchases</button></td>
                </tr>`;
        });
    }
}

// View Customer Purchases
function viewCustomerPurchases(email) {
    const customer = customers.find(c => c.email === email);
    const purchaseList = document.getElementById('purchaseList');
    
    customerPurchaseInfo.innerHTML = `
        <h4>Purchase History for: ${email}</h4>
        <p>Total Purchases: ${customer.purchases.length}</p>
        <p>Total Spent: Ksh ${customer.purchases.reduce((sum, purchase) => sum + purchase.price, 0)}</p>
    `;
    
    purchaseList.innerHTML = "";

    if (customer.purchases.length === 0) {
        purchaseList.innerHTML = `<tr><td colspan="4">No purchases recorded yet.</td></tr>`;
    } else {
        customer.purchases.forEach(purchase => {
            purchaseList.innerHTML += `
                <tr>
                    <td>${purchase.product}</td>
                    <td>${purchase.category}</td>
                    <td>${purchase.price}</td>
                    <td>${purchase.date}</td>
                </tr>`;
        });
    }
}

// View Admin Activity Log
function viewAdminActivityLog() {
    const activityLogList = document.getElementById('activityLogList');
    activityLogList.innerHTML = "";

    if (adminActivityLog.length === 0) {
        activityLogList.innerHTML = `<tr><td colspan="3">No admin activity recorded yet.</td></tr>`;
    } else {
        adminActivityLog.forEach(log => {
            activityLogList.innerHTML += `
                <tr>
                    <td>${log.action}</td>
                    <td>${log.details}</td>
                    <td>${log.timestamp}</td>
                </tr>`;
        });
    }
}

// Increase Stock Function
function increaseStock(category, drink) {
    let increaseAmount = parseInt(document.getElementById(`increase-${drink}`).value);
    if (!isNaN(increaseAmount)) {
        const oldQuantity = stock[category][drink].quantity;
        stock[category][drink].quantity += increaseAmount;
        const newQuantity = stock[category][drink].quantity;

        adminActivityLog.push({
            action: "Stock Increased",
            details: `${drink} stock increased from ${oldQuantity} to ${newQuantity}`,
            timestamp: new Date().toLocaleString()
        });

        alert(`${increaseAmount} units added to ${drink}`);
        updateStockView();
        updateProductDisplay(category);
        updateAdminPanel();
    } else {
        alert("Please enter a valid number.");
    }
}

// Modify Price Function
function modifyPrice(category, drink) {
    let newPrice = parseFloat(document.getElementById(`price-${drink}`).value);
    if (!isNaN(newPrice)) {
        const oldPrice = stock[category][drink].price;
        stock[category][drink].price = newPrice;

        adminActivityLog.push({
            action: "Price Updated",
            details: `${drink} price changed from Ksh ${oldPrice} to Ksh ${newPrice}`,
            timestamp: new Date().toLocaleString()
        });

        alert(`Price for ${drink} updated to Ksh ${newPrice}`);
        updateStockView();
        updateProductDisplay(category);
        updateAdminPanel();
    } else {
        alert("Please enter a valid price.");
    }
}

// Update Product Display for Customers
function updateProductDisplay(category, filteredProducts = products[category]) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const quantity = stock[category][product.name].quantity;
        const price = stock[category][product.name].price;
        const outOfStock = quantity <= 0;
        
        productList.innerHTML += `
            <div class="product" data-category="${category}">
                <img src="${product.image}" alt="${product.name}" class="product-image ${outOfStock ? 'out-of-stock-img' : ''}">
                <p>${product.name} - <strong>Ksh ${price}</strong> (${quantity} left)</p>
                <button onclick="${outOfStock ? 'alert(\'This product is out of stock!\')' : `addToCart('${category}', '${product.name}', ${price})`}" 
                    ${outOfStock ? 'disabled style="background-color: #ccc; cursor: not-allowed;"' : ''}>
                    ${outOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <div class="rating" id="rating-${category}-${product.name.replace(/\s+/g, '-')}">
                    ${[1, 2, 3, 4].map(star => `
                        <span class="star" onclick="rateDrink('${category}', '${product.name}', ${star})">&#9733;</span>
                    `).join('')}
                </div>
            </div>`;
    });
}

// Filter Products Function
function filterProducts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const priceFilter = document.getElementById('filterByPrice').value;
    const category = productTitle.innerText;
    let filteredProducts = products[category];

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );
    }

    if (priceFilter === "lowToHigh") {
        filteredProducts.sort((a, b) => stock[category][a.name].price - stock[category][b.name].price);
    } else if (priceFilter === "highToLow") {
        filteredProducts.sort((a, b) => stock[category][b.name].price - stock[category][a.name].price);
    }

    updateProductDisplay(category, filteredProducts);
}

// Update Admin Panel Function
function updateAdminPanel() {
    updateStockView();
    viewCustomerList();
    viewAdminActivityLog();
}

// Back Button to Return to Categories
backBtn.addEventListener('click', () => {
    productsSection.classList.add('hidden');
    document.getElementById('categories').classList.remove('hidden');
});