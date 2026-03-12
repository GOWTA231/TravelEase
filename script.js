// 1. Destination Database (12 Real Locations)
const destinations = [
    { id: 1, name: "Paris, France", price: 150, img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" },
    { id: 2, name: "Tokyo, Japan", price: 200, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" },
    { id: 3, name: "New York, USA", price: 250, img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80" },
    { id: 4, name: "Bali, Indonesia", price: 80, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
    { id: 5, name: "Rome, Italy", price: 130, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" },
    { id: 6, name: "Swiss Alps, Switzerland", price: 300, img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80" },
    { id: 7, name: "Santorini, Greece", price: 180, img: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=600&q=80" },
    { id: 8, name: "Dubai, UAE", price: 220, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
    { id: 9, name: "Sydney, Australia", price: 190, img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80" },
    { id: 10, name: "Cairo, Egypt", price: 90, img: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&q=80" },
    { id: 11, name: "Cape Town, South Africa", price: 110, img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80" },
    { id: 12, name: "Rio de Janeiro, Brazil", price: 100, img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80" }
];

const container = document.getElementById('tripContainer');
const searchInput = document.getElementById('searchInput');

// 2. Render Engine & Error Handling
function displayTrips(filterText = "") {
    container.innerHTML = ""; 
    
    const filtered = destinations.filter(d => 
        d.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // Error State handling
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="not-found" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                <h2 style="color: #ef4444; font-size: 2rem; margin-bottom: 1rem;">🌍 Destination Not Found</h2>
                <p style="font-size: 1.2rem; opacity: 0.8;">This package is not available at the moment.<br>Try searching for another beautiful country.</p>
            </div>
        `;
        return; 
    }

    filtered.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="height: 200px; background: url('${dest.img}') center/cover no-repeat; border-bottom: 1px solid rgba(0,0,0,0.1);"></div>
            <h2>${dest.name}</h2>
            <p>Avg. Cost: $${dest.price}/day</p>
            <button class="wishlist-btn" onclick="saveTrip(event, '${dest.name}')">❤️ Add to Wishlist</button>
        `;
        container.appendChild(card);
    });
}

// 3. Search Listener
searchInput.addEventListener('input', (e) => displayTrips(e.target.value));

// 4. Budget Logic
const daysInput = document.getElementById('days');
const budgetInput = document.getElementById('dailyBudget');
const totalDisplay = document.getElementById('totalCost');

[daysInput, budgetInput].forEach(input => {
    input.addEventListener('input', () => {
        const total = (daysInput.value || 0) * (budgetInput.value || 0);
        totalDisplay.innerText = total.toLocaleString();
    });
});

// 5. LocalStorage & Micro-interactions
function saveTrip(event, name) {
    let list = JSON.parse(localStorage.getItem('myTrips')) || [];
    if(!list.includes(name)) {
        list.push(name);
        localStorage.setItem('myTrips', JSON.stringify(list));
        
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "✅ Added!";
        btn.style.background = "#10b981"; // Success Green
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ""; 
        }, 2000);
    }
}

// 6. Theme Engine
const themeBtn = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeBtn.innerText = "☀️ Light Mode";
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem('theme', 'light');
        themeBtn.innerText = "🌙 Dark Mode";
    }
});

// Initialize
displayTrips();