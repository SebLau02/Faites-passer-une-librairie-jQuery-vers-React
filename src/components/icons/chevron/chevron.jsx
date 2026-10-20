function Chevron({ className, ...props }) {
  return (
    <>
      <svg
        {...props}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-chevron-up preview-icon ${className || ""}`}
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </>
  );
}

export default Chevron;
