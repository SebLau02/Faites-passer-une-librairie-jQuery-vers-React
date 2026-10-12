function Input(props) {
  return (
    <input
      className={`Input-Base ${props.className || ""}`}
      style={{
        ...props.style,
      }}
      {...props}
    />
  );
}

export default Input;
