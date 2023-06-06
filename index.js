document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav__list");
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
      })
    
    
      document.querySelectorAll(".nav__link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }))

      var prevScrollpos = window.pageYOffset;
      window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          navMenu.style.top = "80px";
        } else {
          navMenu.style.top = "-300px";
        }
        prevScrollpos = currentScrollPos;
      }

});