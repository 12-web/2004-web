import LogoSvg from '../../../assets/images/logo.svg'
import style from './style.module.css'

const Logo = () => {
  return (
    <div className={style.logo}>
      <img src={LogoSvg} alt="logo" />
    </div>
  )
}

export default Logo
