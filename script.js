const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const messageContainer = document.getElementById('message-container');

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    messageContainer.classList.remove('hidden');

    // Create confetti effect
    createConfetti();
});

// Handle No button - make it run away
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const container = questionContainer;
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate available space for button movement
    const maxX = containerRect.width - btnRect.width - 40; // 40 for padding
    const maxY = containerRect.height - btnRect.height - 40;

    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply new position
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Confetti effect
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#ff6eb4'];
    const shapes = ['❤️', '💕', '💖', '💗', '💓', '💝', '✨', '🌟'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            confetti.innerText = shapes[Math.floor(Math.random() * shapes.length)];

            document.body.appendChild(confetti);

            const animation = confetti.animate([
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            animation.onfinish = () => confetti.remove();
        }, i * 50);
    }
}
