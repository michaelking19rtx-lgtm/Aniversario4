document.addEventListener('DOMContentLoaded', () => {
    // 1. Animación de aparición al hacer scroll (Fade In)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.glass-card, .gallery-item');
    hiddenElements.forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Clase CSS necesaria para la animación de JS
    const style = document.createElement('style');
    style.innerHTML = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
        .falling-emoji {
            position: fixed;
            top: -50px;
            user-select: none;
            pointer-events: none;
            z-index: 9999;
            animation: fall linear forwards;
        }
        @keyframes fall {
            to { transform: translateY(110vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // 2. Lluvia de Emojis (Corazones y Flores)
    function createFallingElement() {
        const container = document.getElementById('falling-elements');
        const element = document.createElement('div');
        
        const emojis = ['🌸', '❤️', '✨', '💖', '🌹'];
        element.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        element.classList.add('falling-emoji');
        
        // Posición aleatoria horizontal
        element.style.left = Math.random() * 100 + 'vw';
        
        // Tamaño aleatorio
        const size = Math.random() * 20 + 10; // entre 10px y 30px
        element.style.fontSize = size + 'px';
        
        // Duración de la caída aleatoria
        const duration = Math.random() * 3 + 2; // entre 2 y 5 segundos
        element.style.animationDuration = duration + 's';
        
        container.appendChild(element);

        // Eliminar elemento después de que caiga
        setTimeout(() => {
            element.remove();
        }, duration * 1000);
    }

    // Crear un emoji cada 400ms
    setInterval(createFallingElement, 400);
});