import { createSlice } from "@reduxjs/toolkit";
import { TYPE_STATISTIC } from "./constants";
import { UNTYPED, WRONG } from "../typingAreaSlice/constatns";

const initialState = {
  statistic: {
    wordPerMinute: 0,
    errors: 0,
  },
  completeTime: 0
};

export const statisticSlice = createSlice({
  name: TYPE_STATISTIC,
  initialState,
  reducers: {
    setCompleteTime(state){
      state.completeTime++
    },
    calculateErrors(state, { payload }) {
      payload.forEach((el) => {
        if (el.status === WRONG) state.statistic.errors++;
      });
    },
    calculateWordsPerMinute(state, { payload }) {
      // Подсчет введенных символов
      const joinedStr = payload
        .filter((el) => el.status !== UNTYPED)
        .map((el) => el.char)
        .join("");
    
      // Подсчет слов без учета разделительных символов
      const wordsArray = joinedStr.split(/\s+|[.,!?;:()&|]/).filter(Boolean);
      const wordCount = wordsArray.length;
      
      // Расчет WPM
      const wordPerMinute = Math.round((wordCount * 60) / state.completeTime);
      state.statistic.wordPerMinute = wordPerMinute;
    },
    cleanUp(state) {
      state.statistic.errors = 0;
      state.statistic.wordPerMinute = 0;
      state.typedWords = 0;
      state.completeTime = 0
    },
  },
});

export const {setCompleteTime, cleanUp, calculateErrors, calculateWordsPerMinute } =
  statisticSlice.actions;

export default statisticSlice.reducer;
