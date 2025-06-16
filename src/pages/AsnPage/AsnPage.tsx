import { useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { useAppDispatch } from '@hooks/redux'
import { opened } from '@store/reducers/Modal/ModalOpenSlice'
import { Asn } from '@store/types/asnApi'
import modals from '@utils/modals'
import AsnTable from './components/AsnTable'
import LayoutContainer from '@components/LayoutContainer'
import AsnModals from './components/Modals/Modals'

import styles from './styles.module.css'

const AsnPage = () => {
  const [selectedAsn, setSelectedAsn] = useState<Asn | null>(null)

  const dispatch = useAppDispatch()
  const handleOpenModal = (id: string) => dispatch(opened(id))

  const handleEditClick = (asn: Asn) => {
    handleOpenModal(modals.EDIT_ASN_MODAL_ID)
    setSelectedAsn(asn)
  }

  return (
    <LayoutContainer>
      <Layout className={styles.main} direction="column">
        <AsnTable onEditAsn={handleEditClick} />
        <AsnModals asn={selectedAsn} />
      </Layout>
    </LayoutContainer>
  )
}

export default AsnPage
