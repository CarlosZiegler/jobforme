import React from 'react';


export default function Toggle(props) {
  const {
    size = 'default',
    checked,
    disabled,
    onChange,
    offstyle = 'btn-danger',
    onstyle = 'btn-success',
    text,
  } = props;

  const displayStyle = checked ? onstyle : offstyle;
  return (
    <div className="toggle">
      <label className="control-label">
        <span className={`${size} switch-wrapper`}>
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={e => onChange(e)}
          />
          <span className={`${displayStyle} switch`}>
            <span className="switch-handle" />
          </span>
        </span>
        <span className="toggle-text">
          {text}
        </span>
      </label>
    </div>
  );
}
