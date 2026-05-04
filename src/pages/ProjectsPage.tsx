import { useTranslation } from "react-i18next";

import MainLayout from "@/components/layouts/MainLayout";
import { processTextWithColors } from "@/utilities/textProcessor";
import { getAssetUrl } from "@/utils/assets";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <MainLayout
      heroSectionSlides={[
        {
          id: 1,
          imageSrc: getAssetUrl("/assets/img/all/3.png"),
          imgPosition: "30%",
        },
      ]}
      heroHeightVariant="1/2"
    >

<section className="cs-x-container cs-y-container flex flex-col gap-8 xl:gap-12 leading-tight">

  <h2 className="text-green xl:text-center font-bold">{t("ProjectsPage.section1.title")}</h2>

  <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start">
    
    <div className="flex-1 text-start flex flex-col gap-4">
      <h5 className="text-gray font-medium max-w-3xl leading-8">
        {processTextWithColors(t("ProjectsPage.section1.description"))}
      </h5>
      <h5 className="text-gray font-medium max-w-3xl leading-8">
        {processTextWithColors(t("ProjectsPage.section1.description2"))}
      </h5>
       <h5 className="max-w-3xl text-gray font-medium leading-8">
        {processTextWithColors(t("ProjectsPage.section1.description3"))}
      </h5>
    </div>
        

    <div className="relative h-[250px] w-[300px] xl:w-[400px] xl:h-[300px] xl:ml-auto mx-auto">
       <img
    src={getAssetUrl("/assets/img/all/Bom samaritano.png")}
    alt="bom samaritano school"
    className="w-full h-auto max-h-[300px] md:max-h-[400px] xl:max-h-[500px] object-contain mx-auto"
  />
</div>
  </div>
        </section>
    </MainLayout>
  );
}
