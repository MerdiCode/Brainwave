import { brainwave } from "../assets";
import { navigation } from "../constants";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
const Header = () => {
  const [OpenNaigation, setOpenNaigation] = useState(false);
  const pathName = useLocation();
  const toggleNavigation = () => {
    if (OpenNaigation) {
      setOpenNaigation(false);
      enablePageScroll();
    } else {
      setOpenNaigation(true);
      disablePageScroll();
    }
  };
  const handleClick = () => {
    if (!OpenNaigation) return;

    enablePageScroll();
    setOpenNaigation(false);
  };

  return (
    <div
      className={`fixed top-0 w-full left-0 z-50 border-b border-n-6 ${
        OpenNaigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center flex-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 ">
        <a href="#hero" className="block w-[12rem] xl:mr-8">
          <img src={brainwave} alt="Brainwave" width={190} height={40} />
        </a>
        <nav
          className={`${
            OpenNaigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent `}
        >
          <div className="relative  z-2 flex flex-col  items-center justify-center m-auto lg:flex-row ">
            {navigation.map((nav) => (
              <a
                href={nav.url}
                key={nav.id}
                onClick={() => handleClick()}
                className={`block relative font-code text-2xl uppercase text-n-1  transition-colors hover:text-color-1 ${
                  nav.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  nav.url === pathName.hash
                    ? " z-2 lg:text-n-1 "
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {nav.title}
              </a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </a>
        <Button className={"hidden lg:flex"} href={"#login"}>
          Sign in
        </Button>
        <Button
          onClick={() => toggleNavigation()}
          className={"ml-auto lg:hidden"}
          px={"px-3"}
        >
          <MenuSvg openNavigation={OpenNaigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
