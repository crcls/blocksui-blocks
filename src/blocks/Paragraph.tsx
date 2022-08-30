import { ComposableProps } from './types';

export const options = {
  actions: {},
  hooks: {},
  props: {},
  state: {},
  type: '',
};

const Paragraph: React.ForwardRefRenderFunction<
  HTMLParagraphElement,
  ComposableProps
> = ({ children, className }, ref) => {
  return (
    <p className={className} ref={ref}>
      {children}
    </p>
  );
};

Paragraph.displayName = 'Paragraph';

export default React.forwardRef<HTMLParagraphElement, ComposableProps>(
  Paragraph
);
