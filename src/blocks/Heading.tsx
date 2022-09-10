import { ComposableProps } from './types'
import useProps from './hooks/props'

export const options = {
  actions: {},
  hooks: {},
  props: {
    level: 'number|string',
  },
  state: {},
  type: '',
}

const Heading: React.ForwardRefRenderFunction<
  HTMLHeadingElement,
  ComposableProps
> = ({ children, className, context, props }, ref) => {
  const { level } = useProps(context, props)
  return React.createElement(`h${level || 1}`, { className, ref }, children)
}

Heading.displayName = 'Heading'

export default React.forwardRef<HTMLHeadingElement, ComposableProps>(Heading)
