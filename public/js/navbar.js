console.log("navbar script");
const categories = [
                    "Smartphones",
                    "Laptops",
                    "Fragrances",
                    "Skincare",
                    "Groceries",
                    "Home-decoration",
                    "Furniture",
                    "Tops",
                    "Womens-dresses",
                    "Womens-shoes",
                    "Mens-shirts",
                    "Mens-shoes",
                    "Mens-watches",
                    "Womens-watches",
                    "Womens-bags",
                    "Womens-jewellery",
                    "Sunglasses",
                    "Automotive",
                    "Motorcycle",
                    "Lighting"
                ];
const categoryList = $("#category-list");

for( let i = 0; i < categories.length; i++){
    const category = categories[i];
    const categoryListItem = $(`<li><a class = "text-xs md:text-2xl scroll-smooth">${category}</a></li>`);
    categoryList.append(categoryListItem);
};

