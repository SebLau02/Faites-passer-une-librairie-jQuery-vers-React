import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

function Select({ label, options, ...props }) {
  const { labelProps, menuProps } = props;
  const [open, setOpen] = useState(false);

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
    <div className="relative" ref={containerRef}>
      <Button
        onClick={handleToggle}
        style={{
          width: "100%",
        }}
        {...labelProps}
      >
        {label}
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
            ...menuProps?.style,
          }}
        >
          {options.map((option) => (
            <Button
              key={option.value}
              variant="outlined"
              style={{
                border: "none",
              }}
              onClick={() => {
                option.onClick?.();
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
