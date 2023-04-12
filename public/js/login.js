
const searchForm = $("#search-input");
const searchButton = $("#search-button");

async function redirect(myParams){
    // Convert the parameter object into a query string
    var paramString = $.param(myParams);
    // Navigate to the new URL with the query string appended
    window.location.href = 'http://localhost:3001/api/search?' + paramString;
};
  
const loginFormHandler = async function(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login');
  const password = document.querySelector('#password-login');

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    //when logged in, user will be directed to their cart
    document.location.replace('/carts');
  } else {
    alert('Failed to login');
  }
};

//Event listeners

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

searchButton.on('click',() => {
    var searchTerm = searchForm.val().trim().toLowerCase();
    if(searchTerm === ''){
        var myParams = { term: 'all'}; 
        redirect(myParams); 
    } else if( searchTerm !== '') {
        var myParams = { term: searchTerm}; 
        redirect(myParams); 
    };
});
