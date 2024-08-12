import { createSlice } from "@reduxjs/toolkit";
import {
  CORRECT,
  OFF,
  ON,
  PHRASE1,
  PHRASE2,
  PHRASE3,
  TYPING_AREA,
  UNTYPED,
  WRONG,
} from "./constatns";

const initialState = {
  testPhraseList: [PHRASE1, PHRASE2, PHRASE3],
  phraseIndex: 0,  // phrase of list 
  currentPhrase: [], // [{char: "a", status: UNTYPED | WRONG | CORRECT}]
  gameStatus: OFF, // OFF | ON 
  isGameEnded: false, // bool
  lastIndexChanged: 0, // TODO логика для каретки 
};

export const typingAreaSlice = createSlice({
  name: TYPING_AREA,
  initialState,
  reducers: {
    initCurrentPhrase(state) {
      if (state.currentPhrase.length !== 0) {
        state.currentPhrase = [];
      }

      const phrase = state.testPhraseList[state.phraseIndex].split("");
      phrase.forEach((el) => {
        state.currentPhrase.push({ char: el, status: UNTYPED });
      });

      //  установка фразы
      state.phraseIndex < state.testPhraseList.length - 1
        ? state.phraseIndex++
        : (state.phraseIndex = 0);
    },

    checkTypedChar(state, { payload }) {
      const splitedPhrase = state.currentPhrase;
      const { lastTypedChar, lastTypedIndex } = payload;
      let lastIndexPhrase = null;
      let symbolPhrase = null;

      // Проверка пустой инпут или нет
      if (lastTypedChar !== undefined) {
        lastIndexPhrase = splitedPhrase.length - 1;
        symbolPhrase = splitedPhrase[lastTypedIndex].char;
      } else {
        splitedPhrase[0].status = UNTYPED;
        return;
      }

      // Конец ввода после последнего символа
      if (lastTypedIndex === lastIndexPhrase) {
        if (lastTypedChar === splitedPhrase[lastIndexPhrase].char) {
          splitedPhrase[lastIndexPhrase].status = CORRECT;
        } else {
          splitedPhrase[lastIndexPhrase].status = WRONG;
        }
        state.gameStatus = OFF;
        state.isGameEnded = true;
        return
      }

      // обработка символов
      if (lastTypedChar === splitedPhrase[lastTypedIndex].char) {
        splitedPhrase[lastTypedIndex].status = CORRECT;
        splitedPhrase[lastTypedIndex + 1].status = UNTYPED;
      } else {
        splitedPhrase[lastTypedIndex + 1].status = UNTYPED;
        splitedPhrase[lastTypedIndex].status = WRONG;
      }
    },

    startGame(state) {
      state.gameStatus = ON;
    },

    endGame(state) {
      state.gameStatus = OFF;
      state.isGameEnded = true;
    },

    restartGame(state) {
      state.isGameEnded = false;
    },
  },
});

export const {
  restartGame,
  startGame,
  endGame,
  checkTypedChar,
  initCurrentPhrase,
} = typingAreaSlice.actions;

export default typingAreaSlice.reducer;
