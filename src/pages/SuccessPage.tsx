import MainLayout from "@/components/layouts/MainLayout2";
import Button from "@/components/inputs/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAssetUrl } from "@/utils/assets";

export default function SuccessPage() {
    const { t } = useTranslation();

    return (
        <MainLayout
            heroSectionSlides={[
                {
                    id: 1,
                    imageSrc: getAssetUrl('/assets/img/all/3.png'),
                }
            ]}
        >
            <div className="cs-x-container cs-y-container w-full flex flex-col gap-4 justify-center items-center">
                <h2 className="text-center text-green">{t('ContributeSuccessPage.title')}</h2>

                <div className="flex gap-4">
                    <Link to="/">
                        <Button>
                            {t('ContributeSuccessPage.action1')}
                        </Button>
                    </Link>

                    <Link to="/contribute">
                        <Button>
                            {t('ContributeSuccessPage.action2')}
                        </Button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}