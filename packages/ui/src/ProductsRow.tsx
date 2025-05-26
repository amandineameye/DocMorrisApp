import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { ProductCard } from './ProductCard';
import { ThemeType } from '@repo/theme/themes/types';
import { Product } from '@repo/stores/products/types';
import { useTheme } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useBrand } from '@repo/theme/context';

export type ProductsRowProps = {
  title: string;
  products: Product[];
};

export const ProductsRow = ({ title, products }: ProductsRowProps) => {
  const theme = useTheme() as ThemeType;

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
              productId={product.id}
              name={product.name}
              dosage={product.dosage}
              unit={product.unit}
              type={product.type}
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
              discountPercent={product.discountPercent}
              pricePerUnit={product.pricePerUnit}
              isFavorite={product.isFavorite}
              onPress={() => {}}
            />
          ))}
        </Products>
      </ScrollView>
    </Section>
  );
};

// Styled Components
const Section = styled.View`
  margin-top: 20px;
  height: 350px;
`;

const RowHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`;

export const RowTitle = styled.Text<{ theme?: ThemeType }>`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Poppins';
  color: ${({ theme }) => theme?.colors.secondary.secondary1};
`;

const Products = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
