import { FC } from 'react'
import { Text } from '@consta/uikit/Text'
import { Link } from 'react-router'
import { joinClasses } from '@utils/userMessages/helpers'
import { Layout } from '@consta/uikit/Layout'
import { InfoBlockProps } from '@store/types/helpApi'

import styles from './styles.module.css'

const InfoBlock = ({ heading, texts, pictureUrl, type }: InfoBlockProps) => {
  const titleContent = heading?.url ? (
    <Link to={heading.url} target="_blank" rel="noopener noreferrer">
      <Text
        weight="medium"
        view="brand"
        className={joinClasses(type === 'sectionPicture' && styles.textIsWhite)}
        size={type === 'sectionPicture' ? '2xl' : 'l'}>
        {heading.value}
      </Text>
    </Link>
  ) : (
    <Text
      weight="medium"
      view="primary"
      className={joinClasses(type === 'sectionPicture' && styles.textIsWhite)}
      size={type === 'sectionPicture' ? '3xl' : 'l'}>
      {heading?.value}
    </Text>
  )

  const textsContent = texts && (
    <Layout className={styles.texts} direction="column">
      {texts?.map((text, i) => {
        const TextInner: FC = () => (
          <Text
            view="primary"
            size="s"
            lineHeight="l"
            weight={type === 'sectionPicture' ? 'light' : undefined}
            className={joinClasses(type === 'sectionPicture' && styles.textIsWhite)}>
            {text.value}
          </Text>
        )

        return text.url ? (
          <Link key={i} to={text.url} target="_blank" rel="noopener noreferrer">
            <TextInner />
          </Link>
        ) : (
          <TextInner key={i} />
        )
      })}
    </Layout>
  )

  return (
    <div className={joinClasses(styles.root, !!pictureUrl && styles.rootWithoutOffset)}>
      {type === 'sectionText' && (
        <div className={styles.content}>
          {titleContent}
          {textsContent}
        </div>
      )}
      {pictureUrl && (
        <Layout
          className={joinClasses(
            styles.imgWrapper,
            type === 'sectionPicture' && styles.imgWrapperWhite,
          )}
          direction="column">
          {type === 'sectionPicture' && (
            <div className={styles.content}>
              {titleContent}
              {textsContent}
            </div>
          )}
          <img className={styles.image} src={pictureUrl} />
        </Layout>
      )}
    </div>
  )
}

export default InfoBlock
