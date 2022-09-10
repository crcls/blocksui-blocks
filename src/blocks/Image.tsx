import useConnections from './hooks/connections'
import useState from './hooks/state'
import useProps from './hooks/props'
import { normalizeUrl } from './utils/url'

import { ArgTuple, ComposableProps } from './types'

const Container = deps.styled.div`
  position: relative;
  overflow: hidden;
`

const ImageElem = deps.styled.img`
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 300ms ease-out;
  width: 100%;

  &.loaded {
    opacity: 1;
  }

  &.port {
    height: auto;
    top: 50%;
    transform: translateY(-50%);
  }

  &.land {
    left: 50%;
    width: auto;
    transform: translateX(-50%);
  }
`

export const options = {
  actions: {
    onLoad: {
      args: [['image', 'HTMLImageElement'] as ArgTuple],
      returns: 'void',
    },
  },
  hooks: {
    setDimensions: {
      args: [['dimensions', 'number[]'] as ArgTuple],
      returns: 'void',
    },
  },
  props: {
    alt: 'string',
    src: 'string',
    loader: 'ReactNode',
  },
  state: {
    height: 'number',
    width: 'number',
  },
  type: 'Image',
}

function getImgClass(height = 0, width = 0, loaded = false): string {
  const cn = []

  if (height > width) {
    cn.push('port')
  } else if (width > height) {
    cn.push('land')
  }

  if (loaded) {
    cn.push('loaded')
  }

  return cn.join(' ')
}

const ImageLoader: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ComposableProps
> = ({ className, connectConfig, context, stateKey, host, id, props }, ref) => {
  const [state, updateState] = useState(context, stateKey)
  const { alt, src, loader } = useProps(context, props)

  const [loadedSrc, setLoadedSrc] = React.useState<string>('')
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [imgClass, setImgClass] = React.useState(
    getImgClass(state.height || 0, state.width || 0, loaded)
  )

  const actions = {
    onLoad(img: HTMLImageElement) {
      setLoadedSrc(img.src)
      updateState('height', img.naturalHeight)
      updateState('width', img.naturalWidth)
      setImgClass(getImgClass(img.naturalHeight, img.naturalWidth, false))
      setLoaded(true)

      setTimeout(() => {
        setImgClass(getImgClass(img.naturalHeight, img.naturalWidth, true))
      }, 150)
    },
  }

  const hooks = {
    setDimensions(args: { [key: string]: number }) {
      const { height, width } = args

      if (height !== undefined) {
        updateState('height', height)
      }
      if (width !== undefined) {
        updateState('width', width)
      }
    },
  }

  React.useEffect(() => {
    if (!loaded && src && loadedSrc === '') {
      const load = async (s: string) => {
        const img = new Image()
        img.onload = actions.onLoad.bind(null, img)
        const url = normalizeUrl(s, host)
        // console.log('Normalized URL: ', url)
        img.src = url
      }

      load(src)
    }
  }, [src, loadedSrc, loaded])

  useConnections(connectConfig, context, id, actions, hooks)

  if (loader && !loaded) {
    return <Container className={className}>{loader}</Container>
  }

  return (
    <Container className={className} ref={ref}>
      <ImageElem
        alt={alt}
        className={imgClass}
        src={loadedSrc}
        height={state.height || 0}
        width={state.width || 0}
      />
    </Container>
  )
}

ImageLoader.displayName = 'ImageLoader'

export default React.forwardRef<HTMLDivElement, ComposableProps>(ImageLoader)
