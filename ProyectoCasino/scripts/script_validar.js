function validateForm() {
    var userEmail = document.getElementById('user-email').value;
    var comments = document.getElementById('comments').value;
    var errorMessage = document.getElementById('error-message');

    errorMessage.style.display = 'none';

    if (userEmail === "" || comments === "") {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Por favor, completa todos los campos.';
        return false;
    }

    alert("Formulario enviado correctamente.");
    return false; 
}

function validateLogin() {
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;
    var errorMessage = document.getElementById('error');

    // Reinicia el mensaje de error
    errorMessage.style.display = 'none';

    // Validación simple, puedes ajustar según tus necesidades
    if (userEmail === "" || userPassword === "") {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Por favor, completa todos los campos.';
        return false;
    }

    alert("Inicio de sesión exitoso.");
    return false; 
}

function resetForm() {
    document.getElementById('contact-form').reset();

    document.getElementById('error-message').style.display = 'none';
}

document.getElementById('cancelButton').addEventListener('click', resetForm);

document.getElementById('contact-form').addEventListener('submit', function(event) {
    validateForm();
    event.preventDefault();
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    validateLogin();
    event.preventDefault();
});