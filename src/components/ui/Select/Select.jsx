import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Chevron from "../../icons/chevron/chevron";

function Select({ label = "", options, value, onChange, style, ...props }) {
  const { labelProps, menuProps } = props;
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    setOpen(!open);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return; // pas besoin d'écouter quand le menu est fermé

    const handleClickOutside = (event) => {
      if (!containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef} style={style}>
      {label && (
        <label
          {...labelProps}
          className={`mb-1 d-block ${labelProps?.className}`}
        >
          {label}
        </label>
      )}
      <Button
        onClick={handleToggle}
        style={{
          width: "100%",
        }}
        className="d-flex justify-space-between align-center gap-1"
      >
        <span>{selectedOption?.label || "Select an option"}</span>
        <Chevron className={`${open ? "rotate-0" : "rotate-180"}`} />
      </Button>
      {open && (
        <div
          {...menuProps}
          className={`${menuProps?.className} absolute d-flex flex-column`}
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            maxWidth: "100%",
            translate: "0 100%",
            backgroundColor: "var(--light)",
            border: "1px solid var(--border)",
            maxHeight: "200px",
            scrollbarWidth: "thin",
            overflow: "auto",
            ...menuProps?.style,
          }}
        >
          {options.map((option) => (
            <Button
              key={option.value}
              variant={
                selectedOption?.value === option.value
                  ? "contained"
                  : "outlined"
              }
              style={{
                border: "none",
              }}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              {...option.props}
            >
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
