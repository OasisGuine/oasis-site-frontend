import MainLayout from "@/components/layouts/MainLayout";
import { useTranslation } from "react-i18next";

const SITE_URL = import.meta.env.VITE_SITE_URL;

export default function PrivacyPolicyPage() {
    const { t } = useTranslation();

    return (
        <MainLayout
            heroSectionSlides={[
                {
                    id: 1,
                    imageSrc: '/assets/img/all/6.jpeg',               
                }
            ]}
            heroHeightVariant="1/2"
        >
            <section className="max-w-6xl mx-auto my-8 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-6 text-[#509f8c]">{t('PrivacyPolicy.title')}</h1>
                    <p className="mb-6 text-gray-600">{t('PrivacyPolicy.lastUpdated')}: {t('PrivacyPolicy.updateDate')}</p>
                    <p className="mb-6">{t('PrivacyPolicy.introduction')}</p>

                    <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.interpretationTitle')}</p>
                    <p className="mb-6">{t('PrivacyPolicy.interpretationText')}</p>

                    <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.definitionsTitle')}</p>
                    <p className="mb-4">{t('PrivacyPolicy.definitionsIntro')}</p>

                    <div className="space-y-4 mb-6">
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.accountDefTitle')} {t('PrivacyPolicy.accountDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.affiliateDefTitle')} {t('PrivacyPolicy.affiliateDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.companyDefTitle')} {t('PrivacyPolicy.companyDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.cookiesDefTitle')} {t('PrivacyPolicy.cookiesDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.countryDefTitle')} {t('PrivacyPolicy.countryDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.deviceDefTitle')} {t('PrivacyPolicy.deviceDefText')}</p>
                        </div>
                        
                        <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.personalDataDefText')}</p>
                       
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.serviceDefTitle')} {t('PrivacyPolicy.serviceDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.serviceProviderDefTitle')} {t('PrivacyPolicy.serviceProviderDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.usageDataDefTitle')} {t('PrivacyPolicy.usageDataDefText')}</p>
                        </div>
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.websiteDefTitle')} {t('PrivacyPolicy.websiteDefText')}</p>
                        </div>
                        
                        <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.youDefTitle')}</p>
     
                        <div className="ml-4">
                            <p>{t('PrivacyPolicy.youDefText')}</p>
                        </div>
                    </div>

                    <ul className="list-disc ml-8 mb-6">
                         <li>{t('PrivacyPolicy.personalDataTitle')}</li>
                         <li>{t('PrivacyPolicy.personalDataText')}</li>
                        <li>{t('PrivacyPolicy.typesOfDataTitle')}</li>
                        <li>{t('PrivacyPolicy.collectingDataTitle')}</li>
                        <li>{t('PrivacyPolicy.personalDataEmail')}</li>
                    </ul>

                    <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.personalDataUsage')}</p>

                         <div className="ml-4">
                            <p>{t('PrivacyPolicy.usageDataTitle')}</p>
                        </div>
                    <ul className="list-disc ml-8 mb-6">
                         <li>{t('PrivacyPolicy.usageDataText1')}</li>
                         <li>{t('PrivacyPolicy.usageDataText2')}</li>
                    </ul>

                    <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.trackingTitle')}</p>
                    <p className="mb-4">{t('PrivacyPolicy.trackingText')}</p>
                   
                    <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.trackingCookiesTitle')}</p>
                    <p className="mb-4">{t('PrivacyPolicy.trackingCookiesText')}</p>

                    <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.trackingBeaconsTitle')}</p>
                    <p className="mb-4">{t('PrivacyPolicy.trackingBeaconsText')}</p>

                     <ul className="list-disc ml-8 mb-6">
                         <li>{t('PrivacyPolicy.trackingBeaconsText2')}</li>
                         <li>{t('PrivacyPolicy.trackingBeaconsText3')}</li>
                         <li>{t('PrivacyPolicy.trackingBeaconsText4')}</li>
                         <li>{t('PrivacyPolicy.trackingBeaconsText5')}</li>
                         <li>{t('PrivacyPolicy.trackingBeaconsText6')}</li>
                    </ul>
                
                    <p className="text-lg text-gray-700 font-bold mt-12 mb-8">{t('PrivacyPolicy.cookiesTypesText')}</p>
                    <div className="space-y-6 mb-8">
                        <div>
                            <p className="text-base font-bold text-gray-700">{t('PrivacyPolicy.cookiesNecessaryTitle')}</p>
                            <p className="font-bold">{t('PrivacyPolicy.cookiesNecessaryType')}</p>
                            <p>{t('PrivacyPolicy.cookiesNecessaryAdmin')}</p>
                            <p>{t('PrivacyPolicy.cookiesNecessaryPurpose')}</p>
                        </div>
                        <div>
                           <p className="text-base font-bold text-gray-700">{t('PrivacyPolicy.cookiesAcceptanceTitle')}</p>
                            <p>{t('PrivacyPolicy.cookiesAcceptanceType')}</p>
                            <p>{t('PrivacyPolicy.cookiesAcceptanceAdmin')}</p>
                            <p>{t('PrivacyPolicy.cookiesAcceptancePurpose')}</p>
                            <p>{t('PrivacyPolicy.cookiesAcceptancePurpose2')}</p>
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-700">{t('PrivacyPolicy.cookiesFunctionalityTitle')}</p>
                            <p>{t('PrivacyPolicy.cookiesFunctionalityType')}</p>
                            <p>{t('PrivacyPolicy.cookiesFunctionalityAdmin')}</p>
                        </div>
                    </div>

                    <p className="text-lg text-gray-700 font-bold mt-8 mb-4">{t('PrivacyPolicy.contactTitle')}</p>
                    <p className="mb-4">{t('PrivacyPolicy.contactText')}</p>
                    <ul className="list-disc ml-8 mb-8">
                        <li>{t('PrivacyPolicy.contactEmail')}</li>
                        <li>{t('PrivacyPolicy.contactWebsite')} <a href={SITE_URL} className="text-blue-600 hover:underline">{SITE_URL}</a></li>
                    </ul>
                </div>
            </section>
        </MainLayout>
    );
}