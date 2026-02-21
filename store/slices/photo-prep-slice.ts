import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UploadedSkinImages {
  imageUri?: string;
  frontUri?: string;
  leftUri?: string;
  rightUri?: string;
}

interface PhotoPrepState {
  uploadedImages: UploadedSkinImages | null;
}

const initialState: PhotoPrepState = {
  uploadedImages: null,
};

const photoPrepSlice = createSlice({
  name: "photoPrep",
  initialState,
  reducers: {
    setUploadedImages: (state, action: PayloadAction<UploadedSkinImages>) => {
      state.uploadedImages = action.payload;
    },
    clearUploadedImages: (state) => {
      state.uploadedImages = null;
    },
  },
});

export const { setUploadedImages, clearUploadedImages } = photoPrepSlice.actions;
export default photoPrepSlice.reducer;
