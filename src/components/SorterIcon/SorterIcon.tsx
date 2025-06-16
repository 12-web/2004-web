import styles from './styles.module.css'

type SorterIconProps = {
  fill?: string
  isActive?: boolean
}

const SorterIcon = ({ fill = '#606373', isActive }: SorterIconProps) => {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${isActive ? styles.active : ''}`}>
      <path d="M11.6078 10.6711H4.39224C4.17581 10.6711 4.05497 10.8996 4.189 11.0556L7.79676 15.2391C7.90003 15.3588 8.09887 15.3588 8.20324 15.2391L11.811 11.0556C11.945 10.8996 11.8242 10.6711 11.6078 10.6711Z" />
      <path d="M11.811 6.94438L8.20324 2.76095C8.09997 2.64121 7.90113 2.64121 7.79676 2.76095L4.189 6.94438C4.05497 7.10037 4.17581 7.32888 4.39224 7.32888H11.6078C11.8242 7.32888 11.945 7.10037 11.811 6.94438Z" />
    </svg>
  )
}

export default SorterIcon
