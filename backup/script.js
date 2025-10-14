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

    // =======================================================
    // 2. Initial Animationen (Hero Section)
    // =======================================================
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
    gsap.from(".hero-section .tagline, .hero-section .greeting", {
        opacity: 0,
        y: 20,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.0 
    });

    // =======================================================
    // 3. Scroll-Animationen für Sektionen
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
        // Setzt die Startposition für die Animation
        tl.set(section, { display: "block", opacity: 0, y: 30 })
        
        // Schritt 2: Führt die Einblend- und Hochfahr-Animation der Sektion aus
        tl.to(section, {
            opacity: 1, 
            y: 0, 
            duration: 1.0,
            ease: "power2.out",
        }, 0) // Startet bei 0 der Timeline
        
        // Schritt 3: Kinder-Elemente leicht zeitverzögert einblenden (optionaler Stagger-Effekt)
        tl.from(section.querySelectorAll(".animate-heading, .animate-content > *"), {
            opacity: 0,
            y: 20, 
            duration: 0.8,
            stagger: 0.1, 
            ease: "power2.out",
        }, 0.2); // Startet nach 0.2 Sekunden der Timeline

    });
});