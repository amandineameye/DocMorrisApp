import React, { FC } from 'react';
import styled from 'styled-components/native';

type ScreenProps = {
  children: React.ReactNode;
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: start;
  padding: 20px;
`;

const Label = styled.Text`
  font-size: 20px;
`;

export const Screen: FC<ScreenProps> = ({ children }) => <Container>{children}</Container>;
