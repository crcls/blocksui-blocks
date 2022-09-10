import useConnections from './hooks/connections'
import useProps from './hooks/props'

import { ArgTuple, ComposableProps } from './types'

export const options = {
  actions: {
    submit: {
      args: [['params', 'object'] as ArgTuple],
      returns: 'promise.response',
    },
  },
  hooks: {
    submit: {
      args: [],
      returns: 'promise.response',
    },
  },
  props: {
    autocomplete: 'on|off',
  },
  state: {},
  type: 'Form',
}

function serialize(form: HTMLFormElement): { [key: string]: any } {
  const data = new FormData(form)
  const params = {} as { [key: string]: any }

  for (const pair of data.entries()) {
    params[pair[0]] = pair[1]
  }

  return params
}

const Form: React.ForwardRefRenderFunction<HTMLFormElement, ComposableProps> = (
  { children, className, connectConfig, context, id, props },
  ref
) => {
  const { autocomplete } = useProps(context, props)
  const formRef = React.useRef<HTMLFormElement>(null)

  const actions = {
    // @ts-ignore
    submit(args: any) {}, // eslint-disable-line
  }

  const hooks = {
    submit() {
      if (formRef.current) {
        return actions.submit(serialize(formRef.current))
      }
    },
  }

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      actions.submit(serialize(event.currentTarget))
    },
    []
  )

  useConnections(connectConfig, context, id, actions, hooks)

  React.useEffect(() => {
    if (ref !== null && formRef.current !== null) {
      if (typeof ref === 'function') {
        ref(formRef.current)
      } else {
        ref.current = formRef.current
      }
    }
  }, [ref, formRef.current])

  return (
    <form
      autoComplete={autocomplete}
      ref={formRef}
      role="form"
      className={className}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}

Form.displayName = 'Form'

export default React.forwardRef<HTMLFormElement, ComposableProps>(Form)
