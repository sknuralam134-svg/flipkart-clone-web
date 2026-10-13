const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 134900,
    oldPrice: 144900,
    image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._SL1500_.jpg",
    description: "Apple iPhone 15 Pro 128GB - Natural Titanium. A17 Pro chip, 48MP main camera, Action button, USB-C."
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 74999,
    oldPrice: 89999,
    image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
    description: "Samsung Galaxy S24 5G 256GB. Snapdragon 8 Gen 3, 50MP camera, 120Hz AMOLED display."
  },
  {
    id: 3,
    name: "Nike Air Max Shoes",
    price: 8995,
    oldPrice: 12995,
    image: "https://m.media-amazon.com/images/I/71zLvwVXgEL._SL1500_.jpg",
    description: "Nike Air Max Running Shoes for Men. Lightweight, comfortable cushioning and stylish design."
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    price: 29990,
    oldPrice: 34990,
    image: "https://m.media-amazon.com/images/I/61vR3x5sTtL._SL1500_.jpg",
    description: "Sony Wireless Noise Cancelling Headphones. Industry leading ANC, 30 hours battery."
  },
  {
    id: 5,
    name: "Levi's Men Slim Jeans",
    price: 2499,
    oldPrice: 3999,
    image: "https://m.media-amazon.com/images/I/81h4Yw0nKqL._UL1500_.jpg",
    description: "Levi's 511 Slim Fit Jeans for Men. Stretchable denim, comfortable all day wear."
  },
  {
    id: 6,
    name: "boAt Airdopes 141",
    price: 1299,
    oldPrice: 4490,
    image: "https://m.media-amazon.com/images/I/51HBom8xz7L._SL1500_.jpg",
    description: "boAt Airdopes 141 True Wireless Earbuds with 42 Hours Playback, IPX4, ASAP Charge."
  },
  {
    id: 7,
    name: "OnePlus Nord CE 3",
    price: 22999,
    oldPrice: 26999,
    image: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SL1500_.jpg",
    description: "OnePlus Nord CE 3 5G 128GB. 80W SuperVOOC charging, 50MP camera, 120Hz AMOLED."
  },
  {
    id: 8,
    name: "Noise ColorFit Pro 4",
    price: 2499,
    oldPrice: 5999,
    image: "https://m.media-amazon.com/images/I/61ZzwAUXiDL._SL1500_.jpg",
    description: "Noise ColorFit Pro 4 Smart Watch with Bluetooth Calling, 1.78 AMOLED, SpO2 monitoring."
  }
];

let cart = [];

// Load cart from localStorage
function loadCart() {
  const saved = localStorage.getItem("flipkart_cart");
  if (saved) {
    cart = JSON.parse(saved);
  }
  updateCartCount();
}

function saveCart() {
  localStorage.setItem("flipkart_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = count;
}

// Render products
function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p style='grid-column:1/-1;text-align:center;padding:40px;color:#878787'>No products found</p>";
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => showDetail(p.id);
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">₹${p.price.toLocaleString("en-IN")} <span>₹${p.oldPrice.toLocaleString("en-IN")}</span></div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

function showDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("cartPage").classList.add("hidden");
  document.getElementById("successPage").classList.add("hidden");
  document.getElementById("detailPage").classList.remove("hidden");

  document.getElementById("productDetail").innerHTML = `
    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
    <div class="detail-name">${product.name}</div>
    <div class="detail-price">₹${product.price.toLocaleString("en-IN")}</div>
    <div class="detail-desc">${product.description}</div>
    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
      <i class="fas fa-shopping-cart"></i> Add to Cart
    </button>
  `;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  alert("Added to Cart!");
}

function showCart() {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("detailPage").classList.add("hidden");
  document.getElementById("successPage").classList.add("hidden");
  document.getElementById("cartPage").classList.remove("hidden");

  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");
  const empty = document.getElementById("emptyCart");

  if (cart.length === 0) {
    container.innerHTML = "";
    summary.classList.add("hidden");
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");
  summary.classList.remove("hidden");

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price.toLocaleString("en-IN")}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById("cartTotal").textContent = "₹" + total.toLocaleString("en-IN");
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  renderCart();
}

function placeOrder() {
  if (cart.length === 0) return;

  cart = [];
  saveCart();

  document.getElementById("cartPage").classList.add("hidden");
  document.getElementById("successPage").classList.remove("hidden");
}

function showHome() {
  document.getElementById("detailPage").classList.add("hidden");
  document.getElementById("cartPage").classList.add("hidden");
  document.getElementById("successPage").classList.add("hidden");
  document.getElementById("homePage").classList.remove("hidden");
  document.getElementById("searchInput").value = "";
  renderProducts();
}

// Init
loadCart();
renderProducts();
