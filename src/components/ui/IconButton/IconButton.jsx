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

function IconButton({ children, variant = "contained", ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={`d-flex align-center justify-center`}
      style={{
        padding: "8px 8px",
        height: "fit-content",
        ...buttonProps.base,
        ...buttonProps.variant[variant].style,
        ...props?.style,
      }}
    >
      {children}
    </button>
  );
}

export default IconButton;
