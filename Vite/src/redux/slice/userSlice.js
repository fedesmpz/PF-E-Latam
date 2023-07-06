import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
    userData: {
      access: false
    },
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
    getUsersLogout: (state) => {
      state.userData = {access: false};
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
    updateUserDetails: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload
      }
    }
  },
});

export const {
  getUserByIdStart,
  getAllUsersStart,
  getUsersStart,
  getUsersLogout,
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
  updateUserDetails
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
    }else{
      dispatch(getUsersStart({access: false}))
    }

  } catch (error) {
    dispatch(getUsersFailure(error.message));
  }
};


export const logoutUser = () => async (dispatch) => {
  try {
    
    await dispatch(getUsersLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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
    const response = await axios.put(`https://pf-elatam.onrender.com/users/update/${userId}`, userData);

    const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', response.data)
    localStorage.setItem("user", JSON.stringify(response.data))
    localStorage.setItem("token", JSON.stringify(token.data))
    dispatch(updateUserDetails(response.data))

  } catch (error) {

    dispatch(updateUserFailure(error.message));
  }
};
export const updateDataUser = (userId, userInfo) => async (dispatch) => {
  try {
    const response = await axios.put(`https://pf-elatam.onrender.com/users/update/${userId}`, userInfo);
  } catch (error) {
   
    dispatch(updateUserFailure(error.message));
  }
}


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
    dispatch(getUserByIdStart(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
