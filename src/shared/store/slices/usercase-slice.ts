import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** User-uploaded skin photos (URIs) for API submission */
export interface UserPhotos {
  imageUri?: string;
  frontUri?: string;
  leftUri?: string;
  rightUri?: string;
}

/** Quiz answers: question id -> selected option id */
export type QuizAnswers = Record<number, string>;

export interface UseCaseState {
  /** User skin photos to send to the API */
  userPhotos: UserPhotos | null;
  /** Quiz answers (questionId -> optionId) to send to the API */
  quizAnswers: QuizAnswers | null;
}

const initialState: UseCaseState = {
  userPhotos: null,
  quizAnswers: null,
};

const usecaseSlice = createSlice({
  name: "usercase",
  initialState,
  reducers: {
    setUserPhotos: (state, action: PayloadAction<UserPhotos>) => {
      state.userPhotos = action.payload;
    },
    setQuizAnswers: (state, action: PayloadAction<QuizAnswers>) => {
      state.quizAnswers = action.payload;
    },
    setUseCase: (
      state,
      action: PayloadAction<{ userPhotos?: UserPhotos | null; quizAnswers?: QuizAnswers | null }>
    ) => {
      if (action.payload.userPhotos !== undefined) {
        state.userPhotos = action.payload.userPhotos;
      }
      if (action.payload.quizAnswers !== undefined) {
        state.quizAnswers = action.payload.quizAnswers;
      }
    },
    clearUseCase: (state) => {
      state.userPhotos = null;
      state.quizAnswers = null;
    },
  },
});

export const {
  setUserPhotos,
  setQuizAnswers,
  setUseCase,
  clearUseCase,
} = usecaseSlice.actions;

export default usecaseSlice.reducer;
