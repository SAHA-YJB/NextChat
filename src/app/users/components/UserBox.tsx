import { User } from '@prisma/client';
import React from 'react';

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  return <div>UserBox</div>;
};

export default UserBox;
