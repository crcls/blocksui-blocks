import useConnections from './hooks/connections';
import useState from './hooks/state';
import useProps from './hooks/props';
import { getERC721Contract } from './contract/supports-interface';
import { normalizeUrl } from './utils/url';

import { /* ArgTuple, */ ComposableProps } from './types';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';

export const options = {
  actions: {},
  deps: ['ethers'],
  hooks: {},
  props: {
    abi: 'json',
    address: 'string',
    provider: 'Provider',
    loader: 'ReactNode',
  },
  state: {
    metadata: 'object|array',
  },
  type: 'Contract',
};

const ERC721Contract: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ComposableProps
> = (
  { children, className, connectConfig, context, stateKey, host, id, props },
  ref
) => {
  // @ts-ignore
  const [{ metadata }, updateState] = useState(context, stateKey); // eslint-disable-line
  // @ts-ignore
  const [signer, setSigner] = React.useState<Signer | null>(null); // eslint-disable-line
  // @ts-ignore
  const [contract, setContract] = React.useState<Contract | null>(null);

  const { abi, address, loader, provider } = useProps(context, props);

  const actions = {};

  const hooks = {
    async fetchMetadata(args: { [key: string]: any }) {
      if (contract && !metadata) {
        let uri = await contract.tokenURI(args.tokenId as number);
        const url = normalizeUrl(uri, host);
        const meta = await fetch(url)
          .then((data) => data.json())
          .catch((error) => console.error(error));
        if (meta) {
          updateState('metadata', meta);
        }
      }
    },
  };

  React.useEffect(() => {
    if (provider && !contract) {
      const initContract = async () => {
        const [cont] = await getERC721Contract({ provider, address, abi });
        setContract(cont);
      };

      initContract();
    }
  }, [contract, provider]);

  useConnections(connectConfig, context, id, actions, hooks);

  return (
    <div ref={ref} className={className}>
      {contract ? children : loader}
    </div>
  );
};

ERC721Contract.displayName = 'ERC721Contract';

export default React.forwardRef<HTMLDivElement, ComposableProps>(
  ERC721Contract
);
