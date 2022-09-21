import useConnections from './hooks/connections'
import useProps from './hooks/props'
import { resolver } from './utils/async'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {
    error: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
    inProgress: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
    success: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
  },
  hooks: {
    post: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
  },
  props: {
    accountId: 'string',
  },
  state: {},
  type: 'MoonmailConnector',
}

const MoonmailConnector: React.FC<ComposableProps> = ({
  children,
  connectConfig,
  context,
  id,
  props,
}) => {
  const actions = {
    error(args: any) {}, // eslint-disable-line
    inProgress(args: any) {}, // eslint-disable-line
    success(args: any) {}, // eslint-disable-line
  }

  const { accountId } = useProps(context, props)

  const hooks = {
    async post(args: { [key: string]: any }) {
      actions.inProgress('In progress')
      const [error, data] = await resolver(
        fetch(`https://client.moonmail.io/${accountId}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Address: args.Address,
          }),
        })
      )
      if (error || data === undefined || !data?.ok) {
        actions.error(error)
      } else {
        actions.success(data)
      }
      return data
    },
  }

  useConnections(connectConfig, context, id, actions, hooks)

  return <>{children}</>
}

export default MoonmailConnector
