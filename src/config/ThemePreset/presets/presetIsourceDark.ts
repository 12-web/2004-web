import '../Theme.css'
import '../_color/Theme_color_isourceDefault.css'
import '../_color/Theme_color_isourceDark.css'
import '../_control/Theme_control_isource.css'
import '../_font/Theme_font_isource.css'
import '../_size/Theme_size_isource.css'
import '../_space/Theme_space_isource.css'
import '../_shadow/Theme_shadow_isource.css'

import { ThemePreset } from '@consta/uikit/Theme'

export const presetIsourceDark: ThemePreset = {
  color: {
    primary: 'isourceDark',
    accent: 'isourceDefault',
    invert: 'isourceDefault',
  },
  control: 'isource',
  font: 'isource',
  size: 'isource',
  space: 'isource',
  shadow: 'isource',
}
