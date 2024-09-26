import { Box, Button, Flex, Modal, Table, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { ItemAddModal } from '@/Pages/Checklists/Components/ItemAddModal.tsx';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';

const ChecklistEdit = ({ checklist, getIndividualData }: any) => {
  const [checklistEditModal, checklistEditModalActions] = useDisclosure();
  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`/items/${id}`);
      await getIndividualData();
      notifications.show({
        title: 'Success',
        message: 'Item deleted successfully',
        color: 'green'
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box mt={20}>
      <Flex justify="space-between" align="center">
        <Text fw={500}>Checklist Items</Text>
        <Button onClick={checklistEditModalActions.open} leftSection={<IconPlus />}>
          Add Item
        </Button>
      </Flex>

      <Box mt={20}>
        <Table withTableBorder withRowBorders withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Task Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Maximum Steps</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {(checklist?.items ? checklist.items : ([] as any[])).map((item: any) => (
              <Table.Tr key={item.id}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.category_name}</Table.Td>
                <Table.Td>{item.max_steps}</Table.Td>
                <Table.Td>
                  <Button onClick={() => deleteItem(item.id)} size="xs" variant="light" color="red">
                    Delete
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
      <Modal opened={checklistEditModal} onClose={checklistEditModalActions.close}>
        <ItemAddModal
          getIndividualData={getIndividualData}
          closeModal={checklistEditModalActions.close}
          checklist={checklist}
        />
      </Modal>
    </Box>
  );
};

export default ChecklistEdit;
