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
  HTMLDivElement,
  ComposableProps
> = ({ children, className }, ref) => {
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

Container.displayName = 'Container'

export default React.forwardRef<HTMLDivElement, ComposableProps>(Container)
