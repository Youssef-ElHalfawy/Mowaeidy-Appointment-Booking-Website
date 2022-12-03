import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	infos: [],
	isLoading: false,
	error: null,
};
const baseURL = "http://localhost:5000/adminpanel/info";

export const getinfo = createAsyncThunk("adminpanel/info", async (args, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		const res = await axios.get(baseURL);
		return res.data;
	} catch (err) {
		return rejectWithValue(err.message);
	}
});

const infoSlice = createSlice({
	name: "infos",
	initialState,
	reducers: {},
	extraReducers: {
		// Get info
		[getinfo.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getinfo.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.infos = action.payload;
		},
		[getinfo.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const infoReducer = infoSlice.reducer;
export const infoActions = infoSlice.actions;
