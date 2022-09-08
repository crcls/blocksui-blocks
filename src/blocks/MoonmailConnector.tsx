import useConnections from './hooks/connections';

import { ArgTuple, ComposableProps } from './types';

export const options = {
  hooks: {
    log: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
  },
  props: {
      accountId: 'string',
      emailAddress: 'string', 
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
  const actions = {};
  const hooks = {
    // log(args: { [key: string]: any }) {
    //   console.log(args); // eslint-disable-line
    // },
  };
const { accountId } = useProps(context, props);


  useConnections(connectConfig, context, id, actions, hooks);

  return <>{children}</>;
};

export default MoonmailConnector;
