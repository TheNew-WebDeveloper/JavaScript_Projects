let products = [
    {id : crypto.randomUUID(), name : "Apple", price : 10, image : "assets/apple.jpg"},
    {id : crypto.randomUUID(), name : "Banana", price : 20, image : "assets/bananas.jpeg"},
    {id : crypto.randomUUID(), name : "Custard Apple", price : 30, image : "assets/custard_apple.webp"},
    {id : crypto.randomUUID(), name : "Dragon Fruit", price : 20, image : "assets/dragon_fruit.png"},
    {id : crypto.randomUUID(), name : "Elderberry", price : 10, image : "assets/elderberry.webp"},
]

let list = document.querySelector("#products");
let cartList = document.querySelector("#cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let customers = JSON.parse(localStorage.getItem("customers")) || [];

window.addEventListener("load", function(event) {
    event.preventDefault();

    products.forEach(product => {
        let div = this.document.createElement("div");
        div.classList.add("product");

        div.innerHTML = `
        <img src="${product.image}" alt="">
        <h3>${product.name}</h3>
        <h5>₹${product.price}</h5>
        <button data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" class="addToCart">Add to cart</button>
        `

        list.appendChild(div);
    })
    document.querySelector("#cart-count").textContent = cart.length;
})

updateCartUI(cart);

document.querySelector("#cart-btn").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector("#cart").classList.toggle("hidden");
});

list.addEventListener("click", function(event) {
    let id = event.target.dataset.id;
    let name = event.target.dataset.name;
    let price = event.target.dataset.price;

    if(event.target.classList.contains("addToCart")) {
        addToCart(id, name, price);
    }
})

function save(data, customers) {
    localStorage.setItem("cart", JSON.stringify(data));
    localStorage.setItem("customers", JSON.stringify(customers));
}

function addToCart(id, name, price) {

    let found = cart.some(ci => ci.itemId == id);

    if(found) {
        cart = cart.map(item => {
            if(item.itemId == id) {
                let count = Number(item.quantity);
                count++;
                item.quantity = count;
            }
            return item;
        })
    } else {
        let newCart = {
            itemId : id,
            itemName : name,
            itemPrice : Number(price),
            quantity : 1
        }
        cart.push(newCart);
    }

    save(cart, customers);
    updateCartUI(cart);   
}

function updateCartUI(data) {
    cartList.innerHTML = "";
    let totalAmount = 0;

    let li = document.createElement("li");

    li.innerHTML = `
        <div><h4>Products</h4></div>
        <div><h4>Quantity</h4></div>
        <div><h4>Price</h4></div>
        <div><h4></h4></div>
    `
    cartList.appendChild(li);

    data.forEach(item => {

        let li = document.createElement("li");

        let currentItemAmount = (item.itemPrice * item.quantity);

        li.innerHTML = `
        <div><h5>${item.itemName}</h5></div>
        <div><h5>${item.quantity}</h5></div>
        <div><h5>₹${item.itemPrice * item.quantity}</h5></div>
        <button id="del-btn" class="remove" data-id="${item.itemId}">Remove</button>
        `
        cartList.appendChild(li);

        totalAmount += currentItemAmount;
    })
    
    document.querySelector("#total").textContent = totalAmount;

    let count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector("#cart-count").textContent = count;
}

cartList.addEventListener("click", function(event) {
    let id = event.target.dataset.id;
    
    cart = cart.filter(item => item.itemId != id);

    save(cart, customers);
    updateCartUI(cart);
})

function checkoutUI() {
    document.querySelector("#checkout-modal").classList.toggle("hidden");
}

document.querySelector("#checkout-btn").addEventListener("click", function(event) {
    checkoutUI();
})

document.querySelector(".close").addEventListener("click", function(event) {
    checkoutUI();
})

document.querySelector("#place-order").addEventListener("click", function(event) {
    let fullName = document.querySelector("#fullName").value.trim();
    let address = document.querySelector("#address").value.trim();
    let phone = document.querySelector("#phone").value.trim();

    if(fullName.length < 3 || address.length < 3 || (!/[0-9]{10}$/.test(phone))) {
        document.querySelector("#error").classList.remove("hidden");
        return;
    }

    let newCustomer = {
        fullname : fullName,
        address : address,
        phone : phone
    }
    
    customers.push(newCustomer);

    cart = [];
    save(cart, customers);
    updateCartUI(cart);

    fullName = "";
    address = "";
    phone = "";

    setTimeout(() => {
        window.location.href = "successPage.html";
    }, 500);
})

let inputs = document.querySelectorAll("input");
inputs.forEach(input => input.addEventListener("input", function(event) {
    document.querySelector("#error").classList.add("hidden");
}))
