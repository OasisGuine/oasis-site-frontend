import MainLayout from "@/components/layouts/MainLayout";
import AboutSection from "@/components/layouts/AboutSection";
import HelpSection from "@/components/layouts/HelpSection";
import MotivationSection from "@/components/layouts/MotivationSection";
import LearnSection from "@/components/layouts/LearnSection";
import FormSection from "@/components/layouts/FormSection";
import { getAssetUrl } from "@/utils/assets";

export default function HomePage() {
  return (
    <MainLayout
      heroSectionSlides={[
        {
          id: 1,
          titleTranslationKey: 'HomePage.heroSection.title1',
          subTitleTranslationKey: 'HomePage.heroSection.subTitle1',
          actionTranslationKey: 'HomePage.heroSection.action1',
          actionLink: '/who-we-are',
          imageSrc: getAssetUrl('/assets/img/all/boy-smile.png')
        },
        {
          id: 2,
          titleTranslationKey: 'HomePage.heroSection.title2',
          subTitleTranslationKey: 'HomePage.heroSection.subTitle2',
          actionTranslationKey: 'HomePage.heroSection.action2',
          actionLink: '/projects',
          imageSrc: getAssetUrl('/assets/img/all/kids-smile-flower.png'),
        },
        {
          id: 3,
          titleTranslationKey: 'HomePage.heroSection.title3',
          subTitleTranslationKey: 'HomePage.heroSection.subTitle3',
          actionTranslationKey: 'HomePage.heroSection.action3',
          actionLink: '/projects#meta-10k',
          imageSrc: getAssetUrl('/assets/img/all/meta10k-banner.png'),
          imgPosition: "top",
        }
      ]}
      heroHeightVariant="full"
    >
      <AboutSection />
      <HelpSection />
      <LearnSection />
      <MotivationSection />
      <FormSection />
    </MainLayout>
  );
}