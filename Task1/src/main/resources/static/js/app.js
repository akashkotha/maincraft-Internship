document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Toast Notifications Implementation ---
    const toastContainer = document.getElementById('toastContainer');

    function showToast(title, message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconClass = type === 'success' 
            ? 'fa-solid fa-circle-check' 
            : 'fa-solid fa-triangle-exclamation';

        toast.innerHTML = `
            <span class="toast-icon"><i class="${iconClass}"></i></span>
            <div class="toast-body">
                <span class="toast-title">${title}</span>
                <span class="toast-msg">${message}</span>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Slide out and remove toast after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    // --- AJAX Form Submission Handler ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showToast('Input Error', 'Please fill in all fields.', 'error');
                return;
            }

            // Set loading state on button
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Form URL Encoded payload as expected by @RequestParam in controller
            const formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString()
                });

                if (response.ok) {
                    const responseText = await response.text();
                    showToast('Message Sent', responseText || 'Form submitted successfully!', 'success');
                    contactForm.reset();
                } else {
                    const errorMsg = await response.text();
                    showToast('Submission Failed', errorMsg || `Server responded with status ${response.status}`, 'error');
                }
            } catch (err) {
                console.error('Submission error:', err);
                showToast('Network Error', 'Could not reach the server. Please try again.', 'error');
            } finally {
                // Restore button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
});
