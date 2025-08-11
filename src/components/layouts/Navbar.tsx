import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import clsx from "clsx";

import Button from "../inputs/Button";
import Dropdown from "../inputs/Dropdown";
import { SidebarDrawer } from "./Drawer";


const navLinks = [
  { id: 1, title: "Common.navbar.home", link: "/" },
  { id: 2, title: "Common.navbar.item2", link: "/who-we-are" },

  //{
  //  id: 2,
  //  component: (
  //    <Dropdown
  //      label="Common.navbar.item2"
  //      options={[
  //        {
  //          label: "Common.navbar.dropdowns.item3",
  //          link: "/who-we-are",
  //        },
  //        {
  //          label: "Common.navbar.dropdowns.item4",
  //          link: "/who-we-are/#nossos-valores",
  //        },
  //      ]}
  //    />
  //  ),
 // },
  {
  id: 3,
  component: (
    <Dropdown
      label="Common.navbar.item1"
      options={[
        { label: "Common.navbar.dropdowns.item1", link: "/projects" },
        {
          label: "Common.navbar.dropdowns.item2",
          link: "/projects#meta-10k",
        },
      ]}
    />
  ),
},
//  { id: 4, title: "Common.navbar.item3", link: "/help" },
  { id: 5, title: "Common.navbar.item4", link: "/#contact" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div
      id="nav-container"
      className={clsx(
        `fixed top-0 z-50 w-full h-24 flex items-center justify-between px-4 md:px-6 lg:px-8 transition duration-200 ease-in-out`,
        scrolled ? "bg-white" : "bg-red"
      )}
    >
      {/* LEFT - LOGO */}
      <div className="h-full flex items-center">
        <Link to="/">
          <img
            src={`/assets/img/logo/${
              scrolled
                ? "black-logo-no-description.png"
                : "white-logo-no-description.png"
            }`}
            alt="Oasis logo."
            className="h-[2.81rem] w-auto object-contain transition duration-200 ease-in-out"
          />
        </Link>
      </div>

      {/* MOBILE/TABLET DOE AGORA BUTTON */}
      <div className="flex-1 flex items-center xl:hidden">
        <div className="w-full flex justify-center md:justify-end">
          <Link to="/contribute" className="md:mr-4">
            <Button className="min-w-[max-content] text-sm px-3 py-1.5">
              {t("Common.navbar.action")}
            </Button>
          </Link>
        </div>
      </div>

      {/* DESKTOP MENU - Only visible on desktop */}
      <div
        className={clsx(
          `hidden xl:flex justify-end items-center gap-[10px] md:mr-6 xl:gap-6 xl:mr-0`,
          scrolled ? "text-purple" : "text-white"
        )}
      >
        <nav>
          <ul className="list-none font-bold flex gap-x-4 items-center">
            {navLinks.map((item, index) => (
              <li key={index} className="cursor-pointer text-base">
                {item.component ? (
                  item.component
                ) : (
                  <Link to={item.link}>
                    {item.title.startsWith("Common") ? t(item.title) : item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contribute">
          <Button className="min-w-[max-content]">
            {t("Common.navbar.action")}
          </Button>
        </Link>

       <Dropdown
          label={i18n.language === "en" ? "EN" : "PT"}
          labelTranslate={false}
          className={clsx(
            "font-bold px-2 py-2 rounded-md",
            scrolled ? "text-purple" : "text-white"
          )}
          options={[
            { label: "EN", clickHandler: () => changeLanguage("en") },
            { label: "PT", clickHandler: () => changeLanguage("pt") },
          ]}
        /> 
      </div>

      {/* MOBILE MENU BUTTON - Only visible on mobile */}
      <div className="flex items-center xl:hidden">
        <button
          className="flex items-center justify-center w-8 h-8"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <img 
            src={`/assets/img/icon/mobile-menu-${scrolled ? 'black' : 'white'}.svg`} 
            alt="Menu icon"
            className="w-6 h-6" 
          />
        </button>
      </div>

      <SidebarDrawer
        direction="right"
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
    </div>
  );
};

export default Navbar;
