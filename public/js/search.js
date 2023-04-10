
const searchForm = $("#search-input");
const searchButton = $("#search-button");

console.log("search script")

searchButton.on('click',() => {
    console.log('Button clicked!');
    var searchTerm = searchForm.val().trim().toLowerCase();
    var myParams = { term: searchTerm}; 
    redirect(myParams); 
})

async function redirect(myParams){
    // Convert the parameter object into a query string
    var paramString = $.param(myParams);
    // Navigate to the new URL with the query string appended
    window.location.href = 'http://localhost:3001/api/search?' + paramString;
}

