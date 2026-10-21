const styles = {
  dialog: {},
  backdrop: {
    backgroundColor: "var(--backdrop)",
    width: "100%",
    height: "100%",
  },
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

function Modal({ style, children, open, onClose, ...props }) {
  if (!open) return;
  return (
    <div
      {...props}
      style={{
        ...styles.root,
        ...styles.backdrop,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
          backgroundColor: "var(--light)",
          padding: "1rem",
          borderRadius: "var(--radius)",
          minWidth: 400,
          ...style,
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
