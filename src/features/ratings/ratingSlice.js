import { createSlice } from "@reduxjs/toolkit";
import { upsertRatingThunk } from "./ratingThunks";

const ratingSlice = createSlice({
  name: "ratings",
  initialState: {
    saving: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upsertRatingThunk.pending, (s) => {
        s.saving = true;
        s.error = null;
      })
      .addCase(upsertRatingThunk.fulfilled, (s) => {
        s.saving = false;
      })
      .addCase(upsertRatingThunk.rejected, (s, a) => {
        s.saving = false;
        s.error = a.payload || a.error?.message;
      });
  },
});

export default ratingSlice.reducer;
