import { BsPerson } from 'react-icons/bs';
import React from 'react';
import StatsCard from './StatsCard';
import { useNumberOfUsers } from "../../hooks/reportingHooks";

export default function UsersCard() {
  const numberOfUsers = useNumberOfUsers();
  return (
    <StatsCard title={'Users'} stat={numberOfUsers.toString()} icon={<BsPerson size={'3em'} />} />
  );
}
