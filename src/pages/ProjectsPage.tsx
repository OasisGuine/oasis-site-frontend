import { useTranslation } from "react-i18next";
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { processTextWithColors } from "@/utilities/textProcessor";
import { getAssetUrl } from "@/utils/assets";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <MainLayout
      heroSectionSlides={[
        {
          id: 1,
          imageSrc: getAssetUrl("/assets/img/all/hero_gb_agradecimento.png"),
          imgPosition: "30%",
        },
      ]}
      heroHeightVariant="1/2"
    >
      
      <section
        id="guinebissau"  
        className="cs-x-container cs-y-container flex flex-col gap-8 xl:gap-12 leading-tight"
      >
        <h2 className="text-green xl:text-center font-bold">
          {t("ProjectsPage.section1.title")}
        </h2>

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

          {/* ✅ LIGHTBOX */}
          <div className="relative h-[250px] w-[300px] xl:w-[400px] xl:h-[300px] xl:ml-auto mx-auto">

            {/* botão de zoom SEM restrição de desktop/mobile */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-2 right-2 z-10 bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm"
              aria-label="Ampliar imagem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </button>

            {/* imagem clicável em TODAS as telas (ANTES estava xl:hidden) */}
            <img
              src={getAssetUrl("/assets/img/all/Bom samaritano.png")}
              alt="bom samaritano school"
              onClick={() => setLightboxOpen(true)}
              className="w-full h-full object-contain mx-auto cursor-zoom-in" // ✅ SEM xl:hidden
            />
          </div>
        </div>
      </section>

      {/* ✅ LIGHTBOX GLOBAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2 backdrop-blur-sm"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <img
            src={getAssetUrl("/assets/img/all/Bom samaritano.png")}
            alt="bom samaritano school"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </MainLayout>
  );
}
