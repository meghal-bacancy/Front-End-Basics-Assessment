const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = '..\\dashboard\\dashboard.html';
}

email.addEventListener('input', function () {
    validateEmail();
});

password.addEventListener('input', function () {
    validatePassword();
});

function login()
{
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    validateEmail();
    validatePassword();

    const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const user = storedUsers.find(
        (u) => u.email === emailValue && u.password === passwordValue
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

function validateEmail(){
    if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
}

function validatePassword(){
    if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        return;
    } else {
        passwordError.textContent = '';
    }
}