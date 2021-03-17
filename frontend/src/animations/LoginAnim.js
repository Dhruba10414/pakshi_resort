import gsap from "gsap";

let tl = gsap.timeline();

export const LoginAnim = () => {
    tl.from(".login .staffs .images img", 0.8, {
        scale: 0,
        stagger: {amount: 0.4},
        ease: "expo.inOut"
    })
    .from(".login .staffs .images .desc", 0.6, {
        y: 40,
        opacity: 0,
        ease: "expo.inOut"
    })
    .from(".login .container", 1, {
        x: "100vw",
        ease: "expo.inOut"
    }, "<");
}
