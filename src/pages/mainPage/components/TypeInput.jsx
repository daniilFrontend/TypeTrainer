import s from "../style/TypeInput.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  checkTypedChar,
  startGame,
} from "../../../store/slices/typingAreaSlice/typingAreaSlice";
import { OFF, ON } from "../../../store/slices/typingAreaSlice/constatns";
function TypeInput({ typeGameStatus }) {
  const [typedText, setTypedText] = useState("");
  const dispatch = useDispatch();
  const ref = useRef(null);

  function handleText(e) {
    const inputVal = e.target.value;
    setTypedText(inputVal);
  }

  useEffect(() => {
    if (typedText !== "" && typeGameStatus === OFF) {
      dispatch(startGame());
    }
    if (typedText.length === 1) {
      dispatch(
        checkTypedChar({ lastTypedChar: typedText[0], lastTypedIndex: 0 })
      );
    }
    if (typeGameStatus === ON) {
      const lastTypedIndex = typedText.length - 1;
      const lastTypedChar = typedText[lastTypedIndex];
      dispatch(checkTypedChar({ lastTypedChar, lastTypedIndex }));
    }
  }, [typedText]);

  useEffect(() => {
    ref.current.focus();
  }, []);
  
  return (
    <input
      className={s.typeInput}
      ref={ref}
      value={typedText}
      onChange={(e) => handleText(e)}
    />
  );
}

export default TypeInput;
