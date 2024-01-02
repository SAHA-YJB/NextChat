import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}: DesktopItemProps) => {
  // onClick이 undefined 또는 null이 아닌 경우에만 onClick 함수를 호출
  // onClick prop이 제공되지 않았을 때 onClick() 호출로 인해 발생하는 오류를 방지하기 위함
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick} key={label}>
      <Link
        href={href}
        className={clsx(
          `
        group 
        flex 
        gap-x-3 
        rounded-md 
        p-3 
        text-sm 
        leading-6 
        font-semibold 
        text-gray-500 
        hover:text-black
        bg-white 
        hover:bg-gray-100
      `,
          active && 'bg-gray-200 text-black'
        )}
      >
        <Icon className='w-6 h-6 shrink-0' aria-hidden='true' />
        {/* 접근성을 위해 넣는 라벨 */}
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
