const { createSlice } = require("@reduxjs/toolkit");

const forceRenderSlice = createSlice({
  name: "forceRender",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state = state.value += 1;
    },
  },
});

export const { increment } = forceRenderSlice.actions;

export default forceRenderSlice.reducer;
