let checkout = document.getElementById("checkout");
let checdiv = document.getElementById("chec-div");
let flag3 = false;
let cartItemsContainer=document.querySelectorAll('.cartItemsContainer');
let stripeHandler = StripeCheckout.configure({
    key:"pk_test_51MtMgCFsxalzdvcduDxKPgBw2UEJsP3wscuq4tYhrIIutomjwtV80ZtbTmfPvCCULH3iQ9UUOLdpB2AWlFqX05E600c5YTZaCv",
    local: 'en',
    token: function(token){
        console.log(token);
        var items = [];
        for(let i=0;i<cartItemsContainer.length;i++){
            var cartItem = cartItemsContainer[i];
            var id = cartItem.dataset.id;
            var quantity = 1;
            items.push({
                id:id,
                quantity:quantity
            })
        }
        
        fetch('/purchase',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                items: items
            })
        }).then(function(res){
            return res.json()
        }).then(function(data){
            alert(data.message);

        }).catch(function(error){
            console.error(error);
        })
    }
})
let priceElement = document.querySelector('.total_price');
let price = parseFloat(priceElement.innerText.replace('$',''));
const backtoHome = ()=>{

}
const clearCart = async()=>{
    await fetch("/carts",{
        method:"DELETE"
    })
    document.location.replace('/carts');
}
const checkoutHandler = () => {
    if (!flag3) {
        checkout.classList.add("translate-x-full");
        checkout.classList.remove("translate-x-0");
        setTimeout(function () {
            checdiv.classList.add("hidden");
        }, 1000);
        flag3 = true;
     

    } 
    else {
        setTimeout(function () {
            checkout.classList.remove("translate-x-full");
            checkout.classList.add("translate-x-0");
        }, 1000);
        checdiv.classList.remove("hidden");
        
        flag3 = false;
    }
};
const removeItem = ()=>{
    $(document).on("click", ".cart-remove", function(e){
        e.preventDefault();
        let id = $(this).attr("data-id");
        console.log(id);
        const response = fetch(`/carts/${id}`, {
            method: 'DELETE'
          });
    
          document.location.replace("/carts");
    
    })
}

const payment = ()=>{
  stripeHandler.open({
    amount:price*100,
  })
for(let i=0;i<cartItemsContainer.length;i++){
    cartItem = cartItemsContainer[i];
    console.log(cartItem.dataset.id);
}
  
}

removeItem();



console.log("cartDisplay script");


