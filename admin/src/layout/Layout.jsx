import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Menu from "../Menu/Menu";

function Layout() {
   return (
      <div
         id='main-wrapper'
         data-theme='light'
         data-layout='vertical'
         data-navbarbg='skin6'
         data-sidebartype='full'
         data-sidebar-position='fixed'
         data-header-position='fixed'
         data-boxed-layout='full'
      >
         <Header />
         <Outlet />
         <Menu />
      </div>
   );
}

export default Layout;
