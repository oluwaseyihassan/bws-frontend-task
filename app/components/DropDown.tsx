"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface DropDownProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const DropDown: React.FC<DropDownProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    "All",
    "Home Win",
    "Draw",
    "Away Win",
    "Home Over 50%",
    "Away Over 50%",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative min-w-[180px]" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        onClick={handleToggle}
        className="cursor-pointer border border-gray-400/40 text-white px-4 py-2 rounded-lg shadow-md hover:border-accent transition-colors duration-200 bg-dark-bg text-sm flex items-center justify-between"
      >
        <span className="text-white">{selectedOption}</span>
        <span className="text-gray-400 ml-2">
          {isOpen ? <IoChevronUp /> : <IoChevronDown />}
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-dark-bg border border-gray-400/40 rounded-lg shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`
                  px-4 py-2 cursor-pointer transition-colors duration-150 text-sm
                  ${
                    selectedOption === option
                      ? "bg-accent text-white"
                      : "text-white hover:bg-dark-bg-1"
                  }
                `}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
