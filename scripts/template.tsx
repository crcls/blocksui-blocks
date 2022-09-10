import useConnections from './hooks/connections'
import useState from './hooks/state'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {},
  hooks: {},
  props: {},
  state: {},
  type: 'COMP_NAME',
}

const COMP_NAME: React.FC<ComposableProps> = ({
  children,
  className,
  connectConfig,
  context,
  stateKey,
  id,
  props,
}) => {
  const [state, updateState] = useState(context, stateKey)

  const actions = {}

  const hooks = {}

  useConnections(connectConfig, context, id, actions, hooks)

  return (
    <COMP_ELEM {...props} className={className}>
      {children}
    </COMP_ELEM>
  )
}

export default COMP_NAME
