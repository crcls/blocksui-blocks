import useConnections from './hooks/connections'
import useState from './hooks/state'
import useProps from './hooks/props'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {
    click: {
      args: [],
      returns: 'void',
    },
  },
  hooks: {
    updateLabel: {
      args: [['value', 'string'] as ArgTuple],
      returns: 'void',
    },
    updateDisabled: {
      args: [['value', 'boolean'] as ArgTuple],
      returns: 'void',
    },
  },
  props: {
    autoFocus: 'boolean',
    type: 'submit|reset|button',
  },
  state: {
    label: 'string',
    disabled: 'boolean',
  },
  type: 'Button',
}

// const StyledButton = deps.styled.button`
//   margin: 0 6px;
//   padding: 9px;
//   text-align: center;
// `

const Button: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ComposableProps
> = (
  { children, className, connectConfig, context, stateKey, id, props },
  ref
) => {
  const [{ disabled, label }, updateState] = useState(context, stateKey)
  const { autoFocus, type } = useProps(context, props)

  const actions = {
    // @ts-ignore
    click() {},
  }
  const hooks = {
    updateLabel(args: { [key: string]: any }) {
      updateState('label', args.value)
    },
    updateDisabled(args: { [key: string]: any }) {
      updateState('disabled', args.value)
    },
  }

  useConnections(connectConfig, context, id, actions, hooks)

  return (
    <button
      {...props}
      autoFocus={autoFocus}
      className={className}
      disabled={disabled}
      onClick={actions.click}
      ref={ref}
      type={type}
    >
      {children && children.length !== 0 ? children : label}
    </button>
  )
}

Button.displayName = 'Button'

export default React.forwardRef<HTMLButtonElement, ComposableProps>(Button)
