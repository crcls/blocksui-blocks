import Form from './Form';
//import './Button.css';
import { blockProp } from '@crcls/blocksui-sdk';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Primitives/Form',
  component: Form,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Form {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  config: [
    {
      id: 'logger',
      type: 'Logger',
    },
    {
      connections: [{ action: 'submit', hooks: { logger: ['log'] } }],
      children: [
        {
          children: ['Submit'],
          connections: [
            {
              action: 'click',
              hooks: { logger: ['log'] },
            },
          ],
          id: 'button',
          props: {
            type: blockProp('submit'),
          },
          type: 'Button',
        },
        {
          id: 'input',
          props: {
            autocomplete: blockProp('off'),
            autofocus: blockProp(false),
            name: blockProp('first_name'),
            placeholder: blockProp('Harry Potter'),
            type: blockProp('text'),
            label: blockProp('First name'),
            required: blockProp(true),
          },
          state: {
            value: 'string',
          },
          type: 'Input',
        },
      ],
      type: 'Form',
    },
  ],
};
