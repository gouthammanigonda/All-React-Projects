import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {FlexCenter} from './styled'

const LoaderView = () => (
  <FlexCenter data-testid="loader">
    <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
  </FlexCenter>
)

export default LoaderView
