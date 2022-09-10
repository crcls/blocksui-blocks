import useConnections from './hooks/connections';
import useProps from './hooks/props';

import { ArgTuple, ComposableProps } from './types';

export const options = {
  actions: {
    POSTsuccess: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
    POSTinProgress: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
    POSTerror: {
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
};

const MoonmailConnector: React.FC<ComposableProps> = ({
  children,
  connectConfig,
  context,
  id,
  props,
}) => {
  const actions = {
    POSTsuccess(args: any) {}, // eslint-disable-line
    POSTinProgress(args: any) {}, // eslint-disable-line
    POSTerror(args: any) {}, // eslint-disable-line
  };

  const { accountId } = useProps(context, props);
  const hooks = {
    post(args: { [key: string]: any }) {
      actions.POSTinProgress('In progress');
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
            return response.json();
          }
          console.log(response);
          actions.POSTerror(response);
        })
        .then((data) => {
          actions.POSTsuccess(data);
        });
    },
  };

  useConnections(connectConfig, context, id, actions, hooks);

  return <>{children}</>;
};

export default MoonmailConnector;
