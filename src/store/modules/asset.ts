import { AssetData, AssetState } from "@/types/asset";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AssetState = {
  assetInfo: null,
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setAsset: (state, { payload }: { payload: AssetData }) => {
      state.assetInfo = payload;
    },
    clearAsset: (state) => {
      state.assetInfo = null;
    },
  },
});

export const { setAsset, clearAsset } = assetSlice.actions;
export default assetSlice.reducer;
