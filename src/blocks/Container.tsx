import { ComposableProps } from './types'

export const options = {
  actions: {},
  hooks: {},
  props: {},
  state: {},
  children: [],
  className: 'string',
  type: 'Container',
}

const Container: React.ForwardRefRenderFunction<
  HTMLParagraphElement,
  ComposableProps
> = ({ children, className }, ref) => {
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

Container.displayName = 'Container'

export default React.forwardRef<HTMLParagraphElement, ComposableProps>(
  Container
)
