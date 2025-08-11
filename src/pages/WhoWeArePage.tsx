import { useTranslation } from "react-i18next"; 
import MainLayout from "@/components/layouts/MainLayout";
import { processTextWithColorComponents } from "@/utilities/textProcessor";
import { getAssetUrl } from "@/utils/assets";

export default function WhoWeArePage() {
    const { t } = useTranslation();

    const aboutItems = [
        { id: 1, descriptionKey: 'WhoWeArePage.section1.item1.description' },
        { id: 2, descriptionKey: 'WhoWeArePage.section1.item2.description' },
        { id: 3, descriptionKey: 'WhoWeArePage.section1.item3.description' },
    ];


    return (
        <MainLayout
            heroSectionSlides={[
                {
                    id: 1,
                    imageSrc: getAssetUrl('/assets/img/all/5.png'),
                }
            ]}
            heroHeightVariant="1/2"
        >
            

<section className="cs-x-container cs-y-container flex flex-col gap-12">
  <div id="sobre-nós" className="flex justify-start lg:justify-center">
    <h1 className="text-green">{t('WhoWeArePage.section1.title')}</h1>
  </div>

<div className="flex flex-col xl:flex-row gap-12 items-center">
  <div className="hidden xl:block relative w-full xl:w-1/2 h-[500px]">
    <img
      src={getAssetUrl('/assets/img/all/Aline-guine.png')}
      alt="Kids Bantandja icons"
      className="w-full h-full object-cover drop-shadow-md rounded-xl"
    />
  </div>

  <div className="block xl:hidden relative w-full h-[500px]">
    <img
      src={getAssetUrl('/assets/img/all/bantaja-kids.png')}
      alt="Kids Bantandja"
      className="w-full h-full object-cover drop-shadow-md rounded-xl object-contain"
    />
  </div>

    <div className="w-full xl:w-1/2 flex flex-col justify-between items-center xl:items-start gap-6 xl:gap-8">
      {aboutItems.map((item) => (
    <h5
      key={item.id}
      className="text-gray font-semibold leading-8 text-center xl:text-left"
    >
      {processTextWithColorComponents(t(item.descriptionKey))}
    </h5>
  ))}
</div>
  </div>
</section>

        </MainLayout>
    );
}