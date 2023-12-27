'use client';
import Avartar from '@/components/Avartar';
import LoadingModal from '@/components/modals/LoadingModal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    axios
      .post('/api/conversations', { userId: data.id })
      .then((data) => router.push(`/conversations/${data.data.id}`))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className='
        w-full relative flex items-center space-x-3 bg-white p-3 
        hover:bg-neutral-100 rounded-lg transition cursor-pointer'
      >
        <Avartar />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='felx justify-between items-center'>
              <p className='text-sm font-md text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
