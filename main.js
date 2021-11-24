class Product{
    constructor(id, name, amount, cost){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.cost = cost;
        this.next=null;
        this.previous=null;
    }
    getTotal(){
        return this.amount * this.cost;
    }
    infoHTML(){
        return `| ${this.id} | ${this.name} | ${this.amount} | ${this.cost} | ${this.getTotal()} |<br>`;
    }
}
class Deposit{
    constructor(){
        this.products = null;
    }
    add(product){
        if (this.products==null) {
            this.products=product;
        } else if (this.search(product.id)==null){
            this.resetList();
            let aux = this.products;
            while (product.next==null&&product.previous==null) {
                if (product.id<aux.id) {
                    if (aux.previous==null) {
                        aux.previous=product;
                        product.next=aux;
                    }else{
                        aux.previous.next=product;
                        product.previous=aux.previous;
                        aux.previous=product;
                        product.next=aux;
                    }
                }else if (aux.next==null){
                    aux.next=product;
                    product.previous=aux;
                }
                aux=aux.next;
            }
        } else {
            return null
        } 
        console.log(this.products)
        return product;
    }

    delete(id){
        this.resetList();
        let aux = this.products;
        let deleteData = null

        if (aux.next==null) {
            if (aux.id==id) {
                deleteData=aux;
                aux=null;
                this.products=null
            }
        }else{
            while (aux!=null&&deleteData==null) {
                if (aux.id==id) {
                    deleteData=aux;
                    if (aux.previous==null) {
                        aux.next.previous=null;
                        aux=null;
                    }else if (aux.next==null) {
                        aux.previous.next=null;
                        aux=null;
                    }else{
                        aux.previous.next=aux.next;
                        aux.next.previous=aux.previous;
                        aux=null
                    }
                }else{
                    aux=aux.next;
                }
            }
        } 
        return null;
    }

    search(id){
        this.resetList();
        let aux = this.products;
        if (this.products==null) {
            return null;
        } else {
            while (aux!=null) {
                if (aux.id==id) {
                    return aux;
                }
                aux=aux.next;
            }
            return null;
        }
    }

    resetList(){
        let aux=this.products;
        while (aux.next!=null) {
            aux=aux.next;
        }
        while (aux.previous!=null) {
            aux=aux.previous;
        }
        this.products=aux;
    }

    listDefautl(){
        this.resetList();
        let list='';
        let aux=this.products;
        while (aux.previous!=null) {
            aux=aux.previous;
        }
        while (aux!=null) {
            list += aux.infoHTML() + '';
            aux=aux.next;
        }
        return list;
    }

    listReverse(){
        this.resetList();
        let list='';
        let aux=this.products;
        while (aux.next!=null) {
            aux=aux.next;
        }
        while (aux!=null) {
            list += aux.infoHTML() + '';
            aux=aux.previous;
        }
        return list;
    }
}

class Interface{
    showProduct(newData){
        let details=document.getElementById('details');
        details.innerHTML = `${newData}`;
    }
}
let deposit = new Deposit();
let ui = new Interface();
const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    let id = document.getElementById('idAdd').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let product = new Product(id, name, amount, cost);
    ui.showProduct(deposit.add(product).infoHTML());
});

const btnDelete=document.getElementById('btnDelete');
btnDelete.addEventListener('click',()=>{
    let id = document.getElementById('idDelete').value;
    ui.showProduct(deposit.delete(id).infoHTML());
});

const btnSearch=document.getElementById('btnSearch');
btnSearch.addEventListener('click',()=>{
    let id = document.getElementById('idSearch').value;
    if (deposit.search(id)==null) {
        let msg="Sin resultados"
        ui.showProduct(msg)
    }else{
        ui.showProduct(deposit.search(id).infoHTML());
    }
});

const btnDefault=document.getElementById('btnListDefault');
btnDefault.addEventListener('click',()=>{
    ui.showProduct(deposit.listDefautl());
});

const btnReverse=document.getElementById('btnListReverse');
btnReverse.addEventListener('click',()=>{
    ui.showProduct(deposit.listReverse());
});