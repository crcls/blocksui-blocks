import { Context, ReactNode } from 'react';

import { ConnectionMap, IBlockContext } from '@crcls/blocksui-sdk';

export type ArgTuple = [string, string];

export interface MethodAST {
  // list of argument tuples
  // [name, type]
  args: ArgTuple[];
  // Type of the return value described as a string
  // 'string', 'number', 'string[]', '{ string: any }', etc
  // TODO: Implement the usage of this in connection validations
  // and document the supported types.
  returns: string;
}

export interface ComposableProps {
  children?: ReactNode[];
  className?: string;
  connectConfig: ConnectionMap;
  context: Context<IBlockContext>;
  host: string;
  stateKey: string;
  id: string; // ID for connections
  props: { [key: string]: any };
}

// This is only used by the Block / Page editor to
// understand what this block is capable of.
export type BlockOptions = {
  // @property actions Methods that this
  // component executes in response to UI
  // interaction and hooks.
  actions: { [key: string]: MethodAST };

  // @property deps A list of dependencies that
  // need to be passed into this block.
  deps: string[];

  // @property hooks Methods that this
  // component executes in response to child actions
  hooks: { [key: string]: MethodAST };

  // @property props Properties that will be
  // applied to the rendered component for a block node.
  props: { [key: string]: string };

  // @property state An object containing
  // state variables definitions used in this component.
  state: { [key: string]: string };

  // @property type The name of the block type
  type: string;
};
