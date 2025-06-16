import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import { presetGpnDefault, Theme } from '@consta/uikit/Theme'
// import { presetIsourceDefault } from './config/ThemePreset/presets/presetIsourceDefault'

import { store } from '@store/index'
import Pages from '@pages/Pages'

import './global.css'

const App = () => (
  <Provider store={store}>
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </Theme>
  </Provider>
)

export default App
