const MenuIcon = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "2.5rem",
        height: "1em",
        display: "inline-block",
        color: "#1D53A0",
      }}
    >
      {/*long */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          rght: 0,
          width: "2.5rem",
          height: "4px",
          backgroundColor: "currentColor",
          borderRadius: "1px",
        }}
      ></div>
      {/*short */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "1.5rem",
          height: "4px",
          backgroundColor: "currentColor",
          borderRadius: "1px",
        }}
      ></div>
    </div>
  );
};

export default MenuIcon;
