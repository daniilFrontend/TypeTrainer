import s from "../style/TypeArea.module.css"
import { useDispatch, useSelector } from "react-redux";
import { initCurrentPhrase } from "../../../store/slices/typingAreaSlice/typingAreaSlice";
import { typeResult } from "../../../store/slices/typingAreaSlice/selectors";
import { useEffect } from "react";

function TypeArea({ children }) {
  const dispatch = useDispatch();
  const currentPrase = useSelector((state) => typeResult(state));
  
  useEffect(() => {
    dispatch(initCurrentPhrase());
  }, []);

  return (
    <div className={s.typeArea}>
      {children}
      <div className={s.typePhrase}>
        {currentPrase.map((el, i) => {
          return (
            <span className={el.status} key={i}>
              {el.char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default TypeArea;
