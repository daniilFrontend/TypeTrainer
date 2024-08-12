import { configureStore } from '@reduxjs/toolkit'
import statisticSlice from './slices/statisticSlice/statisticSlice'
import typingAreaSlice from './slices/typingAreaSlice/typingAreaSlice'

export const store = configureStore({
  reducer: {
  statistic: statisticSlice,
  typingArea: typingAreaSlice,
  },
  devTools: true
})