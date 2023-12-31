'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from '../modals/Modal';
import Input from '../inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../Button';

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal = ({
  isOpen,
  onClose,
  currentUser,
}: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');
  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('에러가 발생했습니다'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='pb-12 border-b border-gray-900/10'>
            <h2 className='text-base font-semibold leading-7 text-gray-900 '>
              프로필
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              프로필을 수정하세요.
            </p>

            <div className='flex flex-col mt-10 gap-y-8'>
              <Input
                disabled={isLoading}
                label='Name'
                id='name'
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor='photo'
                  className='block text-sm font-medium leading-6 text-gray-900 '
                >
                  사진
                </label>
                <div className='flex items-center mt-2 gap-x-3'>
                  <Image
                    width='48'
                    height='48'
                    className='rounded-full'
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    alt='Avatar'
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET
                    }
                  >
                    <Button disabled={isLoading} secondary type='button'>
                      수정
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end mt-6 gap-x-6'>
          <Button disabled={isLoading} secondary onClick={onClose}>
            취소
          </Button>
          <Button disabled={isLoading} type='submit'>
            저장
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
