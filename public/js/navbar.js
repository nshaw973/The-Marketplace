const categories = [
  'Smartphones',
  'Laptops',
  'Fragrances',
  'Skincare',
  'Groceries',
  'Home-decoration',
  'Furniture',
  'Tops',
  'Womens-dresses',
  'Womens-shoes',
  'Mens-shirts',
  'Mens-shoes',
  'Mens-watches',
  'Womens-watches',
  'Womens-bags',
  'Womens-jewellery',
  'Sunglasses',
  'Automotive',
  'Motorcycle',
  'Lighting',
];
const categoryList = $('#category-list');

for (let i = 0; i < categories.length; i++) {
  const category = categories[i];
  const categoryListItem = $(
    `<li><a class = "w-fit text-xs md:text-2xl scroll-smooth">${category}</a></li>`
  );
  categoryList.append(categoryListItem);
  categoryListItem.on('click', (event) => {
    event.preventDefault();
    console.log('Category button clicked!');
    var text = categoryListItem.text().toLowerCase();
    var myParams = {
      term: 'all',
      category: text,
    };
    redirect(myParams);
  });
}

const searchForm = $('#search-input');
const searchButton = $('#search-button');

searchButton.on('click', (event) => {
  event.preventDefault();
  console.log('Button clicked!');
  var searchTerm = searchForm.val().trim().toLowerCase();
  if (searchTerm === '') {
    console.log(`Search term empty`);
    var myParams = {
      term: 'all',
      category: 'all',
    };
    redirect(myParams);
  } else if (searchTerm !== '') {
    console.log(`search term not empty`);
    var myParams = {
      term: searchTerm,
      category: 'all',
    };
    redirect(myParams);
  }
});

async function redirect(myParams) {
  // Convert the parameter object into a query string
  var paramString = $.param(myParams);
  // Navigate to the new URL with the query string appended
  // window.location.href = 'https://group-3-marketplace.herokuapp.com/api/search?' + paramString;
  window.location.href = '/api/search?' + paramString;
}
