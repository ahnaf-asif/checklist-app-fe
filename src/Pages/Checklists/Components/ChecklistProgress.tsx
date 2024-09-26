import { Box, Slider, Table } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks.ts';
import { useEffect } from 'react';
import { ProgressSlider } from '@/Pages/Checklists/Components/ProgressSlider.tsx';

const marks = [
  { value: 0, label: '0%' },
  { value: 20, label: '20%' },
  { value: 40, label: '40%' },
  { value: 60, label: '60%' },
  { value: 80, label: '80%' },
  { value: 100, label: '100%' }
];

const ChecklistProgress = ({ checklist }: any) => {
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      console.log('inside progress: ', checklist);
    }
  }, [auth]);

  return (
    <Box>
      <Table verticalSpacing="xl" withRowBorders withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Task</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th style={{ width: '700px' }}>Progress</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {(checklist?.items ? checklist.items : ([] as any[])).map((item: any) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.category_name}</Table.Td>
              <Table.Td>
                <ProgressSlider item={item} />
              </Table.Td>
              <Table.Td>
                {item.completed_steps == 0
                  ? 'Not Started'
                  : item.completed_steps === item.max_steps
                  ? 'Completed'
                  : 'Ongoing'}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default ChecklistProgress;
