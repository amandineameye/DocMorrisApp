import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { TextInput, TextInputProps, Keyboard, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@repo/theme/themes/types';

type SearchBarProps = {
  value?: string;
  onChangeText?: (text: string) => void;
} & TextInputProps;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ArrowContainer = styled.View<{ theme: ThemeType; isClickable: boolean }>`
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  z-index: 1;
  ${({ isClickable }) => (isClickable ? '' : 'pointer-events: none;')}
`;

const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary.secondary6};
  border-radius: 12px;
  padding: 10px 14px;
  flex: 1;
  z-index: 2; /* Ensure this sits above the arrow */
`;

// Base styled wrapper
const InputBase = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary.secondary1};
  font-family: ${({ theme }) => theme.fonts.input.text.regular.fontFamily};
  margin-left: 10px;
`;

// Forward ref correctly to TextInput
const StyledInput = forwardRef<TextInput, any>((props, ref) => {
  return <InputBase ref={ref} {...props} />;
});

export const SearchBar = ({ value, onChangeText, ...props }: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const marginLeft = useRef(new Animated.Value(0)).current;
  const theme = useTheme() as ThemeType;

  const handleDismiss = () => {
    Keyboard.dismiss();
    inputRef.current?.blur();
    setIsFocused(false);
  };

  useEffect(() => {
    Animated.timing(marginLeft, {
      toValue: isFocused ? 35 : 0, // space for arrow
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <Wrapper>
      <ArrowContainer isClickable={isFocused}>
        <TouchableOpacity onPress={handleDismiss}>
          <Ionicons name="chevron-back" size={20} color={theme.colors.secondary.secondary3} />
        </TouchableOpacity>
      </ArrowContainer>

      <Container style={{ marginLeft }}>
        <Ionicons name="search-outline" size={20} color={theme.colors.secondary.secondary3} />
        <StyledInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search"
          placeholderTextColor="#D0D0D0"
          returnKeyType="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </Container>
    </Wrapper>
  );
};
