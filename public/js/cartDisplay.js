let checkout = document.getElementById("checkout");
let checdiv = document.getElementById("chec-div");
let flag3 = false;
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
    const response = fetch('/create-checkout-session/',{
        method: "POST"
    });

}
removeItem();
