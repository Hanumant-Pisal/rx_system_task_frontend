import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storesReducer from "../features/stores/storeSlice";
import ratingReducer from "../features/ratings/ratingSlice";
import adminReducer from "../features/admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storesReducer,
    ratings: ratingReducer,
    admin: adminReducer,
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export default store;
