import { Context } from 'react';

export type Props = { [key: string]: any };

import { IBlockContext } from '@crcls/blocksui-sdk';

const useProps = (context: Context<IBlockContext>, props: Props): Props => {
  const { getState } = React.useContext(context);

  return Object.entries(props).reduce<Props>((memo, [key, value]) => {
    if (typeof value === 'string' && value.startsWith('state:')) {
      const path = value.substring(6);
      const pathParts = path.split('.');
      const stateKey = pathParts.pop();
      const statePath = pathParts.join('.');
      const state = getState(statePath);
      memo[key] = state[stateKey!];
    } else {
      memo[key] = value;
    }

    return memo;
  }, {});
};

export default useProps;
