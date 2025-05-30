import React from 'react'
import styled from 'styled-components/native'
import { useBrand, Theme } from '@repo/theme' // adjust import path as needed
import { Image } from 'react-native'

export const Header: React.FC = () => {
  const { name, logo } = useBrand()

  return (
    <Container>
      <Image
        source={logo}
        style={{ resizeMode: 'contain', width: 40, height: 40, marginRight: 12 }}
      />
      <TextBlock>
        <WelcomeText>Welcome to</WelcomeText>
        <BrandText>{name}</BrandText>
      </TextBlock>
    </Container>
  )
}

const Container = styled.View<{ theme: Theme }>`
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.primary.background};

  flex-direction: row;
  align-items: center;
`

const Logo = styled.Image<{ theme: Theme }>`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`

const TextBlock = styled.View``

const WelcomeText = styled.Text<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.secondary.secondary1};
  font-family: ${({ theme }) => theme.fonts.caption['1'].regular.fontFamily};
  font-size: ${({ theme }) => theme.fonts.caption['1'].regular.fontSize}px;
  line-height: ${({ theme }) => theme.fonts.caption['1'].regular.lineHeight}px;
  font-weight: ${({ theme }) => theme.fonts.caption['1'].regular.fontWeight};
`

const BrandText = styled.Text<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.secondary.secondary1};
  font-family: ${({ theme }) => theme.fonts.title['2'].semiBold.fontFamily};
  font-size: ${({ theme }) => theme.fonts.title['2'].semiBold.fontSize}px;
  line-height: ${({ theme }) => theme.fonts.title['2'].semiBold.lineHeight}px;
  font-weight: ${({ theme }) => theme.fonts.title['2'].semiBold.fontWeight};
`
