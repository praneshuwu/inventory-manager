// import { Form } from "react-bootstrap";
import { UilSignout } from '@iconscout/react-unicons';
import { useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import { userRoleUpdate } from "../store/userSlice";


const Navbar = () => {
  const dispatch = useAppDispatch();

  const isAdmin = useAppSelector(state => state.user.isCurrentUserAdmin);


  return (
    <div className="flex justify-end items-center gap-4 px-10 py-4 bg-gray-900 text-white text-sm">
      <div className="flex">
        <span className="mr-3">Admin</span>
        <div className="checkbox_item citem_2">
          <label className="checkbox_wrap">
            <input checked={!isAdmin} type="checkbox" name="checkbox" className="checkbox_inp" onChange={() => { dispatch(userRoleUpdate()); }} />
            <span className="checkbox_mark"></span>
          </label>
        </div>
        <span>User</span>
      </div>

      <div className='flex justify-between gap-4'>
        <div className='bg-gray-100 opacity-20 w-[1px] block'></div>
        <button className="cursor-pointer" onClick={() => {
          if (isAdmin) {
            dispatch(userRoleUpdate());
          }
        }}>
          <UilSignout />
        </button>
      </div>
    </div>
  );
};

export default Navbar;