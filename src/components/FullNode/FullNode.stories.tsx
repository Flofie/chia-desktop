import { Meta, Story } from '@storybook/react/types-6-0';
import FullNode, { FullNodeProps } from './FullNode';

export default {
  title: 'components/FullNode',
  component: FullNode,
  args: {
    name: 'Node 1',
    isSync: true,
    height: 11339,
    networkSpace: 73659118,
  },
} as Meta;
const Template: Story<FullNodeProps> = (args) => <FullNode {...args} />;

export const Synced = Template.bind({});
Synced.args = {};

export const NotSynced = Template.bind({});
NotSynced.args = { isSync: false };
