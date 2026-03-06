document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// App State
const state = {
    isProposalView: false,
    params: {
        to: '',
        from: '',
        email: '',
        msg: '',
        gender: 'girlfriend',
        car: 'cars',
        color: 'outfit'
    }
};

// DOM Elements
const views = {
    landing: document.getElementById('landing-view'),
    share: document.getElementById('share-view'),
    proposal: document.getElementById('proposal-view')
};

function initApp() {
    createFloatingHearts();

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('to') && urlParams.has('from') && urlParams.has('email')) {
        state.isProposalView = true;
        state.params = {
            to: decodeURIComponent(urlParams.get('to')),
            from: decodeURIComponent(urlParams.get('from')),
            email: urlParams.get('email'),
            msg: urlParams.get('msg') ? decodeURIComponent(urlParams.get('msg')) : `Hi ${decodeURIComponent(urlParams.get('from'))}, I said YES! ❤️`,
            gender: urlParams.get('gender') ? decodeURIComponent(urlParams.get('gender')) : 'girlfriend',
            car: urlParams.get('car') ? decodeURIComponent(urlParams.get('car')) : 'cars',
            color: urlParams.get('color') ? decodeURIComponent(urlParams.get('color')) : 'outfit'
        };
        initProposalView();
    } else {
        initLandingView();
    }
}

function switchView(viewName) {
    Object.values(views).forEach(view => {
        if (!view) return;
        view.classList.remove('active');
        view.classList.add('hidden');
    });
    views[viewName].classList.remove('hidden');
    // small timeout to allow display:block to apply before opacity transition
    setTimeout(() => {
        views[viewName].classList.add('active');
    }, 50);
}

// ----------------------------------------------------
// LANDING & SHARE VIEW LOGIC
// ----------------------------------------------------
function initLandingView() {
    switchView('landing');

    const form = document.getElementById('generator-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const yourName = document.getElementById('yourName').value.trim();
        const crushName = document.getElementById('crushName').value.trim();
        const yourEmail = document.getElementById('yourEmail').value.trim();
        const crushGender = document.getElementById('crushGender').value;
        const favCar = document.getElementById('favCar').value.trim();
        const favColor = document.getElementById('favColor').value.trim();
        const customMsg = document.getElementById('customMessage').value.trim();

        // Generate unique URL
        const baseUrl = window.location.origin + window.location.pathname;
        const params = new URLSearchParams({
            to: crushName,
            from: yourName,
            email: yourEmail,
            gender: crushGender
        });

        if (favCar) params.append('car', favCar);
        if (favColor) params.append('color', favColor);
        if (customMsg) params.append('msg', customMsg);

        const generatedUrl = `${baseUrl}?${params.toString()}`;
        showShareView(generatedUrl, crushName);
    });
}

function showShareView(url, crushName) {
    switchView('share');

    document.getElementById('share-crush-name').textContent = crushName;
    const linkInput = document.getElementById('generated-link');
    linkInput.value = url;

    // Copy button
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(url).then(() => {
            const icon = copyBtn.querySelector('i');
            icon.className = 'fa-solid fa-check';
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
            }, 2000);
        });
    };

    // Removed WhatsApp Share button on Share View

    // Preview button
    document.getElementById('preview-btn').onclick = () => {
        window.open(url, '_blank');
    };

    // Create another
    document.getElementById('create-another-btn').onclick = () => {
        document.getElementById('generator-form').reset();
        switchView('landing');
    };
}

