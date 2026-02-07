// Photo upload functionality
const photoFrame = document.querySelector('.photo-placeholder');
photoFrame.addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoFrame.innerHTML = `<img src="${e.target.result}" alt="My Future">`;
                photoFrame.classList.add('has-photo');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

// Day pages functionality
function openDayPage(dayNumber) {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById(`day${dayNumber}`).classList.add('active');

    for (let i = 0; i < 25; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
}

function closeDayPage() {
    document.querySelectorAll('.day-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('mainPage').style.display = 'block';
}

// Proposal page functionality
function openProposalPage() {
    document.getElementById('mainPage').style.display = 'none';
    document.querySelectorAll('.day-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('proposalPage').classList.add('active');

    createConfetti();
    for (let i = 0; i < 40; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }

    // Create buttons with special "NO" button behavior
    setupProposalButtons();
}

function closeProposalPage() {
    document.getElementById('proposalPage').classList.remove('active');
    document.getElementById('mainPage').style.display = 'block';
}

// Setup proposal buttons with moving "NO" button
function setupProposalButtons() {
    const proposalButtons = document.getElementById('proposalButtons');
    proposalButtons.innerHTML = '';

    // Create YES button
    const yesBtn = document.createElement('button');
    yesBtn.className = 'yes-btn';
    yesBtn.id = 'yesBtn';
    yesBtn.innerHTML = 'YES, TO OUR FUTURE! ❤️';
    yesBtn.onclick = function () { showResponse('yes'); };

    // Create NO button that moves away
    const noBtn = document.createElement('button');
    noBtn.className = 'no-btn';
    noBtn.id = 'noBtn';
    noBtn.innerHTML = 'Not Ready Yet';

    // Make NO button impossible to click by moving away
    let moveInterval;
    let moveSpeed = 1000; // Start with 1 second intervals

    // Function to move the NO button randomly
    function moveNoButton() {
        const container = document.querySelector('.proposal-buttons');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();

        // Calculate max positions
        const maxX = containerRect.width - buttonRect.width - 30;
        const maxY = containerRect.height - buttonRect.height - 30;

        // Random position
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Smooth movement
        noBtn.style.transition = 'left 0.5s ease, top 0.5s ease';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Change text occasionally
        if (Math.random() > 0.7) {
            const texts = ['Not Ready Yet', 'Maybe Later', 'Too Soon', 'Let\'s Think', 'Not Today'];
            noBtn.textContent = texts[Math.floor(Math.random() * texts.length)];
        }
    }

    // Move button immediately and keep moving
    moveNoButton();
    moveInterval = setInterval(moveNoButton, moveSpeed);

    // Speed up when mouse gets close to NO button
    noBtn.addEventListener('mouseenter', function () {
        // Speed up movement
        clearInterval(moveInterval);
        moveSpeed = 300;
        moveInterval = setInterval(moveNoButton, moveSpeed);

        // Change text to something encouraging
        noBtn.textContent = 'Click YES Instead!';
    });

    noBtn.addEventListener('mouseleave', function () {
        // Slow down when mouse leaves
        clearInterval(moveInterval);
        moveSpeed = 800;
        moveInterval = setInterval(moveNoButton, moveSpeed);

        // Return to original text
        noBtn.textContent = 'Not Ready Yet';
    });

    // When NO button is clicked (if somehow managed), show meaningful response
    noBtn.onclick = function () {
        // Move button away immediately
        moveNoButton();

        // Show meaningful message about taking things slow
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerHTML = `
                    <h3>I Understand 💕</h3>
                    <p>If you're not ready yet, I understand. Building a future together is a serious step, and it deserves careful thought.</p>
                    <p>But I hope you'll still consider being my Valentine today, as we continue getting to know each other and exploring what could be.</p>
                    <p>My feelings are sincere, and my interest in building a future with you is genuine. Whether you need days, weeks, or months to decide about the future, I'll be here, getting to know you better.</p>
                    <p style="font-weight: bold; margin-top: 20px; color: #ff2e63;">For now, will you at least be my Valentine? ❤️</p>
                `;
        responseMessage.style.display = 'block';

        // Change NO button to something else
        noBtn.textContent = 'Just Valentine For Now';
        noBtn.style.background = 'linear-gradient(145deg, #FF9800, #F57C00)';

        // Force move button again
        setTimeout(moveNoButton, 100);
    };

    // Add buttons to container
    proposalButtons.appendChild(yesBtn);
    proposalButtons.appendChild(noBtn);

    // Start moving the NO button automatically
    setTimeout(() => {
        moveNoButton();
    }, 100);
}

// Response handling
function showResponse(answer) {
    const responseMessage = document.getElementById('responseMessage');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    // Always show meaningful response
    responseMessage.innerHTML = `
                <h3>🎉 YOU SAID YES TO OUR FUTURE! 🎉</h3>
                <p>Nikita, you've made me the happiest man alive! This "yes" isn't just for today - it's the first step toward all the beautiful tomorrows we could share.</p>
                
                <p>I promise to honor this beginning with sincerity, respect, and genuine effort. I'll be here as you pursue your medical dreams. I'll support your desire to adopt and build a family. I'll cherish every moment we share, whether we're playing Pokémon Unite or talking about our future.</p>
                
                <p>The distance between Dehradun and Delhi is just geography. What matters is the connection we're building, the dreams we're sharing, and the future we're beginning to imagine together.</p>
                
                <p style="font-size: 1.8rem; font-weight: bold; margin-top: 30px; color: #ff2e63;">
                    Thank you for saying yes to exploring a future with me. ❤️
                </p>
                
                <p style="margin-top: 20px; font-style: italic; font-size: 1.3rem;">
                    From your Adam, who can't wait to build a beautiful life with his Eve.
                </p>
            `;

    // Celebration effects
    createConfetti();
    for (let i = 0; i < 150; i++) {
        setTimeout(() => createFloatingHeart(), i * 40);
    }

    // Change YES button
    yesBtn.style.background = 'linear-gradient(145deg, #2E7D32, #1B5E20)';
    yesBtn.innerHTML = 'OUR FUTURE BEGINS! 💖';
    yesBtn.onclick = null;

    // Hide NO button
    if (noBtn) noBtn.style.display = 'none';

    responseMessage.style.display = 'block';
    responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Add special message after 3 seconds
    setTimeout(() => {
        const extraMessage = document.createElement('div');
        extraMessage.style.marginTop = '30px';
        extraMessage.style.padding = '20px';
        extraMessage.style.background = 'rgba(255, 255, 255, 0.9)';
        extraMessage.style.borderRadius = '15px';
        extraMessage.style.border = '2px solid #ff2e63';
        extraMessage.innerHTML = `
                    <p style="font-size: 1.3rem; color: #5a1335; text-align: center;">
                        <strong>Next Steps:</strong> Let's continue getting to know each other deeply, bridge the distance between us, 
                        and take things at a pace that feels right for both of us. I'm excited for our journey together! 💕
                    </p>
                `;
        responseMessage.appendChild(extraMessage);
    }, 3000);
}

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞', '💘'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 25 + 20) + 'px';
    heart.style.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    heart.style.opacity = '0.9';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}

// Create confetti
function createConfetti() {
    const colors = ['#ff2e63', '#ff7eb3', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0'];

    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 12 + 6 + 'px';
            confetti.style.height = Math.random() * 12 + 6 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-30px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '9998';
            confetti.style.opacity = '0.9';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }, i * 15);
    }
}

