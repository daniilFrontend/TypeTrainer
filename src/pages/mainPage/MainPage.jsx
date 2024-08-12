import TypeArea from "./components/TypeArea";
import TypeInput from "./components/TypeInput";
import Timer from "./components/Timer";
import StatisticPage from "../statisticPage/StatisticPage";

import s from "./style/MainPage.module.css";

import { useSelector } from "react-redux";
import {
  gameSessionStatus,
  gameStatus,
} from "../../store/slices/typingAreaSlice/selectors";

function MainPage() {
  const typeGameStatus = useSelector((state) => gameStatus(state));
  const isGameEnded = useSelector((state) => gameSessionStatus(state));

  return (
    <div className={s.container}>
      {isGameEnded ? (
        <div className={s.statisticPage}>
          <StatisticPage />
        </div>
      ) : (
        <div className={s.typeArea}>
          <Timer typeGameStatus={typeGameStatus} />
          <TypeArea>
            <TypeInput typeGameStatus={typeGameStatus} />
          </TypeArea>
        </div>
      )}
    </div>
  );
}

export default MainPage;
