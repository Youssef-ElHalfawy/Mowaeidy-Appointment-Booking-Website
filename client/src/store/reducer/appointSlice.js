import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000";
const initialState = {
	// organizer: {},
	appointments: [],
	// filteredAppoints: [],
	isLoading: false,
	isDone: false,
	error: null,
	editedAppoint: false,
	deletedAppoint: false,
	// addedOrg: false,
};

export const getAllAppointmentsOrg = createAsyncThunk(
	"appoints/getAllAppointmentsOrg",
	async (organizerId, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(
				`${baseUrl}/organizer/appointments?id=${organizerId}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const getAllAppointmentsUser = createAsyncThunk(
	"appoints/getAllAppointmentsUser",
	async (userId, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(
				`${baseUrl}/user/appointments?id=${userId}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// export const getOneOrganizerMe = createAsyncThunk(
// 	"appoints/getOneOrganizerMe",
// 	async (appointId, thunkAPI) => {
// 		const { rejectWithValue } = thunkAPI;
// 		try {
// 			const response = await axios.get(`${baseUrl}/me?id=${appointId}`);
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(error.message);
// 		}
// 	}
// );
// export const getOneOrganizerView = createAsyncThunk(
// 	"appoints/getOneOrganizerView",
// 	async (appointId, thunkAPI) => {
// 		const { rejectWithValue } = thunkAPI;
// 		try {
// 			const response = await axios.get(`${baseUrl}/${appointId}`);
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(error.message);
// 		}
// 	}
// );

// export const addOrganizer = createAsyncThunk("appoints/addOrganizer", async (orgAdded, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
//   try {
//     const response = await axios.post(baseUrl, orgAdded);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

export const editAppointment = createAsyncThunk(
	"appoints/editAppointment",
	async ({ idArg, appointArg }, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.put(
				`${baseUrl}/organizer/appointments/edit?id=${idArg}`,
				appointArg
			); //must have same names in the fired action
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteAppointmentOrg = createAsyncThunk(
	"appoints/deleteAppointmentOrg",
	async (appointId, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.delete(
				`${baseUrl}/organizer/appointments/delete?id=${appointId}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const deleteAppointmentUser = createAsyncThunk(
	"appoints/deleteAppointmentUser",
	async (appointId, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.delete(
				`${baseUrl}/user/appointments/delete?id=${appointId}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const appointSlice = createSlice({
	name: "appoints",
	initialState,

	reducers: {
		// categoryFilter: (state, action) => {
		// 	// console.log("action",action.payload);
		// 	if (action.payload === "All Industries") {
		// 		return {
		// 			...state,
		// 			filteredAppoints: [],
		// 		};
		// 	}
		// 	return {
		// 		...state,
		// 		filteredAppoints: state.appointments.filter(
		// 			(org) => org.industryIDFK?.name === action.payload
		// 		), //must have same name of the database field
		// 	};
		// },
	},

	extraReducers: (builder) => {
		builder
			//------------------ Get All appointments org
			.addCase(getAllAppointmentsOrg.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllAppointmentsOrg.fulfilled, (state, action) => {
				state.isLoading = false;
				state.appointments = action.payload;
				state.isDone = true;
				state.error = null;
				state.editedAppoint = false;
				state.deletedAppoint = false;
			})
			.addCase(getAllAppointmentsOrg.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//------------------ Get All appointments user
			.addCase(getAllAppointmentsUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllAppointmentsUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.appointments = action.payload;
				state.isDone = true;
				state.error = null;
				state.editedAppoint = false;
				state.deletedAppoint = false;
			})
			.addCase(getAllAppointmentsUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			//------------------ Edit appointment
			.addCase(editAppointment.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(editAppointment.fulfilled, (state, action) => {
				state.isLoading = false;
				// state.appointments = state.appointments.map(org => {if (org.id===action.payload.id) {org===action.payload}});
				state.editedAppoint = true;
			})
			.addCase(editAppointment.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//------------------ Delete appointment org
			.addCase(deleteAppointmentOrg.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteAppointmentOrg.fulfilled, (state, action) => {
				state.isLoading = false;
				// state.appointments = state.appointments.filter(org => org!=action.payload);
				state.deletedAppoint = true;
			})
			.addCase(deleteAppointmentOrg.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//------------------ Delete appointment user
			.addCase(deleteAppointmentUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteAppointmentUser.fulfilled, (state, action) => {
				state.isLoading = false;
				// state.appointments = state.appointments.filter(org => org!=action.payload);
				state.deletedAppoint = true;
			})
			.addCase(deleteAppointmentUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const appointReducer = appointSlice.reducer;
export const appointActions = appointSlice.actions;
