import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  // onClick이 undefined 또는 null이 아닌 경우에만 onClick 함수를 호출
  // onClick prop이 제공되지 않았을 때 onClick() 호출로 인해 발생하는 오류를 방지하기 위함
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-gray-500 
        hover:text-black 
        hover:bg-gray-100
      `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className='h-6 w-6' />
    </Link>
  );
};

export default MobileItem;
