import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
    userData: {},
    userAddress: [],
    userById: {}
  },
  reducers: {
    getUserByIdStart(state, action) {
      state.userById = action.payload
    },
    getAllUsersStart(state, action) {
      state.users = action.payload
    },
    getUsersStart: (state, action) => {
      state.userData = action.payload;
    },
    getUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess(state) {
      state.loading = false;
    },
    registerUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state) {
      state.loading = false;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state) {
      state.loading = false;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserAddress: (state, action) => {
      state.userAddress = action.payload
    },
    cleanUserAddress:(state)=>{
      state.userAddress = []
    },
  },
});

export const {
  getUserByIdStart,
  getAllUsersStart,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserAddress,
  cleanUserAddress,
} = userSlice.actions;

export default userSlice.reducer;

export const loginUserLocal = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (Object.keys(user).length === 0) {
        return false;
    }
    const tokenString = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post('https://pf-elatam.onrender.com/users/validateToken', user,
    {headers: {
        authorization: tokenString,
    }})
    const resp = response.data.validate
    if(resp){
      await dispatch(getUsersStart(user));
    }

  } catch (error) {
    dispatch(getUsersFailure(error.message));
  }
};



export const fetchUsers = (user) => async (dispatch) => {
  try {
    await dispatch(getUsersStart(user));

  } catch (error) {
    dispatch(getUsersFailure(error.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserStart());
    await axios.post('https://pf-elatam.onrender.com/register', userData);
    dispatch(registerUserSuccess());
  } catch (error) {
    dispatch(registerUserFailure(error.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(deleteUserStart());
    await axios.delete(`https://pf-elatam.onrender.com/delete/${userId}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    await axios.put(`https://pf-elatam.onrender.com/update/${userId}`, userData);
    dispatch(updateUserSuccess());
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

export const getGeocoding = (addressId, countryName) => (dispatch) => {
  axios
      .get(`https://pf-elatam.onrender.com/users/address/${countryName}/${addressId}`)
      .then((response) => {
        dispatch(getUserAddress(response.data))
      })
      .catch((error) => {
        throw error;
      });
};

export const getUsers = () => (dispatch) => {
  axios.get('https://pf-elatam.onrender.com/users')
  .then((response) => {
    dispatch(getAllUsersStart(response.data))
  })
  .catch((error) => console.log(error))
}

export const getUserById = (id) => (dispatch) => {
  axios
  .get(`https://pf-elatam.onrender.com/users/${id}`)
  .then((response) => {
    console.log(response);
    dispatch(getUserByIdStart(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
