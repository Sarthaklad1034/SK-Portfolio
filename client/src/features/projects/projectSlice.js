import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

// Initial state
const initialState = {
    projects: [],
    featured: [],
    currentProject: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

// Async thunks
export const fetchProjects = createAsyncThunk(
    'projects/fetchAll',
    async(_, thunkAPI) => {
        try {
            return await projectService.getProjects();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response && error.response.data && error.response.data.message ?
                error.response.data.message :
                error.message
            );

        }
    }
);

export const fetchFeaturedProjects = createAsyncThunk(
    'projects/fetchFeatured',
    async(_, thunkAPI) => {
        try {
            return await projectService.getFeaturedProjects();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response && error.response.data && error.response.data.message ?
                error.response.data.message :
                error.message
            );

        }
    }
);

export const createProject = createAsyncThunk(
    'projects/create',
    async(projectData, thunkAPI) => {
        try {
            return await projectService.createProject(projectData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response && error.response.data && error.response.data.message ?
                error.response.data.message :
                error.message
            );

        }
    }
);

export const updateProject = createAsyncThunk(
    'projects/update',
    async({ id, projectData }, thunkAPI) => {
        try {
            return await projectService.updateProject(id, projectData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response && error.response.data && error.response.data.message ?
                error.response.data.message :
                error.message
            );

        }
    }
);

export const deleteProject = createAsyncThunk(
    'projects/delete',
    async(id, thunkAPI) => {
        try {
            await projectService.deleteProject(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response && error.response.data && error.response.data.message ?
                error.response.data.message :
                error.message
            );

        }
    }
);

// Slice
const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        setCurrentProject: (state, action) => {
            state.currentProject = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        // Fetch projects cases
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Featured projects cases
            .addCase(fetchFeaturedProjects.fulfilled, (state, action) => {
                state.featured = action.payload;
            })
            // Create project cases
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projects.push(action.payload);
            })
            // Update project cases
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.projects.findIndex(project => project.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            // Delete project cases
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projects = state.projects.filter(project => project.id !== action.payload);
            });
    }
});

export const { resetState, setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;