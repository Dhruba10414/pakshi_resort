import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const HomeAnim = () => {
    // Banner block
    let tl = gsap.timeline();
    tl.from(".home .home__container .home-image img", 1.5, {
        x: "-100%",
        ease: "expo.inOut",
    })
    .to(".home .home-heading", 1, {
        opacity: 1,
        y: -50,
        ease: "power4",
    })
    
    // Short desc
    gsap.from(".short-desc", {
        opacity: 0,
        y: 100,
        duration: 1.2,
        delay: 1,
        ease: "power4",
        scrollTrigger: {
            trigger: ".short-desc",
        },
    })
    // Feature list
    gsap.from(".feature-list .feature p", {
        y: 50,
        duration: 1,
        stagger: {amount: 0.4},
        ease: "power4",
        scrollTrigger: {
            trigger: ".feature-list",
        },
    })
    // Room block
    gsap.from(".home__rooms .heading-block", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: {
            trigger: ".home__rooms",
            start: "top end+=80%",
        },
    })
    // Park block
    gsap.to(".home__park .park-overlay", {
        height: 0,
        duration: 0.5,
        ease: "ease.inOut",
        scrollTrigger: {
            trigger: '.home__park'
        }
    })
    
}

export const overlayAnimation = (completeAnimation) => {
    let tl = gsap.timeline();

    tl.to(".homeoverlay .loading-container img", 0.5, {
        opacity: 0,
        delay: 1
    })
    .to(".homeoverlay .divider", 1, {
        height: 0,
        stagger: { amount: 0.4 },
        ease: "expo.inOut"
    })
    .to(".homeoverlay", 0, {
        display: "none",
        onComplete: completeAnimation,
    })
}