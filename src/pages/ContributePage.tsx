import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/components/inputs/Button";
import MainLayout from "@/components/layouts/MainLayout";
import PaymentForm from "@/components/inputs/PaymentForm";
import { RoundedIcon } from "@/components/ui/icons";

const DONOR_PORTAL_URL = import.meta.env.VITE_DONOR_PORTAL_URL || "";

export default function ContributePage() {
  const { t } = useTranslation();

  return (
    <MainLayout
      heroSectionSlides={[
        {
          id: 1,
          imageSrc: "/assets/img/all/2.png",
        },
      ]}
      heroHeightVariant="1/2"
    >
      <section className="max-w-7xl mx-auto my-8 px-4">
        <section className="">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="hidden md:block md:w-1/2 relative h-96 md:h-auto">
              <img
                alt="Bantaja community child"
                src="/assets/img/all/donate_img.png"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4 text-purple">{t("ContributePage.title")}</h1>
              <p className="text-gray mb-6 font-bold">{t("ContributePage.subTitle")}</p>
              <div className="space-y-4">
                <PaymentForm />
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col justify-start">
          <p className="mt-6 text-gray">{t("ContributePage.otherPaymentMethods")}</p>

          <div className="mt-2 xl:mt-6 gap-2 xl:gap-8 flex flex-col items-start">
            <div className="flex items-start gap-4">
              <RoundedIcon
                className="bg-transparent w-[90px] xl:w-[90px]"
                src="/assets/img/icon/portugal1.png"
                alt="PIX"
              />

               <div className="mt-2 font-bold text-gray">
                          <div>PORTUGAL</div>
              <div className="flex items-center gap-4 font-bold text-gray">
                MB WAY: <span className="text-purple">(+351) 933 071 337</span>
              </div>
              <div className="flex items-center gap-4 font-bold text-gray">
                IBAN: <span className="text-purple">PT50 0036 0001 9910 0105 9134 7</span>
              </div>
                 
             <div className="flex items-center gap-2 font-bold text-purple">
                ASSOCIAÇÃO SEMENTE ESCLARECIDA</div>
 </div>
            </div>

            <div className="flex items-start gap-4">
              <RoundedIcon
                className="bg-transparent w-[90px] xl:w-[90px]"
                src="/assets/img/icon/brazil1.png"
                alt="Bank"
              />
              <div className="mt-2 font-bold text-gray">
                          <div>BRASIL</div>
              <p className="flex items-center gap-2 font-bold text-gray">
                PIX: <span className="text-purple">06244093000186</span>
              </p>

              <div className="mt-3 font-bold text-gray">
                          <div>Caixa Econômica Federal</div>
                </div>
                <div>
                  {t("ContributePage.bankInfoBranch")}:{" "}
                  <span className="text-purple">4055</span>
                </div>
                <div>
                  {t("ContributePage.bankInfoNumber")}:{" "}
                  <span className="text-purple">00002923-3</span>
                </div>

                <div>
                  CNPJ: <span className="text-purple">06.244.093/0001-86</span>
                </div>

                <div>
                  <span className="text-purple">{t("ContributePage.bankInfoName")}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full mt-6 gap-4 items-center xl:flex-row xl:w-fit">
              <p className="text-gray">{t("ContributePage.donorPage.text")}</p>
              <Link to={DONOR_PORTAL_URL}>
                <Button>{t("ContributePage.donorPage.action")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}