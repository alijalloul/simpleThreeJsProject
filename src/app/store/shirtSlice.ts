import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const shirtSlice = createSlice({
  name: "shirt",
  initialState: {
    selectedMesh: "",
    skinColor: "#FFD9C2",
    noseColor: "#FFC8C1",
    shirtColor: "#A1C9E7",
    pantsColor: "#E7B7AF",
    color: "FFFFFF",
  },
  reducers: {
    changeColor: (state, action: PayloadAction<string>) => {
      if (state.selectedMesh === "Skin") {
        state.skinColor = action.payload;
      } else if (state.selectedMesh === "Nose") {
        state.noseColor = action.payload;
      } else if (state.selectedMesh === "Shirt") {
        state.shirtColor = action.payload;
      } else if (state.selectedMesh === "Pants") {
        state.pantsColor = action.payload;
      }

      state.color = action.payload;
    },

    changeSelectedMesh: (state, action: PayloadAction<string>) => {
      state.selectedMesh = action.payload;
    },
  },
});

// Export the actions generated by createSlice
export const { changeColor, changeSelectedMesh } = shirtSlice.actions;

// Export the reducer
export default shirtSlice.reducer;