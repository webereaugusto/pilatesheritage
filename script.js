// JavaScript principal - Landing Page do International Pilates Heritage Congress

// ==================== SLIDESHOW ====================
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    console.log('🎬 Inicializando slideshow...', slides.length, 'slides encontrados');
    
    if (slides.length === 0) {
        console.error('❌ Nenhum slide encontrado!');
        return;
    }
    
    function showSlide(index) {
        // Remover active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adicionar active ao slide atual
        if (slides[index]) {
            slides[index].classList.add('active');
            console.log('✅ Slide ativo:', index);
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
        console.log('🔄 Slideshow automático iniciado (3s)');
    }
    
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }
    
    // Navegação manual com dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            setTimeout(startAutoSlide, 3000);
        });
    });
    
    // Pausar no hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Iniciar slideshow automático
    if (slides.length > 1) {
        startAutoSlide();
    }
}

// ==================== CONTADOR ANIMADO ====================
function animateCounter(element, finalValue, duration = 2000, suffix = '') {
    const startValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: ease-out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (finalValue - startValue) * easeOut);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalValue + suffix;
            console.log('✅ Contador finalizado:', finalValue + suffix);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function initializeCounters() {
    const statItems = document.querySelectorAll('.stat-item');
    console.log('🔢 Inicializando contadores...', statItems.length, 'encontrados');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h3 = entry.target.querySelector('h3');
                
                if (h3 && !h3.hasAttribute('data-counted')) {
                    const text = h3.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/\d/g, '');
                    
                    h3.setAttribute('data-counted', 'true');
                    h3.textContent = '0' + suffix;
                    
                    setTimeout(() => {
                        animateCounter(h3, number, 2500, suffix);
                    }, 200);
                    
                    console.log('🎯 Iniciando contador para:', number + suffix);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => observer.observe(item));
}

// ==================== EFEITO DE DIGITAÇÃO ====================
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    element.style.borderRight = '3px solid #ffffff';
    element.style.animation = 'blink 1s infinite';
    
    let index = 0;
    
    function addChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(addChar, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    
    addChar();
}

// ==================== NAVEGAÇÃO SUAVE ====================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== NAVBAR EFFECTS ====================
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        }
    });
    
    // Menu hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==================== INICIALIZAÇÃO PRINCIPAL ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando landing page...');
    
    // Inicializar componentes em sequência
    initializeNavbar();
    initializeSmoothScroll();
    
    // Slideshow
    setTimeout(() => {
        initializeSlideshow();
    }, 100);
    
    // Contadores
    setTimeout(() => {
        initializeCounters();
    }, 300);
    
    // Efeito de digitação no título
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            typeWriter(heroTitle, text, 100);
        }
    }, 1000);
    
    console.log('✅ Landing page inicializada com sucesso!');
});

