document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.innerHTML = `
        <p class="cookie-consent">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <button class="button" id="acceptCookies">Accept</button>
        `;
        banner.style.position = 'fixed';
        banner.style.bottom = '0';
        banner.style.left = '0';
        banner.style.right = '0';
        banner.style.padding = '20px';
        banner.style.backgroundColor = '#fff';
        banner.style.border = 'solid 1px #485fc7';
        banner.style.color = '#000';
        banner.style.textAlign = 'center';
        banner.style.zIndex = '1000';
        document.body.appendChild(banner);

        document.getElementById('acceptCookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            document.body.removeChild(banner);
        });
    }
});