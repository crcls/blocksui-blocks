import useConnections from './hooks/connections';

import { ArgTuple, ComposableProps } from './types';

export const options = {
  hooks: {
    log: {
      args: [['args', 'any'] as ArgTuple],
      returns: 'void',
    },
  },
  props: {},
  state: {},
  type: 'Logger',
};

const Logger: React.FC<ComposableProps> = ({
  children,
  connectConfig,
  context,
  id,
}) => {
  const actions = {};
  const hooks = {
    log(args: { [key: string]: any }) {
      console.log(args); // eslint-disable-line
    },
  };

  useConnections(connectConfig, context, id, actions, hooks);

  return <>{children}</>;
};

export default Logger;
