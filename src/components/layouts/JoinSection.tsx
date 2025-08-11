import Button from "../inputs/Button";
import { useTranslation } from "react-i18next";

const JoinSection = () => {
    const { t } = useTranslation()
    return (
        <section className="cs-x-container cs-y-container bg-purple text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <h3 className="">{t('HomePage.joinSection.title')}</h3>
                <p className="hidden md:block max-w-2/5">
                    {t('HomePage.joinSection.subTitle')}
                </p>
                <Button>
                    {t('HomePage.joinSection.action')}
                </Button>
            </div>
        </section>
    );
};

export default JoinSection;
