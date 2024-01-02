'use client';
import Button from '@/components/Button';
import Input from '@/components/inputs/Input';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsGoogle } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';
import AuthSocialButton from './AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // 리액트 훅 폼에서 인풋에 레지스터를 등록했다면 데이터 안에 밸류가 담김
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error('다시 시도해주세요.');
          }
          if (callback?.ok) {
            router.push('/conversations');
          }
        })
        .catch(() => toast.error('다시 시도해주세요.'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('다시 시도해주세요.');
          }
          if (callback?.ok) {
            router.push('/conversations');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('다시 시도해주세요.');
        }
        if (callback?.ok) {
          router.push('/conversations');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {/* 레지스터일 경우에만 이름 인풋 추갸 */}
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='name'
              label='이름'
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='email'
            label='이메일'
            type='email'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='password'
            label='비밀번호'
            type='password'
          />
          <div>
            {/* fullWidth: 버튼 요소가 부모 요소의 전체 가로 너비를 차지하도록 설정하는 역할 */}
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? '로그인' : '회원가입'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center '>
              {/* 줄 만들기 */}
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-gray-500 bg-white'>소셜 로그인</span>
            </div>
          </div>

          <div className='flex gap-2 mt-6'>
            <AuthSocialButton
              icon={RiKakaoTalkFill}
              onClick={() => socialAction('kakao')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div className='flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500 '>
          <div>
            {variant === 'LOGIN'
              ? '메신저를 처음 사용하시나요?'
              : '이미 계정이 있으신가요?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? '계정 만들기' : '로그인하기'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
