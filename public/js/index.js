


const searchForm = $("#search-input");
const searchButton = $("#search-button");

searchButton.on('click',() => {
    console.log('Button clicked!');
    var searchTerm = searchForm.val();
    var myParams = { term: searchTerm}; 
    redirect(myParams); 
})

// const term = "shoes"

async function redirect(myParams){
    // Convert the parameter object into a query string
    var paramString = $.param(myParams);
    // Navigate to the new URL with the query string appended
    window.location.href = 'http://localhost:3001/search?' + paramString;
}

console.log("index script")


