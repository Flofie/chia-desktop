import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';

export interface WalletProps {
  balance: number;
  name: string;
  height: number;
  noData: boolean;
}

const Wallet: FC<WalletProps> = (props) => {
  return (
    <DashboardCard
      title={props.name}
      body={
        <Typography variant="h5">
          <b>{props.balance} XCH</b>
        </Typography>
      }
      items={[`height: ${props.height}`]}
      noData={props.noData}
    />
  );
};

export default Wallet;
