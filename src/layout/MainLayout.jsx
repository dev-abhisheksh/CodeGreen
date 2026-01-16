// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BrandStrap from './../components/BrandStrap';

export default function MainLayout() {
    return (
        <div className="relative min-h-screen bg-[#eaeaea]">
            {/* BRAND STRAP */}
            <BrandStrap/>

            {/* SIDEBAR */}
            <Sidebar />

            {/* PAGE CONTENT */}
            <main className="pt-[120px] pr-[80px]">
                <Outlet />
            </main>
        </div>
    );
}
