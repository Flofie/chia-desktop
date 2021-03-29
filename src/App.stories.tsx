import { Meta, Story } from '@storybook/react/types-6-0';
import App from './App';

export default {
  title: 'Pages/App',
  component: App,
  args: {},
} as Meta;
const Template: Story = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};
