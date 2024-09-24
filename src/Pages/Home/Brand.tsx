import { Box, Title, Text, Button, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Brand = () => {
  return (
    <Box mt={30}>
      <Flex justify="space-between" align="center">
        <Box>
          <Title order={1}> CheckNest </Title>
          <Text size="sm" c="gray" style={{ letterSpacing: '1.1px' }}>
            Solution to your Procrastination!
          </Text>
          <Box w="450px">
            <Text mt={30} style={{ lineHeight: '30px', letterSpacing: '1.1px' }}>
              Do you want to be productive but stuck in an endless loop of procrastination?
              CheckNest can help you overcome it.
            </Text>
            <Button component={Link} to="/dashboard" mt={30}>
              Go To Your Dashboard
            </Button>
          </Box>
        </Box>
        <Box>
          <img src="/checklist-brand-4.webp" alt="checklist" height="450px" />
        </Box>
      </Flex>
    </Box>
  );
};
