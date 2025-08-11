import { Link } from "react-router-dom";
import { IDropdownOption } from "@/utilities/interfaces";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  label: string;
  labelTranslate?: boolean;
  options: Array<IDropdownOption>;
  className?: string;
  withBorder?: boolean;
}

const Dropdown: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    label,
    options,
    className = "",
    withBorder = false,
    labelTranslate = true,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (option: IDropdownOption) => {
    if (option.clickHandler) option.clickHandler(option);

    setIsDropdownOpen(false);
  };

  const handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  useOnClickOutside(ref as React.RefObject<HTMLElement>, handleClickOutside);

  return (
    <div
      className={clsx(
        "hidden xl:block relative transition-all duration-200",
        className
      )}
      ref={ref}
    >
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={clsx(
          "flex items-center gap-1 border rounded-md text-sm cursor-pointer transition-all duration-200",
          withBorder ? "border-white" : "border-transparent"
        )}
      >
        <span className="text-base">{labelTranslate ? t(label) : label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className={clsx(
            "absolute text-green right-0 mt-2 w-36 bg-white rounded-md shadow-lg"
          )}
        >
          {options.map((option) => {
            if (option.link) {
              return (
                <Link
                  onClick={() => setIsDropdownOpen(false)}
                  key={t(option.label)}
                  to={option.link}
                  className="block w-full px-4 py-2 text-left hover:text-white hover:bg-green transition-all ease-linear duration-200"
                >
                  {t(option.label)}
                </Link>
              );
            }

            return (
              <button
                key={labelTranslate ? t(option.label) : option.label}
                type="button"
                className="block cursor-pointer px-4 py-2 w-full text-left"
                onClick={() => handleClick(option)}
              >
                {labelTranslate ? t(option.label) : option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
