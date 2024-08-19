// src/components/layout/Layout.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../pages/navigation/navigation";
import Footer from "./footer/footer.component";

const Layout: React.FC = () => {
  return (
    <div>
      <Navigation />
      <div style={{ minHeight: "calc(100vh - 200px)" }}>
        {/* The Outlet component renders the current route */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
