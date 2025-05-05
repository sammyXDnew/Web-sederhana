function showMessage() {
    const message = document.querySelector('header h1');
    if (message) {
        message.textContent = '';
    }
}

function showImage() {
    const container = document.getElementById('celebrationContainer');
    container.style.display = 'block';
}

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    }));

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    }

    function updateConfetti() {
        confetti.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            if (p.y > canvas.height) {
                p.y = -p.r;
                p.x = Math.random() * canvas.width;
            }
        });
    }

    function animateConfetti() {
        drawConfetti();
        updateConfetti();
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();

    setTimeout(() => {
        canvas.style.display = 'none';
    }, 5000); // Hentikan konfeti setelah 5 detik
}

document.addEventListener('DOMContentLoaded', () => {
    const gifs = document.querySelectorAll('#movingGif');
    const gifPositions = Array.from(gifs).map(gif => ({
        element: gif,
        x: Math.random() * (window.innerWidth - 100), // Kurangi ukuran GIF agar tidak keluar layar
        y: Math.random() * (window.innerHeight - 100),
        dx: 2 + Math.random() * 2,
        dy: 2 + Math.random() * 2
    }));

    function moveGifs() {
        gifPositions.forEach(gif => {
            gif.x += gif.dx;
            gif.y += gif.dy;

            // Pantulkan jika mencapai tepi layar
            if (gif.x <= 0 || gif.x + gif.element.offsetWidth >= window.innerWidth) {
                gif.dx *= -1;
            }
            if (gif.y <= 0 || gif.y + gif.element.offsetHeight >= window.innerHeight) {
                gif.dy *= -1;
            }

            // Perbarui posisi
            gif.element.style.left = gif.x + 'px';
            gif.element.style.top = gif.y + 'px';
        });
    }

    // Pastikan semua GIF bergerak di seluruh halaman
    gifs.forEach(gif => {
        gif.style.position = 'fixed';
    });

    setInterval(moveGifs, 30);
});
