import { CommonLayout } from '@/Layouts';
import { AppRoutes } from '@/Routes/AppRoutes.tsx';
import { Box } from '@mantine/core';

function App() {
  return (
    <CommonLayout>
      <Box mt={70}>
        <AppRoutes />
      </Box>
    </CommonLayout>
  );
}

export default App;
