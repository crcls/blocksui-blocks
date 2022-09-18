import Container from './Container'
import './Container.css'
import { blockProp } from '@crcls/blocksui-sdk'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Primitives/Container',
  component: Container,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Container {...args} />

export const Primary = Template.bind({})

Primary.args = {
  config: [
    {
      type: 'Container',
      className: 'container',
      children: [
        {
          type: 'Heading',
          children: ['Hello!'],
          props: {
            level: blockProp(1),
          },
        },
        {
          type: 'Paragraph',
          children: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          ],
        },
      ],
    },
  ],
}
