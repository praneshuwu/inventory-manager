import { useState } from 'react';
import { InventoryItemType } from '../components/InventoryList';

type ErrorType = {
  category: null | string;
  price: null | string;
};

const useForm = (item:InventoryItemType) => {
  const [values, setValues] = useState<InventoryItemType>({...item});
  const [errors, setErrors] = useState<ErrorType>({ category: null, price: null });

  

  const validate = (name: string, value: string | number) => {
    switch (name) {
      case 'category':
        if (!value.toString().trim().match(/([A-Z|a-z])/g)) {
          setErrors({
            ...errors,
            category: 'Please enter a valid category',
          });
        } else {
          setErrors({ ...errors, category: null });
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (event: any) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let value = event.target.value;

    validate(name, value);

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    errors,
    handleChange,
    setValues,
  };
};

export default useForm;
