import useConnections from './hooks/connections';
import useState from './hooks/state';
import useProps from './hooks/props';

import { ArgTuple, ComposableProps } from './types';

export const options = {
  actions: {
    change: {
      args: [['value', 'string'] as ArgTuple],
      returns: 'void',
    },
  },
  hooks: {},
  props: {
    autocomplete: 'on|off',
    autofocus: 'boolean',
    name: 'string',
    placeholder: 'string',
    type: 'email|hidden|number|password|tel|text|url',
  },
  state: {
    value: 'string',
  },
  type: 'Input',
};

const StyledInput = deps.styled.input`
  padding: 9px;
`;

const Input: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ComposableProps
> = ({ className, connectConfig, context, stateKey, id, props }, ref) => {
  const [{ value }, updateState] = useState(context, stateKey);
  const { autocomplete, autofocus, name, placeholder, type } = useProps(
    context,
    props
  );

  const actions = {
    change(args: { value: string }) {
      updateState('value', args.value);
    },
  };

  const hooks = {};

  useConnections(connectConfig, context, id, actions, hooks);

  const handleChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      actions.change({ value: event.currentTarget.value });
    },
    []
  );

  return (
    <StyledInput
      {...props}
      autocomplete={autocomplete}
      autofocus={autofocus}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      className={className}
      onChange={handleChange}
      ref={ref}
    />
  );
};

Input.displayName = 'Input';

export default React.forwardRef<HTMLInputElement, ComposableProps>(Input);
