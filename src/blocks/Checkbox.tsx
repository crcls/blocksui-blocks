import useConnections from './hooks/connections'
import useState from './hooks/state'
import useProps from './hooks/props'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {
    change: {
      args: [['value', 'boolean'] as ArgTuple],
      returns: 'void',
    },
  },
  hooks: {},
  props: {
    name: 'string',
    id_for_label: 'string',
    label: 'string',
  },
  state: {
    value: 'boolean',
  },
  type: 'Checkbox',
}

const Checkbox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ComposableProps
> = ({ className, connectConfig, context, stateKey, id, props }, ref) => {
  const [{ value }, updateState] = useState(context, stateKey)
  const { name, label, idForLabel } = useProps(context, props)

  const actions = {
    change(args: { value: string }) {
      updateState('value', args.value)
    },
  }

  const hooks = {}

  useConnections(connectConfig, context, id, actions, hooks)

  const handleChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      actions.change({ value: event.target.checked })
    },
    []
  )

  return (
    <>
      <label htmlFor={idForLabel} className={className}>
        {label}
      </label>
      <input
        {...props}
        id={idForLabel}
        name={name}
        type="checkbox"
        value={id}
        className={className}
        onChange={handleChange}
        checked={value}
        ref={ref}
      />
    </>
  )
}

Checkbox.displayName = 'Checkbox'

export default React.forwardRef<HTMLInputElement, ComposableProps>(Checkbox)
