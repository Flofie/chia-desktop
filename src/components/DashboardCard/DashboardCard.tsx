import { Divider, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { FC } from 'react';
import './DashboardCard.css';

export interface DashboardCardProps {
  title: string;
  body: any;
  items?: any[];
  style?: any;
  noData?: boolean;
}

const DashboardCard: FC<DashboardCardProps> = (props) => {
  return (
    <Paper elevation={3} className="DashboardCard" style={props.style}>
      <div className="DashboardCard-padding">
        <Typography variant="subtitle1">{props.title}</Typography>
        {props.noData ? (
          <>
            <Typography variant="h5">
              <Skeleton />
            </Typography>
            <Typography variant="caption">waiting for data...</Typography>
          </>
        ) : (
          props.body
        )}
      </div>
      {!props.noData &&
        props.items &&
        props.items.map((item, index) => (
          <div key={index} className="DashboardCard-content">
            <Divider
              className="DashboardCard-divider"
              flexItem={true}
              variant="fullWidth"
            />
            <div className="DashboardCard-padding">
              <Typography variant="subtitle2">{item}</Typography>
            </div>
          </div>
        ))}
    </Paper>
  );
};

export default DashboardCard;
