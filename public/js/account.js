
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
