let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector("#closeShopping");
let card = document.querySelector(".card");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let total = document.querySelector(".total span");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    card.classList.add("active");
});
closeShopping.addEventListener("click", () => {
    card.classList.remove("active");
});

let products = [{
        id: 1,
        name: "Product 1",
        image: "1.PNG",
        price: 22000,
    },
    {
        id: 2,
        name: "Product 2",
        image: "2.PNG",
        price: 25000,
    },
    {
        id: 3,
        name: "Product 3",
        image: "3.PNG",
        price: 31000,
    },
    {
        id: 4,
        name: "Product 4",
        image: "4.PNG",
        price: 34000,
    },
    {
        id: 5,
        name: "Product 5",
        image: "5.PNG",
        price: 38000,
    },
    {
        id: 6,
        name: "Product 6",
        image: "6.PNG",
        price: 41500,
    },
];

function initApp() {
    products.forEach((product, indexPro) => {
        let mainDiv = document.createElement("div");
        mainDiv.className = "item";
        mainDiv.innerHTML = `
        <img src="images/${product.image}" alt="">
        <div class="title">${product.name}</div>
        <div class="price">${product.price.toLocaleString()}</div>
        <button onclick=addToCart(${indexPro})>Add To Cart</button>
        `;
        list.appendChild(mainDiv);
    });
}
initApp();

let listCards = [];

function addToCart(index) {
    products[index].quantity = 1;
    listCards.push(products[index])
    addToLocalStorage()
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = ``;
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((productList, indexList) => {
        totalPrice += productList.price * productList.quantity;
        count += productList.quantity;
        if (productList != "") {
            let productLi = document.createElement("li");
            productLi.innerHTML = `
            <div><img src="images/${productList.image}" alt=""></div>
            <div>${productList.name}</div>
            <div>${productList.price.toLocaleString()}</div>
            <div>${productList.quantity}</div>
            <div>
                <button onclick="changeQuantity(${indexList}, ${productList.quantity - 1})">-</button>
                <div class="count">${productList.quantity}</div>
                <button onclick="changeQuantity(${indexList}, ${productList.quantity + 1})">+</button>
            </div>`;
            listCard.appendChild(productLi);
        }
    });
    total.innerText = totalPrice.toLocaleString("en-us");
    quantity.innerText = count;
}

function changeQuantity(index, quan) {
    if (quan == 0) {
        listCards.splice(index, 1)
        window.localStorage.clear()
    } else {
        listCards[index].quantity = quan;
    }
    addToLocalStorage()
    reloadCard();
}

function addToLocalStorage(){
    window.localStorage.setItem("ProductsList" , JSON.stringify(listCards))
}

if(window.localStorage.getItem("ProductsList")){
    listCards = JSON.parse(window.localStorage.getItem("ProductsList"))
    reloadCard()
}
