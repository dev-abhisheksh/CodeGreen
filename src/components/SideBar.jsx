
import { useEffect, useState } from "react";
// src/components/Sidebar.jsx
import { Home, Info, Leaf, AlertTriangle, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/camps", label: "Campaigns", icon: Leaf },
  { to: "/problems", label: "Problems", icon: AlertTriangle },
];

export default function Sidebar() {

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      if (window.innerWidth < 768) {
        setHidden(window.scrollY > lastY);
        lastY = window.scrollY;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (window.innerWidth < 768) ScrollTrigger.killAll();

  return (
    <aside
      className={`
    fixed right-0 top-[120px]
    h-[calc(100vh-120px)]
    w-[70px] hover:w-[240px]
    bg-[#1b1b1b] text-white
    transition-all duration-300
    overflow-hidden z-40
    ${hidden ? "translate-x-full" : ""}
  `}
    >
      <nav className="flex flex-col gap-6 p-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="flex items-center gap-4 group"
          >
            <Icon size={22} />
            <span className="opacity-0 group-hover:opacity-100 transition">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* USER SECTION */}
      <div className="absolute bottom-6 left-0 w-full px-4 group">
        <div className="flex items-center gap-4">
          <User size={22} />
          <span className="opacity-0 group-hover:opacity-100 transition">
            Login / Signup
          </span>
        </div>
      </div>
    </aside>
  );
}