// ----------------------------------------------------
// PROPOSAL VIEW LOGIC
// ----------------------------------------------------
function initProposalView() {
    switchView('proposal');
    document.getElementById('greeting-text').textContent = `Hi ${state.params.to},`;

    // Set dynamic texts
    const carTextSpan = document.getElementById('car-text');
    if (carTextSpan) carTextSpan.textContent = state.params.car;

    const colorTextSpan = document.getElementById('color-text');
    if (colorTextSpan) colorTextSpan.textContent = state.params.color;

    const proposalTitle = document.getElementById('proposal-text');
    if (proposalTitle) {
        let genderString = state.params.gender || 'girlfriend/boyfriend';
        proposalTitle.textContent = `Will you be my ${genderString}?`;
    }

    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    const step5 = document.getElementById('step-5');

    // Step transitions
    document.getElementById('next-btn-1').onclick = () => {
        step1.classList.add('hidden');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        setTimeout(() => step2.classList.add('active'), 50);
    };

    document.getElementById('next-btn-2').onclick = () => {
        step2.classList.add('hidden');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        setTimeout(() => step3.classList.add('active'), 50);
    };

    document.getElementById('next-btn-3').onclick = () => {
        step3.classList.add('hidden');
        step3.classList.remove('active');
        step4.classList.remove('hidden');
        setTimeout(() => step4.classList.add('active'), 50);
    };

    document.getElementById('next-btn-4').onclick = () => {
        step4.classList.add('hidden');
        step4.classList.remove('active');
        step5.classList.remove('hidden');
        setTimeout(() => step5.classList.add('active'), 50);
    };

    // YES Button logic
    document.getElementById('yes-btn').onclick = () => {
        triggerConfetti();

        // Show success step
        step5.classList.add('hidden');
        step5.classList.remove('active');
        const step6 = document.getElementById('step-6');
        step6.classList.remove('hidden');

        if (state.params.msg) {
            document.getElementById('success-message').textContent = state.params.msg;
        }

        setTimeout(() => step6.classList.add('active'), 50);

        // Send Email Automatically in the Background
        if (state.params.email) {
            fetch(`https://formsubmit.co/ajax/${state.params.email}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `❤️ ${state.params.to} said YES to your proposal! ❤️`,
                    Response: "They clicked YES! 🎉",
                    From: state.params.to,
                    To: state.params.from,
                    Love_Message: state.params.msg || "I love you!"
                })
            })
                .then(response => response.json())
                .then(data => console.log("Success sent:", data))
                .catch(error => console.error("Error sending:", error));
        }
    };

    // ELUSIVE NO Button logic
    const noBtn = document.getElementById('no-btn');
    const moveNoButton = () => {
        // Change from relative to absolute positioning when first interacted with
        if (noBtn.style.position !== 'absolute') {
            noBtn.style.position = 'absolute';
        }

        // Ensure it moves within the bounds of the screen/card
        const card = document.querySelector('.proposal-card');
        const cardRect = card.getBoundingClientRect();

        // Calculate maximum bounds so button doesn't go off-screen
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;

        // Constrain movement area to viewport rather than just the card to make it more fun
        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));

        // Remove transitions temporarily so it snaps fast, making it hard to catch
        noBtn.style.transition = 'none';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.bottom = 'auto'; // Reset bottom
        noBtn.style.right = 'auto';  // Reset right

        // Restore transition after a tiny delay for smooth visual reset if needed
        setTimeout(() => {
            noBtn.style.transition = 'all 0.2s ease-out';
        }, 50);
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent standard click
        moveNoButton();
    });
}

// ----------------------------------------------------
// EFFECTS
// ----------------------------------------------------
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const heartEmojis = ['❤️', '💖', '💗', '💕', '💞', '💘'];

    // Create new heart every 800ms
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // Randomize horizontal position and font size
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        heart.style.animationDuration = `${Math.random() * 5 + 8}s`; // 8-13s

        container.appendChild(heart);

        // Remove heart after it floats away
        setTimeout(() => {
            heart.remove();
        }, 13000);
    }, 800);
}

function triggerConfetti() {
    // Simple DOM-based confetti since we can't easily add external libs
    const colors = ['#ff4b72', '#ff758c', '#25D366', '#ffffff', '#ffd700'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = '-10px';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { transform: 'translate3d(0,0,0) rotate(0deg)', opacity: 1 },
            { transform: `translate3d(${Math.random() * 200 - 100}px, ${window.innerHeight}px, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(.37,0,.63,1)'
        });

        animation.onfinish = () => confetti.remove();
    }
}
