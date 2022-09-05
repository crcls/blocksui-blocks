import Checkbox from './Input';
//import './Checkbox.css';
import { blockProp } from '@crcls/blocksui-sdk';

export default {
  title: 'Base Blocks/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const BaseCheckbox = Template.bind({});

BaseCheckbox.args = {
  config: [
    {
      id: 'checkbox',
      props: {
        name: blockProp('subscribe'),
        id: blockProp('subscribe'),
        label: blockProp('Subscribe to our newsletter'),
      },
      state: {
        value: false,
      },
      type: 'Checkbox',
    },
  ],
};
