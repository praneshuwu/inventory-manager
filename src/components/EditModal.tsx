import { UilTimes } from '@iconscout/react-unicons';
import useForm from '../hooks/useForm';
import { InventoryItemType } from './InventoryList';


type ModalProps = {
  item: InventoryItemType;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  submitHandler: (id: number, item: InventoryItemType) => void;
};
const EditModal = (props: ModalProps): JSX.Element => {
  const { handleChange, values, errors, setValues } = useForm(props.item);

  // 
  let saveButtonActive = !errors.category && values.category.length !==0;

  const onSubmit = (id: number, updatedItem: InventoryItemType) => {
    props.submitHandler(id, updatedItem);
    setValues({ name: '', category: '', value: '', price: '', quantity: 0, isDisabled: false, id: 0 });

  };

  const onCancel = () => {
    props.setOpenModal(false);
    setValues({ name: '', category: '', value: '', price: '', quantity: 0, isDisabled: false, id: 0 });
  };

  return (
    <div id="edit-item-modal" tabIndex={-1} aria-hidden="true" className={`${props.openModal ? '' : 'hidden '}overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
      <div className="relative p-4 max-h-full mx-auto" style={{maxWidth:'720px'}}>
        <div className="relative rounded-lg shadow bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t pb-0">
            <div>
              <h3 className="text-lg md:text-2xl font-semibold  text-white">
                Edit Product
              </h3>
              <h5 className='text-white text-md md:text-lg'>{props.item?.name}</h5>
            </div>
            <button type="button" className="self-start text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-start  hover:text-white" onClick={() => { props.setOpenModal(false); }}>
              <UilTimes />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Category</label>
                <input value={values['category']} onChange={handleChange} type="category" name="category" id="category" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder={`${props.item?.category}`} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Price</label>
                <input value={values['price']} onChange={handleChange} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={`${props.item?.price}`} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-white">Quantity</label>
                <input value={values['quantity']} onChange={handleChange} type="number" name="quantity" id="quantity" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder={`${props.item?.quantity}`} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="value" className="block mb-2 text-sm font-medium text-white">value</label>
                <input value={values['value']} onChange={handleChange} type="value" name="value" id="value" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder={`${props.item?.value}`} />
              </div>
            </div>
            <div className='flex justify-end gap-3'>
              <button className="text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-500 hover:bg-gray-600 focus:ring-gray-600" onClick={() => { onCancel(); }}>
                Cancel
              </button>
              <button onClick={() => onSubmit(props.item.id, { ...values, price: `$${values['price']}`, value: `$${values['value']}`, id: props.item.id, isDisabled: props.item.isDisabled, name: props.item.name })} disabled={!saveButtonActive} className={`text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${saveButtonActive ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-800' : ' bg-gray-600 cursor-not-allowed'}`}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default EditModal;