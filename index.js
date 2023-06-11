document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav__list");
    const scrollBtn = document.querySelector("#scroll__top");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
      })
    
    
      document.querySelectorAll(".nav__link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }))


      var prevScrollpos = window.scrollY;
      
      window.onscroll = scrollAnimation;
      document.body.ontouchmove = scrollAnimation;
      function scrollAnimation() {
        var topPos = document.documentElement.scrollTop;
        var currentScrollPos = window.scrollY;
        
        if ( (prevScrollpos > currentScrollPos) && topPos <= 80) {
          navMenu.style.top = "80px";
        } else {
          navMenu.style.top = "-300px";
        }
        prevScrollpos = currentScrollPos > 0 ? currentScrollPos : prevScrollpos
                
        if (topPos > 100 ) {
          scrollBtn.classList.add("show");
        }else{
          scrollBtn.classList.remove("show");
        }
        
      };

      scrollBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });

});