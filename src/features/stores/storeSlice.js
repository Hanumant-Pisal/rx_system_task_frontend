import { createSlice } from "@reduxjs/toolkit";
import { fetchStoresThunk, adminFetchStoresThunk, adminCreateStoreThunk } from "./storeThunks";

const initialState = {
  list: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchStoresThunk.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchStoresThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.items || a.payload.data || a.payload.items || [];
        s.total = a.payload.total || 0;
        s.page = a.payload.page || 1;
        s.limit = a.payload.limit || 10;
      })
      .addCase(fetchStoresThunk.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
      })
      
      .addCase(adminFetchStoresThunk.pending, (s) => {
        s.loading = true;
      })
      .addCase(adminFetchStoresThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.items || [];
        s.total = a.payload.total || 0;
        s.page = a.payload.page || 1;
        s.limit = a.payload.limit || 10;
      })
      .addCase(adminFetchStoresThunk.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
      })
      
      .addCase(adminCreateStoreThunk.fulfilled, (s, a) => {
        s.list.unshift(a.payload.store);
        s.total += 1;
      });
  },
});

export default storeSlice.reducer;
