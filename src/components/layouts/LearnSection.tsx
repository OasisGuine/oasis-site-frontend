import { useTranslation } from 'react-i18next'
import Button from '../inputs/Button'
import { Link } from 'react-router-dom';

const LearnSection = () => {
    const { t } = useTranslation()

    return (
        <section
            id='nossos-valores'
            className='cs-x-container cs-y-container flex flex-col items-center gap-8'
        >            
        <h3 className='text-green text-start text-shadow xl:text-center'>{t('HomePage.learnSection.title')}</h3>

<div className="flex flex-col xl:flex-row justify-center md:justify-start items-center gap-4 xl:gap-8">
  {/* IMAGEM À ESQUERDA */}
  <div className="relative w-full xl:w-1/2 h-[400px]">
    <img
      src="/assets/img/all/kids-school.png"
      alt="Kids at school"
      className="w-full h-full object-cover drop-shadow-md"
      style={{ objectPosition: 'top 40%' }}
    />
  </div>

  {/* TEXTO À DIREITA */}
  <div className="w-full xl:w-1/2 flex flex-col justify-between items-center xl:items-start gap-6 xl:gap-8">
    <h4 className="text-gray leading-8 font-medium text-center xl:text-left" dangerouslySetInnerHTML={{ __html: t("HomePage.learnSection.subTitle") }}>
    </h4>
<h4 className="font-extrabold text-purple text-center xl:text-left">
  {t("HomePage.learnSection.subTitle2")}
</h4>      
    <Link to="/contribute">
      <Button>{t('HomePage.learnSection.action')}</Button>
    </Link>
  </div>
</div>
        </section>
    )
}

export default LearnSection;