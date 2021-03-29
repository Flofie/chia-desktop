import { Meta, Story } from '@storybook/react/types-6-0';
import Wallet, { WalletProps } from './Wallet';

export default {
  title: 'components/Wallet',
  component: Wallet,
  args: {
    name: 'Wallet 1',
    balance: 100,
    height: 3324,
  },
} as Meta;
const Template: Story<WalletProps> = (args) => <Wallet {...args} />;

export const Default = Template.bind({});
Default.args = {};
