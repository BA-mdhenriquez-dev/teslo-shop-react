import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomJumbotron } from '@/shop/components/CustomJumbotron';
import { ProductsGrid } from '@/shop/components/ProductsGrid';
import { useProducts } from '@/shop/hooks/useProducts';
import { useParams } from 'react-router';

export const GenderPage = () => {
  const { gender } = useParams();
  const { data } = useProducts();

  console.log({ pages: data?.pages });

  const genderLable =
    gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niños';
  return (
    <>
      <div>
        <CustomJumbotron title={`Productos para ${genderLable}`} />
        <ProductsGrid products={data?.products || []} />

        <CustomPagination totalPages={data?.pages || 0} />
      </div>
    </>
  );
};
