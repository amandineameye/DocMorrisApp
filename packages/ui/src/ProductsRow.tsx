import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { ProductCard } from './ProductCard'
import { Product } from '@repo/stores/products'
import { useTheme } from 'styled-components/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Theme } from '@repo/theme'

export type ProductsRowProps = {
  title: string
  products: Product[]
  onToggleFavorite?: (id: number) => void // ✅ Add this line
}

export const ProductsRow = ({ title, products, onToggleFavorite }: ProductsRowProps) => {
  const theme = useTheme() as Theme

  return (
    <Section>
      <RowHeader>
        <RowTitle>{title}</RowTitle>

        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={theme.colors.secondary.secondary1}
        />
      </RowHeader>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Products>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onToggleFavorite={onToggleFavorite} // ✅ Pass it down
            />
          ))}
        </Products>
      </ScrollView>
    </Section>
  )
}

// Styled Components
const Section = styled.View`
  margin-top: 20px;
  height: 350px;
`

const RowHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`

export const RowTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.caption['1'].regular.fontFamily};
  color: ${({ theme }) => theme?.colors.secondary.secondary1};
`

const Products = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
