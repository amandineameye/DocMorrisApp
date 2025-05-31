import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import {
  Image,
  View,
  TextStyle,
  PressableStateCallbackType,
  ImageSourcePropType,
} from 'react-native'
import { useBrand, Theme } from '@repo/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'

type ProductCardProps = {
  id: number
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
  image?: ImageSourcePropType
  isFavorite?: boolean
  onPress?: () => void
  onToggleFavorite?: (id: number) => void
}

type TopSectionProps = Pick<
  ProductCardProps,
  'id' | 'dosage' | 'unit' | 'type' | 'rating' | 'reviewsCount' | 'name'
> & {
  productImgs: { id: number; image: ImageSourcePropType }[]
  theme: Theme
}

type TopRightCornerProps = {
  toggleFavorite: () => void
  isFavorite: boolean
  theme: Theme
}

type BottomSectionProps = Pick<
  ProductCardProps,
  'originalPrice' | 'discountPercent' | 'discountedPrice' | 'pricePerUnit'
> & {
  theme: Theme
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
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
  onPress = () => {},
  image,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const theme = useTheme() as Theme
  const { productImgs } = useBrand()

  return (
    <CardContainer onPress={onPress} accessibilityRole="button">
      <TopRightCorner
        toggleFavorite={() => onToggleFavorite?.(id)}
        isFavorite={isFavorite}
        theme={theme}
      />
      <ContentWrapper>
        <TopSection
          productImgs={productImgs}
          dosage={dosage}
          type={type}
          unit={unit}
          rating={rating}
          reviewsCount={reviewsCount}
          id={id}
          name={name}
          theme={theme}
        />
        <BottomSection
          originalPrice={originalPrice}
          discountPercent={discountPercent}
          discountedPrice={discountedPrice}
          pricePerUnit={pricePerUnit}
          theme={theme}
        />
      </ContentWrapper>
    </CardContainer>
  )
}

const TopRightCorner = ({ toggleFavorite, isFavorite, theme }: TopRightCornerProps) => (
  <FavoriteButton
    onPress={toggleFavorite}
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
)

const TopSection = ({
  productImgs,
  theme,
  dosage,
  type,
  unit,
  rating,
  reviewsCount,
  id,
  name,
}: TopSectionProps) => (
  <View>
    <StyledImageWrapper>
      <StyledImage source={productImgs.find((p) => p.id === id)?.image} />
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
)

const BottomSection = ({
  originalPrice,
  theme,
  discountPercent,
  discountedPrice,
  pricePerUnit,
}: BottomSectionProps) => (
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
)

const CardContainer = styled.Pressable`
  width: 200px;
  border-radius: 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary.background};
  padding: 20px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 4px;
  shadow-radius: 12px;
  elevation: 4;
  margin: 16px 16px 16px 10px;
`

const FavoriteButton = styled.Pressable`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  height: 25px;
  width: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: Theme }) =>
    theme?.colors.secondary.secondary7 || '#eee'};
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

const ProductName = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.secondary.secondary1};
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

const DiscountBadge = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.interferer.interferer1};
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
`

const DiscountText = styled.Text`
  color: white;
  font-size: 14px;
`

const FinalPrice = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.secondary.secondary1};
  font-size: 18px;
`

const PricePerUnit = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.secondary.secondary3};
  font-size: 12px;
`
