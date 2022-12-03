import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "./reducer/BlogSlice";
import { infoReducer } from "./reducer/InfoSlice";
import { orgReducer } from "./reducer/orgSlice";
import { userReducer } from "./reducer/userSlice";
import { appointReducer } from "./reducer/appointSlice";

export const store = configureStore({
	reducer: {
		info: infoReducer,
		orgReducer,
		blogs: blogReducer,
		userReducer,
		appointReducer,
	},
});
