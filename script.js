//Variaveis globais
const Cart = [];
var qnt = 0;
var totalSum = 0;
var listItems = [];

//Adição de itens no carrinho
function addCart(element) {
    totalSum = 0;
    document.getElementById('Items').innerHTML = "";
    document.getElementById('Prices').innerHTML = "";

    if (window.getComputedStyle(element).borderColor == 'rgb(211, 211, 211)') {
        element.style.borderColor = 'green';
        Cart.push({ 
            name: element.querySelector("h3").textContent,
            price: parseFloat(element.querySelector(".price").textContent),
            quant: 1
        });
        console.log(Cart);

    } else {
        element.style.borderColor = 'rgb(211, 211, 211)';
        let index = Cart.findIndex(Cart => Cart.name == element.querySelector("h3").textContent);
        console.log(index);
        Cart.splice(index, 1);
        console.log(Cart);
    }

    for (i = 0; i<Cart.length; i++) {
        totalSum += Cart[i].price;
        console.log(totalSum);
    }

   insertItemsInCart();
}

//Tudo relacionado ao carrinho
function insertItemsInCart() {
    const EndOrder = document.getElementById("finishOrder");
    console.log(EndOrder.textContent);
    
    for (i = 0; i < Cart.length; i++) {
        var ItemNames = document.createElement("p");
        ItemNames.innerHTML = Cart[i].name;
        document.getElementById("Items").appendChild(ItemNames);

        var ItemPrices = document.createElement('p');
        ItemPrices.innerHTML = "R$ "+ Cart[i].price.toFixed(2);
        document.getElementById("Prices").appendChild(ItemPrices);
    }
    
    if(totalSum == 0) {
        var ItemNames = document.createElement("p");
        ItemNames.innerHTML = "Seu carrinho está vazio";
        document.getElementById("Items").appendChild(ItemNames);
        EndOrder.style.display = "none";
    } else {
        EndOrder.style.display = "block";
    }

    document.getElementById('Total').innerHTML = "R$ "+ totalSum.toFixed(2);
}

function list() {
    let sendScreen = document.getElementById("FinalOrder");
    sendScreen.style.display = 'block';
    let orderList = document.getElementById("list");
    

    for (i = 0; i<Cart.length; i++) {
        let item = Cart[i].quant + " " + Cart[i].name + ".......R$ " + Cart[i].price.toFixed(2);
        listItems.push(item);
        const newItem = document.createElement("p");
        newItem.textContent = listItems[i];
        sendScreen.appendChild(newItem);
    }

    return listItems;
}

function sendOrder() {
    let name = document.getElementById("clientName")
    let adress = document.getElementById("clientAdress");
    const clientName = name.value;
    const clientAdress = adress.value;
    let message = "NOVO PEDIDO: Cliente: "+ clientName + " \ Endereço: " + clientAdress +" \ Items: " + listItems +"\ Total: R$" + totalSum.toFixed(2);
    
    window.open("https://whatsa.me/5585988888888/?t="+ message);
}