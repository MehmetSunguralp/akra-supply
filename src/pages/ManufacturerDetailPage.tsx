import { useParams } from 'react-router-dom';

export const ManufacturerDetailPage = () => {
  const params = useParams();
  return <div>ManufacturerDetailPage for id: {params.id}</div>;
};
