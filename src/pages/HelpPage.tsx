import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import MainLayout from "@/components/layouts/MainLayout";
import Button from "@/components/inputs/Button";
import clsx from "clsx";
import { RoundedIcon } from "@/components/ui/icons";
import { getAssetUrl } from "@/utils/assets";

export default function HelpPage() {
  const { t } = useTranslation();

  // Define the hero section slides
  const heroSlides = [
    {
      id: 1,
      imageSrc: getAssetUrl("/assets/img/all/13.png"),
    },
  ];

  // Define the cards data
  const cards = [
    {
      id: 1,
      image: getAssetUrl("/assets/img/all/kids-together.png"),
      title: "section1.item1.title",
      subTitle: "section1.item1.subTitle",
      component: (
        <div className="gap-2 flex flex-col items-start">
          <div className="flex items-center">
            <RoundedIcon
              className="bg-transparent"
              src={getAssetUrl("/assets/img/icon/fi-ss-chart-set-theory.png")}
              alt="PIX"
            />
            <p className="text-gray font-semibold">
              <div>{t("HelpPage.section1.item1.info1")}</div>
            </p>
          </div>

          <div className="flex items-start">
            <RoundedIcon
              className="bg-transparent"
              src={getAssetUrl("/assets/img/icon/fi-ss-bank.png")}
              alt="Bank"
            />
            <p className="text-gray font-semibold">   
                <div>Caixa Econômica Federal (Brasil)</div>

                <div>
                  {t("HelpPage.section1.item1.bankInfoBranch")}: 4055
                </div>
                <div>
                  {t("HelpPage.section1.item1.bankInfoNumber")}: 00002923-3
                </div>

                <div>
                  CNPJ: 06.244.093/0001-86
                </div>

                <div>
                  {t("HelpPage.section1.item1.bankInfoName")}
                </div>            
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full justify-between xl:flex-row ">
            <div className="flex items-center">
              <RoundedIcon
                className="bg-transparent"
                src={getAssetUrl("/assets/img/icon/fi-ss-money.png")}
                alt="Bank"
              />
              <p className="text-gray font-semibold">
                {t("HelpPage.section1.item1.info3")}
              </p>
            </div>
            <Link className="self-center xl:justify-start" to="/contribute">
              <Button>{t("HelpPage.section1.item1.action")}</Button>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      image: getAssetUrl("/assets/img/all/15.png"),
      title: "section1.item2.title",
      description: "section1.item2.description",
    },
    {
      id: 3,
      image: getAssetUrl("/assets/img/all/16.jpeg"),
      title: "section1.item3.title",
      description: "section1.item3.description",
      action: "section1.item3.action",
      link: "https://www.instagram.com/umoasisnaguine?igsh=NW1zdWZseGM4cmZ5",
    },
  ];

  // Define the section 2 items
  const section2Items = [
    {
      id: 1,
      image: getAssetUrl("/assets/img/all/19.png"),
      title: "section2.partnerships.title",
      description: "section2.partnerships.description",
      alt: "Partnerships",
    },
    {
      id: 2,
      image: getAssetUrl("/assets/img/all/18.png"),
      title: "section2.infrastructure.title",
      description: "section2.infrastructure.description",
      alt: "Infrastructure",
    },
    {
      id: 3,
      image: getAssetUrl("/assets/img/all/25.png"),
      title: "section2.campaigns.title",
      description: "section2.campaigns.description",
      alt: "Campaigns",
      isSidebar: true,
    },
  ];

  return (
    <MainLayout heroSectionSlides={heroSlides} heroHeightVariant="1/2">
      <section className="cs-x-container cs-y-container flex flex-col gap-12">
        <div className="flex flex-col items-center xl:gap-6 gap-4">
          <h1 className="text-center uppercase text-green">{t("HelpPage.title")}</h1>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="relative w-full flex flex-col xl:flex-row"
            >
              <div
                className={clsx(
                  "w-2/5 h-full hidden xl:block",
                  index % 2 !== 0 && "order-2"
                )}
              />

              <div className="relative w-full xl:w-3/5 h-[300px] xl:h-[330px]">
                <img
                  src={card.image}
                  alt={t(`HelpPage.${card.title}`)}
                  className="w-full h-full object-cover rounded-[8px] d-shadow"
                />
              </div>

              <div
                className={clsx(
                  "xl:absolute xl:top-[50%] xl:-translate-y-[50%] w-full xl:w-1/2 h-10/12 xl:h-fit xl:min-h-[200px] bottom-1/12 bg-light-pink p-4 flex flex-col flex-1 gap-2",
                  index % 2 !== 0 ? "right-0" : "left-0"
                )}
              >
                <h3 className="text-purple">{t(`HelpPage.${card.title}`)}</h3>

                {card.subTitle && (
                  <h6 className="text-gray font-semibold -mt-2">
                    {t(`HelpPage.${card.subTitle}`)}
                  </h6>
                )}

                {card.description && (
                  <h5 className="text-gray mb-2 flex-1">
                    {t(`HelpPage.${card.description}`)}
                  </h5>
                )}

                {card.component}

                {card.action && (
                  <a className="self-center xl:self-start" href={card.link} target="_blank" rel="noopener noreferrer">
                    <Button>{t(`HelpPage.${card.action}`)}</Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div id="company-support" className="flex flex-col items-start xl:items-center gap-2 max-w-6xl mx-auto">
          <h2 className="text-start xl:text-center text-green text-3xl">
            {t("HelpPage.section2.title")}
          </h2>
          <h5 className="text-start xl:text-center text-gray mb-2">
            {t("HelpPage.section2.subtitle")}
          </h5>
          <div className="flex flex-col xl:flex-row bg-light-pink xl:d-shadow">
            <div className="flex flex-col gap-4 w-full xl:w-3/4">
              {/* Map through the main section 2 items */}
              {
                section2Items
                  .filter((item) => !item.isSidebar)
                  .map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col xl:flex-row xl:items-center xl:h-full p-4 gap-4"
                      >
                        <div className="h-48 xl:w-[300px]">
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="h-full w-full object-cover rounded-[8px]"
                          />
                        </div>
                        <div className="xl:w-[600px] h-full">
                          <h4 className="text-purple mb-5">{t(`HelpPage.${item.title}`)}</h4>
                          <p className="text-gray font-semibold text-lg">{t(`HelpPage.${item.description}`)}</p>
                        </div>
                      </div>
                    );
                  })
              }
            </div>

            <div className="flex flex-col gap-4 p-4 w-full xl:w-1/4 bg-light-pink xl:bg-white xl:shadow-lg">
              {section2Items
                .filter((item) => item.isSidebar)
                .map((item) => (
                  <div className="flex flex-col gap-4" key={item.id}>
                    <div className="relative h-48 w-full rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-purple mb-2">{t(`HelpPage.${item.title}`)}</h4>
                      <p className="text-gray font-semibold">{t(`HelpPage.${item.description}`)}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}