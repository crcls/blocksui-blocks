import { Context } from 'react';

import { IBlockContext, ConnectionMap, MethodDict } from '@crcls/blocksui-sdk';

// Parse out the call methods for each connection from the parent meant for this child
function useConnections(
  config: ConnectionMap,
  context: Context<IBlockContext>,
  id: string,
  actions: MethodDict,
  hooks: MethodDict
) {
  const { connections } = React.useContext(context);

  for (const cid of config.hooks) {
    connections[cid].hooks(hooks, id);
  }

  connections[config.owns].actions(actions);
}

export default useConnections;
