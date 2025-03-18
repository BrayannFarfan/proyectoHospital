
export const ToggleSwitch = ({ isYearly, onToggle }) => {
  return (
    <div className="toggle-container">
      <span>Monthly</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={isYearly}
          onChange={onToggle}
        />
        <span className="slider"></span>
      </label>
      <span>Yearly</span>
    </div>
  );
};