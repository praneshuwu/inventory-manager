import { UilPen } from '@iconscout/react-unicons';
import { UilEyeSlash } from '@iconscout/react-unicons';
import { UilEye } from '@iconscout/react-unicons';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { ReactElement } from 'react';
import { useAppSelector } from '../hooks/useStoreHooks';

export type ItemProps = {
  details: {
    name: string;
    category: string;
    price: string;
    quantity: number;
    value: string;
    id:number;
    isDisabled:boolean;
  };
  data: any;
  actionHandler: (actionType: string, id: number, item?: any) => void;
};

const InventoryItem = (props: ItemProps): ReactElement => {
  const { actionHandler } = props;

  const { name, category, price, quantity, value,id, isDisabled } = props.details;

  const isAdmin = useAppSelector(state => state.user.isCurrentUserAdmin);
  return (
    <>
      <th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap text-white`}>
        {name}
      </th>
      <td className="px-6 py-4 text-white">
        {category}
      </td>
      <td className="px-6 py-4 text-white">
        {price}
      </td>
      <td className="px-6 py-4 text-white">
        {quantity}
      </td>
      <td className="px-6 py-4 text-white">
        {value}
      </td>
      <td className={`px-6 py-4 flex gap-2 items-center justify-start  ${!isAdmin || isDisabled? 'text-gray-600' : 'text-white'}`}>
        <button disabled={!isAdmin || isDisabled} className={`${!isAdmin || isDisabled ? 'cursor-not-allowed' : 'hover:text-green-500'}`} onClick={() => { actionHandler('edit', id); }} data-modal-target="authentication-modal" type="button">
          <UilPen />
        </button>
        <button disabled={!isAdmin} className={`${!isAdmin? 'cursor-not-allowed' : 'hover:text-gray-300'} ${isDisabled ? 'text-gray-400':'' }`} onClick={() => { actionHandler('disable', id); }}>
          {isDisabled ?
            <UilEyeSlash />
            :
            <UilEye />
          }
        </button>
        <button disabled={!isAdmin || isDisabled} className={`${!isAdmin || isDisabled ? 'cursor-not-allowed' : 'hover:text-red-400'}`} onClick={() => { actionHandler('delete', id); }}>
          <UilTrashAlt />
        </button>
      </td>
    </>
  );
};

export default InventoryItem;