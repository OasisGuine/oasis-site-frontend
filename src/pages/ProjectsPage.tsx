import { useTranslation } from "react-i18next";

import MainLayout from "@/components/layouts/MainLayout";
import { processTextWithColors } from "@/utilities/textProcessor";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <MainLayout
      heroSectionSlides={[
        {
          id: 1,
          imageSrc: "/assets/img/all/3.png",
          imgPosition: "30%",
        },
      ]}
      heroHeightVariant="1/2"
    >

<section className="cs-x-container cs-y-container flex flex-col gap-8 xl:gap-12 leading-tight">

  {/* Título centralizado */}
  <h2 className="text-green xl:text-center font-bold">{t("ProjectsPage.section1.title")}</h2>

  {/* Texto à esquerda e imagem à direita */}
  <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start">
    
    {/* Texto à esquerda */}
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

   {/* Imagem centralizada no mobile, à direita no desktop */}
    <div className="relative h-[250px] w-[300px] xl:w-[400px] xl:h-[300px] xl:ml-auto mx-auto">
    <img
    src="/assets/img/all/kids-water.png"
    alt="kids water"
    className="w-full h-full object-cover"
    />
    </div>
  </div>
        </section>

 <div
  id="meta-10k"
  className="cs-x-container xl:px-10 flex flex-col xl:items-center scroll-mt-24 items-stretch xl:min-h-[150px] gap-4"
>
  <h2 className="text-green text-start xl:text-center font-bold text-shadow-lg/30">
    {t("ProjectsPage.section4.title")}
  </h2>

  <h5 className="text-start font-medium leading-8 text-gray">
    {processTextWithColors(t("ProjectsPage.section4.description"))}
  </h5>
   <h5>
     {t("ProjectsPage.section4.space")}
  </h5>
</div>

<section
  className="cs-x-container relative grid grid-cols-1 xl:grid-cols-2 items-stretch xl:min-h-[400px]"
>
  {/* Fundo roxo absoluto atrás da grid */}
  <div className="absolute inset-0 -z-10">
    <img
      src="/assets/img/all/purple-background.png"
      alt="purple background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Coluna esquerda: imagem cobrindo tudo */}
  <div className="hidden xl:flex flex-col w-full h-64 xl:min-h-[400px] items-left justify-start relative">
    <img
      src="/assets/img/all/kids-icons.png"
      alt="students kids smiling"
      className="w-full h-full object-contain"
      style={{ objectPosition: '18% center' }}
    />
  </div>

  {/* Coluna direita: lista dinâmica */}
  <div className="flex flex-col justify-center gap-4 cs-y-container">
    <ul className="list-disc marker:text-[12px] md:marker:text-[14px] list-inside space-y-2 md:space-y-3">
      {[...Array(9)].map((_, i) => {
        const key = `ProjectsPage.section4.stats.${i + 1}.description`;
        let content;
        try {
          content = t(key);
        } catch {
          content = `Tradução ausente: ${key}`;
        }
        return (
          <li
            key={i}
            className="text-left text-white font-semibold leading-8 text-sm md:text-base lg:text-lg"
          >
            {processTextWithColors(content)}
          </li>
        );
      })}
    </ul>
  </div>
</section>

{/* Texto adicional fora da grid */}
<div   className="cs-x-container flex flex-col xl:items-center items-stretch gap-4 xl:min-h-[100px]">
  <h5>
     {t("ProjectsPage.section4.space")}
  </h5>
  
  <h5 className="text-start text-gray font-semibold leading-8">
    {processTextWithColors(t("ProjectsPage.section4.description1"))}
  </h5>
  <h4 className="text-center text-gray font-semibold leading-8">
    {processTextWithColors(t("ProjectsPage.section4.description2"))}
  </h4>
    <h5>
     {t("ProjectsPage.section4.space")}
  </h5>
  
</div>
    </MainLayout>
  );
}