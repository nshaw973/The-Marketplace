const goback = document.querySelector('.goback');

goback.addEventListener('click',async ()=>{
    try {
        console.log("peanut");
        await fetch("/carts",{
            method:"DELETE",

        })
        document.location.replace('/');
    } catch (error) {
        console.error(error);
    }
})