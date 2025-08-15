import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/inputs/Button";
import MainLayout from "@/components/layouts/MainLayout";
import PaymentForm from "@/components/inputs/PaymentForm";
import { RoundedIcon } from "@/components/ui/icons";
import { getAssetUrl } from "@/utils/assets";
import Dialog from "@/components/ui/Dialog";

const DONOR_PORTAL_URL = import.meta.env.VITE_DONOR_PORTAL_URL || "";

export default function ContributePage() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("eur");

  const handleDonorPortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCurrencyConfirm = () => {
    // Construct the donor portal URL with currency parameter
    const url = `${DONOR_PORTAL_URL}?currency=${selectedCurrency}`;
    window.open(url, "_blank");
    setIsModalOpen(false);
  };

  return (
    <MainLayout
      heroSectionSlides={[
        {
          id: 1,
          imageSrc: getAssetUrl("/assets/img/all/2.png"),
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
                src={getAssetUrl("/assets/img/all/donate_img.png")}
                className="object-cover"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4 text-purple">
                {t("ContributePage.title")}
              </h1>
              <p className="text-gray mb-6 font-bold">
                {t("ContributePage.subTitle")}
              </p>
              <div className="space-y-4">
                <PaymentForm />
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col justify-start">
          <p className="mt-6 text-gray">
            {t("ContributePage.otherPaymentMethods")}
          </p>

          <div className="mt-2 xl:mt-6 gap-2 xl:gap-8 flex flex-col items-start">
            <div className="flex items-start gap-4">
              <RoundedIcon
                className="bg-transparent w-[90px] xl:w-[90px]"
                src={getAssetUrl("/assets/img/icon/portugal1.png")}
                alt="PIX"
              />

              <div className="mt-2 font-bold text-gray">
                <div>PORTUGAL</div>
                <div className="flex items-center gap-4 font-bold text-gray">
                  MB WAY:{" "}
                  <span className="text-purple">(+351) 933 071 337</span>
                </div>
                <div className="flex items-center gap-4 font-bold text-gray">
                  IBAN:{" "}
                  <span className="text-purple">
                    PT50 0036 0001 9910 0105 9134 7
                  </span>
                </div>

                <div className="flex items-center gap-2 font-bold text-purple">
                  ASSOCIAÇÃO SEMENTE ESCLARECIDA
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <RoundedIcon
                className="bg-transparent w-[90px] xl:w-[90px]"
                src={getAssetUrl("/assets/img/icon/brazil1.png")}
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
                  <span className="text-purple">
                    {t("ContributePage.bankInfoName")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full mt-6 gap-4 items-center xl:flex-row xl:w-fit">
              <p className="text-gray">{t("ContributePage.donorPage.text")}</p>
              <Button onClick={handleDonorPortalClick}>
                {t("ContributePage.donorPage.action")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Portal Currency Selection Modal */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("ContributePage.donorPortalModal.title")}
        maxWidth="max-w-md"
        titleClassName="text-purple"
      >
        <div className="flex gap-6 items-start">
          {/* Imagem da criança */}
          <div className="flex-shrink-0">
            <img
              src={getAssetUrl(
                "/assets/img/icon/small-black-kid-happy-smiling-waving-with-hand.png"
              )}
              alt={t("ContributePage.donorPortalModal.imageAlt")}
              className="rounded-lg object-cover"
              style={{ height: "120px" }}
            />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 space-y-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {t("ContributePage.donorPortalModal.description")}
            </p>

            {/* Seletor e botão em linha */}
            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#509f8c] focus:border-transparent appearance-none"
                  style={{ minWidth: "120px" }}
                >
                  <option value="eur">EURO €</option>
                  <option value="usd">USD $</option>
                  <option value="brl">BRL R$</option>
                </select>
              </div>

              <Button
                onClick={handleCurrencyConfirm}
                className="px-6 py-3 bg-[#509f8c] hover:bg-[#458a79] text-white rounded-full font-medium transition-colors"
              >
                {t("ContributePage.donorPortalModal.confirmButton")}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </MainLayout>
  );
}
