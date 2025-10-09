import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Button from '../inputs/Button';
import { Link } from 'react-router-dom';
import { IHeroSectionSlide } from '@/utilities/interfaces';
import { HeroHeightVariants } from '@/utilities/types';

interface Props {
    slides: Array<IHeroSectionSlide>
    heroHeightVariant?: keyof typeof HeroHeightVariants
}

const HeroSection: React.FC<Props> = (props) => {
    const { slides, heroHeightVariant = "3/4" } = props

    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 12000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <section className={clsx(
            "cs-hero cs-section-with-bg text-white relative overflow-hidden",
            HeroHeightVariants[heroHeightVariant]
        )}>
            <div
                key={slides[currentIndex].imageSrc}
                className="absolute inset-0 bg-cover bg-[position:80%_50%] md:bg-center"
                style={{ backgroundImage: `url(${slides[currentIndex].imageSrc})`, backgroundPositionY :`${slides[currentIndex].imgPosition || "center"}`}}
            />

            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black to-transparent opacity-75" />

            <div className="cs-x-container cs-y-container flex flex-col items-center w-full h-full justify-end text-center gap-4 !pb-40 md:text-start md:items-start md:!pl-10 md:!pr-60 md:!py-40  lg:!gap-5 xl:justify-start xl:!pt-0 xl:max-w-[60%] relative">
                {
                    slides[currentIndex].titleTranslationKey && (
                        <AnimatePresence mode="wait">
                            <motion.h3 
                                key={slides[currentIndex].titleTranslationKey}
                                dangerouslySetInnerHTML={{ __html: t(slides[currentIndex].titleTranslationKey) }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8 }}
                                className='md:text-[48px]'
                            />
                        </AnimatePresence>
                    )
                }

                {
                    slides[currentIndex].subTitleTranslationKey && (
                        <AnimatePresence mode="wait">
                            <motion.h4
                                key={slides[currentIndex].subTitleTranslationKey}
                                dangerouslySetInnerHTML={{ __html: t(slides[currentIndex].subTitleTranslationKey) }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className='uppercase xl:!text-[24px]'
                            />
                        </AnimatePresence>
                    )
                }

                {
                    slides[currentIndex].actionTranslationKey && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slides[currentIndex].actionTranslationKey}
                                className="flex gap-x-8 items-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Link to={slides[currentIndex].actionLink ?? '/'} >
                                    <Button>{t(slides[currentIndex].actionTranslationKey)}</Button>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    )
                }
            </div>

            {
                slides.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                className={clsx(
                                    `h-5 w-5 cursor-pointer rounded-full transition-all duration-500`,
                                    currentIndex === index ? 'bg-green' : 'bg-gray'
                                )}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                )
            }
        </section>
    );
};

export default HeroSection;
