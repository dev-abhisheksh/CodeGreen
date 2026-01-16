import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export const HomePage = () => {

  useEffect(() => {
    if (window.innerWidth < 768) return;

    ScrollTrigger.create({
      trigger: "#split-section",
      start: "top top+=120",
      end: "bottom bottom",
      pin: "#left-panel",
      scrub: true,
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);


  return (
    <div>
      {/* SECTION 1 */}
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl">
          Hero Section (strap animation later)
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="min-h-[200vh] flex" id="split-section">
        <div className="w-1/2 p-12 sticky top-[120px] h-fit" id="left-panel">
          <p className="text-lg mb-6">
            Description text that will be pinned
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-full bg-green-700 text-white">
              Raise a complaint
            </button>
            <button className="px-6 py-2 rounded-full border border-green-700">
              Help Earth
            </button>
          </div>
        </div>

        <div className="w-1/2 p-12 space-y-12" id="right-panel">
          <div className="h-[300px] bg-gray-400"></div>
          <div className="h-[300px] bg-gray-500"></div>
          <div className="h-[300px] bg-gray-600"></div>
        </div>
      </section>


      {/* SECTION 3 */}
      <section className="min-h-screen p-12">
        <h2 className="text-4xl font-bold mb-6">
          Your right to clean environment
        </h2>
        <p className="max-w-3xl">
          Why a healthy environment is important...
        </p>
      </section>
    </div>
  )
}
