import { ComposableProps } from './types';
import useProps from './hooks/props';

export const options = {
  actions: {},
  hooks: {},
  props: {
    href: 'string',
    role: 'string',
    target: 'string',
    title: 'string',
  },
  state: {},
  type: '',
};

const Link: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  ComposableProps
> = ({ children, className, context, props }, ref) => {
  const { href, role, target, title } = useProps(context, props);

  return (
    <a
      {...props}
      className={className}
      href={href}
      ref={ref}
      role={role}
      target={target}
      title={title}
    >
      {children}
    </a>
  );
};

Link.displayName = 'Link';

export default React.forwardRef<HTMLAnchorElement, ComposableProps>(Link);
