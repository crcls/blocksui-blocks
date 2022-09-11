import useConnections from './hooks/connections'
import useProps from './hooks/props'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {},
  hooks: {
    show: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
    hide: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
  },
  props: {
    time: 'string',
  },
  state: {},
  type: 'FadeTransition',
}

const FadeTransition: React.FC<ComposableProps> = ({
  children,
  connectConfig,
  context,
  id,
  props,
  className,
}) => {
  const actions = {}
  const [isVisible, setIsVisible] = React.useState(false)
  const { time } = useProps(context, props)
  const hooks = {
    show(args: { [key: string]: any }) {
      setIsVisible(true)
      console.log('show', children)
    },
    hide(args: { [key: string]: any }) {
      console.log('hide', children)
      setIsVisible(false)
    },
  }

  useConnections(connectConfig, context, id, actions, hooks)

  if (!isVisible) {
    return null
  }

  return <div className={className}>{children}</div>
}

export default FadeTransition
