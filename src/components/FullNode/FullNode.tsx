import { Typography } from '@material-ui/core';
import { Sync, SyncDisabled } from '@material-ui/icons';
import React, { FC } from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';

export interface FullNodeProps {
  isSync: boolean;
  height: number;
  name: string;
  networkSpace: number;
  noData: boolean;
}

const FullNode: FC<FullNodeProps> = (props) => {
  return (
    <DashboardCard
      style={{ width: 300 }}
      title={props.name}
      body={
        <div
          style={{
            color: props.isSync ? '#bbfda1' : '#fb9294',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {props.isSync ? <Sync /> : <SyncDisabled />}
          <Typography variant="h5" style={{ paddingLeft: 5 }}>
            {props.isSync ? 'Full Node Synced' : 'Not Synced'}
          </Typography>
        </div>
      }
      items={[
        `height: ${props.height}`,
        `Estimated Network Space: ${(
          parseInt(props.networkSpace.toString(), 10) /
          1000 /
          1000
        ).toFixed(2)} PiB`,
      ]}
      noData={props.noData}
    />
  );
};

export default FullNode;
