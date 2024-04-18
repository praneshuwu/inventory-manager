import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest } from '../utils/requests';
import { getInventoryStats } from '../utils/getInventoryStats';
import { InventoryItemType } from '../components/InventoryList';


export const getInventoryList = createAsyncThunk('inventoryList/fetch', async () => {
  const response = await publicRequest.get('/inventory');
  return response.data;
});

interface InventoryState {
  inventoryList: InventoryItemType[];
  isFetching: boolean;
  isError: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  inventoryStat: {
    totalProducts: number;
    totalStoreValue: number;
    outOfStockCount: number;
    categoryCount: number;
  };
}
const initialState = {
  inventoryList: [],
  isFetching: false,
  isError: false,
  loading: 'idle',
  inventoryStat: {
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStockCount: 0,
    categoryCount: 0,
  },
} satisfies InventoryState as InventoryState;

export type InventoryItem = {
  name: string;
  category: string;
  value: string;
  price: string;
  quantity: number;
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.isFetching = true;
    },
    inventoryLoaded: (state, action) => {
      state.isFetching = false;
      state.inventoryList = action.payload;
      state.isError = false;
    },
    inventoryLoadFailure: (state) => {
      state.isFetching = false;
      state.inventoryList = [];
      state.isError = true;
    },
    inventoryListUpdate: (state, action) => {
      state.inventoryList = action.payload;
    },
    inventoryStatUpdate: (state, action) => {
      state.inventoryStat = action.payload;
    },
    itemUpdate: (state, action) => {
      state.inventoryList = state.inventoryList.map((item, index) => {
        
        if (action.payload.id == index) {
          const newItem = {...action.payload.updatedItem}
          return newItem;
        } else {
          return item;
        }
      });
      state.inventoryStat = getInventoryStats(state.inventoryList)
    },
    itemDelete: (state, action) => {
      state.inventoryList = state.inventoryList.filter((item, index) => {
        return index !== action.payload;
      });
      state.inventoryStat = getInventoryStats(state.inventoryList);
    },
    itemToggleDisable: (state, action) => {
      state.inventoryList = state.inventoryList.map((item, index) => {
        if (index == action.payload) {
          const newItem = { ...item, isDisabled: !item.isDisabled };
          return newItem;
        } else {
          return item;
        }
      });
      state.inventoryStat = getInventoryStats(state.inventoryList);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInventoryList.fulfilled, (state, action) => {
      const data = action.payload;
      const resultData = data.map((item: InventoryItem, index: number) => {
        return { ...item, isDisabled: false, id: index };
      });
      state.inventoryList = resultData;
      state.inventoryStat = getInventoryStats(action.payload);
    });
  },
});

export const { loading, inventoryLoaded, inventoryLoadFailure, inventoryListUpdate, inventoryStatUpdate, itemUpdate, itemDelete, itemToggleDisable } = inventorySlice.actions;
export default inventorySlice.reducer;
