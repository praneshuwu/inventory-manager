import { Dispatch } from "@reduxjs/toolkit";
import { InventoryItem, inventoryStatUpdate } from "../store/inventorySlice";

export function getInventoryStats(data:InventoryItem[],dispatch?:Dispatch){
  let categories:string[] = [];
  let totalValue = 0;
  let outOfStocks = 0;
  let totalProducts = data.length;
  data.forEach((item,index)=>{
    if(categories.indexOf(item.category) == -1){
      categories.push(item.category)
    }
    totalValue += item.value.length > 1 && item.value.includes('$') ? parseInt(item.value.replace(/[$]/g,'')) : parseInt(item.value)
    if(item.quantity == 0){
      outOfStocks += 1
    }
  }) 
  const inventoryStat = {
    totalProducts: totalProducts,
    totalStoreValue: totalValue,
    outOfStockCount: outOfStocks,
    categoryCount: categories.length,
  }
  if(dispatch){
    dispatch(inventoryStatUpdate(inventoryStat));
  }
  return inventoryStat;
}