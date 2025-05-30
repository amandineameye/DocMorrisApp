import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Image, View, TextStyle } from 'react-native'
import { useBrand } from '@repo/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useProductStore } from '@repo/stores/products'
import { PressableStateCallbackType } from 'react-native'
import { Theme } from '@repo/theme'

type ProductCardProps = {
  productId: number
  name: string
  dosage?: string
  unit?: string
  type?: string
  rating?: number
  reviewsCount?: number
  originalPrice?: number
  discountedPrice?: number
  discountPercent?: number
  pricePerUnit?: string
  onPress?: () => void
  isFavorite?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  name,
  dosage,
  unit,
  type,
  rating,
  reviewsCount,
  originalPrice,
  discountedPrice,
  discountPercent,
  pricePerUnit,
  onPress,
  isFavorite: isFavoriteProp = false,
}) => {
  const theme = useTheme() as Theme
  const { productImgs } = useBrand()

  const toggleFavorite = useProductStore((state) => state.toggleFavorite)
  const isFavorite = useProductStore(
    (state) => state.products.find((p) => p.id === productId)?.isFavorite ?? false,
  )

  return (
    <CardContainer onPress={onPress} accessibilityRole="button">
      <FavoriteButton
        onPress={() => toggleFavorite(productId)}
        accessibilityRole="button"
        style={({ pressed }: PressableStateCallbackType) => ({
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={16}
          color={theme.colors.secondary.secondary1}
        />
      </FavoriteButton>

      <ContentWrapper>
        {/* Top Section */}
        <View>
          <StyledImageWrapper>
            <StyledImage source={productImgs[productId]?.image} />
          </StyledImageWrapper>

          <ProductName
            numberOfLines={2}
            ellipsizeMode="tail"
            style={theme.fonts.title['3'].semiBold as TextStyle}
          >
            {name}
          </ProductName>

          {(dosage || type) && (
            <TextBase style={theme.fonts.caption['1'].regular as TextStyle}>
              {dosage && unit ? `${dosage} ${unit}` : ''} {type ? `| ${type}` : ''}
            </TextBase>
          )}

          {rating !== undefined && (
            <RatingRow>
              {Array.from({ length: 5 }).map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < Math.floor(rating) ? 'star' : 'star-outline'}
                  size={14}
                  color="#FEC106"
                  style={{ marginRight: 2 }}
                />
              ))}
              <TextBase style={[theme.fonts.caption['1'].regular as TextStyle, { marginLeft: 4 }]}>
                {rating.toFixed(1)} ({reviewsCount})
              </TextBase>
            </RatingRow>
          )}
        </View>

        {/* Bottom Section */}
        <View>
          <PriceRow>
            {originalPrice !== undefined && (
              <TextBase
                style={
                  {
                    ...theme.fonts.caption['1'].strikethrough,
                    color: theme.colors.secondary.secondary3,
                    marginRight: 6,
                    textDecorationLine: 'line-through',
                  } as TextStyle
                }
              >
                {originalPrice.toFixed(2)} €
              </TextBase>
            )}
          </PriceRow>

          <FooterRow>
            <PriceLeft>
              {discountPercent !== undefined && (
                <DiscountBadge>
                  <DiscountText style={theme.fonts.caption['1'].medium as TextStyle}>
                    -{discountPercent}%
                  </DiscountText>
                </DiscountBadge>
              )}
              {discountedPrice !== undefined && (
                <FinalPrice style={theme.fonts.body['1'].semiBold as TextStyle}>
                  {discountedPrice.toFixed(2)} €
                </FinalPrice>
              )}
            </PriceLeft>

            {pricePerUnit && (
              <PricePerUnit style={theme.fonts.caption['2'].regular as TextStyle}>
                {pricePerUnit}
              </PricePerUnit>
            )}
          </FooterRow>
        </View>
      </ContentWrapper>
    </CardContainer>
  )
}

const CardContainer = styled.Pressable<{ theme: Theme }>`
  width: 200px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primary.background};
  padding: 20px;

  /* iOS shadow */
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 4px;
  shadow-radius: 12px;

  /* Android shadow */
  elevation: 4;

  margin: 16px 16px 16px 10px;
`

const FavoriteButton = styled.Pressable<{ theme: Theme }>`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  height: 25px;
  width: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme?.colors.secondary.secondary7 || '#eee'};
  border-radius: 12.5px;
`

const ContentWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`

const StyledImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;
`

const StyledImage = styled(Image)`
  width: 80px;
  height: 80px;
  resize-mode: contain;
`

const ProductName = styled.Text<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.secondary.secondary1};
  margin-bottom: 2px;
  height: 48px;
`

const TextBase = styled.Text``

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
`

const FooterRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PriceLeft = styled.View`
  flex-direction: row;
  align-items: center;
`

const DiscountBadge = styled.View<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.interferer.interferer1};
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
`

const DiscountText = styled.Text`
  color: white;
  font-size: 14px;
`

const FinalPrice = styled.Text<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.secondary.secondary1};
  font-size: 18px;
`

const PricePerUnit = styled.Text<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.secondary.secondary3};
  font-size: 12px;
`
