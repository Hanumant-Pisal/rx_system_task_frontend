import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi } from "./adminApi";

export const adminCreateUserThunk = createAsyncThunk(
  "admin/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await adminApi.createUser(payload);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const adminFetchUsersThunk = createAsyncThunk(
  "admin/listUsers",
  async (params, { rejectWithValue }) => {
    try {
      return await adminApi.listUsers(params);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const adminFetchStatsThunk = createAsyncThunk("admin/stats", async (_, { rejectWithValue }) => {
  try {
    return await adminApi.stats();
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});
