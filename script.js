// Movie Data Repository
const moviesData = [
  {
    id: "m1",
    title: "Project Hail Mary",
    year: 2026,
    rating: 9.2,
    duration: "2h 35m",
    genre: "Sci-Fi",
    price: 16.50,
    featured: true,
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
    synopsis: "Ryland Grace is the sole survivor on a desperate, last-chance mission to save humanity from an extinction-level solar crisis. He must use science and unexpected alien camaraderie to overcome impossible odds.",
    cast: [
      { name: "Ryan Gosling", role: "Ryland Grace", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
      { name: "Sandra Hüller", role: "Eva Stratt", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "m2",
    title: "Cyber Neon: 2099",
    year: 2026,
    rating: 8.8,
    duration: "2h 15m",
    genre: "Action",
    price: 15.00,
    poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    synopsis: "In a sprawling dystopian metropolis illuminated by neon, an augmented mercenary uncovers a corporate conspiracy that threatens to rewire human consciousness.",
    cast: [
      { name: "Keanu Reeves", role: "Johnny V", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
      { name: "Ana de Armas", role: "Nyx", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "m3",
    title: "The Celestial Kingdom",
    year: 2026,
    rating: 9.0,
    duration: "1h 50m",
    genre: "Animation",
    price: 13.50,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    synopsis: "A breathtaking animated journey following a young starweaver who ventures beyond the cosmos to restore light to dying constellations.",
    cast: [
      { name: "Zendaya", role: "Astra", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop" },
      { name: "Tom Holland", role: "Orion", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "m4",
    title: "Shadows in the Deep",
    year: 2026,
    rating: 8.4,
    duration: "1h 58m",
    genre: "Horror",
    price: 14.00,
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    synopsis: "A deep-sea research team stranded at the bottom of the Mariana Trench discovers an ancient aquatic entity that feeds on human fear.",
    cast: [
      { name: "Florence Pugh", role: "Dr. Clara", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "m5",
    title: "Whispers of Venice",
    year: 2026,
    rating: 8.7,
    duration: "2h 10m",
    genre: "Drama",
    price: 14.50,
    poster: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1200&auto=format&fit=crop",
    synopsis: "An emotional tale of love, secrets, and art forgery set along the romantic canals of 1950s Italy.",
    cast: [
      { name: "Timothée Chalamet", role: "Lorenzo", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" }
    ]
  }
];

// App State Management
let currentFilter = 'All';
let searchQuery = '';
let cart = [];
let watchlist = [];
let activeMovie = null;
let selectedSeats = [];
let discountApplied = 0;

// DOM Element Selections
const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('searchInput');
const genrePills = document.getElementById('genrePills');
const cartBtn = document.getElementById('cartBtn');
const watchlistBtn = document.getElementById('watchlistBtn');
const cartCount = document.getElementById('cartCount');
const watchlistCount = document.getElementById('watchlistCount');
const cartDrawer = document.getElementById('cartDrawer');
const closeCartDrawer = document.getElementById('closeCartDrawer');
const cartItemsContainer = document.getElementById('cartItemsContainer');

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  renderHeroBanner();
  renderMovies();
  setupEventListeners();
});

// Render Hero Banner
function renderHeroBanner() {
  const featured = moviesData.find(m => m.featured) || moviesData[0];
  document.getElementById('heroBanner').style.backgroundImage = `url('${featured.banner}')`;
  document.getElementById('heroTitle').innerText = featured.title;
  document.getElementById('heroRating').innerText = featured.rating;
  document.getElementById('heroYear').innerText = featured.year;
  document.getElementById('heroGenre').innerText = featured.genre;
  document.getElementById('heroDuration').innerText = featured.duration;
  document.getElementById('heroDesc').innerText = featured.synopsis;

  document.getElementById('heroBookBtn').onclick = () => openBookingModal(featured);
  document.getElementById('heroTrailerBtn').onclick = () => showToast(`Playing 4K Trailer for ${featured.title}... 🎬`);
}

// Render Movies Grid
function renderMovies() {
  movieGrid.innerHTML = '';

  const filtered = moviesData.filter(movie => {
    const matchesGenre = currentFilter === 'All' || movie.genre === currentFilter;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (filtered.length === 0) {
    movieGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No movies found matching your criteria.</p>`;
    return;
  }

  filtered.forEach(movie => {
    const isSaved = watchlist.includes(movie.id);
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <div class="card-poster">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
        <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${movie.id}">
          <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark"></i>
        </button>
      </div>
      <div class="card-content">
        <div>
          <h3 class="card-title">${movie.title}</h3>
          <div class="card-meta">
            <span>${movie.year} • ${movie.genre}</span>
            <span class="rating-tag"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
          </div>
        </div>
        <button class="card-btn book-now-btn"><i class="fa-solid fa-ticket"></i> Book Tickets ($${movie.price.toFixed(2)})</button>
      </div>
    `;

    // Card Event Listeners
    card.querySelector('.card-poster').addEventListener('click', () => openDetailModal(movie));
    card.querySelector('.card-title').addEventListener('click', () => openDetailModal(movie));
    
    card.querySelector('.bookmark-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWatchlist(movie.id);
    });

    card.querySelector('.book-now-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openBookingModal(movie);
    });

    movieGrid.appendChild(card);
  });
}

// Detail Modal Controller
function openDetailModal(movie) {
  activeMovie = movie;
  document.getElementById('modalHeroBg').style.backgroundImage = `url('${movie.banner}')`;
  document.getElementById('modalPoster').src = movie.poster;
  document.getElementById('modalTitle').innerText = movie.title;
  document.getElementById('modalSynopsis').innerText = movie.synopsis;

  const tags = document.getElementById('modalTags');
  tags.innerHTML = `
    <span class="tag" style="color: var(--gold-primary); font-weight:700;"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
    <span class="tag">${movie.year}</span>
    <span class="tag">${movie.duration}</span>
    <span class="tag">${movie.genre}</span>
  `;

  const castList = document.getElementById('modalCastList');
  castList.innerHTML = movie.cast.map(c => `
    <div class="cast-card">
      <img src="${c.img}" class="cast-img" alt="${c.name}">
      <div class="cast-name">${c.name}</div>
      <div class="cast-role">${c.role}</div>
    </div>
  `).join('');

  document.getElementById('modalBookBtn').onclick = () => {
    closeModal('detailModal');
    openBookingModal(movie);
  };

  openModal('detailModal');
}

// Seat Booking Engine
function openBookingModal(movie) {
  activeMovie = movie;
  selectedSeats = [];
  document.getElementById('bookingMovieTitle').innerText = `Book Tickets - ${movie.title}`;
  renderSeatsGrid();
  updateBookingTotal();
  openModal('bookingModal');
}

function renderSeatsGrid() {
  const seatsGrid = document.getElementById('seatsGrid');
  seatsGrid.innerHTML = '';
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 8;

  rows.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';
    rowDiv.innerHTML = `<span class="row-label">${row}</span>`;

    for (let i = 1; i <= seatsPerRow; i++) {
      const seatId = `${row}${i}`;
      const isOccupied = (row === 'B' && i === 3) || (row === 'D' && i === 5);

      const seat = document.createElement('div');
      seat.className = `seat ${isOccupied ? 'occupied' : ''}`;
      seat.dataset.seatId = seatId;

      if (!isOccupied) {
        seat.addEventListener('click', () => {
          if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatId);
          } else {
            seat.classList.add('selected');
            selectedSeats.push(seatId);
          }
          updateBookingTotal();
        });
      }

      rowDiv.appendChild(seat);
    }
    seatsGrid.appendChild(rowDiv);
  });
}

function updateBookingTotal() {
  const total = selectedSeats.length * (activeMovie ? activeMovie.price : 0);
  document.getElementById('bookingTotalPrice').innerText = `$${total.toFixed(2)}`;
  const addBtn = document.getElementById('addToCartBtn');
  addBtn.disabled = selectedSeats.length === 0;
}

// Cart System Controller
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const timeSelect = document.getElementById('timeSelect').value;
  const item = {
    cartId: Date.now(),
    movie: activeMovie,
    showtime: timeSelect,
    seats: [...selectedSeats],
    price: activeMovie.price * selectedSeats.length
  };

  cart.push(item);
  updateCartUI();
  closeModal('bookingModal');
  openCartDrawer();
  showToast(`Added ${selectedSeats.length} ticket(s) to your cart! 🎟️`);
});

function updateCartUI() {
  cartCount.innerText = cart.length;
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Your cart is currently empty.</p>`;
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.movie.poster}" class="cart-item-img" alt="Poster">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.movie.title}</div>
          <div class="cart-item-meta">${item.showtime}</div>
          <div class="cart-item-meta">Seats: <strong>${item.seats.join(', ')}</strong></div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <button style="background:none; border:none; color:var(--danger); cursor:pointer;" onclick="removeCartItem(${item.cartId})">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = subtotal * discountApplied;
  const total = subtotal - discount;

  document.getElementById('cartSubtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartDiscount').innerText = `-$${discount.toFixed(2)}`;
  document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
}

window.removeCartItem = function(cartId) {
  cart = cart.filter(i => i.cartId !== cartId);
  updateCartUI();
  showToast('Item removed from cart.');
};

// Promo Code Logic
document.getElementById('applyPromoBtn').addEventListener('click', () => {
  const code = document.getElementById('promoCode').value.trim().toUpperCase();
  if (code === 'MAJESTIC20') {
    discountApplied = 0.20;
    showToast('20% Promo Discount Applied! 🎉');
  } else {
    showToast('Invalid promo code. Try "MAJESTIC20"');
  }
  updateCartUI();
});

// Checkout Action
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  showToast('Processing payment... 💳');
  setTimeout(() => {
    cart = [];
    discountApplied = 0;
    updateCartUI();
    closeCartDrawerFunc();
    showToast('Booking Confirmed! Check your email for QR tickets. 🍿✨');
  }, 1500);
});

// Watchlist Logic
function toggleWatchlist(movieId) {
  if (watchlist.includes(movieId)) {
    watchlist = watchlist.filter(id => id !== movieId);
    showToast('Removed from Watchlist');
  } else {
    watchlist.push(movieId);
    showToast('Saved to Watchlist! ⭐');
  }
  watchlistCount.innerText = watchlist.length;
  renderMovies();
}

// Modal & Drawer Helpers
function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function openCartDrawer() {
  cartDrawer.classList.add('open');
}

function closeCartDrawerFunc() {
  cartDrawer.classList.remove('open');
}

// Event Listeners Registration
function setupEventListeners() {
  genrePills.addEventListener('click', (e) => {
    if (e.target.classList.contains('pill')) {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.genre;
      renderMovies();
    }
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderMovies();
  });

  document.getElementById('closeDetailModal').onclick = () => closeModal('detailModal');
  document.getElementById('closeBookingModal').onclick = () => closeModal('bookingModal');
  cartBtn.onclick = openCartDrawer;
  closeCartDrawer.onclick = closeCartDrawerFunc;

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    });
  });
}

// Toast Notifications System
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--gold-primary);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
