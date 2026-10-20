const buttonProps = {
  variant: {
    contained: {
      style: {
        backgroundColor: "var(--primary-500)",
        borderColor: "var(--primary-800)",
      },
    },
    outlined: {
      style: {
        backgroundColor: "var(--light)",
        borderColor: "var(--primary-800)",
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
