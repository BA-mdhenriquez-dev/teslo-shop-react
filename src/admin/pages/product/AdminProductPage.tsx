import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, isError, data: product, mutation } = useProduct(id || '');

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const message =
    id === 'new'
      ? 'Producto creado correctamente'
      : 'Producto actualizado correctamente';

  const handleSubmit = async (
    productLike: Partial<Product> & { files?: File[] },
  ) => {
    console.log({ productLike });

    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success(message, {
          position: 'top-right',
        });
        navigate(`/admin/products/${id === 'new' ? '' : data.id}`);
      },
      onError(error) {
        console.log(error);
        toast.error('Error al actualizar el producto');
      },
    });
  };

  if (isError) return <Navigate to="/admin/products" />;

  if (isLoading) return <CustomFullScreenLoading />;

  if (!product) return <Navigate to="/admin/products" />;

  return (
    <ProductForm
      title={title}
      subtitle={subtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  );
};
