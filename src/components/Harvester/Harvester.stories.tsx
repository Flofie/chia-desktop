import { Meta, Story } from '@storybook/react/types-6-0';
import Harvester, { HarvesterProps } from './Harvester';

export default {
  title: 'components/Harvester',
  component: Harvester,
  args: {
    name: 'Harvester 1',
    plotCount: 123,
  },
} as Meta;
const Template: Story<HarvesterProps> = (args) => <Harvester {...args} />;

export const Default = Template.bind({});
Default.args = {};
