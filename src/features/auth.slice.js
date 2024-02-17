import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../firebase/firebase.config';



export const SignUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password }) => {

        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res);
        return res.user.email;

    }
);

export const SignIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }) => {

        const res = await signInWithEmailAndPassword(auth, email, password);
        return res.user.email;

    }
);


const initialState = {
    user: '',
    isError: false,
    error: "",
    isLoading: false,
    role: "",
    setUserLoading:true

};



export const authSlice = createSlice({

    name: 'auth',
    initialState,

    reducers: {
        setUserSuccess: (state, { payload }) => {
            state.setUserLoading = false;
            state.user = payload;
           
        },

        setUserFail: (state, { payload }) => {
            state.setUserLoading = false;
          
           
        },
       

        logOut: (state) => {
            state.user = '';
        }

    },

    extraReducers: (builder) => {

        builder.addCase(SignUp.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";

        }).addCase(SignUp.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.error = "";
            state.user = payload?.email;

        }).addCase(SignUp.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;

        })
            .addCase(SignIn.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";

            }).addCase(SignIn.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user = payload;

            }).addCase(SignIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;

            })



    }


})

export const { setUserSuccess,setUserFail, logOut } = authSlice.actions

export default authSlice.reducer;