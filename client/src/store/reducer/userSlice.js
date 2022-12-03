import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/user";
const initialState = {
	user: {},
	users: [],
	// filteredusers: [],
	isLoading: false,
	isDone:false,
	error: null,
	editedUser: false,
	// addedUser: false,
	// deletedUser: false,
};

export const getOneUserMe = createAsyncThunk(
	"users/getOneUserView",
	async (userId, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(`${baseUrl}/me?id=${userId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// export const addUser = createAsyncThunk("users/addUser", async (userAdded, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
//   try {
//     const response = await axios.post(baseUrl, userAdded);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

export const editUserMe = createAsyncThunk(
	"users/editUserMe",
	async ({ idArg, userArg }, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		// console.log({args});
		try {
			const response = await axios.put(
				`${baseUrl}/me/edit?id=${idArg}`,
				userArg
			); //must have same names in the fired action
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// export const deleteUser = createAsyncThunk("users/deleteUser", async (userId, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
//   try {
//     const response = await axios.delete(`${baseUrl}/${userId}`)
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.message)
//   }
// });

const userSlice = createSlice({
	name: "users",
	initialState,

	// reducers: {
	// 	categoryFilter: (state, action) => {
	// 		// console.log("action",action.payload);
	// 		if (action.payload === "All Industries") {
	// 			return {
	// 				...state,
	// 				filteredUsers: [],
	// 			};
	// 		}
	// 		return {
	// 			...state,
	// 			filteredUsers: state.users.filter(
	// 				(user) => user.industryIDFK?.name === action.payload
	// 			), //must have same name of the database field
	// 		};
	// 	},
	// },

	extraReducers: (builder) => {
		builder
			//------------------ Get All Users
			// .addCase(getAllUsers.pending, (state, action) => {
			// 	state.isLoading = true;
			// })
			// .addCase(getAllUsers.fulfilled, (state, action) => {
			// 	state.isLoading = false;
			// 	state.users = action.payload;
			// 	state.error = null;
			// 	state.editedUser = false;
			// 	// state.addedUser = false;
			// 	// state.deletedUser = false;
			// })
			// .addCase(getAllUsers.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.error = action.payload;
			// })
			//------------------ Get User by ID 
			.addCase(getOneUserMe.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getOneUserMe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isDone = true;
				state.error = null;
				state.editedUser = false;
				// state.addedUser = false;
				// state.deletedUser = false;
			})
			.addCase(getOneUserMe.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//------------------ Get User by ID
			// .addCase(getOneUser.pending, (state, action) => {
			// 	state.isLoading = true;
			// })
			// .addCase(getOneUser.fulfilled, (state, action) => {
			// 	state.isLoading = false;
			// 	state.user = action.payload;
			// 	state.error = null;
			// 	state.editedUser = false;
			// 	// state.addedUser = false;
			// 	// state.deletedUser = false;
			// })
			// .addCase(getOneUser.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.error = action.payload;
			// })
			//------------------ Add User
			// .addCase(addUser.pending, (state, action) => {
			//     state.isLoading = true;
			// })
			// .addCase(addUser.fulfilled, (state, action) => {
			//     state.isLoading = false;
			//     // state.users.push(action.payload);
			//     state.addedUser = true;
			// })
			// .addCase(addUser.rejected, (state, action) => {
			//     state.isLoading = false;
			//     state.error = action.payload;
			// })
			//------------------ Edit User
			.addCase(editUserMe.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(editUserMe.fulfilled, (state, action) => {
				state.isLoading = false;
				// state.users = state.users.map(user => {if (user.id===action.payload.id) {user===action.payload}});
				state.editedUser = true;
			})
			.addCase(editUserMe.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
