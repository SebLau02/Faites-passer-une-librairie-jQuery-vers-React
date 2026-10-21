const buttonProps = {
  base: {
    borderRadius: "0.25rem",
    border: "1px solid var(--oc-primary800)",

    "&:hover": {
      filter: "brightness(0.9)",
    },
    "&:active": {
      filter: "brightness(1)",
    },
  },
  size: {
    small: {
      style: {
        padding: "0.25rem 0.5rem",
      },
    },
    md: {
      style: {
        padding: "0.5rem 1rem",
      },
    },
    large: {
      style: {
        padding: "0.75rem 1.5rem",
      },
    },
  },
  variant: {
    contained: {
      style: {
        backgroundColor: "var(--oc-primary500)",
        borderColor: "var(--oc-primary800)",
      },
    },
    outlined: {
      style: {
        backgroundColor: "var(--oc-light)",
        borderColor: "var(--oc-primary800)",
      },
    },
  },
};

function Button({
  children,
  style,
  size = "md",
  variant = "contained",
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={`${className || ""}`}
      style={{
        ...buttonProps.base,
        ...buttonProps.size[size].style,
        ...buttonProps.variant[variant].style,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
