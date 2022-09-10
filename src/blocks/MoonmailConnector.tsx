import useConnections from './hooks/connections'
import useProps from './hooks/props'

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
  type: 'MoonmainConnector',
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
    post(args: { [key: string]: any }) {
      actions.inProgress('In progress')
      fetch(`https://client.moonmail.io/${accountId}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Address: args.Address,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          console.log(response)
          actions.error(response)
        })
        .then((data) => {
          actions.success(data)
        })
    },
  }

  useConnections(connectConfig, context, id, actions, hooks)

  return <>{children}</>
}

export default MoonmailConnector
