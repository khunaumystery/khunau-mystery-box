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
                    <img src="products/${cat.file}" alt="${cat.name}" class="cat-img">
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

    document.getElementById('hero-cta').addEventListener('click', () => {
        const shopLink = document.querySelector('[data-target="view-shop"]');
        if (shopLink) shopLink.click();
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
                const savedUser = localStorage.getItem('khunAuUser');
                if (!savedUser) {
                    openAuthModal('signin');
                    showAuthMessage('⚠️ กรุณาเข้าสู่ระบบก่อนทำการชำระเงินครับ!', 'error');
                } else {
                    window.open('checkout.html', '_blank');
                }
            }
        });
    }

    // --- Floating LINE Widget Logic ---
    const lineWidgetToggle = document.getElementById('line-widget-toggle');
    const lineWidgetCard = document.getElementById('line-widget-card');
    const lineWidgetClose = document.getElementById('line-widget-close');

    if (lineWidgetToggle && lineWidgetCard) {
        lineWidgetToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            lineWidgetCard.classList.toggle('open');
            const badge = lineWidgetToggle.querySelector('.line-toggle-badge');
            if (badge) badge.style.display = 'none';
        });
        if (lineWidgetClose) {
            lineWidgetClose.addEventListener('click', (e) => {
                e.stopPropagation();
                lineWidgetCard.classList.remove('open');
            });
        }
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
        modalAddToCart.onclick = () => { addToCart(product); };
        productModal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
        setTimeout(() => { productModal.classList.add('show'); }, 10);
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
                mysteryBox.classList.remove('revealed');
                mysteryReveal.classList.add('hidden');
                boxOpened = false;
                if (mysteryCountdownEl) mysteryCountdownEl.textContent = '10:00';
                return;
            }
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            if (mysteryCountdownEl) mysteryCountdownEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
                if (freeShippingCodeEl) freeShippingCodeEl.textContent = savedCode;
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
            mysteryBox.classList.add('shaking');
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            if (freeShippingCodeEl) freeShippingCodeEl.textContent = code;
            setTimeout(() => {
                mysteryBox.classList.remove('shaking');
                mysteryBox.classList.add('revealed');
                mysteryReveal.classList.remove('hidden');
                createConfetti();
                boxOpened = true;
                const endTime = Date.now() + 10 * 60 * 1000;
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
            let posX = startX, posY = startY, currentVy = vy, time = 0;
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
                renderProducts(productsData.filter(p => p.category === cat), shopProductsContainer);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
    setTimeout(attachCategoryCardListeners, 100);

    // ============================================================
    // --- AUTH SYSTEM ---
    // ============================================================
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbySM-w6s4uCCbqMbFU1vv7Ys2lRIX17teAokrdOxPNb2dUm5PhOfrv8pch8-lSE_hEa/exec';

    const authModal = document.getElementById('auth-modal');
    const authOverlay = document.getElementById('auth-modal-overlay');
    const closeAuthBtn = document.getElementById('close-auth-modal');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const navSignupBtn = document.getElementById('nav-signup-btn');
    const navAuthContainer = document.getElementById('nav-auth-container');

    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const authMsgEl = document.getElementById('auth-message');

    const tabSigninBtn = document.getElementById('tab-signin-btn');
    const tabSignupBtn = document.getElementById('tab-signup-btn');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToSignin = document.getElementById('switch-to-signin');

    function showAuthMessage(msg, type) {
        if (!authMsgEl) return;
        authMsgEl.textContent = msg;
        authMsgEl.style.display = 'block';
        if (type === 'error') {
            authMsgEl.style.background = '#fee2e2';
            authMsgEl.style.color = '#ef4444';
            authMsgEl.style.border = '1px solid #fca5a5';
        } else {
            authMsgEl.style.background = '#dcfce7';
            authMsgEl.style.color = '#15803d';
            authMsgEl.style.border = '1px solid #86efac';
        }
    }

    function clearAuthMessage() {
        if (!authMsgEl) return;
        authMsgEl.textContent = '';
        authMsgEl.style.display = 'none';
    }

    function switchTab(tab) {
        clearAuthMessage();
        if (tab === 'signin') {
            signinForm.style.display = 'block';
            signupForm.style.display = 'none';
            tabSigninBtn.style.color = 'var(--purple)';
            tabSigninBtn.style.borderBottom = '3px solid var(--purple)';
            tabSignupBtn.style.color = '#94a3b8';
            tabSignupBtn.style.borderBottom = '3px solid transparent';
        } else {
            signinForm.style.display = 'none';
            signupForm.style.display = 'block';
            tabSignupBtn.style.color = 'var(--purple)';
            tabSignupBtn.style.borderBottom = '3px solid var(--purple)';
            tabSigninBtn.style.color = '#94a3b8';
            tabSigninBtn.style.borderBottom = '3px solid transparent';
        }
    }

    function openAuthModal(tab = 'signin') {
        if (!authModal || !authOverlay) return;
        switchTab(tab);
        authModal.style.display = 'block';
        authOverlay.style.display = 'block';
        setTimeout(() => { authModal.style.transform = 'translate(-50%,-50%) scale(1)'; }, 10);
    }

    function closeAuthModal() {
        if (!authModal || !authOverlay) return;
        authModal.style.transform = 'translate(-50%,-50%) scale(0.9)';
        setTimeout(() => {
            authModal.style.display = 'none';
            authOverlay.style.display = 'none';
            clearAuthMessage();
        }, 300);
    }

    if (tabSigninBtn) tabSigninBtn.addEventListener('click', () => switchTab('signin'));
    if (tabSignupBtn) tabSignupBtn.addEventListener('click', () => switchTab('signup'));
    if (switchToSignup) switchToSignup.addEventListener('click', () => switchTab('signup'));
    if (switchToSignin) switchToSignin.addEventListener('click', () => switchTab('signin'));
    if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuthModal);
    if (authOverlay) authOverlay.addEventListener('click', closeAuthModal);
    if (navLoginBtn) navLoginBtn.addEventListener('click', () => openAuthModal('signin'));
    if (navSignupBtn) navSignupBtn.addEventListener('click', () => openAuthModal('signup'));

    async function callGAS(action, data) {
        try {
            const res = await fetch(GAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action, ...data })
            });
            return await res.json();
        } catch (err) {
            // Fallback to localStorage mock
            const users = JSON.parse(localStorage.getItem('khunAuMockUsers') || '[]');
            if (action === 'signup') {
                const exists = users.some(u => u.username.toLowerCase() === data.username.toLowerCase() || u.email.toLowerCase() === data.email.toLowerCase());
                if (exists) return { success: false, message: 'ชื่อผู้ใช้หรืออีเมลนี้มีอยู่ในระบบแล้ว' };
                users.push({ username: data.username, email: data.email, password: data.password });
                localStorage.setItem('khunAuMockUsers', JSON.stringify(users));
                return { success: true, message: 'สมัครสมาชิกสำเร็จ! (โหมดออฟไลน์)' };
            } else {
                const found = users.find(u => (u.username.toLowerCase() === data.username.toLowerCase() || u.email.toLowerCase() === data.username.toLowerCase()) && u.password === data.password);
                if (found) return { success: true, message: 'เข้าสู่ระบบสำเร็จ!', user: { username: found.username, email: found.email } };
                return { success: false, message: 'ชื่อผู้ใช้/อีเมล หรือรหัสผ่านไม่ถูกต้อง' };
            }
        }
    }

    function updateNavbarForUser(user) {
        if (!navAuthContainer) return;
        if (user) {
            if (navSignupBtn) navSignupBtn.style.display = 'none';
            navAuthContainer.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.7rem;">
                    <span style="font-weight:bold; font-size:1rem;">👤 ${user.username}</span>
                    <button id="logout-btn" style="background:#fee2e2; color:#ef4444; border:none; border-radius:8px; padding:0.35rem 0.7rem; font-weight:bold; cursor:pointer;">ออกจากระบบ</button>
                </div>
            `;
            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('khunAuUser');
                if (navSignupBtn) navSignupBtn.style.display = 'block';
                updateNavbarForUser(null);
            });
        } else {
            navAuthContainer.innerHTML = `<button id="nav-login-btn" style="border-radius:12px; font-weight:bold; padding:0.4rem 0.9rem; background-color:var(--purple); border:none; color:white; cursor:pointer; font-size:1rem;">🔑 เข้าสู่ระบบ</button>`;
            document.getElementById('nav-login-btn').addEventListener('click', () => openAuthModal('signin'));
        }
    }

    // Sign In Submit
    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('signin-btn');
            btn.disabled = true; btn.textContent = 'กำลังตรวจสอบ...';
            clearAuthMessage();
            const res = await callGAS('login', {
                username: document.getElementById('signin-username').value,
                password: document.getElementById('signin-password').value
            });
            if (res.success) {
                localStorage.setItem('khunAuUser', JSON.stringify(res.user));
                showAuthMessage('✅ ' + res.message, 'success');
                setTimeout(() => { closeAuthModal(); updateNavbarForUser(res.user); createConfetti(); }, 1000);
            } else {
                showAuthMessage('❌ ' + res.message, 'error');
            }
            btn.disabled = false; btn.textContent = 'เข้าสู่ระบบ';
        });
    }

    // Sign Up Submit
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const pw = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            if (pw !== confirm) { showAuthMessage('❌ รหัสผ่านไม่ตรงกัน', 'error'); return; }
            const btn = document.getElementById('signup-btn');
            btn.disabled = true; btn.textContent = 'กำลังบันทึก...';
            clearAuthMessage();
            const res = await callGAS('signup', {
                username: document.getElementById('signup-username').value,
                email: document.getElementById('signup-email').value,
                password: pw
            });
            if (res.success) {
                showAuthMessage('✅ ' + res.message, 'success');
                const savedUsername = document.getElementById('signup-username').value;
                setTimeout(() => {
                    switchTab('signin');
                    document.getElementById('signin-username').value = savedUsername;
                }, 1500);
            } else {
                showAuthMessage('❌ ' + res.message, 'error');
            }
            btn.disabled = false; btn.textContent = 'สมัครสมาชิก';
        });
    }

    // Load saved user on page load
    const savedUser = localStorage.getItem('khunAuUser');
    if (savedUser) {
        updateNavbarForUser(JSON.parse(savedUser));
    }

});

