const categoriesData = [
    { id: 'cat1', name: 'ชุดรวม Full Bottle', file: 'LINE_ALBUM_1952026_260519_3.jpg' },
    { id: 'cat2', name: 'ชุดรวม Wonder ride book SG+GP', file: 'LINE_ALBUM_1952026_260519_4.jpg' },
    { id: 'cat3', name: 'ชุดรวมเหรียญ OOO', file: 'LINE_ALBUM_1952026_260519_5.jpg' },
    { id: 'cat4', name: 'ชุดรวม Card Gotchard', file: 'LINE_ALBUM_1952026_260519_6.jpg' },
    { id: 'cat5', name: 'ชุดรวม DX โปรไกด์คีย์', file: 'LINE_ALBUM_1952026_260519_7.jpg' },
    { id: 'cat6', name: 'Mystery Box ไอเทมเสริม', file: 'LINE_ALBUM_1952026_260519_14.jpg' },
    { id: 'cat7', name: 'Capsem Zeztz', file: 'LINE_ALBUM_1952026_260519_15.jpg' },
    { id: 'cat8', name: 'MysteryBox Set', file: 'LINE_ALBUM_1952026_260519_19.jpg' },
    { id: 'cat9', name: 'อุปกรณ์และไอเทมเสริม Ultraman', file: 'LINE_ALBUM_1952026_260519_20.jpg' },
    { id: 'cat10', name: 'ชุดรวม DX Ridewatch', file: 'LINE_ALBUM_1952026_260519_21.jpg' },
    { id: 'cat11', name: 'ชุดรวม DX Gashat', file: 'LINE_ALBUM_1952026_260519_22.jpg' },
    { id: 'cat12', name: 'Sentai Ring', file: 'LINE_ALBUM_1952026_260519_23.jpg' },
    { id: 'cat13', name: 'ชุดรวม DX Stamp', file: 'LINE_ALBUM_1952026_260519_24.jpg' },
    { id: 'cat14', name: 'ชุดรวม DX Wonder ride book', file: 'LINE_ALBUM_1952026_260519_25.jpg' },
    { id: 'cat15', name: 'ชุดรวม Buckle', file: 'LINE_ALBUM_1952026_260519_26.jpg' },
    { id: 'cat16', name: 'ชุดรวม Gochizo', file: 'LINE_ALBUM_1952026_260519_27.jpg' },
    { id: 'cat17', name: 'ชุดรวม เหรียญ ดองบราเธอร์', file: 'LINE_ALBUM_1952026_260519_28.jpg' },
    { id: 'cat18', name: 'ชุดรวม Ranger Key', file: 'LINE_ALBUM_1952026_260519_29.jpg' },
    { id: 'cat19', name: 'ชุดรวม Ryusoulger Key', file: 'LINE_ALBUM_1952026_260519_30.jpg' },
    { id: 'cat20', name: 'ชุดรวม Kyoryuger Key', file: 'LINE_ALBUM_1952026_260519_31.jpg' },
    { id: 'cat21', name: 'ชุดรวม DX Lockseed', file: 'LINE_ALBUM_1952026_260519_32.jpg' },
    { id: 'cat22', name: 'ชุดรวม Shift Car DX SG', file: 'LINE_ALBUM_1952026_260519_33.jpg' },
    { id: 'cat23', name: 'ชุดรวม Eyecon DX SG GP', file: 'LINE_ALBUM_1952026_260519_34.jpg' },
    { id: 'cat24', name: 'ชุดรวม Card Kamen rider', file: 'LINE_ALBUM_1952026_260519_35.jpg' },
    { id: 'cat25', name: 'ชุดรวม รถไฟ ทคคิวเจอร์', file: 'LINE_ALBUM_1952026_260519_36.jpg' },
    { id: 'cat26', name: 'ชุดรวม คิวทามะ', file: 'LINE_ALBUM_1952026_260519_37.jpg' },
    { id: 'cat27', name: 'All Super Sentai', file: 'LINE_ALBUM_1952026_260519_38.jpg' },
    { id: 'cat28', name: 'ชุดรวม Zenkaiger Gears', file: 'LINE_ALBUM_1952026_260519_39.jpg' }
];

