const buttonProps = {
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
      className={`Button-Base d-flex align-center justify-center`}
      style={{
        padding: "8px 8px",
        height: "fit-content",
        ...buttonProps.variant[variant].style,
        ...props?.style,
      }}
    >
      {children}
    </button>
  );
}

export default IconButton;
