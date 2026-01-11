import { createAsyncThunk } from "@reduxjs/toolkit";
import { storeApi } from "./storeApi";

export const fetchStoresThunk = createAsyncThunk(
  "stores/userList",
  async (params, { rejectWithValue }) => {
    try {
      return await storeApi.userList(params);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const adminFetchStoresThunk = createAsyncThunk(
  "stores/adminList",
  async (params, { rejectWithValue }) => {
    try {
      return await storeApi.adminList(params);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const adminCreateStoreThunk = createAsyncThunk(
  "stores/adminCreate",
  async (payload, { rejectWithValue }) => {
    try {
      return await storeApi.adminCreate(payload);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);
