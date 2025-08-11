import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Drawer as VaulSidebar } from "vaul";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { EmailIcon, FacebookIcon, InstagramIcon } from "../ui/icons";
import Button from "../inputs/Button";

const DONOR_PORTAL_URL = import.meta.env.VITE_DONOR_PORTAL_URL || ""

interface DrawerSidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  direction?: "left" | "right";
  outsideClose?: boolean;
  className?: string;
  triggerClassName?: string;
  DefaultTrigger?: () => React.ReactNode; // Changed to a function that returns ReactNode
}

export function SidebarDrawer({
  open: controlledOpen,
  setOpen: controlledSetOpen,
  direction = "left",
  outsideClose = true,
  className,
  DefaultTrigger, // Now a function prop
}: Readonly<DrawerSidebarProps>) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen =
    controlledSetOpen !== undefined ? controlledSetOpen : setInternalOpen;

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <>
      {DefaultTrigger && (
        <div onClick={() => setOpen(true)}>{DefaultTrigger()}</div>
      )}

      <VaulSidebar.Root
        open={open}
        direction={direction === "right" ? "right" : "left"}
        onOpenChange={setOpen}
        dismissible={!isDesktop}
      >
        <VaulSidebar.Portal>
          <VaulSidebar.Title>Sidebar</VaulSidebar.Title>
          <VaulSidebar.Overlay
            className="fixed inset-0 dark:bg-black/40 bg-white/50 backdrop-blur-sm z-50  "
            onClick={() => setOpen(false)}
          />
          <VaulSidebar.Content
            title="Sidebar"
            className={clsx(
              ` border-l z-50  ${
                outsideClose
                  ? " w-full h-[100%] bg-zinc-100"
                  : `w-full h-[100%]  `
              } fixed bottom-0  ${
                direction === "right" ? "right-0" : "left-0"
              } md:w-[45%]`,
              className
            )}
          >
            <div
              className={`${
                outsideClose
                  ? "w-full h-full"
                  : "relative bg-white border-r sm:w-[450px] w-[90%] h-full"
              } `}
            >
              {isDesktop ? (
                <button
                  className="flex justify-end w-full absolute right-2 top-2"
                  onClick={() => setOpen(false)}
                >
                  X
                </button>
              ) : (
                <div
                  className={clsx(
                    `absolute top-[40%] mx-auto h-16 w-[0.30rem] flex-shrink-0 rounded-full bg-gray-600 my-4`,
                    direction === "right" ? "left-2" : "right-2",
                    open ? "bg-green" : "bg-white"
                  )}
                />
              )}
              <DrawerContent setOpen={setOpen} />
            </div>
          </VaulSidebar.Content>
        </VaulSidebar.Portal>
      </VaulSidebar.Root>
    </>
  );
}

export function DrawerContent({
  setOpen,
}: Readonly<{ setOpen: (open: boolean) => void }>) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const changeLanguage = (lang: string) => {
    setOpen(false);
    i18n.changeLanguage(lang);
  };

  const onLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="p-8 flex flex-col h-full max-h-[100vh] justify-between bg-white">
      {/* Navigation Links */}
      <nav>
        <ul className="flex flex-col">
{[
  { id: 1, title: "Common.navbar.home", link: "/" },
  { id: 3, title: "Common.navbar.item2", link: "/who-we-are" },
  { id: 2, title: "Common.navbar.item1", link: "/projects" },
  { id: 5, title: "Common.navbar.item4", link: "/#contact" },
  { id: 6, title: "Common.navbar.item5", link: DONOR_PORTAL_URL },
].map((item) => (
  <li key={item.id} className="border-b border-dashed border-gray-200">
    {item.link.startsWith("http") ? (
      <a
        href={item.link}
        className="block py-4 text-lg text-purple hover:text-green transition-colors duration-500"
        onClick={onLinkClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t(item.title)}
      </a>
    ) : (
      <Link
        to={item.link}
        className="block py-4 text-lg text-purple hover:text-green transition-colors duration-500"
        onClick={onLinkClick}
      >
        {t(item.title)}
      </Link>
    )}
  </li>
))}
        </ul>
      </nav>

      {/* MENU BOTTOM INFO */}
      <div className="flex flex-col items-center gap-4 h-full">
        <div className="grow-1 flex items-center">
          <Link to="/contribute">
            <Button>{t("Common.navbar.action")}</Button>
          </Link>
        </div>

        {/* Language Selection */}
        <div className="flex gap-2">
          <button
            onClick={() => changeLanguage("en")}
            className={`px-4 py-2 rounded-md text-sm hover:bg-purple/10 ${
              locale === "en" ? "bg-purple text-white" : "text-purple"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("pt")}
            className={`px-4 py-2 rounded-md text-sm hover:bg-purple/10 ${
              locale === "pt" ? "bg-purple text-white" : "text-purple"
            }`}
          >
            PT
          </button>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-8">
          <a href="https://www.instagram.com/umoasisnaguine" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/share/16upePmZZ8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a href="mailto:info@oasisguine.org" target="_blank" rel="noopener noreferrer">
            <EmailIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

