function ThemeProvider({ theme, children }) {
  const css = {};
  Object.entries(theme.palette).forEach(([k, v]) => {
    css[`--oc-${k}`] = v;
  });
  return (
    <div
      style={{
        ...css,
        "--oc-radius": theme.radius,
      }}
    >
      {children}
    </div>
  );
}

export default ThemeProvider;
