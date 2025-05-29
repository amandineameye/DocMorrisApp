import React, { FC } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'

type ScreenProps = {
  children: React.ReactNode
}

const ScrollContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
})`
  flex: 1;
`

export const Screen: FC<ScreenProps> = ({ children }) => (
  <ScrollContainer>{children}</ScrollContainer>
)
