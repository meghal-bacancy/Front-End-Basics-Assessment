const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = '..\\Dashboard\\Dashboard.html';
}

email.addEventListener('input', function () {
    if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
});

password.addEventListener('input', function () {
    if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
    } else {
        passwordError.textContent = '';
    }
});

function login()
{
    const Email = email.value.trim();
    const Password = password.value.trim();

    if (!emailPattern.test(Email)) {
        emailError.textContent = 'Please enter a valid email address.';
        return;
    } else {
        emailError.textContent = '';
    }

    if (Password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        return;
    } else {
        passwordError.textContent = '';
    }

    const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const user = storedUsers.find(
        (u) => u.email === Email && u.password === Password
    );

    if (user){
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(user));
    }
    else{
        alert("Invalid Credentials");
        return;
    }
}