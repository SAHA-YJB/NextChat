'use client';
import useConversation from '@/hooks/useConversation';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleImgUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div className='flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4'>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleImgUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
      >
        <HiPhoto size={30} className='text-blue-500' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center w-full gap-2 lg:gap-4'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='메시지를 입력해주세요.'
        />
        <button
          type='submit'
          className='p-2 transition rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600'
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default Form;
