const signupFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      name: username,
      email,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    //when signed up, user will be directed to cart
    //Possibly directed to homepage, since cart will be empty for new users
    document.location.replace('/');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
