let checkout = document.getElementById("checkout");
let checdiv = document.getElementById("chec-div");
let flag3 = false;
let cartItemsContainer=document.querySelectorAll('.cartItemsContainer');
let subTotal = document.querySelector('.subTotal');
// let select = document.querySelectorAll('.quantitySelect');
// let cartPrices = document.querySelectorAll('.cartPriceLike');
// const quantityUpdate = ()=>{
//     for(let i=0;i<select.length;i++){
//         var options = select[i].querySelectorAll('option');
//         var cartPrice = cartPrices[i];
       
//         select[i].addEventListener('click',()=>{
           
//                 const selectedOption = options[select[i].selectedIndex];
//                 const currentValue = selectedOption.value;
//                 if(currentValue==2){
//                     var newprice = parseFloat(cartPrice.innerText.replace('$',''));
//                     const double = newprice*2;
//                     cartPrices[i].innerHTML = `$${double}`;
//                     console.log(cartPrice.innerText);
                
//                 }else if(currentValue==3){
//                     var newprice = parseFloat(cartPrice.innerText.replace('$',''));
//                     const triple = newprice*3;
//                     cartPrices[i].innerHTML = `$${triple}`;
//                     console.log(cartPrice.innerText);
//                 }else{
//                     cartPrices[i].innerHTML= cartPrice.innerText;
//                 }

             
                  
            
           
       
//         })
       
//     }
// }
let stripeHandler = StripeCheckout.configure({
    key:"pk_test_51MtMgCFsxalzdvcduDxKPgBw2UEJsP3wscuq4tYhrIIutomjwtV80ZtbTmfPvCCULH3iQ9UUOLdpB2AWlFqX05E600c5YTZaCv",
    local: 'en',
    token: function(token){
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
    $(document).on("click", ".cart-remove",  async function(e){
        e.preventDefault();
        let id = $(this).attr("data-id");

       
       try {
         await fetch(`/carts/${id}`, {

            method: 'DELETE'
          });
          console.log("hello");
          document.location.replace("/carts");
       
       } catch (error) {
        console.error(error);
       }
    })
}

const payment = ()=>{
  stripeHandler.open({
    amount:price*100,
  })
for(let i=0;i<cartItemsContainer.length;i++){
    cartItem = cartItemsContainer[i];
}
  
}

removeItem();




console.log("cartDisplay script");

const searchForm = $("#search-input");
const searchButton = $("#search-button");

searchButton.on('click',(event) => {
    event.preventDefault();
    console.log('Button clicked!');
    var searchTerm = searchForm.val().trim().toLowerCase();
    if(searchTerm === ''){
        var myParams = { term: 'all'}; 
        redirect(myParams); 
    } else if( searchTerm !== '') {
        var myParams = { term: searchTerm}; 
        redirect(myParams); 
    };
});

async function redirect(myParams){
    // Convert the parameter object into a query string
    var paramString = $.param(myParams);
    // Navigate to the new URL with the query string appended
    window.location.href = '/api/search?' + paramString;
}


