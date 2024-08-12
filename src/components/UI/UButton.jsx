
function UButton({callback, style,children , type}) {
    const defaultStyle = {
        width: "100px",
        height: "20px",
    }
  return (
    <button style={style ? style : defaultStyle} onClick={callback}>
      {children}
    </button>
  );
}

export default UButton;
