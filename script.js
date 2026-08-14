document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = document.getElementById('loginBtn');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const errorMessage = document.getElementById('errorMessage');
            const globalErrorText = document.getElementById('globalErrorText');
            
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const emailErrorText = document.getElementById('emailErrorText');
            const passwordErrorText = document.getElementById('passwordErrorText');
            
            const originalText = btn.innerHTML;
            
            // Reset state
            if (errorMessage) errorMessage.style.display = 'none';
            if (emailError) emailError.style.display = 'none';
            if (passwordError) passwordError.style.display = 'none';
            emailInput.classList.remove('input-error-border');
            passwordInput.classList.remove('input-error-border');
            
            let hasError = false;

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                if (emailError) {
                    emailErrorText.textContent = 'Email address is required.';
                    emailError.style.display = 'flex';
                }
                emailInput.classList.add('input-error-border');
                hasError = true;
            } else if (!emailRegex.test(email)) {
                if (emailError) {
                    emailErrorText.textContent = 'Please enter a valid email address.';
                    emailError.style.display = 'flex';
                }
                emailInput.classList.add('input-error-border');
                hasError = true;
            }

            // Password validation
            if (!password) {
                if (passwordError) {
                    passwordErrorText.textContent = 'Password is required.';
                    passwordError.style.display = 'flex';
                }
                passwordInput.classList.add('input-error-border');
                hasError = true;
            } else if (password.length < 6) {
                if (passwordError) {
                    passwordErrorText.textContent = 'Password must be at least 6 characters.';
                    passwordError.style.display = 'flex';
                }
                passwordInput.classList.add('input-error-border');
                hasError = true;
            }

            if (hasError) return;

            // Loading state
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Connecting...</span>';
            btn.disabled = true;

            // Simulate API call for login
            setTimeout(() => {
                if (email === 'servererror@example.com') {
                    // Simulate server connection error
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    if (errorMessage) {
                        globalErrorText.textContent = 'Unable to connect to the server. Please try again later.';
                        errorMessage.style.display = 'flex';
                    }
                } else if (email === 'user@example.com' && password === 'password123') {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Success!</span>';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    // Redirect to dashboard
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    // Show invalid credentials error message
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    if (errorMessage) {
                        globalErrorText.textContent = 'Invalid email or password.';
                        errorMessage.style.display = 'flex';
                    }
                }
            }, 1000);
        });
    }

    // Handle Google login
    const googleBtn = document.getElementById('googleBtn');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            const originalText = googleBtn.innerHTML;
            
            // Ask for Gmail account
            const gmailAccount = prompt('Please enter your Google account (Gmail):', 'user@gmail.com');
            
            // If user cancelled the prompt, do nothing
            if (gmailAccount === null) {
                return;
            }

            // Check if it's a valid email format roughly
            if (!gmailAccount.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Loading state
            googleBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Connecting...</span>';
            googleBtn.disabled = true;

            // Simulate API call for login
            setTimeout(() => {
                googleBtn.innerHTML = '<i class="fa-solid fa-check" style="color: white"></i> <span>Success!</span>';
                googleBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                googleBtn.style.borderColor = 'transparent';
                googleBtn.style.color = 'white';
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        });
    }
});
