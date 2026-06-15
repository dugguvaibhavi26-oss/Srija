import gsap from "gsap";

export const playLoadingAnimation = (onComplete: () => void) => {
  const tl = gsap.timeline({
    onComplete: onComplete,
    defaults: { ease: "power4.inOut" } // Luxury easing
  });

  // Example Sequence
  tl.to(".loading-logo", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 0.5
  })
  .to(".loading-text", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2
  }, "-=0.5")
  .to(".loading-particles", {
    opacity: 1,
    duration: 2
  }, "-=1")
  .to(".loading-container", {
    opacity: 0,
    duration: 1.5,
    delay: 1, // Let user appreciate the logo
  })
  .set(".loading-container", { display: "none" });

  return tl;
};

export const playHeroReveal = () => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  tl.fromTo(".hero-veil-left", 
    { x: "0%" },
    { x: "-100%", duration: 2.5 }
  )
  .fromTo(".hero-veil-right",
    { x: "0%" },
    { x: "100%", duration: 2.5 }
  , "<")
  .fromTo(".hero-title",
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 2 }
  , "-=1.5")
  .fromTo(".hero-tagline",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.5 }
  , "-=1.5")
  .fromTo(".hero-buttons",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
  , "-=1");

  return tl;
};
