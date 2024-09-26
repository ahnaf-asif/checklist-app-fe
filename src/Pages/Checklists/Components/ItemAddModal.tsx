import { Box, Button, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';

export const ItemAddModal = ({ checklist, closeModal, getIndividualData }: any) => {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const itemAdd = useForm({
    initialValues: {
      name: '',
      max_steps: 0,
      category_id: 0
    }
  });

  const addItem = async (value: any) => {
    try {
      await axios.post('/items', { ...value, checklist_id: checklist.id, display_order: 1 });
      await getIndividualData();
      notifications.show({
        title: 'Success',
        message: 'Item added successfully',
        color: 'green'
      });
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const findData = () => {
    // find data from category
    const data = [];
    for (const cat of checklist.categories) {
      data.push({ value: cat.id.toString(), label: cat.name });
    }
    setCategories(data);
  };

  useEffect(() => {
    findData();
  }, [checklist]);

  return (
    <Box>
      <form onSubmit={itemAdd.onSubmit((value) => addItem(value))}>
        <TextInput
          required
          label="Item Name"
          placeholder="Enter item name"
          {...itemAdd.getInputProps('name')}
        />
        <NumberInput
          required
          label="Maximum Steps"
          placeholder="Enter maximum steps"
          {...itemAdd.getInputProps('max_steps')}
        />
        <Select
          required
          label="Category"
          placeholder="Select category"
          data={categories}
          {...itemAdd.getInputProps('category_id')}
        ></Select>
        <Button mt={10} type="submit" color="blue">
          Add Item
        </Button>
      </form>
    </Box>
  );
};
