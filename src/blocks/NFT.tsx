import useConnections from './hooks/connections';
import useState from './hooks/state';
import useProps from './hooks/props';

import { /* ArgTuple, */ ComposableProps } from './types';

export const options = {
  actions: {},
  hooks: {},
  props: {
    metadata: 'object',
    tokenId: 'number',
  },
  state: {
    imageSrc: 'string',
  },
  type: 'NFT',
};

const NFT: React.ForwardRefRenderFunction<HTMLDivElement, ComposableProps> = (
  { children, className, connectConfig, context, stateKey, id, props },
  ref
) => {
  const [{ imageSrc }, updateState] = useState(context, stateKey);
  const { metadata, tokenId } = useProps(context, props);
  const [fetched, setFetched] = React.useState(false);

  const actions = {
    fetchMetadata(args: { [key: string]: any }) {}, // eslint-disable-line
  };

  const hooks = {};

  useConnections(connectConfig, context, id, actions, hooks);

  React.useEffect(() => {
    if (metadata && !imageSrc) {
      updateState('imageSrc', metadata.image);
    } else if (!fetched) {
      setFetched(true);
      actions.fetchMetadata({ tokenId });
    }
  }, [fetched, imageSrc, metadata]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

NFT.displayName = 'NFT';

export default React.forwardRef<HTMLDivElement, ComposableProps>(NFT);
