import { api } from "./api.js"

const products_div = document.getElementById("products");

let local_products = []

load.addEventListener("click", loadProducts)
edit.addEventListener("click", edit_product)
update.addEventListener("click", update_product)
delette.addEventListener("click", delete_product)


let id = document.getElementById("product_id").value;
let name = document.getElementById("product_name").value;
let description = document.getElementById("product_description").value;
let price = document.getElementById("product_price").value;
let stock = document.getElementById("product_stock").value;
let category = document.getElementById("product_category").value;

let products;

function getInfo(id){
    //console.log(id)
    loadProducts(id);
    edit_product(id)
}

window.getInfo = getInfo;

async function loadProducts(product_id){
    id = document.getElementById("product_id").value;
    if (product_id > 0) {
        id = product_id
        console.log(product_id)
    }else{  
        clear_inputs()
    }
    console.log(id)
    
    if (id){
        products = await api.get_product_by_id(id);
    }else{
        products = await api.get_products();

    }
    local_products = products.map(s => ({
        id: s.id,
        sku: s.sku,
        name: s.name,
        description: s.description,
        price: s.price,
        isAvailable: s.isAvailable ? "In Stock" : "Out Of Stock",
        categoryId: s.categoryId
    }));
    display_products();


}



function display_products(){
    products_div.innerHTML = local_products.map(({id, sku, name, description, price, isAvailable, categoryId}) => `
        <div class = "card" onclick = "getInfo(${id})">
            <h3>${id}. ${name}</h3>
            <strong>SKU:</strong> ${sku}<br>
            ${description ? description : "No Description"}<br>
            <strong>Price: </strong>$${price}<br>
            <strong>${isAvailable ? "In Stock" : "Out Of Stock"}</strong><br>
            <strong>Category</strong>${categoryId}
            
        </div>
    `).join("")
}

async function edit_product(id){
    await loadProducts(id)
    console.log(local_products[0].id)  
    document.getElementById("product_name").value = local_products[0].name
    document.getElementById("product_description").value = local_products[0].description
    document.getElementById("product_price").value = local_products[0].price
    document.getElementById("product_stock").value = local_products[0].isAvailable
    document.getElementById("product_category").value = local_products[0].categoryId
    //loadProducts()
}

async function update_product(){
    console.log(local_products[0])  
    let desc = ""
    if (document.getElementById("product_description").value) {
        desc = document.getElementById("product_description").value
    }else{
        desc = "No Description"
    }
    const updatedProduct = {
        "id": local_products[0].id,
        "sku": local_products[0].sku,
        "name": document.getElementById("product_name").value,
        "description": desc,
        "price": parseFloat(document.getElementById("product_price").value),
        "isAvailable": true,
        "categoryId": parseInt(document.getElementById("product_category").value),
    };
    console.log("Sending product:", updatedProduct);
    await api.modify_product(local_products[0].id, updatedProduct)
    loadProducts()
}

async function delete_product(){
    await api.delete_product(id)
    clear_inputs()
    loadProducts()
}

function clear_inputs(){
    document.getElementById("product_id").value = ""
    document.getElementById("product_name").value = ""
    document.getElementById("product_description").value = ""
    document.getElementById("product_price").value = ""
    document.getElementById("product_stock").value = ""
    document.getElementById("product_category").value = ""

}

loadProducts();