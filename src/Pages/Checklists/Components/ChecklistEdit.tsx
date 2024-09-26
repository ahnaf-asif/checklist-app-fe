interface ChecklistEditProps {
    checklist: Record<string, any>;
}

const ChecklistEdit: React.FC<ChecklistEditProps> = ({ checklist }) => {
    return <div>Edit Content for {checklist.name}</div>;
};

export default ChecklistEdit;
