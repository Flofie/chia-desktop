import { Meta, Story } from '@storybook/react/types-6-0';
import Empty from './Empty';

export default {
  title: 'components/Empty',
  component: Empty,
  args: {},
} as Meta;
const Template: Story = (args) => <Empty {...args} />;

export const Default = Template.bind({});
Default.args = {};
