import MainLayout from "@/components/layouts/MainLayout2";
import { Link } from "react-router-dom";
import Button from "@/components/inputs/Button";
import { useTranslation } from "react-i18next";

export default function CancelPage() {
    const { t } = useTranslation();

    return (
        <MainLayout
            heroSectionSlides={[
                {
                    id: 1,
                    imageSrc: '/assets/img/all/3.png',
                }
            ]}
        >
            <div className="cs-x-container cs-y-container w-full flex flex-col gap-4 justify-center items-center">
                <h2 className="text-center text-green">{t('ContributeCancelPage.title')}</h2>

                <Link to="/contribute">
                    <Button>
                        {t('ContributeCancelPage.action')}
                    </Button>
                </Link>
            </div>
        </MainLayout>
    );
}