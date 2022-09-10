import useConnections from './hooks/connections'
import useState from './hooks/state'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {},
  hooks: {
    setValue: {
      args: [['value', 'string|number'] as ArgTuple],
      returns: 'void',
    },
  },
  props: {},
  state: {
    value: 'string|number',
  },
  type: 'TextVariable',
}

const TextVariable: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  ComposableProps
> = ({ className, connectConfig, context, stateKey, id }, ref) => {
  const [{ value }, updateState] = useState(context, stateKey)

  const actions = {}

  const hooks = {
    setValue(args: { value: string | number }) {
      updateState('value', args.value)
    },
  }

  useConnections(connectConfig, context, id, actions, hooks)

  return (
    <span className={className} ref={ref}>
      {value}
    </span>
  )
}

TextVariable.displayName = 'TextVariable'

export default React.forwardRef<HTMLSpanElement, ComposableProps>(TextVariable)
