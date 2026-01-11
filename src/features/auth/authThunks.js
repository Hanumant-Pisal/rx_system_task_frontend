import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.signup(payload);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.login(payload);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const fetchMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    return await authApi.me();
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return await authApi.logout();
});

export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.changePassword(payload);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);
