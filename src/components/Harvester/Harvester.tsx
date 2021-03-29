import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';

export interface HarvesterProps {
  name: string;
  plotCount: number;
  noData: boolean;
}

const Harvester: FC<HarvesterProps> = (props) => {
  return (
    <DashboardCard
      title={props.name}
      body={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">{props.plotCount} Plots</Typography>
        </div>
      }
      items={[
        `~ ${((parseInt(props.plotCount?.toString(), 10) * 101) / 1024).toFixed(
          2
        )} TB`,
      ]}
      noData={props.noData}
    />
  );
};

export default Harvester;
