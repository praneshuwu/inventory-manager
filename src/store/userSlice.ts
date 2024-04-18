import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isCurrentUserAdmin: true,
  },
  reducers: {
    userRoleUpdate: (state) => {
      state.isCurrentUserAdmin = !state.isCurrentUserAdmin;
    },
  },
});

export const { userRoleUpdate } = userSlice.actions;
export default userSlice.reducer;
