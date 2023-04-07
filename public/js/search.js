const data = $("#data").text();

populatePage(data);

const searchForm = $("#search-input");
const searchButton = $("#search-button");

searchButton.on('click',() => {
    console.log('Button clicked!');
    var searchTerm = searchForm.val();
    var myParams = { term: searchTerm}; 
    redirect(myParams); 
})

async function redirect(myParams){
    // Convert the parameter object into a query string
    var paramString = $.param(myParams);
    // Navigate to the new URL with the query string appended
    window.location.href = 'http://localhost:3001/search?' + paramString;
}

async function populatePage(dataStr){

    if (data){
        $("data").remove();
        const data = JSON.parse(dataStr)
        if($("#results-container").length){
            $("#results-container").remove();
        }

        const pageBody = $("body");
        const searchResultsContainer = $("<div>", {class: "flex flex-wrap", id: "results-container"});
        pageBody.append(searchResultsContainer);
    
        for (let i = 0; i<data.products.length; i++){    
            var cardContainer = $("<div>",{class: "card card-compact w-96 bg-base-100 shadow-xl"});
            var cardFigure = $("<figure>");
            var cardImg = $("<img>");
            var cardBodyContainer = $("<div>", {class: "card-body"});
            var cardTitle = $("<p>",{class: "card-title"});
            var cardDescription = $("<p>");
            var cardCategory = $("<p>", {class: "text-xl"});
            var cardButtonContainer = $("<div>", {class: "card-actions justify-end"});
            var cardButton = $("<button>", {class: "btn btn-accent"});
    
            cardTitle.text(data.products[i].title);
            cardDescription.text(data.products[i].description);
            cardImg.attr("src", data.products[i].images[2]);
            cardButton.text("ADD TO CART")
            var category = data.products[i].category.replace(/^\w/, (c) => c.toUpperCase())
            cardCategory.text(category);
    
            
            cardButtonContainer.append(cardButton);
            cardBodyContainer.append(cardTitle);
            cardBodyContainer.append(cardCategory);
            cardBodyContainer.append(cardDescription);
            cardBodyContainer.append(cardButtonContainer);
            cardFigure.append(cardImg);
    
            cardContainer.append(cardFigure);
            cardContainer.append(cardBodyContainer)
    
            searchResultsContainer.append(cardContainer);
        };
    } else {
        console.log("No data Received!");
    };
};


console.log("search script")