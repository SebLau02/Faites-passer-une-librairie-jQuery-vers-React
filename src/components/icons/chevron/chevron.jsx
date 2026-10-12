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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={`lucide lucide-chevron-up preview-icon ${className || ""}`}
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </>
  );
}

export default Chevron;
