import { Meta, Story } from '@storybook/react/types-6-0';
import Error from './Error';

export default {
  title: 'components/Error',
  component: Error,
  args: {},
} as Meta;
const Template: Story = (args) => <Error {...args} />;

export const Default = Template.bind({});
Default.args = {};
