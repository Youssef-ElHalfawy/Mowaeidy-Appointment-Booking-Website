import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000/blogs";
const initialState = {
	blogs: [],
	isLoading: false,
	isError: false,
};

export const getBlogs = createAsyncThunk(
	"blogs/getBlogs",
	async (args, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(baseUrl);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const blogSlice = createSlice({
	name: "blogs",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getBlogs.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getBlogs.fulfilled, (state, action) => {
				state.isLoading = false;
				state.blogs = action.payload;
				state.isError = false;
			})
			.addCase(getBlogs.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const blogReducer = blogSlice.reducer;
