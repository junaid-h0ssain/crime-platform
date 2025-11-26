// Crime Feed functionality
const crimeFeed = document.getElementById("crimeFeed");

// Sample data
const reports = [
    {
        title: "Robbery at Main Street",
        location: "Downtown",
        date: "2025-11-20",
        image: "images/robbery.jpg"
    },
    {
        title: "Vandalism in Park",
        location: "City Park",
        date: "2025-11-22",
        image: "images/vandalism.jpg"
    },
    {
        title: "Suspicious Activity Reported",
        location: "East Side",
        date: "2025-11-25",
        image: "images/suspicious.jpg"
    }
];

// Render reports
if (crimeFeed) {
    reports.forEach(report => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${report.image}" alt="${report.title}" onerror="this.style.display='none'">
            <h3>${report.title}</h3>
            <p><i class="fa fa-map-marker-alt"></i> ${report.location}</p>
            <p><i class="fa fa-calendar"></i> ${report.date}</p>
        `;
        crimeFeed.appendChild(card);
    });
}
// --- Tabs ---
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.auth-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.target;
        sections.forEach(s => {
            if(s.id === target) s.classList.add('active');
            else s.classList.remove('active');
        });
    });
});

// --- Login ---
document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Logged in successfully!');
    window.location.href = 'index.html';
});

// --- Signup ---
document.getElementById('signup-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Registered successfully!');
    window.location.href = 'index.html';
});

// --- Google login placeholder ---
document.getElementById('google-login-btn').addEventListener('click', () => {
    alert('Redirecting to Google Auth...');
});
document.getElementById('signup-google-btn').addEventListener('click', () => {
    alert('Redirecting to Google Auth...');
});

// --- Phone OTP login ---
const phoneLoginForm = document.getElementById('phone-login-form');
const otpLoginSection = document.getElementById('otp-section-login');
const backFromOtpLogin = document.getElementById('back-from-otp-login');

phoneLoginForm.addEventListener('submit', e => {
    e.preventDefault();
    phoneLoginForm.style.display = 'none';
    otpLoginSection.classList.remove('hidden');
});

backFromOtpLogin.addEventListener('click', () => {
    otpLoginSection.classList.add('hidden');
    phoneLoginForm.style.display = 'block';
});

document.getElementById('otp-form-login').addEventListener('submit', e => {
    e.preventDefault();
    alert('Phone login verified! Redirecting...');
    window.location.href = 'index.html';
});

// --- Phone OTP signup ---
const otpSignupSection = document.getElementById('otp-section-signup');
const backFromOtpSignup = document.getElementById('back-from-otp-signup');
document.getElementById('signup-phone-btn').addEventListener('click', () => {
    otpSignupSection.classList.remove('hidden');
});
backFromOtpSignup?.addEventListener('click', () => {
    otpSignupSection.classList.add('hidden');
});

// --- Forgot Password ---
const forgotBtn = document.getElementById('forgot-password-btn');
const forgotSection = document.getElementById('forgot-password-section');
const backToLogin = document.getElementById('back-to-login');

forgotBtn?.addEventListener('click', () => {
    sections.forEach(s => s.classList.remove('active'));
    forgotSection.classList.add('active');
});

backToLogin?.addEventListener('click', () => {
    forgotSection.classList.remove('active');
    document.getElementById('login-section').classList.add('active');
});
