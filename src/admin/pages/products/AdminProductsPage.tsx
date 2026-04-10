import { AdminProductGrid } from '@/admin/components/AdminProductGrid';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/shop/hooks/useProducts';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

export const AdminProductsPage = () => {
  const { data } = useProducts();
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          sutitle="Aquí puedes administrar tus productos"
        />

        <Link to="/admin/products/new">
          <Button>
            <PlusIcon />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <AdminProductGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 1} />
    </>
  );
};
