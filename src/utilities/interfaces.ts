import { LanguageType } from "./types";

export interface ILayoutSectionProps {
  lang?: LanguageType;
}

export interface IDropdownOption {
  label: string;
  link?: string;
  clickHandler?: any;
}

export interface IHeroSectionSlide {
  id: number;
  titleTranslationKey?: string;
  subTitleTranslationKey?: string;
  actionTranslationKey?: string;
  actionLink?: string;
  imageSrc: string;
  imgPosition?: string;
}
