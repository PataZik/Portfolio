document.addEventListener('DOMContentLoaded', () => {
    // Registriere das ScrollTrigger und das ScrollToPlugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // =======================================================
    // 1. Funktion für sanftes Scrollen (Smooth Scrolling)
    // =======================================================
    function handleSmoothScroll(event) {
        const targetId = event.currentTarget.getAttribute('href');
        if (targetId.startsWith('#') && targetId.length > 1) {
            event.preventDefault(); 
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Berechne die Zielposition, wobei die Höhe der Sticky Navbar abgezogen wird (ca. 60px)
                const offset = targetElement.offsetTop - 60; 

                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { 
                        y: offset,
                        autoKill: false 
                    },
                    ease: "power2.inOut"
                });
            }
        }
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // NEU: Handle smooth scroll für den "Jetzt kontaktieren" Button
    document.querySelector('.hero-text-content .btn').addEventListener('click', handleSmoothScroll);
    
    // =======================================================
    // 2. Initial Animationen (Hero Section)
    // =======================================================
    // Die initialen Animationen bleiben, um den Inhalt beim Laden einzublenden
    gsap.from(".profile-image-container", {
        opacity: 0,
        x: -50, 
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5 
    });
    gsap.from(".hero-section h1", {
        opacity: 0,
        x: 50, 
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8 
    });
    // Fügt den neuen Button zur Animation hinzu
    gsap.from(".hero-section .tagline, .hero-section .greeting, .hero-content .btn", {
        opacity: 0,
        y: 20,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.0 
    });

    // =======================================================
    // 3. SCROLL-ANIMATION: Hero Content verschwindet (JETZT SANFTER)
    // =======================================================
    gsap.to(".hero-content", {
        // Animationseigenschaften, wenn gescrollt wird
        y: -30, 
        opacity: 0.3, 
        scale: 0.99, 
        duration: 1, 
        ease: "linear", 
        
        scrollTrigger: {
            trigger: ".hero-section", 
            start: "top -=200", 
            end: "bottom center", 
            scrub: 2, 
            // markers: true, 
        }
    });

    // =======================================================
    // 4. Scroll-Animationen für Sektionen (behält deine Logik)
    // =======================================================
    
    gsap.utils.toArray("#ueber-mich, #kenntnisse, #lebenslauf").forEach(section => {
        
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 85%", 
                toggleActions: "play none none none",
                once: true 
            }
        });
        
        // Schritt 1: Macht die Sektion sichtbar, ohne dass sie sofort animiert wird (display: block)
        tl.set(section, { display: "block", opacity: 0, y: 30 })
        
        // Schritt 2: Führt die Einblend- und Hochfahr-Animation der Sektion aus
        tl.to(section, {
            opacity: 1, 
            y: 0, 
            duration: 1.0,
            ease: "power2.out",
        }, 0) 
        
        // Schritt 3: Kinder-Elemente leicht zeitverzögert einblenden (optionaler Stagger-Effekt)
        tl.from(section.querySelectorAll(".animate-heading, .animate-content > *"), {
            opacity: 0,
            y: 20, 
            duration: 0.8,
            stagger: 0.1, 
            ease: "power2.out",
        }, 0.2); 
    });
});