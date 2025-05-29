import React from 'react'
import { Text } from 'react-native'
import { Screen } from '@repo/ui/Screen'
import styled from 'styled-components/native'

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const CategoriesScreen = () => (
  <Screen>
    <Centered>
      <Text>Coming soon...</Text>
    </Centered>
  </Screen>
)
