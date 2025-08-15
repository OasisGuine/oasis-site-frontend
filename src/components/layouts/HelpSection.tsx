import { useTranslation } from "react-i18next";
import Button from "../inputs/Button";
import { Link } from "react-router-dom";
import { getAssetUrl } from "@/utils/assets";
import { processTextWithColorComponents } from "../../utilities/textProcessor";

const HelpSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="help"
      className="cs-x-container relative grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 items-stretch xl:min-h-[400px]"
    >
      
        <div className="absolute inset-0 -z-10">
        <img
          src={getAssetUrl("/assets/img/all/light-pink-background.png")}
          alt="pink background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="hidden xl:block absolute inset-y-0 right-30 w-1/2 -z-10">
        <img
          src={getAssetUrl("/assets/img/all/kids-school-icon.png")}
          alt="students kids smiling"
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Bloco sobreposto entre texto e imagem */}
      <div className="hidden xl:flex flex-col gap-y-12 absolute z-20 left-[58%] top-[17%] -translate-x-1/2 -translate-y-1/2 p-6 w-[200px] h-[200px] max-w-md">
        <img
          src={getAssetUrl("/assets/img/icon/small-backpack 1.png")}
          alt="backpack"
          className="w-[120px] h-[120px] object-cover"
        />
        <img
          src={getAssetUrl("/assets/img/icon/small-bulb 2.png")}
          alt="bulb"
          className="w-[80px] h-[80px] object-cover rotate-16"
        />
      </div>

      {/* LEFT */}
      <div className="flex flex-col justify-center gap-4 cs-y-container">
        <h4 className="text-purple leading-tight font-extrabold">
          {t("HomePage.helpSection.subTitle")}
        </h4>

        <div className="flex flex-col text-gray gap-4 mb-4 lg:mb-4 xl:mb-4">
          <h5>{t("HomePage.helpSection.descriptionP1")}</h5>

          <h5>{processTextWithColorComponents(t("HomePage.helpSection.descriptionP2"))}</h5>

          {/* Botão */}
          <div className="flex flex-col items-center lg:flex-row lg:items-center w-full">
            <Link to="/who-we-are">
              <Button>{t("HomePage.helpSection.action")}</Button>
            </Link>
          </div>
        </div>
      </div> {/* <-- FECHAMENTO CORRETO DA DIV LEFT */}

{/* RIGHT 
<div className="hidden md:block relative z-10">
  <div className="relative h-full min-h-[400px]">
    <Image
      src="/assets/img/all/kids-school-icon.png"
      alt="students kids smiling"
      fill
      className="object-cover"
    />
  </div>
</div>
*/}
    </section>
  );
};

export default HelpSection;
