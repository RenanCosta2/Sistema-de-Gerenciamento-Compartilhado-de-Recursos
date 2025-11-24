import React from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiFilterDropdownProps {
  label: string;
  options: (string | Option)[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const MultiFilterDropdown: React.FC<MultiFilterDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const normalize = (option: string | Option): Option =>
    typeof option === "string" ? { value: option, label: option } : option;

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative z-0">
      <details className="group">
        <summary className="cursor-pointer bg-[#E6E9F2] select-none border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:border-gray-400 flex items-center justify-between min-w-[180px]">
          <span>{label}</span>
          <span className="ml-2 text-gray-500 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-0 w-full max-h-56 overflow-y-auto">
          {options.map((opt) => {
            const { value, label } = normalize(opt);
            return (
              <label
                key={value}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(value)}
                  onChange={() => toggleOption(value)}
                  className="mr-2 accent-indigo-600"
                />
                {label}
              </label>
            );
          })}
        </div>
      </details>
    </div>
  );
};

export default MultiFilterDropdown;
