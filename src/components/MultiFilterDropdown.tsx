import React from "react";

interface MultiFilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const MultiFilterDropdown: React.FC<MultiFilterDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative">
      <details className="group">
        <summary className="cursor-pointer bg-[#E6E9F2] select-none border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:border-gray-400 flex items-center justify-between min-w-[180px]">
          <span>{label}</span>
          <span className="ml-2 text-gray-500 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-full max-h-56 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2 accent-indigo-600"
              />
              {option}
            </label>
          ))}
        </div>
      </details>
    </div>
  );
};

export default MultiFilterDropdown;
