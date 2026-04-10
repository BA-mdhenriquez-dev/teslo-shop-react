import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router';

import { getProductsAction } from '../actions/get-products.action';

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();

  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const sizes = searchParams.get('sizes') || undefined;
  const limitPrice = searchParams.get('price') || 'any';
  const query = searchParams.get('query') || undefined;

  const [minPrice, maxPrice] =
    limitPrice === 'any' ? [undefined, undefined] : limitPrice.split('-');

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: [
      'products',
      { offset, limit, sizes, gender, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        sizes,
        gender,
        minPrice,
        maxPrice,
        query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
