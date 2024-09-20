const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart slice",
  initialState: { value: false },
  reducers: {
    toggleValue: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { toggleValue } = cartSlice.actions;

export default cartSlice.reducer;
