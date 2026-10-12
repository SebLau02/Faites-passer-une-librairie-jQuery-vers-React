const buttonProps = {
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
      className={`${className || ""} Button-Base`}
      style={{
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
