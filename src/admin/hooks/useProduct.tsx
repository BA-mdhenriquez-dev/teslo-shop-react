import type { Product } from '@/interfaces/product.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUpdateProductAction } from '../actions/create-update-product.action';
import { getProductByIdAction } from '../components/actions/get-product-by-id.action';

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidar el chaché
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({
        queryKey: ['product', { id: product.id }],
      });

      //Actualizar queryData
      queryClient.setQueryData(['products', { id: product.id }], product);
      queryClient.setQueryData(['product', { id: product.id }], product);
    },
  });

  // TODO: por eliminar
  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };
  return {
    ...query,
    mutation,
  };
};
