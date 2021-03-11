import gsap from "gsap";

let tl = gsap.timeline();

export const openMenu = () => {
    tl.to(".navigation", 1.6, {
        x: "-100vw",
        ease: "expo.inOut"
    });
    tl.from(".navigation .navigation__content p.heading", 0.4, {
        opacity: 0,
        scale: 0,
        delay: -.75
    }).from(".navigation .navigation__content .links .link .link__name p", 0.6, {
        opacity: 0,
        x: 35,
        delay: -.70
    })
}

export const closeMenu = () => {
    tl.to(".navigation", 1.6, {
        x: 0,
        ease: "expo.inOut"
    })
}