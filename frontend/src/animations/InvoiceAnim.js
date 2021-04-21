import gsap from "gsap";

let tl = gsap.timeline();

export const openPaymentModalAnim = () => {
    tl.to(".paymentModal", 1, {
        x: 0,
        ease: "expo.inOut"
    })
}

export const closePaymentModalAnim = () => {
    tl.to(".paymentModal", 1, {
        x: "105%",
        ease: "expo.inOut"
    })
}