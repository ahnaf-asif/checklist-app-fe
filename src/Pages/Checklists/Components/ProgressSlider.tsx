import { Box, Slider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';
import { useAppSelector } from '@/Redux/hooks.ts';

export const ProgressSlider = ({ item }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const [marks, setMarks] = useState<any[]>([]);
  const [value, setValue] = useState(item?.completed_steps * 10);

  useEffect(() => {
    const marksArray = [];
    for (let i = 0; i <= Number(item.max_steps); i++) {
      marksArray.push({ value: i * 10, label: `${i * 10}%` });
    }
    setMarks(marksArray);
  }, [item]);

  useEffect(() => {
    console.log('marks: ', marks);
  }, [marks]);

  const updateProgress = async (val: number) => {
    console.log(val);
    try {
      setValue(val);
      if (val % 10 === 0) {
        await axios.put(`/items/change_progress/${auth.user?.id}/item/${item.id}`, {
          completed_steps: val / 10
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Slider
        mx={40}
        min={0}
        onChange={(val) => updateProgress(val)}
        max={item?.max_steps * 10}
        value={value}
        step={10}
        marks={marks}
      />
    </Box>
  );
};
