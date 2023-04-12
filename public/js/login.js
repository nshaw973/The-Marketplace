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
    document.location.replace('/account');
  } else {
    alert('Failed to login');
  }
};

//Event listeners

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
