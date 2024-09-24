import { Layout } from '@/Layouts';
import { AuthGuard } from '@/Guards';

export const Dashboard = () => {
  return (
    <AuthGuard>
      <Layout showSidebar>
        <div>
          <h1>Dashboard</h1>
        </div>
      </Layout>
    </AuthGuard>
  );
};
