import InventoryItem from "./InventoryItem";

import StatItem from "./StatItem";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import { ReactElement, useEffect, useState } from "react";
import { InventoryItem as InventoryItemStateType, getInventoryList, inventoryListUpdate, inventoryStatUpdate, itemDelete, itemToggleDisable, itemUpdate } from "../store/inventorySlice";
import { getInventoryStats } from "../utils/getInventoryStats";
import EditModal from "./EditModal";

// import { getInventoryList } from "../utils/getInventoryList";

export type InventoryItemType = {
  name: string;
  category: string;
  value: string;
  price: string;
  quantity: number;
  isDisabled: boolean;
  id: number;
};


// const data = [{ id: 0, "name": "Bluetooth", "category": "Electronic", "value": "$150", "quantity": 5, "price": "$30", isDisabled: false }, { id: 1, "name": "Edifier M43560", "category": "Electronic", "value": "0", "quantity": 0, "price": "$0", isDisabled: false }, { id: 2, "name": "Sony 4k ultra 55 inch TV", "category": "Electronic", "value": "$1190", "quantity": 17, "price": "$70", isDisabled: false }, { id: 3, "name": "Samsumg 55 inch TV", "category": "Electronic", "value": "$600", "quantity": 50, "price": "$12", isDisabled: false }, { id: 4, "name": "samsumg S34 Ultra", "category": "phone", "value": "$0", "quantity": 0, "price": "$0", isDisabled: false }];

const InventoryList = (): ReactElement => {

  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<InventoryItemType>({ name: '', category: '', value: '', price: '', quantity: 0, isDisabled: false, id: 0 });
  const inventoryStats = useAppSelector(state => state.inventory.inventoryStat);
  const inventoryList = useAppSelector(state => state.inventory.inventoryList);
  

  const editItem = (id: number) => {
    setOpenModal(true);
    setCurrentEditItem(inventoryList[id]);
  };

  const toggleDisableItem = (id: number | string) => {
    dispatch(itemToggleDisable(id));
  };

  const deleteItem = (id: number) => {
    dispatch(itemDelete(id));
  };

  const actionHandler = (actionType: string, id: number, item?: InventoryItemType): void => {
    if (actionType == 'edit') {
      editItem(id);
    } else if (actionType == 'disable') {
      toggleDisableItem(id);
    } else if (actionType == "delete") {
      deleteItem(id);
    }
  };

  const updateItem = (id: number, updatedItem: InventoryItemType) => {
    dispatch(itemUpdate({id,updatedItem}));
  };




  useEffect(() => {
    dispatch(getInventoryList());
  }, []);

  useEffect(()=>{
    getInventoryStats(inventoryList);
  },[inventoryList]);

  return (
    <div className='px-[20px] lg:px-10 mx-auto mb-20'>
      <h3 className='text-white font-bold mb-10'>Inventory Stats</h3>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <StatItem statType={"totalProducts"} statTitle={"Total Products"} statContent={`${inventoryStats?.totalProducts}`} />
        <StatItem statType={"totalStoreValue"} statTitle={"Total Store Value"} statContent={`$${inventoryStats?.totalStoreValue}`} />
        <StatItem statType={"outOfStockCount"} statTitle={"Out of Stocks"} statContent={`${inventoryStats?.outOfStockCount}`} />
        <StatItem statType={"categoryCount"} statTitle={"No. of Categories"} statContent={`${inventoryStats?.categoryCount}`} />
      </div>
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400 rounded-xl bg-gray-800">
            <thead className="text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-xl capitalize">
                  <span className='px-3 py-2 bg-gray-900 rounded-xl text-green-400'>
                    Name
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 capitalize">
                  <span className='px-3 py-2 bg-gray-900 rounded-xl text-green-400'>
                    Category
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 capitalize">
                  <span className='px-3 py-2 bg-gray-900 rounded-xl text-green-400'>
                    Price
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 capitalize">
                  <span className='px-3 py-2 bg-gray-900 rounded-xl text-green-400'>
                    Quantity
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 capitalize">
                  <span className='px-3 py-2 bg-gray-900 rounded-xl text-green-400'>
                    Value
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 uppercase rounded-tr-xl">
                  <span className='px-3 py-2 bg-gray-900 rounded-xl text-green-400'>
                    Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryList.map((item: any, index: number) => {
                return (
                  <tr key={index} className={`border-gray-700 ${index == inventoryList.length - 1 ? '' : 'border-b'}`}>
                    <InventoryItem data={inventoryList} details={item} actionHandler={actionHandler} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal openModal={openModal} setOpenModal={setOpenModal} item={currentEditItem} submitHandler={updateItem} />

    </div>
  );
};

export default InventoryList;