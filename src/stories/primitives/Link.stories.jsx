import Link from './Link';
import './Link.css';
import { blockProp } from '@crcls/blocksui-sdk';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Primitives/Link',
  component: Link,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Link {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  config: [
    {
      children: ['Primary Link'],
      props: { href: blockProp('https://crcls.xyz') },
      type: 'Link',
      className: 'btn btn-primary btn-small',
    },
  ],
};