const productsData = [];
const colors = ['bg-blue', 'bg-orange', 'bg-yellow', 'bg-purple'];
const emojis = ['🎁', '✨', '🔥', '💎', '🚀'];
categoriesData.forEach((cat, index) => {
    // Generate 3 sample products per category
    for (let i = 1; i <= 3; i++) {
        productsData.push({
            id: `p_${cat.id}_${i}`,
            name: `${cat.name} - ไอเท็ม ${i}`,
            price: 199 + (i * 100) + (index * 10),
            emoji: emojis[(index + i) % emojis.length],
            category: cat.id,
            color: colors[(index + i) % colors.length]
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // --- State ---
    let cart = [];
    try {
        const savedCart = localStorage.getItem('khunAuCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        console.error('Could not load cart', e);
    }

    // --- Elements ---
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view-section');
    const homeProductsContainer = document.getElementById('home-products');
    const shopProductsContainer = document.getElementById('shop-products');
    const homeCategoriesGrid = document.getElementById('home-categories-grid');
    const categoryFiltersContainer = document.getElementById('category-filters');

    // Bottom Cart Elements
    const bottomCartBar = document.getElementById('bottom-cart-bar');
    const bottomCartCount = document.getElementById('bottom-cart-count');
    const bottomCartTotal = document.getElementById('bottom-cart-total');
    const bottomCartClear = document.getElementById('bottom-cart-clear');
    const bottomCartCheckout = document.getElementById('bottom-cart-checkout');

    // Modal Elements
    const productModal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('product-modal-overlay');
    const closeModal = document.getElementById('close-modal');
    const modalAddToCart = document.getElementById('modal-add-to-cart');

    // --- Render Categories on Home Page ---
    function renderHomeCategories() {
        if (!homeCategoriesGrid) return;
        homeCategoriesGrid.innerHTML = '';
        categoriesData.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.setAttribute('data-category', cat.id);
            card.innerHTML = `
                <div class="cat-image-wrapper">
                    <img src="${cat.file}" alt="${cat.name}" class="cat-img">
                </div>
                <h3>${cat.name}</h3>
            `;
            homeCategoriesGrid.appendChild(card);
        });
    }
    renderHomeCategories();

    // --- Initialization ---
    // Randomize products for home page display
    const shuffledProducts = [...productsData].sort(() => 0.5 - Math.random());
    renderProducts(shuffledProducts, homeProductsContainer, 8); // Show 8 random products on home
    renderProducts(productsData, shopProductsContainer);    // Show all on shop

    // --- Navigation (SPA routing) ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            if (targetId === 'view-shop') {
                renderProducts(productsData, shopProductsContainer);
            }

            views.forEach(view => {
                if (view.id === targetId) {
                    view.classList.remove('hidden');
                    view.style.opacity = 0;
                    setTimeout(() => view.style.opacity = 1, 50);
                } else {
                    view.classList.add('hidden');
                }
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });


    function updateBottomCartUI() {
        if (!bottomCartBar) return;

        if (cart.length > 0) {
            bottomCartBar.classList.add('show');
            document.body.classList.add('cart-bar-visible');
            bottomCartCount.textContent = cart.length;

            let total = 0;
            cart.forEach(item => total += parseFloat(item.price));
            bottomCartTotal.textContent = `฿${total.toFixed(2)}`;
        } else {
            bottomCartBar.classList.remove('show');
            document.body.classList.remove('cart-bar-visible');
        }

        localStorage.setItem('khunAuCart', JSON.stringify(cart));
    }

    function addToCart(item) {
        cart.push(item);
        updateBottomCartUI();
        createConfetti();
    }

    if (bottomCartClear) {
        bottomCartClear.addEventListener('click', () => {
            cart = [];
            updateBottomCartUI();
        });
    }

    if (bottomCartCheckout) {
        bottomCartCheckout.addEventListener('click', () => {
            if (cart.length > 0) {
                window.open('checkout.html', '_blank');
            }
        });
    }

    // --- Floating LINE Widget Logic ---
    const lineWidgetToggle = document.getElementById('line-widget-toggle');
    const lineWidgetCard = document.getElementById('line-widget-card');
    const lineWidgetClose = document.getElementById('line-widget-close');
    
    if (lineWidgetToggle && lineWidgetCard) {
        // Toggle widget card open/close
        lineWidgetToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            lineWidgetCard.classList.toggle('open');
            // Hide notification badge when card is opened
            const badge = lineWidgetToggle.querySelector('.line-toggle-badge');
            if (badge) badge.style.display = 'none';
        });
        
        // Close widget card when clicking close button
        if (lineWidgetClose) {
            lineWidgetClose.addEventListener('click', (e) => {
                e.stopPropagation();
                lineWidgetCard.classList.remove('open');
            });
        }
        
        // Close widget card when clicking outside
        document.addEventListener('click', (e) => {
            if (!lineWidgetCard.contains(e.target) && !lineWidgetToggle.contains(e.target)) {
                lineWidgetCard.classList.remove('open');
            }
        });
    }

    // Initialize Bottom Cart UI on load
    updateBottomCartUI();

    // Listen for storage events to sync cart across tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'khunAuCart') {
            try {
                cart = JSON.parse(e.newValue) || [];
                updateBottomCartUI();
            } catch (err) {
                console.error('Storage sync error', err);
            }
        }
    });

    // --- Rendering Products ---
    function renderProducts(products, container, limit = null) {
        if (!container) return;
        container.innerHTML = '';
        const displayProducts = limit ? products.slice(0, limit) : products;

        displayProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img ${product.color}">${product.emoji}</div>
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <h4>${product.name}</h4>
                <div class="price">฿${product.price}</div>
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-emoji="${product.emoji}" data-color="${product.color}">เพิ่มสินค้า</button>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-to-cart-btn')) {
                    openModal(product);
                }
            });

            container.appendChild(card);
        });

        container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const t = e.target;
                
                // Play pop sound
                if (typeof playPopSound === 'function') playPopSound();

                addToCart({
                    id: t.getAttribute('data-id'),
                    name: t.getAttribute('data-name'),
                    price: t.getAttribute('data-price'),
                    emoji: t.getAttribute('data-emoji'),
                    color: t.getAttribute('data-color')
                });

                const originalText = t.textContent;
                t.textContent = "เพิ่มแล้ว! ✓";
                t.style.backgroundColor = 'var(--purple)';
                setTimeout(() => {
                    t.textContent = originalText;
                    t.style.backgroundColor = '';
                }, 1000);
            });
        });
    }

    // --- Product Modal ---
    function openModal(product) {
        document.getElementById('modal-img').textContent = product.emoji;
        document.getElementById('modal-img').className = `main-image ${product.color}`;
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-price').textContent = `฿${product.price}`;

        modalAddToCart.onclick = () => {
            addToCart(product);
        };

        productModal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');

        setTimeout(() => {
            productModal.classList.add('show');
        }, 10);
    }

    function closeModalFunc() {
        productModal.classList.remove('show');
        setTimeout(() => {
            productModal.classList.add('hidden');
            modalOverlay.classList.add('hidden');
        }, 300);
    }

    closeModal.addEventListener('click', closeModalFunc);
    modalOverlay.addEventListener('click', closeModalFunc);

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active');
            document.getElementById(`tab-${btn.getAttribute('data-tab')}`).classList.remove('hidden');
        });
    });

    // --- Mystery Box Widget ---
    const mysteryBox = document.getElementById('mystery-box');
    const mysteryReveal = document.getElementById('mystery-reveal');
    const freeShippingCodeEl = document.getElementById('free-shipping-code');
    const mysteryCountdownEl = document.getElementById('mystery-countdown');
    let boxOpened = false;
    let countdownInterval = null;

    function startMysteryCountdown(endTime) {
        if (countdownInterval) clearInterval(countdownInterval);

        function updateTimer() {
            const now = Date.now();
            const remaining = endTime - now;

            if (remaining <= 0) {
                clearInterval(countdownInterval);
                localStorage.removeItem('mysteryBoxTimerEnd');
                localStorage.removeItem('mysteryBoxCode');
                
                // Reset box state
                mysteryBox.classList.remove('revealed');
                mysteryReveal.classList.add('hidden');
                boxOpened = false;
                if (mysteryCountdownEl) {
                    mysteryCountdownEl.textContent = '10:00';
                }
                return;
            }

            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            if (mysteryCountdownEl) {
                mysteryCountdownEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    function checkActiveTimer() {
        const savedEndTime = localStorage.getItem('mysteryBoxTimerEnd');
        const savedCode = localStorage.getItem('mysteryBoxCode');

        if (savedEndTime && savedCode) {
            const endTime = parseInt(savedEndTime, 10);
            if (endTime > Date.now()) {
                boxOpened = true;
                if (freeShippingCodeEl) {
                    freeShippingCodeEl.textContent = savedCode;
                }
                mysteryBox.classList.add('revealed');
                mysteryReveal.classList.remove('hidden');
                startMysteryCountdown(endTime);
            } else {
                localStorage.removeItem('mysteryBoxTimerEnd');
                localStorage.removeItem('mysteryBoxCode');
            }
        }
    }

    if (mysteryBox) {
        checkActiveTimer();

        mysteryBox.addEventListener('click', () => {
            if (boxOpened) return;
            
            // Play magic sound
            if (typeof playMagicSound === 'function') playMagicSound();
            
            mysteryBox.classList.add('shaking');

            // Generate 5 char random alphanumeric code
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 5; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            if (freeShippingCodeEl) {
                freeShippingCodeEl.textContent = code;
            }

            setTimeout(() => {
                mysteryBox.classList.remove('shaking');
                mysteryBox.classList.add('revealed');
                mysteryReveal.classList.remove('hidden');
                createConfetti();
                boxOpened = true;

                // 10 minutes countdown
                const duration = 10 * 60 * 1000; // 10 minutes in ms
                const endTime = Date.now() + duration;
                localStorage.setItem('mysteryBoxTimerEnd', endTime);
                localStorage.setItem('mysteryBoxCode', code);
                startMysteryCountdown(endTime);
            }, 800);
        });
    }

    // --- Confetti Effect ---
    function createConfetti() {
        const colors = ['#FDE047', '#FB923C', '#7DD3FC', '#C084FC'];
        const container = document.body;

        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;

            confetti.style.left = startX + 'px';
            confetti.style.top = startY + 'px';
            confetti.style.zIndex = 3000;

            container.appendChild(confetti);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 10 + Math.random() * 15;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 10;

            let posX = startX;
            let posY = startY;
            let currentVy = vy;
            let time = 0;

            const animate = () => {
                time++;
                posX += vx;
                currentVy += 0.5;
                posY += currentVy;

                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.transform = `rotate(${time * 10}deg)`;

                if (posY < window.innerHeight + 20 && posX > -20 && posX < window.innerWidth + 20) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            requestAnimationFrame(animate);
        }
    }

    // Make category cards clickable to filter
    function attachCategoryCardListeners() {
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.getAttribute('data-category');

                const shopLink = document.querySelector('[data-target="view-shop"]');
                if (shopLink) shopLink.click();

                let filteredProducts = productsData.filter(p => p.category === cat);
                renderProducts(filteredProducts, shopProductsContainer);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
    setTimeout(attachCategoryCardListeners, 100);

    // --- Dark Mode Logic ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    function setDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            if(sunIcon) sunIcon.classList.remove('hidden');
            if(moonIcon) moonIcon.classList.add('hidden');
            localStorage.setItem('khunAuDarkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            if(sunIcon) sunIcon.classList.add('hidden');
            if(moonIcon) moonIcon.classList.remove('hidden');
            localStorage.setItem('khunAuDarkMode', 'false');
        }
    }

    if (localStorage.getItem('khunAuDarkMode') === 'true') {
        setDarkMode(true);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            setDarkMode(!isDark);
        });
    }

    // --- Search Logic ---
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // Go to shop view if searching
            const shopLink = document.querySelector('[data-target="view-shop"]');
            const viewShop = document.getElementById('view-shop');
            if (shopLink && viewShop && viewShop.classList.contains('hidden') && query.length > 0) {
                shopLink.click();
            }

            const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
            renderProducts(filtered, shopProductsContainer);
        });
    }

});

// --- Sound Effects (Web Audio API) ---
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

window.playPopSound = function() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } catch(e) { console.error('Audio error', e); }
};

window.playMagicSound = function() {
    try {
        initAudio();
        const now = audioCtx.currentTime;
        const freqs = [880, 1108, 1318, 1760]; // Magical chord
        freqs.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.1 + (i * 0.1));
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6 + (i * 0.1));
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + (i * 0.1));
            osc.stop(now + 0.6 + (i * 0.1));
        });
    } catch(e) { console.error('Audio error', e); }
};
