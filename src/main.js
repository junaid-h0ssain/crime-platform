import './style.css'

// Load home.html content into #app
fetch('/src/home.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('app').innerHTML = html;
    // Import login-ui.js after DOM is populated
    import('./login-ui.js');
  });
