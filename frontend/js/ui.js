// Modal logic for Login and Signup

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeSignupModal = document.getElementById('closeSignupModal');

    // Show Login Modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.add('active');
        });
    }

    // Show Signup Modal
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', function() {
            signupModal.classList.add('active');
        });
    }

    // Close Login Modal
    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }

    // Close Signup Modal
    if (closeSignupModal && signupModal) {
        closeSignupModal.addEventListener('click', function() {
            signupModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside modal content
    [loginModal, signupModal].forEach(function(modal) {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });
}); 