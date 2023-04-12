const searchForm = $('#search-input');
const searchButton = $('#search-button');

searchButton.on('click', () => {
  console.log('Button clicked!');
  var searchTerm = searchForm.val().trim().toLowerCase();
  if (searchTerm === '') {
    var myParams = { term: 'all' };
    redirect(myParams);
  } else if (searchTerm !== '') {
    var myParams = { term: searchTerm };
    redirect(myParams);
  }
});

async function redirect(myParams) {
  // Convert the parameter object into a query string
  var paramString = $.param(myParams);
  // Navigate to the new URL with the query string appended
  window.location.href = 'http://localhost:3001/api/search?' + paramString;
}

// Updates User through the account page
const updateUser = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const id = document.querySelector('.logged-user').getAttribute('user-id');

  if (name) {
    const response = await fetch(`/api/account/${id}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/account');
    } else {
      alert('Unable to redirect');
    }
  }
};

const updateButton = document.querySelector('#update-user');
updateButton.addEventListener('click', updateUser);

