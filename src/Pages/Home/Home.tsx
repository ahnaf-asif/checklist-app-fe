import { Box } from '@mantine/core';
import { Layout } from '@/Layouts';

export const Home = () => {
  return (
    // <AuthGuard>
    <Layout>
      <Box>
        <Box>This is home</Box>
      </Box>
    </Layout>
    // </AuthGuard>
  );
};
