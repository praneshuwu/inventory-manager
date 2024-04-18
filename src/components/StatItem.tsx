import React, { ReactElement } from 'react';
import { UilShoppingCartAlt } from '@iconscout/react-unicons';
import { UilUsdCircle } from '@iconscout/react-unicons';
import { UilSitemap } from '@iconscout/react-unicons';
import outOfStockIcon from '../assets/images/icons/out-of-stock_dark.png';

type StatItemProps = {
  statType: string;
  statTitle: string;
  statContent: string;
};


const StatIcon = (props: { statType: string; }): JSX.Element => {
  switch (props.statType) {
    case 'totalProducts':
      return <UilShoppingCartAlt className='h-full w-full' />;
    case 'totalStoreValue':
      return <UilUsdCircle className='h-full w-full'/>;
    case 'outOfStockCount':
      return <img src={outOfStockIcon} className='w-full h-full' />;
    case 'categoryCount':
      return <UilSitemap className='h-full w-full' />;
    default:
      return <></>
      break;
  }
};

const StatItem = (props: StatItemProps): ReactElement => {

  const { statType, statTitle, statContent } = props;

  return (
    <div key='' className="basis-40 rounded-lg bg-green-900 p-3 lg:p-6 flex justify-start items-start text-white bg-opacity-50 gap-2 md:gap-6 flex-1 self-stretch">
      <div className='w-7 md:w-[40px]'>
        <StatIcon statType={statType} />
      </div>
      <div className='flex flex-col justify-between items-start'>
        <h4 className="text-sm md:text-xl font-normal">{statTitle}</h4>
        <span className="text-lg lg:text-5xl">{statContent}</span>
      </div>
    </div>
  );
};

export default StatItem;