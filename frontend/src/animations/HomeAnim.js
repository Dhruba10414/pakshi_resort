import gsap from "gsap";

export const HomeAnim = () => {

}

export const overlayAnimation = (completeAnimation) => {
    let tl = gsap.timeline();
    tl.to(".homeoverlay .loading-container img", 0.5, {
        opacity: 0,
        delay: 2
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