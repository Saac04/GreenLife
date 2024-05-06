window.onload = function() {
    var emailInput = document.querySelector('input[type="email"]');
    var passwordInput = document.querySelector('input[type="password"]');
    
    emailInput.onfocus = function() { //dispara el foco en el emailInput
        this.placeholder = ''; //cuando está en emailInput, se borra el texto escrito 
    }
    
    passwordInput.onfocus = function() {
        this.placeholder = '';
    }
} //hola

