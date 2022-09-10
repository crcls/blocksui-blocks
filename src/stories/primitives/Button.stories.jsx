import Button from './Button'
//import './Button.css';
import { blockProp } from '@crcls/blocksui-sdk'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Primitives/Button',
  component: Button,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  config: [
    {
      id: 'logger',
      type: 'Logger',
    },
    {
      children: ['Click'],
      connections: [
        {
          action: 'click',
          hooks: { logger: ['log'] },
        },
      ],
      id: 'button',
      props: {
        type: blockProp('button'),
      },
      type: 'Button',
    },
  ],
}
