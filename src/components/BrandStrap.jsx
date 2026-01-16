import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStrap() {
    const strapRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(strapRef.current, {
                height: "60px",
                scrollTrigger: {
                    trigger: strapRef.current,
                    start: "top top",
                    end: "+=200",
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={strapRef}
            className="fixed top-0 left-0 w-full h-[120px] bg-black text-white z-50 flex items-center justify-center"
        >
            <h1 className="font-mono text-4xl tracking-wider">
                CodeGreen
            </h1>
        </header>
    );
}
