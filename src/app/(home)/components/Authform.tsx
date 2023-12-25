import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type Varinat = 'LOGIN' | 'REGISTER';

const Authform = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Varinat>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
    }
  }, [session?.status, router]);

  const toggleVariant = () => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  };

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', { ...data, redirect: false }))
        .then((cb) => {
          if (cb?.error) toast.error('다시 시도해주세요.');
          if (cb?.ok) router.push('/conversations');
        })
        .catch(() => toast.error('다시 시도해주세요.'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false })
        .then((cb) => {
          if (cb?.error) toast.error('다시 시도해주세요.');
          if (cb?.ok) router.push('/conversations');
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((cb) => {
        if (cb?.error) toast.error('다시 시도해주세요.');
        if (cb?.ok) router.push('/conversations');
      })
      .finally(() => setIsLoading(false));
  };

  return <div>Authform</div>;
};

export default Authform;
