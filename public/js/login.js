const loginFormHandler = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};
  
const signupFormHandler = async (event) => {
    event.preventDefault();
    
const username = document.querySelector('#username-signup').value.trim();
const email = document.querySelector('#email-signup').value.trim();
const password = document.querySelector('#password-signup').value.trim();
    
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
<<<<<<< HEAD
  
=======
    
>>>>>>> ad5bddb0941e5d121e8f69ba31c58f58f67dad60
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
<<<<<<< HEAD
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
=======
};
    
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
    
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
>>>>>>> ad5bddb0941e5d121e8f69ba31c58f58f67dad60
