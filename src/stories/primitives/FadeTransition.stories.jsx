import FadeTransition from './FadeTransition'
import './FadeTransition.css'
import { blockProp } from '@crcls/blocksui-sdk'

export default {
  title: 'Primitives/FadeTransition',
  component: FadeTransition,
}

const Template = (args) => <FadeTransition {...args} />

export const Primary = Template.bind({})

Primary.args = {
  config: [
    {
      id: 'moonMailConnector',
      type: 'MoonmailConnector',
      props: {
        accountId: blockProp('2a397d1e-86db-4eb9-8191-78ae896744ab'),
      },
      connections: [
        {
          action: 'success',
          hooks: {
            fadeTransitionSuccess: ['show'],
            fadeTransitionInProgress: ['hide'],
            fadeTransitionError: ['hide'],
          },
        },
        {
          action: 'error',
          hooks: {
            fadeTransitionSuccess: ['hide'],
            fadeTransitionInProgress: ['hide'],
            fadeTransitionError: ['show'],
          },
        },
        {
          action: 'inProgress',
          hooks: {
            fadeTransitionSuccess: ['hide'],
            fadeTransitionInProgress: ['show'],
            fadeTransitionError: ['hide'],
          },
        },
      ],
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
            name: blockProp('Address'),
            placeholder: blockProp('dobby@hogwarts.com'),
            type: blockProp('email'),
            label: blockProp('Email'),
            required: blockProp(false),
          },
          state: {
            value: '',
          },
          type: 'Input',
        },
      ],
      type: 'Form',
    },
    {
      id: 'fadeTransitionSuccess',
      type: 'FadeTransition',
      children: ['Success'],
      className: 'fade-in',
    },
    {
      id: 'fadeTransitionInProgress',
      type: 'FadeTransition',
      children: ['Loading ...'],
      className: 'fade-in-loading',
    },
    {
      id: 'fadeTransitionError',
      type: 'FadeTransition',
      children: ['Error!'],
      className: 'fade-in',
      props: {
        time: blockProp('10s'),
      },
    },
  ],
}
