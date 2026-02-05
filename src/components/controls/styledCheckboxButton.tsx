import React from 'react';

interface StyledCheckboxButtonProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}

export default function StyledCheckboxButton({
  value,
  checked,
  onChange,
  label,
} : StyledCheckboxButtonProps)  {
  const handleClick = () => {
    onChange(value);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        height: '40px', 
        padding: '12px',
        backgroundColor: checked ? 'var(--base-900)' : 'var(--base-700)',
        color: checked ? 'white' : 'var(--base-900)', 
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{
        fontSize: '14px',
      }}>{label}</span>
    </div>
  );
};
/*

<label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={selectedValues.includes(option)}
                onChange={(e) => onChange(option, e.target.checked)}
              />
              <span>{option}</span>
            </label>

*/