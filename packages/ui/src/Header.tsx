import React from 'react'
import styled from 'styled-components/native'
import { useBrand, Theme } from '@repo/theme' // adjust import path as needed
import { Image, View } from 'react-native'

export const Header: React.FC = () => {
  const { name, logo } = useBrand()

  return (
    <Container>
      <Image
        source={logo}
        style={{ resizeMode: 'contain', width: 40, height: 40, marginRight: 12 }}
      />
      <View>
        <WelcomeText>Welcome to</WelcomeText>
        <BrandText>{name}</BrandText>
      </View>
    </Container>
  )
}

const Container = styled.View`
  padding: 16px 0;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary.background};
  flex-direction: row;
  align-items: center;
`

const WelcomeText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.secondary.secondary1};
  font-family: ${({ theme }: { theme: Theme }) => theme.fonts.caption['1'].regular.fontFamily};
  font-size: ${({ theme }: { theme: Theme }) => theme.fonts.caption['1'].regular.fontSize}px;
  line-height: ${({ theme }: { theme: Theme }) => theme.fonts.caption['1'].regular.lineHeight}px;
  font-weight: ${({ theme }: { theme: Theme }) => theme.fonts.caption['1'].regular.fontWeight};
`

const BrandText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.secondary.secondary1};
  font-family: ${({ theme }: { theme: Theme }) => theme.fonts.title['2'].semiBold.fontFamily};
  font-size: ${({ theme }: { theme: Theme }) => theme.fonts.title['2'].semiBold.fontSize}px;
  line-height: ${({ theme }: { theme: Theme }) => theme.fonts.title['2'].semiBold.lineHeight}px;
  font-weight: ${({ theme }: { theme: Theme }) => theme.fonts.title['2'].semiBold.fontWeight};
`