// ==================== CSS ADICIONAL VIA JAVASCRIPT ====================
const additionalCSS = `
    @keyframes blink {
        0%, 50% { border-color: #ffffff; }
        51%, 100% { border-color: transparent; }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        padding: 1rem;
        gap: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

// Adicionar CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-card, .presenter-card, .feature-item, .stat-item, .day-header, .schedule-notes, .mission-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efeitos hover para cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.event-card, .presenter-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Validação e envio do formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const interesse = this.querySelector('select').value;
            
            if (!nome || !email || interesse === 'Selecione seu interesse') {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simular envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Função para validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar mensagens
function showMessage(message, type) {
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Estilos da mensagem
    messageEl.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        animation: slideInMessage 0.3s ease;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(messageEl, form.firstChild);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'slideOutMessage 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }
    }, 5000);
}

// Adicionar animações CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInMessage {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideOutMessage {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Adicionar efeito de scroll suave para o botão "Saiba Mais"
document.addEventListener('DOMContentLoaded', () => {
    const saibaMaisBtn = document.querySelector('a[href="#about"]');
    if (saibaMaisBtn) {
        saibaMaisBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Funcionalidades específicas da seção de programação
document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave para tabelas em mobile
    const tableContainers = document.querySelectorAll('.schedule-table-container');
    tableContainers.forEach(container => {
        container.addEventListener('scroll', () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const scrollPercentage = (scrollLeft / maxScroll) * 100;
            
            // Adicionar indicador visual de scroll se necessário
            if (maxScroll > 0) {
                container.style.background = `linear-gradient(90deg, 
                    rgba(102, 126, 234, 0.1) ${scrollPercentage}%, 
                    transparent ${scrollPercentage}%)`;
            }
        });
    });

    // Funcionalidade do botão de download (simulado)
    const downloadBtn = document.querySelector('.schedule-download .btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simular download
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando PDF...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Download Iniciado!';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-download"></i> Baixar Programação em PDF';
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }, 2000);
        });
    }

    // Destacar evento atual se estiver no período do congresso
    const highlightCurrentEvent = () => {
        const now = new Date();
        const congressStart = new Date('2024-05-10');
        const congressEnd = new Date('2024-05-12');
        
        if (now >= congressStart && now <= congressEnd) {
            const currentHour = now.getHours();
            const tableRows = document.querySelectorAll('.schedule-table tbody tr');
            
            tableRows.forEach(row => {
                const timeCell = row.querySelector('td[data-label="Horário"]');
                if (timeCell) {
                    const timeText = timeCell.textContent;
                    const startTime = parseInt(timeText.split(':')[0]);
                    
                    if (Math.abs(currentHour - startTime) <= 1) {
                        row.classList.add('current-event');
                        row.style.backgroundColor = 'rgba(46, 204, 113, 0.15)';
                        row.style.borderLeft = '4px solid #2ecc71';
                        
                        // Scroll para o evento atual
                        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        } else {
            console.log('📅 Fora do período do congresso');
        }
    };

    // Verificar evento atual
    highlightCurrentEvent();
    
    // Atualizar a cada 30 minutos
    setInterval(highlightCurrentEvent, 30 * 60 * 1000);
});

// Função para filtrar programação por tipo de atividade
function filterSchedule(type) {
    const rows = document.querySelectorAll('.schedule-table tbody tr');
    
    rows.forEach(row => {
        if (type === 'all') {
            row.style.display = '';
        } else {
            const hasClass = row.classList.contains(type);
            row.style.display = hasClass ? '' : 'none';
        }
    });
}

// Função para imprimir programação
function printSchedule() {
    const printWindow = window.open('', '_blank');
    const scheduleContent = document.querySelector('.schedule').innerHTML;
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Programação - International Pilates Heritage Congress 2024</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .schedule-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    .schedule-table th, .schedule-table td { border: 1px solid #ddd; padding: 8px; }
                    .schedule-table th { background-color: #f5f5f5; }
                    .day-header { margin: 20px 0 10px 0; font-size: 18px; font-weight: bold; }
                    .room-tag { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 10px; }
                </style>
            </head>
            <body>
                ${scheduleContent}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Funcionalidades específicas da seção Board Members
document.addEventListener('DOMContentLoaded', () => {
    // Contador animado para estatísticas da missão
    const missionStats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.replace(/\D/g, ''); // Remove non-digits
                const suffix = target.textContent.replace(/\d/g, ''); // Get suffix like '+'
                
                animateCounter(target, parseInt(finalValue), 2000, suffix);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    missionStats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Funcionalidades específicas da seção de Localização
document.addEventListener('DOMContentLoaded', () => {
    // Simular funcionalidade dos botões de reserva
    const bookingBtns = document.querySelectorAll('.booking-btn');
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const hotelName = this.textContent.trim();
            const originalContent = this.innerHTML;
            
            // Simular redirecionamento
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                showMessage(`Redirecionando para ${hotelName}...`, 'success');
                this.innerHTML = originalContent;
                this.style.pointerEvents = 'auto';
                
                // Aqui você adicionaria os links reais
                // window.open('https://link-real-do-hotel.com', '_blank');
            }, 2000);
        });
    });

    // Otimizar carregamento do mapa
    const mapFrame = document.querySelector('.map-frame iframe');
    if (mapFrame) {
        // Lazy loading para o mapa
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (!iframe.src.includes('maps.google.com')) {
                        // URL real do Google Maps para Mönchengladbach
                        iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.8!2d6.4344!3d51.1961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b0f2e7a8a8a1%3A0x1234567890abcdef!2sM%C3%B6nchengladbach%2C%20Germany!5e0!3m2!1sen!2sde!4v1234567890123';
                    }
                    mapObserver.unobserve(iframe);
                }
            });
        }, { threshold: 0.1 });
        
        mapObserver.observe(mapFrame);
    }

    // Animações específicas para elementos da seção de localização
    const locationElements = document.querySelectorAll('.location-card, .map-container, .hotel-card');
    
    locationElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito hover aprimorado para cards de localização
    const locationCards = document.querySelectorAll('.location-card, .hotel-card');
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

console.log('🎉 Landing Page do International Pilates Heritage Congress carregada com sucesso!');

// ==================== GALERIA E LIGHTBOX ====================
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    
    let currentImageIndex = 0;
    let images = [];
    
    console.log('🖼️ Inicializando galeria...', galleryItems.length, 'thumbnails encontrados');
    
    // Array completo com TODAS as imagens da pasta galeria
    const allGalleryImages = [
        { src: 'galeria/IMG_3271.webp', caption: 'Momento especial do evento' },
        { src: 'galeria/IMG_3208.webp', caption: 'Workshop em ação' },
        { src: 'galeria/IMG_3159.webp', caption: 'Participantes concentrados' },
        { src: 'galeria/IMG_3109.webp', caption: 'Técnicas avançadas de Pilates' },
        { src: 'galeria/IMG_3039.webp', caption: 'Momento de aprendizado' },
        { src: 'galeria/IMG_2999.webp', caption: 'Prática em grupo' },
        { src: 'galeria/IMG_2809.webp', caption: 'Demonstração técnica' },
        { src: 'galeria/IMG_2800.webp', caption: 'Trabalho em equipe' },
        { src: 'galeria/IMG_2782.webp', caption: 'Foco e concentração' },
        { src: 'galeria/IMG_2675.webp', caption: 'Momento inspirador' },
        { src: 'galeria/IMG_2119.webp', caption: 'Técnicas de respiração' },
        { src: 'galeria/IMG_2106.webp', caption: 'Exercícios de mat' },
        { src: 'galeria/IMG_2080.webp', caption: 'Alongamento e flexibilidade' },
        { src: 'galeria/IMG_2075.webp', caption: 'Concentração profunda' },
        { src: 'galeria/IMG_2033.webp', caption: 'Movimento fluido' },
        { src: 'galeria/IMG_2028.webp', caption: 'Equilíbrio e estabilidade' },
        { src: 'galeria/IMG_2024.webp', caption: 'Força do core' },
        { src: 'galeria/IMG_1851 (1).webp', caption: 'Precisão dos movimentos' },
        { src: 'galeria/IMG_1804.webp', caption: 'Harmonia corporal' },
        { src: 'galeria/IMG_1735.webp', caption: 'Técnica aperfeiçoada' },
        { src: 'galeria/IMG_1603.webp', caption: 'Controle muscular' },
        { src: 'galeria/IMG_1437.webp', caption: 'Fluidez natural' },
        { src: 'galeria/IMG_1066.webp', caption: 'Exercícios desafiadores' },
        { src: 'galeria/IMG_1059.webp', caption: 'Pilates clássico' },
        { src: 'galeria/IMG_0920.webp', caption: 'Integração mente-corpo' },
        { src: 'galeria/IMG_0883.webp', caption: 'Movimentos precisos' },
        { src: 'galeria/IMG_0691.webp', caption: 'Energia e vitalidade' },
        { src: 'galeria/IMG_0680 (1).webp', caption: 'Exercícios funcionais' },
        { src: 'galeria/IMG_0390.webp', caption: 'Postura correta' },
        { src: 'galeria/IMG_0171.webp', caption: 'Disciplina e foco' },
        { src: 'galeria/57.webp', caption: 'Momento de superação' },
        { src: 'galeria/39.webp', caption: 'Evolução constante' },
        { src: 'galeria/32.webp', caption: 'Conquista pessoal' },
        { src: 'galeria/12.webp', caption: 'Jornada transformadora' },
        { src: 'galeria/2L1A3044.webp', caption: 'Inspiração diária' }
    ];
    
    // Usar o array completo para o lightbox
    images = allGalleryImages;
    
    if (galleryItems.length === 0) {
        console.warn('⚠️ Nenhuma imagem da galeria encontrada');
        return;
    }
    
    // Mapear thumbnails para índices do array completo
    galleryItems.forEach((item, index) => {
        const src = item.getAttribute('data-src');
        // Encontrar o índice real da imagem no array completo
        const realIndex = images.findIndex(img => img.src === src);
        
        // Adicionar event listener para abrir lightbox no índice correto
        item.addEventListener('click', () => {
            openLightbox(realIndex >= 0 ? realIndex : index);
        });
    });
    
    // Atualizar total de imagens (todas as 35 imagens)
    lightboxTotal.textContent = images.length;
    
    console.log(`📸 Galeria configurada: ${galleryItems.length} thumbnails, ${images.length} imagens no lightbox`);
    
    // Função para abrir o lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        console.log('📷 Lightbox aberto - Imagem:', index + 1, 'de', images.length);
    }
    
    // Função para fechar o lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
        
        console.log('❌ Lightbox fechado');
    }
    
    // Função para atualizar a imagem do lightbox
    function updateLightboxImage() {
        const currentImage = images[currentImageIndex];
        
        // Fade out
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = currentImage.src;
            lightboxCaption.textContent = currentImage.caption;
            lightboxCurrent.textContent = currentImageIndex + 1;
            
            // Fade in
            lightboxImage.style.opacity = '1';
        }, 150);
        
        // Atualizar visibilidade dos botões de navegação
        lightboxPrev.style.display = images.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = images.length > 1 ? 'flex' : 'none';
    }
    
    // Função para ir para a próxima imagem
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
        console.log('➡️ Próxima imagem:', currentImageIndex + 1, 'de', images.length);
    }
    
    // Função para ir para a imagem anterior
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
        console.log('⬅️ Imagem anterior:', currentImageIndex + 1, 'de', images.length);
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);
    
    // Adicionar clique na imagem para avançar para a próxima foto
    lightboxImage.addEventListener('click', nextImage);
    
    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Controle por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
    
    // Preload das imagens mais importantes (primeiras 20) para navegação mais suave
    function preloadImages() {
        const preloadCount = Math.min(20, images.length);
        for (let i = 0; i < preloadCount; i++) {
            const img = new Image();
            img.src = images[i].src;
            img.onload = () => {
                console.log(`✅ Imagem ${i + 1} precarregada:`, images[i].src);
            };
        }
        console.log(`🔄 Precarregando ${preloadCount} imagens de ${images.length} total`);
    }
    
    // Preload com delay para não impactar o carregamento inicial
    setTimeout(preloadImages, 2000);
    
    // Animação dos thumbnails ao scroll
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observar todos os itens da galeria
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        galleryObserver.observe(item);
    });
    
    // Touch/swipe support para mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próxima imagem
                nextImage();
            } else {
                // Swipe right - imagem anterior
                prevImage();
            }
        }
    }
    
    console.log('✅ Galeria inicializada com sucesso!');
}

// Adicionar inicialização da galeria ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    // Inicializar galeria
    setTimeout(() => {
        initializeGallery();
    }, 500);
}); 