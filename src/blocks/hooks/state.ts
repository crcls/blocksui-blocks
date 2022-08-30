import { Context } from 'react';

import { IBlockContext, StateNode, UpdateStateFunc } from '../../types';

function useState(
  context: Context<IBlockContext>,
  stateKey: string
): [StateNode, UpdateStateFunc] {
  const { getState, updateState } = React.useContext(context);

  return [getState(stateKey), updateState(stateKey)];
}

export default useState;