// Initialize with floating hearts
for (let i = 0; i < 25; i++) {
    setTimeout(() => createFloatingHeart(), i * 300);
}

// Open first day by default
setTimeout(() => {
    document.querySelector('.nav-day').classList.add('active');
}, 1500);

// Add subtle background music suggestion
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const musicSuggestion = document.createElement('div');
        musicSuggestion.style.position = 'fixed';
        musicSuggestion.style.bottom = '20px';
        musicSuggestion.style.right = '20px';
        musicSuggestion.style.background = 'rgba(255, 255, 255, 0.9)';
        musicSuggestion.style.padding = '10px 15px';
        musicSuggestion.style.borderRadius = '20px';
        musicSuggestion.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        musicSuggestion.style.zIndex = '10000';
        musicSuggestion.style.fontSize = '0.9rem';
        musicSuggestion.style.color = '#8a1c3f';
        musicSuggestion.innerHTML = '💝 For best experience, play romantic music in background';
        document.body.appendChild(musicSuggestion);

        // Remove after 10 seconds
        setTimeout(() => {
            musicSuggestion.style.opacity = '0';
            musicSuggestion.style.transition = 'opacity 1s';
            setTimeout(() => musicSuggestion.remove(), 1000);
        }, 10000);
    }, 5000);
});