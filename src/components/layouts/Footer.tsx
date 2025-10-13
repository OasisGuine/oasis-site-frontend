import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAssetUrl } from "@/utils/assets";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="p-4 max-md:p-10 px-10 text-white bg-green flex justify-around max-md:min-h-[fit-content] h-[150px] w-full items-center max-md:flex-col max-md:gap-8">
      {/* LEFT */}
      <div className="flex flex-col flex-1 gap-2 max-md:text-center max-md:order-3">
        <p>{t("Common.footer.itemLeft1")}</p>
        <p className="font-bold">
          <Link to="/privacy-policy">
            {t("Common.footer.itemLeft2")}
          </Link>
        </p>
      </div>

      {/* CENTER */}
      <img
        src={getAssetUrl("/assets/img/logo/white-logo-no-description.png")}
        alt="Oasis logo in white."
        className="h-full w-full object-contain max-h-[50px] max-[915px]:max-h-[40px] md:max-h-[50px] flex-1 max-md:order-1 max-md:w-auto"
      />

      {/* RIGHT */}
      <div className="flex-1 flex max-[915px]:gap-4 gap-16 justify-end max-md:flex-col max-md:items-center max-md:gap-8 max-md:order-2">
        <div className="flex flex-col gap-2">
          <p>{t("Common.footer.itemRight1")}</p>
          <div className="flex gap-2 h-[30px]">
            <a href="https://www.instagram.com/umoasisnasnacoes?igsh=NW1zdWZseGM4cmZ5" target="_blank" rel="noopener noreferrer">
              <img
                src={getAssetUrl("/assets/img/icon/instagram.svg")}
                alt="Instagram icon in white."
                className="h-full w-full object-contain"
              />
            </a>
            <a href="https://www.facebook.com/share/19xtMZ98yG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <img
                src={getAssetUrl("/assets/img/icon/facebook.svg")}
                alt="Facebook icon in white."
                className="h-full w-full object-contain"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-md:text-center">
          <p className="">{t("Common.footer.itemRight2")}</p>
          <span className="font-bold">
              info@oasisguine.org
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
