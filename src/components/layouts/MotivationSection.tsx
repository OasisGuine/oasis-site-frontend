import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { getAssetUrl } from '@/utils/assets'

const MotivationSection = () => {
  const { t } = useTranslation()

  return (
    <section className='cs-x-container cs-y-container relative'>
      {/* Fundo roxo ocupando toda a largura da seção */}
      <div className="absolute inset-0 -z-10">
        <img
          src={getAssetUrl("/assets/img/all/purple-background.png")}
          alt="purple background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className={clsx('w-full flex justify-center items-center sm:p-8 p-4 relative')}>
        {/* Container flex para ícone e texto */}
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <img
            src={getAssetUrl("/assets/img/icon/small-clipboard-with-pen.png")}
            alt="notebook-pen"
            className="w-13 sm:w-20 md:w-20 lg:w-24 xl:w-30"
          />
          <h1 className={clsx('text-white','font-bold','text-xl','text-center','max-w-[80%]')}>
            {t('HomePage.motivationSection.text')}
          </h1>
        </div>
      </div>
    </section>
  )
}

export default MotivationSection

