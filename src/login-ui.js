import { onAuthStateChanged } from "firebase/auth";
import {
    auth,
    emailSignup,
    emailLogin,
    googleLogin,
    phoneLogin,
    verifyPhoneOtp,
    logout,
    changePassword,
    recoverPassword,
} from "./login.js";

// DOM Elements
const loadingState = document.getElementById('loading-state');
const loggedInState = document.getElementById('logged-in-state');
const loggedOutState = document.getElementById('logged-out-state');
const userDisplay = document.getElementById('user-display');

// Error/Success messages
const loggedInError = document.getElementById('logged-in-error');
const loggedInSuccess = document.getElementById('logged-in-success');
const loggedOutError = document.getElementById('logged-out-error');
const loggedOutSuccess = document.getElementById('logged-out-success');

// Forms and sections
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const phoneLoginForm = document.getElementById('phone-login-form');
const otpForm = document.getElementById('otp-form');
const changePasswordForm = document.getElementById('change-password');
const recoverPasswordForm = document.getElementById('recover-password-form');

// Sections
const mainAuthSection = document.getElementById('main-auth-section');
const forgotPasswordSection = document.getElementById('forgot-password-section');
const phoneLoginSection = document.getElementById('phone-login-section');
const otpSection = document.getElementById('otp-section');
const changePasswordToggle = document.getElementById('change-password-toggle');
const changePasswordFormSection = document.getElementById('change-password-form');

// Buttons
const logoutBtn = document.getElementById('logout-btn');
const googleLoginBtn = document.getElementById('google-login-btn');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');
const backToLoginBtn = document.getElementById('back-to-login');
const backFromOtpBtn = document.getElementById('back-from-otp');
const showChangePasswordBtn = document.getElementById('show-change-password-btn');
const cancelChangePasswordBtn = document.getElementById('cancel-change-password');

// State
let currentUser = null;

// Helper functions
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function showSuccess(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideSuccess(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function clearMessages() {
    hideError(loggedInError);
    hideError(loggedOutError);
    hideSuccess(loggedInSuccess);
    hideSuccess(loggedOutSuccess);
}

function updateUI(user) {
    loadingState.style.display = 'none';
    
    if (user) {
        loggedInState.style.display = 'block';
        loggedOutState.style.display = 'none';
        userDisplay.textContent = user.email || user.phoneNumber;
    } else {
        loggedInState.style.display = 'none';
        loggedOutState.style.display = 'block';
    }
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    updateUI(user);
});

// Email Signup
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    const result = await emailSignup(email, password);
    if (!result.success) {
        showError(loggedOutError, result.error);
    }
});

// Email Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const result = await emailLogin(email, password);
    if (!result.success) {
        showError(loggedOutError, result.error);
    }
});

// Google Login
googleLoginBtn.addEventListener('click', () => {
    clearMessages();
    googleLogin();
});

// Phone Login - Send OTP
phoneLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const phoneNumber = document.getElementById('phone-number').value;
    
    const result = await phoneLogin(phoneNumber);
    if (result.success) {
        phoneLoginSection.style.display = 'none';
        otpSection.style.display = 'block';
    } else {
        showError(loggedOutError, result.error);
    }
});

// Verify OTP
otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const otpCode = document.getElementById('otp-code').value;
    
    const result = await verifyPhoneOtp(otpCode);
    if (!result.success) {
        showError(loggedOutError, result.error);
    } else {
        otpSection.style.display = 'none';
        phoneLoginSection.style.display = 'block';
        document.getElementById('otp-code').value = '';
        document.getElementById('phone-number').value = '';
    }
});

// Back from OTP
backFromOtpBtn.addEventListener('click', () => {
    otpSection.style.display = 'none';
    phoneLoginSection.style.display = 'block';
    document.getElementById('otp-code').value = '';
});

// Logout
logoutBtn.addEventListener('click', () => {
    logout();
});

// Show Change Password Form
showChangePasswordBtn.addEventListener('click', () => {
    clearMessages();
    changePasswordToggle.style.display = 'none';
    changePasswordFormSection.style.display = 'block';
});

// Cancel Change Password
cancelChangePasswordBtn.addEventListener('click', () => {
    changePasswordFormSection.style.display = 'none';
    changePasswordToggle.style.display = 'block';
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
});

// Change Password Submit
changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    
    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
        showSuccess(loggedInSuccess, result.message);
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        changePasswordFormSection.style.display = 'none';
        changePasswordToggle.style.display = 'block';
    } else {
        showError(loggedInError, result.error);
    }
});

// Show Forgot Password
forgotPasswordBtn.addEventListener('click', () => {
    clearMessages();
    mainAuthSection.style.display = 'none';
    forgotPasswordSection.style.display = 'block';
});

// Back to Login from Forgot Password
backToLoginBtn.addEventListener('click', () => {
    forgotPasswordSection.style.display = 'none';
    mainAuthSection.style.display = 'block';
    document.getElementById('recovery-email').value = '';
});

// Recover Password Submit
recoverPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const recoveryEmail = document.getElementById('recovery-email').value;
    
    const result = await recoverPassword(recoveryEmail);
    if (result.success) {
        showSuccess(loggedOutSuccess, result.message);
        document.getElementById('recovery-email').value = '';
        forgotPasswordSection.style.display = 'none';
        mainAuthSection.style.display = 'block';
    } else {
        showError(loggedOutError, result.error);
    }
});
