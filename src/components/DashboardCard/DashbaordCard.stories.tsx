import { Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import DashboardCard, { DashboardCardProps } from './DashboardCard';

export default {
  title: 'components/DashboardCard',
  component: DashboardCard,
  args: {
    title: 'Farmer 1',
    body: <Typography variant="h5">Body</Typography>,
  },
} as Meta;
const Template: Story<DashboardCardProps> = (args) => (
  <DashboardCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithItems = Template.bind({});
WithItems.args = {
  items: [<Typography>Item1</Typography>, <Typography>Item2</Typography>],
};

export const Loading = Template.bind({});
Loading.args = {
  noData: true,
};
