import { BsPerson } from 'react-icons/bs';
import React from 'react';
import StatsCard from './StatsCard';
import { useGetAllUsersQuery } from "../../services/reportingService";

export default function UsersCard() {
  const allUsers = useGetAllUsersQuery();
  const numberOfUsers = allUsers.data ? allUsers.data.length : 0;
  return (
    <StatsCard title={'Users'} stat={numberOfUsers.toString()} icon={<BsPerson size={'3em'} />} />
  );
}
