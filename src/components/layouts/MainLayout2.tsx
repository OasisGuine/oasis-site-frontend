import React from 'react'
import { IHeroSectionSlide } from '@/utilities/interfaces'
import { HeroHeightVariants } from '@/utilities/types'

import HeroSection from './HeroSection'
import Footer from './Footer'

interface Props extends React.PropsWithChildren {
    heroSectionSlides: Array<IHeroSectionSlide>
    heroHeightVariant?: keyof typeof HeroHeightVariants
}

const MainLayout: React.FC<Props> = (props) => {
    const {
        children,
        heroSectionSlides = [],
        heroHeightVariant = "3/4"
    } = props

    return (
        <div className='w-[100dvw) max-w-full'>
            <HeroSection slides={heroSectionSlides} heroHeightVariant={heroHeightVariant} />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout
