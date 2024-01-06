import { Button } from 'antd';
import { Icon } from '.';

export default function CustomMaintenance({ children, list, showChildren, onAdd, onEdit }) {
    return (
        <div className='flex flex-row gap-3'>
            <ul className='p-0 w-50 mvh-65 overflow-y'>
                {list.map((item, i) => (
                    <li
                        key={i}
                        className={`flex justify-between items-center mt-1 pl-2 ${item.estado === '1' ? 'text-secondary' : 'text-danger'}`}
                        onClick={() => onEdit(item)}
                    >
                        <span>
                            <Icon.Edit />
                            {item.name}
                        </span>
                    </li>
                ))}
            </ul>

            <div className='flex-1 flex h-100 justify-center items-center'>
                {!showChildren ? (
                    <Button type='primary' htmlType='button' onClick={onAdd}>
                        Agregar Nuevo
                    </Button>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}
