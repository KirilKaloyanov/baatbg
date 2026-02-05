import React from 'react';

interface StyledRadioButtonProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}

const StyledRadioButton: React.FC<StyledRadioButtonProps> = ({
  name,
  value,
  checked,
  onChange,
  label,
}) => {
  const handleClick = () => {
    onChange(value);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '80px', 
        height: '80px', 
        padding: '12px',
        backgroundColor: checked ? 'var(--base-900)' : 'var(--base-700)',
        color: checked ? 'white' : 'var(--base-900)', 
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '14px',
      }}>{label}</span>
    </div>
  );
};

export default StyledRadioButton;