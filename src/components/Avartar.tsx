import { User } from '@prisma/client';
import Image from 'next/image';

interface AvartarProps {
  currentUser?: User;
}
const Avartar = ({ currentUser }: AvartarProps) => {
  return (
    <div className='relative'>
      <div className='relative inline-block overflow-hidden rounded-full h-9 w-9 md:h-11 md:w-11'>
        <Image
          fill
          src={currentUser?.image || '/images/placeholder.jpg'}
          alt='Avatar'
          sizes='30'
        />
      </div>
      {/* 접속된 유저에 불 넣어주기 */}
      <span className='absolute top-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-2 ring-white md:h-3 md:w-3' />
    </div>
  );
};

export default Avartar;
