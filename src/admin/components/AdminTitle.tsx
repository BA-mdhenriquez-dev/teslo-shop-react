interface Props {
  title: string;
  sutitle: string;
}
export const AdminTitle = ({ title, sutitle }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{sutitle}</p>
    </div>
  );
};
