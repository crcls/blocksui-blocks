import { Context } from 'react';

import { IBlockContext, StateNode, UpdateStateFunc } from '@crcls/blocksui-sdk';

function useState(
  context: Context<IBlockContext>,
  stateKey: string
): [StateNode, UpdateStateFunc] {
  const { getState, updateState } = React.useContext(context);

  return [getState(stateKey), updateState(stateKey)];
}

export default useState;
