import useConnections from './hooks/connections'
import useState from './hooks/state'
import useProps from './hooks/props'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {
    change: {
      args: [['value', 'string'] as ArgTuple],
      returns: 'void',
    },
  },
  hooks: {},
  props: {
    autoComplete: 'on|off',
    autoFocus: 'boolean',
    name: 'string',
    placeholder: 'string',
    type: 'email|hidden|number|password|tel|text|url',
    label: 'string',
    required: 'boolean',
  },
  state: {
    value: 'string',
  },
  type: 'Input',
}

const Input: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ComposableProps
> = ({ className, connectConfig, context, stateKey, id, props }, ref) => {
  const [{ value }, updateState] = useState(context, stateKey)
  const { autoComplete, autoFocus, name, placeholder, type, label, required } =
    useProps(context, props)

  const actions = {
    change(args: { value: string }) {
      updateState('value', args.value)
    },
  }

  const hooks = {}

  useConnections(connectConfig, context, id, actions, hooks)

  const handleChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      actions.change({ value: event.currentTarget.value })
    },
    []
  )

  return (
    <>
      <label htmlFor={name} className="bui-input-label">
        {label}
      </label>
      <input
        {...props}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        className={`bui-input ${className}`}
        onChange={handleChange}
        ref={ref}
        required={required}
        aria-required={required}
      />
    </>
  )
}

Input.displayName = 'Input'

export default React.forwardRef<HTMLInputElement, ComposableProps>(Input)
