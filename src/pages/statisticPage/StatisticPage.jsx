import UButton from "../../components/UI/UButton";

import s from "./style/StatisticPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { restartGame } from "../../store/slices/typingAreaSlice/typingAreaSlice";
import { typeResult } from "../../store/slices/typingAreaSlice/selectors";
import { useEffect } from "react";
import {
  calculateErrors,
  calculateWordsPerMinute,
  cleanUp,
} from "../../store/slices/statisticSlice/statisticSlice";
import { statistic } from "../../store/slices/statisticSlice/selectors";

function StatisticPage() {
  const dispatch = useDispatch();
  const result = useSelector((state) => typeResult(state));
  const gameStatistic = useSelector((state) => statistic(state));

  function rerunGame() {
    dispatch(restartGame());
    dispatch(cleanUp());
  }

  useEffect(() => {
    dispatch(calculateErrors(result));
    dispatch(calculateWordsPerMinute(result));
  }, []);

  return (
    <div className={s.container}>
      <p>Mistakes : {gameStatistic.errors} </p>
      <p>WPM : {gameStatistic.wordPerMinute}</p>
      <UButton callback={rerunGame}>Restart</UButton>
    </div>
  );
}

export default StatisticPage;
