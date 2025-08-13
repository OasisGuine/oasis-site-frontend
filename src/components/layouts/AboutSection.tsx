// import { useTranslation } from "react-i18next";
// import { processTextWithColors } from "@/utilities/textProcessor";

const AboutSection = () => {
  // const { t } = useTranslation();

  return (
    <section
      id="sobre-nos"
      className="cs-x-container cs-y-container flex flex-col items-center gap-8"
    >
      {/* <div className="text-center max-w-4xl">
        <h2 className="text-green font-bold mb-4">
          {t("HomePage.aboutSection.title")}
        </h2>
        <h5 className="text-gray font-medium leading-8">
          {processTextWithColors(t("HomePage.aboutSection.subTitle"))}
        </h5>
      </div>
      
      <div className="w-full max-w-4xl bg-gray-50 rounded-lg p-6">
        <h4 className="text-green font-bold mb-4">
          {t("HomePage.aboutSection.item1.title")}
        </h4>
        <p className="text-gray font-medium leading-8">
          {processTextWithColors(t("HomePage.aboutSection.item1.subTitle"))}
        </p>
        <button className="mt-4 bg-green text-white px-6 py-2 rounded-md font-semibold hover:bg-green/90 transition-colors">
          {t("HomePage.aboutSection.item1.action")}
        </button>
      </div> */}
      
      {/* Optional video section - uncommented if needed */}
      {/*
      <div className="w-full aspect-video rounded-lg shadow overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/3J-kQBtsByg?autoplay=0&rel=0"
          title="Oasis Guiné Video"
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
      */}
    </section>
  );
};

export default AboutSection; 
