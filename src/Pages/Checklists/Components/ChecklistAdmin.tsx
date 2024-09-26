interface ChecklistAdminProps {
    checklist: Record<string, any>;
}

const ChecklistAdmin: React.FC<ChecklistAdminProps> = ({ checklist }) => {
    return <div>Admin Content for {checklist.name}</div>;
};

export default ChecklistAdmin;
