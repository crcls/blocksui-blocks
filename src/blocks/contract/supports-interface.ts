import { Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import {
  supportsInterfaceAbi,
  erc721Abi,
  // erc721aAbi,
  erc721EnumerableAbi,
} from './abi';

const interfaceIds = {
  ERC20: '0x36372b07',
  ERC721: '0x80ac58cd',
  ERC721Enumerable: '0x79f154c4',
  ERC777: '0xe58e113c',
  ERC1155: '0xd9b67a26',
  ERC2981: '0x2a55205a',
} as const;

type InterfaceTypes = keyof typeof interfaceIds;

const methodSigs = {
  supportsInterface: '01ffc9a7',
  totalSupply: '18160ddd',
} as const;

type MethodTypes = keyof typeof methodSigs;

let codeCache: { [key: string]: string } = {};

export async function hasMethod(
  provider: Provider,
  address: string,
  signature: MethodTypes
): Promise<boolean> {
  if (codeCache[address] === undefined) {
    codeCache[address] = await provider.getCode(address);
  }

  return codeCache[address].indexOf(methodSigs[signature]) > 0;
}

export async function supportsInterface(
  provider: Provider,
  address: string,
  interfaceType: InterfaceTypes
): Promise<boolean> {
  if (await hasMethod(provider, address, 'supportsInterface')) {
    const contract: Contract = new deps.ethers.Contract(
      address,
      supportsInterfaceAbi,
      provider
    );
    const supported = await contract.supportsInterface(
      deps.ethers.BigNumber.from(interfaceIds[interfaceType])
    );
    return supported;
  }

  return false;
}

export async function getERC721Contract(args: {
  provider: Provider;
  address: string;
  signer?: Signer;
  abi?: { [key: string]: any };
}): Promise<[Contract, boolean]> {
  const { provider, address, signer, abi } = args;
  let isEnum = await supportsInterface(provider, address, 'ERC721Enumerable');

  if (!isEnum) {
    const is721 = await supportsInterface(provider, address, 'ERC721');

    if (!is721) {
      throw new Error(
        'Provided contract does not support the ERC721 interface'
      );
    }
  }

  let fallbackAbi: { [key: string]: any }[] = isEnum
    ? erc721EnumerableAbi
    : erc721Abi;

  return [
    new deps.ethers.Contract(address, abi || fallbackAbi, signer || provider),
    isEnum,
  ];
}
