import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import { presetGpnDefault, Theme } from '@consta/uikit/Theme'

import { store } from '@store/index'
import Pages from '@pages/Pages'

import './global.css'

const App = () => (
  <Provider store={store}>
    <Theme preset={presetGpnDefault}>
      <BrowserRouter basename="/2004-web">
        <Pages />
      </BrowserRouter>
    </Theme>
  </Provider>
)

export default App
