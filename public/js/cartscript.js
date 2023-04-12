console.log("cartscript")

const addButton = document.querySelectorAll('.addToCartButton');
for(let i=0;i<addButton.length;i++){
    let specificButton = addButton[i];
    specificButton.addEventListener('click',()=>{
        const id = specificButton.dataset.id;
        const response = fetch('/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:id})
        }).then(function(res){
            return res.json();
        }).catch(function(error){
            console.error(error);
        })
        
    })
}
