import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/organizer";
const initialState = {
	organizer: {},
	organizers: [],
	filteredOrgs: [],
	isLoading: false,
	isDone: false,
	isOrganizer: false,
	error: null,
	editedOrg: false,
	// addedOrg: false,
	// deletedOrg: false,
};

export const getAllOrganizers = createAsyncThunk(
	"orgs/getAllOrganizers",
	async (args, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(`${baseUrl}/search`);
			// console.log("Response Data", response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getOneOrganizerMe = createAsyncThunk(
	"orgs/getOneOrganizerMe",
	async (orgId, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(`${baseUrl}/me?id=${orgId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const getOneOrganizerView = createAsyncThunk(
	"orgs/getOneOrganizerView",
	async (orgId, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(`${baseUrl}/view?id=${orgId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// export const addOrganizer = createAsyncThunk("orgs/addOrganizer", async (orgAdded, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
//   try {
//     const response = await axios.post(baseUrl, orgAdded);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

export const editOrganizerMe = createAsyncThunk(
	"orgs/editOrganizerMe",
	async (args, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		// console.log({args});
		try {
			const response = await axios.put(
				`${baseUrl}/me/edit?id=${args.idArg}`,
				args.orgArg
			); //must have same names in the fired action
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// export const deleteOrganizer = createAsyncThunk("orgs/deleteOrganizer", async (orgId, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
//   try {
//     const response = await axios.delete(`${baseUrl}/${orgId}`)
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.message)
//   }
// });

const orgSlice = createSlice({
	name: "orgs",
	initialState,

	reducers: {
		categoryFilter: (state, action) => {
			// console.log("action",action.payload);
			if (action.payload === "All Industries") {
				return {
					...state,
					filteredOrgs: [],
				};
			}
			return {
				...state,
				filteredOrgs: state.organizers.filter(
					(org) => org.industryIDFK?.name === action.payload
				), //must have same name of the database field
			};
		},
	},

	extraReducers: (builder) => {
		builder
			//------------------ Get All orgs
			.addCase(getAllOrganizers.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllOrganizers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.organizers = action.payload;
				state.error = null;
				state.editedOrg = false;
				// state.addedOrg = false;
				// state.deletedOrg = false;
			})
			.addCase(getAllOrganizers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//------------------ Get org by ID (view)
			.addCase(getOneOrganizerView.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getOneOrganizerView.fulfilled, (state, action) => {
				state.isLoading = false;
				state.organizer = action.payload;
				state.isDone = true;
				state.error = null;
				state.editedOrg = false;
				// state.addedOrg = false;
				// state.deletedOrg = false;
			})
			.addCase(getOneOrganizerView.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//------------------ Get org by ID (personal)
			.addCase(getOneOrganizerMe.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getOneOrganizerMe.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload?.message !== "organizer doesn't exist") {
					state.isOrganizer = true;
				}
				state.organizer = action.payload;
				state.isDone = true;
				state.error = null;
				state.editedOrg = false;
				// state.addedOrg = false;
				// state.deletedOrg = false;
			})
			.addCase(getOneOrganizerMe.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//------------------ Add org
			// .addCase(addOrganizer.pending, (state, action) => {
			//     state.isLoading = true;
			// })
			// .addCase(addOrganizer.fulfilled, (state, action) => {
			//     state.isLoading = false;
			//     // state.organizers.push(action.payload);
			//     state.addedOrg = true;
			// })
			// .addCase(addOrganizer.rejected, (state, action) => {
			//     state.isLoading = false;
			//     state.error = action.payload;
			// })
			//------------------ Edit org
			.addCase(editOrganizerMe.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(editOrganizerMe.fulfilled, (state, action) => {
				state.isLoading = false;
				// state.organizers = state.organizers.map(org => {if (org.id===action.payload.id) {org===action.payload}});
				state.editedOrg = true;
			})
			.addCase(editOrganizerMe.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
		//------------------ Delete org
		// .addCase(deleteOrganizer.pending, (state, action) => {
		//     state.isLoading = true;
		// })
		// .addCase(deleteOrganizer.fulfilled, (state, action) => {
		//     state.isLoading = false;
		//     // state.organizers = state.organizers.filter(org => org!=action.payload);
		//     state.deletedOrg = true;
		// })
		// .addCase(deleteOrganizer.rejected, (state, action) => {
		//     state.isLoading = false;
		//     state.error = action.payload;
		// })
	},
});

export const orgReducer = orgSlice.reducer;
export const orgActions = orgSlice.actions;
