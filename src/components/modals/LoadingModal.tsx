'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingModal = () => {
  return (
    // headlessui 라이브러리는 리액트 포탈을 이용함
    <Transition.Root show as={Fragment}>
      {/* 다이얼로그 모달 */}
      <Dialog as='div' className='relative z-50' onClose={() => {}}>
        {/* 백그라운드부분 */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 ' />
        </Transition.Child>

        {/* 스피너부분 */}
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel>
                <ClipLoader size={40} color='#0284c7' />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
