import React, { FC } from 'react';
import styled from 'styled-components/native';

type ScreenProps = {
  label: string;
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 20px;
`;

export const Screen: FC<ScreenProps> = ({ label }) => (
  <Container>
    <Label>{label}</Label>
  </Container>
);
