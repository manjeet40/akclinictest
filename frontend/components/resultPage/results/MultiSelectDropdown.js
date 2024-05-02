import { useState } from "react";

const MultiSelectDropdown = ({ options, onChange, categoryName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = (option) => {
    const updatedSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelectedOptions);
    onChange(updatedSelectedOptions);
  };

  return (
    <div className={`multiselect__dropdown ${isOpen ? "open" : "close"}`}>
      <div onClick={handleToggle} className="drop__head__box">
        <button className="dropdown-toggle-btn">{categoryName}</button>
        <span className="drop__svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_2283_3272)">
              <path
                d="M12.0007 13.1719L16.9507 8.22192L18.3647 9.63592L12.0007 15.9999L5.63672 9.63592L7.05072 8.22192L12.0007 13.1719Z"
                fill="#231F20"
              />
            </g>
            <defs>
              <clipPath id="clip0_2283_3272">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </div>
      <div className={`dropdown-content ${isOpen ? "open" : "close"}`}>
        {isOpen && (
          <div>
            {options.map((option) => (
              <label key={option} className="option-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionToggle(option)}
                  className="input__filter"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
