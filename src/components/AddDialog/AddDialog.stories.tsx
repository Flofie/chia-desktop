import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import AddDialog, { AddDialogProps } from './AddDialog';

export default {
  title: 'components/AddDialog',
  component: AddDialog,
  args: {
    open: true,
    type: 'fullNode',
    toggleOpen: action('toggleOpen'),
  },
} as Meta;
const Template: Story<AddDialogProps> = (args) => <AddDialog {...args} />;

export const Default = Template.bind({});
Default.args = {};
