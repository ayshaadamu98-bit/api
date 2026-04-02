const BASE_URL = "https://localhost:7233/api"

export const api = {
    async get_products(){
        const res = await fetch(`${BASE_URL}/Products`);
        return await res.json();
    },

    async get_product_by_id(id){
        const res = await fetch(`${BASE_URL}/Products/${id}`)
        let t = [await res.json()]
        return t;
    },
    
    async modify_product(id, product){
        const res = await fetch(`${BASE_URL}/Products/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(product)
        });
        const text = await res.text();
        console.log(text)
        let t = text ? [JSON.parse(text)] : [{ success: true }];
        return t;
    },

    async delete_product(id){
        await fetch(`${BASE_URL}/Products/${id}`, {
            method: "DELETE"
        });
        return true;
    }
}