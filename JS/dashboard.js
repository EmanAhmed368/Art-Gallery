// ============================================
//  SMOOTH SLIDING TAB UNDERLINE
// ============================================
const tabNav = document.querySelector('.dash-tabs');
const tabBtns = document.querySelectorAll('.tab-btn');

// Create the sliding underline element
const slider = document.createElement('span');
slider.classList.add('tab-slider');
tabNav.appendChild(slider);

function moveSlider(btn) {
  slider.style.width = btn.offsetWidth + 'px';
  slider.style.left = btn.offsetLeft + 'px';
}

// Init on page load
const activeBtn = document.querySelector('.tab-btn.active');
if (activeBtn) moveSlider(activeBtn);

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    moveSlider(btn);

    // Show matching section
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    document.getElementById(target + '-section').classList.add('active');
  });
});

// Recalculate on resize
window.addEventListener('resize', () => {
  const current = document.querySelector('.tab-btn.active');
  if (current) moveSlider(current);
});

// ============================================
//  CHART — Weekly Performance
// ============================================
const ctx = document.getElementById('performanceChart').getContext('2d');

const revenueData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Revenue',
    data: [18000, 12000, 28000, 22000, 42000, 38000, 14000],
    borderColor: '#b8a27d',
    backgroundColor: 'rgba(184, 162, 125, 0.06)',
    borderWidth: 2,
    pointBackgroundColor: '#b8a27d',
    pointRadius: 4,
    pointHoverRadius: 6,
    tension: 0.4,
    fill: true
  }]
};

const ordersData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Orders',
    data: [2, 1, 3, 2, 4, 3, 1],
    borderColor: '#b8a27d',
    backgroundColor: 'rgba(184, 162, 125, 0.06)',
    borderWidth: 2,
    pointBackgroundColor: '#b8a27d',
    pointRadius: 4,
    pointHoverRadius: 6,
    tension: 0.4,
    fill: true
  }]
};

const chart = new Chart(ctx, {
  type: 'line',
  data: revenueData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#ccc',
        padding: 12,
        cornerRadius: 0,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            return ctx.dataset.label === 'Revenue' ? ' $' + val.toLocaleString() : ' ' + val + ' orders';
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#aaa', font: { family: 'Inter', size: 11 } }
      },
      y: {
        grid: { color: '#f0ece5', drawBorder: false },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: '#aaa',
          font: { family: 'Inter', size: 11 },
          callback: (val) => '$' + (val / 1000) + 'k'
        }
      }
    }
  }
});

// ============================================
//  TOGGLE REVENUE / ORDERS
// ============================================
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const isRevenue = btn.textContent.trim() === 'REVENUE';
    chart.data = isRevenue ? revenueData : ordersData;
    chart.options.scales.y.ticks.callback = isRevenue
      ? (val) => '$' + (val / 1000) + 'k'
      : (val) => val;
    chart.update();
  });
});