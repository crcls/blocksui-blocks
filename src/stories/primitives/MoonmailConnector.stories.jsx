import MoonmailConnector from './MoonmailConnector';
//import './Button.css';
import { blockProp } from '@crcls/blocksui-sdk';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Primitives/MoonmailConnector',
  component: MoonmailConnector,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MoonmailConnector {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  config: [
    {
      id: 'moonMailConnector',
      type: 'MoonmailConnector',
      props: {
        accountId: blockProp('2a397d1e-86db-4eb9-8191-78ae896744ab'),
      },
    },
    {
      connections: [
        { action: 'submit', hooks: { moonMailConnector: ['post'] } },
      ],
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
            name: blockProp('Address'), // here change name to Address this will be the email address
            placeholder: blockProp('dobby@hogwarts.com'),
            type: blockProp('email'), // email
            label: blockProp('Email'),
            required: blockProp(true),
          },
          state: {
            value: '',
          },
          type: 'Input',
        },
      ],
      type: 'Form',
    },
  ],
};
