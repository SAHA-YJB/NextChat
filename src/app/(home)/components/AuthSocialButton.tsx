import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex justify-center w-full px-4 py-2 text-gray-500 
                bg-white rounded-md shadow-sm  ring-1 ring-inset 
                ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
