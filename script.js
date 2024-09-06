document.querySelector('#registerButton').addEventListener('click', function(event) {
    event.preventDefault();

    const userData = {
        name: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    };

    console.log('Sending data:', userData);

    fetch('http://localhost:8080/regist/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        console.log('Response Status:', response.status);
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
            alert("Registration failed: " + data.error);
        } else {
            console.log('Success:', data.message, data.userId);
        }
    })
    .catch((error) => {
        console.error('Fetch Error:', error);
    });
});
