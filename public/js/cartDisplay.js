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



console.log("cartDisplay script");

const searchForm = $("#search-input");
const searchButton = $("#search-button");

searchButton.on('click',() => {
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
    window.location.href = 'http://localhost:3001/api/search?' + paramString;
}

