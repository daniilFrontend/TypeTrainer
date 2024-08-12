import MainPage from "./pages/mainPage/MainPage";

import "./App.css";

import { useSelector } from "react-redux";
import { gameStatus } from "./store/slices/typingAreaSlice/selectors";
import { ON } from "./store/slices/typingAreaSlice/constatns";

function App() {
  const typeGameStatus = useSelector((state) => gameStatus(state));
  return (
    <div className="container">
      {typeGameStatus === ON ? (
        " "
      ) : (
        <header className="app__header">
          <h1>type gorilla</h1>
          <h4>start type or click on text to test</h4>
        </header>
      )}
      <MainPage />
    </div>
  );
}

export default App;
