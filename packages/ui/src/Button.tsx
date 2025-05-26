import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '@repo/theme/themes/types';
import { useNavigation } from '@react-navigation/native';

export const RedeemButton: React.FC = () => {
  const theme = useTheme() as ThemeType;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Prescriptions');
  };

  return (
    <Wrapper>
      <ButtonContainer
        onPress={handlePress}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <Ionicons name="receipt-outline" size={20} color="white" style={{ marginRight: 8 }} />
        <ButtonText>Redeem e-prescription</ButtonText>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const ButtonContainer = styled.Pressable<{ theme: ThemeType }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.primary1};
  padding: 16px 24px;
  border-radius: 12px;
`;

const ButtonText = styled.Text<{ theme: ThemeType }>`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;
