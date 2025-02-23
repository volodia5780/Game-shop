const products = [
    { id: 1, name: "GTA UKRAINE", category: ["action", "racing"], price: 500, image: "https://ukraine-gta.com.ua/images/main-img/logo.png" },
    { id: 2, name: "Need for Speed: Most Wanted", category: ["racing"], price: 400, image: "https://kuli.com.ua/images/thumbs/001/0010569_need-for-speed-most-wanted.jpeg" },
    { id: 3, name: "World Of Tanks", category: ["strategy"], price: 600, image: "https://worldoftanks.eu/static/6.3.2_ee8aab/wotp_static/img/download_game/frontend/scss/img/sharing.jpg" },
    { id: 4, name: "World Of Warships", category: ["action"], price: 550, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShJ4VcFSbHHIMQ2iBTmqj-oEFIupBCWTpq2A&s" },
    { id: 5, name: "War Thunder", category: ["strategy", "action"], price: 450, image: "https://warthunder.com/i/opengraph-wt.jpg" },
    { id: 6, name: "Fortnite", category: ["action", "battle royale"], price: 700, image: "https://cdn1.epicgames.com/offer/fn/EN_BXECO_33-00_Shooter_EGS_Launcher_Blade_2560x1440_2560x1440-36e1ff15dc00cd506986a2565764bbd3" },
    { id: 7, name: "Minecraft", category: ["sandbox", "survival"], price: 350, image: "https://upload.wikimedia.org/wikipedia/uk/thumb/4/48/Minecraft_logo.png/1200px-Minecraft_logo.png" },
    { id: 8, name: "The Witcher 3", category: ["rpg", "action"], price: 1200, image: "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/qezXTVn1ExqBjVjR5Ipm97IK.png" },
    { id: 9, name: "Apex Legends", category: ["battle royale", "action"], price: 750, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEIj_yYf5SyK79zaIDSgLi38OPTyR1l47-pw&s" },
    { id: 10, name: "Cyberpunk 2077", category: ["rpg", "action"], price: 1500, image: "https://store-images.s-microsoft.com/image/apps.47379.63407868131364914.bcaa868c-407e-42c2-baeb-48a3c9f29b54.89bb995b-b066-4a53-9fe4-0260ce07e894" },
    { id: 11, name: "Call of Duty: Warzone", category: ["first-person shooter", "battle royale"], price: 950, image: "https://image.api.playstation.com/vulcan/ap/rnd/202312/0123/978efa66c9645e4692ac7036a31aa002a49d0efb4b88b45c.png" },
    { id: 12, name: "Rocket League", category: ["sports", "action"], price: 800, image: "https://www.rocketleague.com/images/keyart/rl_evergreen.jpg" },
];

let cart = [];


function renderProducts(filteredProducts) {
    const container = document.querySelector('.game-container');
    container.innerHTML = "";
    filteredProducts.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('game');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category.join(", ")}</p>
            <p><b>${product.price} UAH</b></p>
            <button class="buy-button" onclick="addToCart(${product.id})">Додати в кошик</button>
        `;
        container.appendChild(div);
    });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    renderCart();
}


function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - ${item.price} UAH`;
        cartItems.appendChild(itemDiv);
        total += item.price;
    });
    totalPrice.innerText = total;
}


function showOrderPopup() {
    const popup = document.getElementById('order-popup');
    const orderMessage = document.getElementById('order-message');
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    orderMessage.textContent = `Дякуємо за замовлення на суму ${total} UAH!`;
    popup.style.display = 'flex';
    cart = [];
    renderCart();
}


document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('order-popup').style.display = 'none';
});


document.getElementById('checkout-btn').addEventListener('click', showOrderPopup);


function renderCategories() {
    const categoriesContainer = document.querySelector('.categories');
    const allCategories = ["all", "action", "racing", "strategy", "battle royale", "rpg", "first-person shooter", "sports", "sandbox", "survival"];
    
    allCategories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('category-btn');
        button.id = category;
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        button.addEventListener('click', () => {
            if (category === "all") {
                renderProducts(products);
            } else {
                renderProducts(products.filter(p => p.category.includes(category)));
            }
        });
        categoriesContainer.appendChild(button);
    });
}

document.querySelector('.search-games').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(query)));
});


renderCategories();
renderProducts(products);
