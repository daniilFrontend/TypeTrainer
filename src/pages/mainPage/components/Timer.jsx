import s from "../style/Timer.module.css";

import { useEffect, useState } from "react";
import { ON } from "../../../store/slices/typingAreaSlice/constatns";
import { useDispatch } from "react-redux";
import { endGame } from "../../../store/slices/typingAreaSlice/typingAreaSlice";
import { setCompleteTime } from "../../../store/slices/statisticSlice/statisticSlice";

function Timer({ typeGameStatus }) {
  const [timer, setTimer] = useState(30);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;
    if (typeGameStatus === ON) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        dispatch(setCompleteTime())
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [typeGameStatus]);

  useEffect(() => {
    if (timer === 0) {
      dispatch(endGame());
    }
  }, [timer]);

  return <div className={s.timer}><h2>{timer}</h2></div>;
}

export default Timer;
