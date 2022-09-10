import Input from './Input'
//import './Input.css';
import { blockProp } from '@crcls/blocksui-sdk'

export default {
  title: 'Primitives/Input',
  component: Input,
}

const Template = (args) => <Input {...args} />

export const BaseInput = Template.bind({})

BaseInput.args = {
  config: [
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
        value: '',
      },
      type: 'Input',
    },
  ],
}
