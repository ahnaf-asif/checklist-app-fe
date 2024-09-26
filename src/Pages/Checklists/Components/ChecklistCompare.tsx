interface ChecklistCompareProps {
  checklist: Record<string, any>;
}

const ChecklistCompare: React.FC<ChecklistCompareProps> = ({ checklist }) => {
  return <div>Compare Content for {checklist.name}</div>;
};

export default ChecklistCompare;
