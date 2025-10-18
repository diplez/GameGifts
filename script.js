// ==================== SISTEMA DE PARTÍCULAS ====================
class Particle {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.reset();
        this.element.style.position = 'absolute';
        this.element.style.borderRadius = '50%';
        this.element.style.pointerEvents = 'none';
        this.container.appendChild(this.element);
    }

    reset() {
        // Posición aleatoria
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        // Tamaño aleatorio (1-4px)
        this.size = Math.random() * 3 + 1;

        // Velocidad aleatoria
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;

        // Color dorado brillante
        const brightness = Math.random() * 100 + 155;
        this.color = `rgba(${brightness}, ${brightness - 50}, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.6 + 0.2})`;

        // Opacidad inicial
        this.opacity = Math.random() * 0.5 + 0.3;

        // Aplicar estilos
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.background = this.color;
        this.element.style.opacity = this.opacity;
        this.element.style.boxShadow = `0 0 ${this.size * 2}px ${this.color}`;
    }

    update() {
        // Movimiento flotante
        this.x += this.speedX;
        this.y += this.speedY;

        // Efecto de brillo pulsante
        this.opacity = Math.sin(Date.now() * 0.001 + this.x) * 0.3 + 0.5;

        // Reiniciar si sale de pantalla
        if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
            this.reset();
        }

        // Aplicar transformación
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.opacity = this.opacity;
    }
}

// ==================== INICIALIZACIÓN ====================
let particles = [];
let animationFrameId = null;

function initParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 50; // 50 partículas flotantes

    // Limpiar partículas existentes
    container.innerHTML = '';
    particles = [];

    // Crear nuevas partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(container));
    }

    // Iniciar loop de animación
    animateParticles();
}

function animateParticles() {
    particles.forEach(particle => particle.update());
    animationFrameId = requestAnimationFrame(animateParticles);
}

// ==================== SECUENCIA DE TRANSFORMACIÓN FLOR → CORAZÓN ====================
function initFlowerTransformation() {
    // A los 22 segundos, ocultar el capullo y la flor para que aparezca el corazón
    setTimeout(() => {
        const bud = document.querySelector('.bud');
        const flower = document.querySelector('.flower');
        const plant = document.querySelector('.plant');

        if (bud) bud.classList.add('hide-bud');
        if (flower) flower.classList.add('hide-flower');

        // Hacer que la planta (tallo y hojas) se desvanezca gradualmente
        if (plant) {
            plant.style.transition = 'opacity 2s ease-out';
            plant.style.opacity = '0.3';
        }

        // Crear efecto de partículas durante la transformación
        createTransformationParticles();

    }, 22000); // 22 segundos
}

function createTransformationParticles() {
    const particlesContainer = document.querySelector('.particles-container');

    // Crear 30 partículas de transformación
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = '50%';
            particle.style.top = '40%';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 50 + 180}, ${Math.random() * 100 + 50}, 0.8)`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '12';
            particle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.8)';

            particlesContainer.appendChild(particle);

            // Animación de explosión
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let posX = window.innerWidth / 2;
            let posY = window.innerHeight * 0.4;
            let life = 100;

            const animateTransformParticle = () => {
                posX += vx;
                posY += vy;
                life -= 2;

                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = life / 100;

                if (life > 0) {
                    requestAnimationFrame(animateTransformParticle);
                } else {
                    particle.remove();
                }
            };

            animateTransformParticle();

        }, i * 50); // Escalonar la aparición
    }
}

// ==================== FUNCIONES DE CONTROL ====================
function restartAnimation() {
    // Recargar la página para reiniciar todo
    window.location.reload();
}

function init() {
    console.log('🌱 Iniciando "El Renacer del Amor"...');

    // Inicializar partículas de fondo
    initParticles();

    // Inicializar transformación flor → corazón
    initFlowerTransformation();

    // Agregar más partículas doradas al abrir la flor (momento especial)
    setTimeout(() => {
        createBloomParticles();
    }, 19000); // Cuando la flor está completamente abierta

    // Agregar partículas de corazón cuando aparece
    setTimeout(() => {
        createHeartParticles();
    }, 25000);
}

function createBloomParticles() {
    const particlesContainer = document.querySelector('.particles-container');

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = '50%';
            particle.style.top = '35%';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            particle.style.background = '#ffd700';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '11';
            particle.style.boxShadow = '0 0 15px rgba(255, 215, 0, 1)';

            particlesContainer.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 20;
            const radius = 80;
            const targetX = window.innerWidth / 2 + Math.cos(angle) * radius;
            const targetY = window.innerHeight * 0.35 + Math.sin(angle) * radius;

            let progress = 0;
            const animateBloom = () => {
                progress += 0.02;
                const currentX = window.innerWidth / 2 + (targetX - window.innerWidth / 2) * progress;
                const currentY = window.innerHeight * 0.35 + (targetY - window.innerHeight * 0.35) * progress;

                particle.style.left = currentX + 'px';
                particle.style.top = currentY + 'px';
                particle.style.opacity = 1 - progress;

                if (progress < 1) {
                    requestAnimationFrame(animateBloom);
                } else {
                    particle.remove();
                }
            };

            animateBloom();
        }, i * 30);
    }
}

function createHeartParticles() {
    const particlesContainer = document.querySelector('.particles-container');

    setInterval(() => {
        const particle = document.createElement('div');
        particle.innerHTML = '❤️';
        particle.style.position = 'absolute';
        particle.style.left = (window.innerWidth / 2 - 20 + Math.random() * 40) + 'px';
        particle.style.top = (window.innerHeight / 2 + 80) + 'px';
        particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '11';
        particle.style.opacity = '0.7';

        particlesContainer.appendChild(particle);

        let posY = window.innerHeight / 2 + 80;
        let opacity = 0.7;

        const floatUp = () => {
            posY -= 1;
            opacity -= 0.01;

            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(floatUp);
            } else {
                particle.remove();
            }
        };

        floatUp();
    }, 500); // Cada 500ms aparece un nuevo corazón flotante
}

// ==================== EJECUTAR AL CARGAR ====================
window.addEventListener('load', init);

// Ajustar partículas al redimensionar ventana
window.addEventListener('resize', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    initParticles();
});
