import { Box } from '@mantine/core';

import { Layout } from '@/Layouts';
import { Brand } from './Brand.tsx';

const Home = () => {
  return (
    // <AuthGuard>
    <Layout>
      <Box px="5rem">
        <Brand />
      </Box>
    </Layout>
    // </AuthGuard>
  );
};

export default Home;
