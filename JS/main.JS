const navbar = document.getElementById("main-nav");
const List = document.getElementById("sec-nav");
const downList = document.getElementById("list");
const indicator = document.getElementById('nav-indicator');
const logo=document.getElementById("logo");

// Icons
const hamburgerIcon = `<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>`;
const closeIcon = `<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>`;

// --- Initialization Logic ---
window.addEventListener("load", () => {
    const navLinks = document.querySelectorAll('#center li a');
    const currentPath = window.location.pathname;

    //------ Underline sliding logic-----
    setTimeout(() => {
        navLinks.forEach(link => {
            const linkFile = link.getAttribute('href').split('/').pop();
            const currentFile = currentPath.split('/').pop() || "main.html"; // Default to main if empty

            if (linkFile === currentFile) {
                link.classList.add('active');
                indicator.style.opacity = "1";
                
                requestAnimationFrame(() => {
                    indicator.style.width = `${link.offsetWidth}px`;
                    indicator.style.left = `${link.offsetLeft}px`;
                });
            }
        });
    }, 150);
});

//----clicking logo ---
function Home(){
  window.location.href="../maison d'alba/main.html";

};

/*logo.addEventListener("click",function(){
window.location.href="../maison d'alba/main.html";
});*/

// --- Scroll Effect ---
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 1);
});

// --- Mobile Menu ---
downList.addEventListener("click", () => {
    List.classList.toggle("open"); 
    downList.innerHTML = List.classList.contains("open") ? closeIcon : hamburgerIcon;
});

// --- Window Resize & Indicator Fix ---
window.addEventListener("resize", () => {
    const activeLink = document.querySelector('#center li a.active');

    if (activeLink && indicator) {
        
        indicator.style.transition = "none"; 
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;

        requestAnimationFrame(() => {
            indicator.style.transition = "width 0.8s cubic-bezier(0.23, 1, 0.32, 1), left 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease";
        });
    }

    if (window.innerWidth > 900) { 
        List.classList.remove("open");
        downList.innerHTML = hamburgerIcon;
    }
});// end of nav effects
//------cards scolling -------
document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
  
    
    function getScrollAmount() {
      if (cardsContainer.children.length === 0) return 0;
      const firstCard = cardsContainer.children[0];
      const cardWidth = firstCard.offsetWidth;
      
      
      const containerStyle = window.getComputedStyle(cardsContainer);
      const gap = parseFloat(containerStyle.gap) || 30; 
      
      return cardWidth + gap;
    }
  
    // -----Scroll to the previous card------
    btnPrev.addEventListener('click', () => {
      const scrollAmount = getScrollAmount();
      cardsContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  
    //------ Scroll to the next card--------
    btnNext.addEventListener('click', () => {
      const scrollAmount = getScrollAmount();
      cardsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  
    //------- Disable buttons when at the start or end-------
    function updateButtons() {
      const { scrollLeft, scrollWidth, clientWidth } = cardsContainer;
      btnPrev.disabled = scrollLeft <= 0;
      btnNext.disabled = scrollLeft + clientWidth >= scrollWidth;
    }
  
    // Update button states on scroll
    cardsContainer.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons); 
    updateButtons();
  });//end of scrolling cards effect
  
//----appear effect on scroll-----

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      if (entry.target.classList.contains("fact-card")) {
        const index = [...document.querySelectorAll(".fact-card")]
                      .indexOf(entry.target);

        entry.target.style.transitionDelay = `${index * 0.2}s`;
      }

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#para, .collection-top, .card, #icons, .fact-card, #testimonials-cards,#begin-container,.stats-grid,.analytics-section,.orders-section')
  .forEach(el => observer.observe(el));// end of appear effect

  
