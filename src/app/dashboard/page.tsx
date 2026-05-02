import DashboardClient from '@/src/components/DashboardClient';
import { getSession } from '@/src/lib/getSession';
import React from 'react'

const DashBoardPage = async () => {
  const session = await getSession();
  return (
    <>
      <DashboardClient ownerId={session?.user?.id || ""} />
    </>
  )
}

export default DashBoardPage;
