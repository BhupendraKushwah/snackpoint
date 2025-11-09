document.addEventListener("DOMContentLoaded", async () => {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: "#FF6B35",
          secondary: "#FFD166",
          accent: "#06D6A0",
          dark: "#1A1A1A",
          light: "#FFF8F0",
        },
        fontFamily: { sans: ["Poppins", "sans-serif"] },
      },
    },
  };

  const bestSellers = await fetch('../../data/topSeller.json').then(async (data) => await data.json())

  const specialsContainer = document.getElementById("specials-container");

  // Dynamically render cards
  if (specialsContainer)
    specialsContainer.innerHTML = bestSellers.map(item => `
    <div class="p-6 bg-light rounded-2xl shadow-lg hover:shadow-xl transition fade-in">
      <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-xl mb-4">
      <h3 class="font-semibold text-xl mb-2">${item.name}</h3>
      <p class="text-gray-500 mb-2">${item.description}</p>
      <p class="text-primary font-bold">₹${item.price}</p>
    </div>
  `).join('');

  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));
  const includeNavbar = document.getElementById("navbar");
  const includeFooter = document.getElementById("footer");

  if (includeNavbar) {
    let navbarPath = (window.location.pathname=='/')?'components/navbar.html':'../components/navbar.html'
    fetch(navbarPath)
      .then(response => response.text())
      .then(data => {
        includeNavbar.innerHTML = data;
      })
      .catch(error => console.error("Navbar load error:", error));
  }
  if (includeFooter) {
    let footerPath = (window.location.pathname=='/')?'components/footer.html':'../components/footer.html'
    fetch(footerPath)
      .then(response => response.text())
      .then(data => {
        includeFooter.innerHTML = data;

        const includeYear = document.getElementById("year");
        if (includeYear) includeYear.innerHTML = new Date().getFullYear();
      })
      .catch(error => console.error("Navbar load error:", error));
  }
});
