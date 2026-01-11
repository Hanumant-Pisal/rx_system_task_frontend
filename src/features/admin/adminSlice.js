import { createSlice } from "@reduxjs/toolkit";
import { adminCreateUserThunk, adminFetchUsersThunk, adminFetchStatsThunk } from "./adminThunks";

const initialState = {
  users: [],
  usersTotal: 0,
  usersLoading: false,
  stats: { users: 0, stores: 0, ratings: 0 },
  statsLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(adminFetchUsersThunk.pending, (s) => {
        s.usersLoading = true;
      })
      .addCase(adminFetchUsersThunk.fulfilled, (s, a) => {
        s.usersLoading = false;
        s.users = a.payload.items || [];
        s.usersTotal = a.payload.total || 0;
      })
      .addCase(adminFetchUsersThunk.rejected, (s, a) => {
        s.usersLoading = false;
        s.error = a.payload || a.error?.message;
      })
      
      .addCase(adminCreateUserThunk.fulfilled, (s, a) => {
        s.users.unshift(a.payload.user);
        s.usersTotal += 1;
      })
      
      .addCase(adminFetchStatsThunk.pending, (s) => {
        s.statsLoading = true;
      })
      .addCase(adminFetchStatsThunk.fulfilled, (s, a) => {
        s.statsLoading = false;
        s.stats = a.payload;
      })
      .addCase(adminFetchStatsThunk.rejected, (s, a) => {
        s.statsLoading = false;
        s.error = a.payload || a.error?.message;
      });
  },
});

export default adminSlice.reducer;
