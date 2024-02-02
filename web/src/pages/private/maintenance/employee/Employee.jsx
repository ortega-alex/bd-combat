import { Icon } from '@/components';
import { Button, Modal, Table, Tooltip, message } from 'antd';
import EmployeeForm from './EmployeeForm';
import { useEffect, useState } from 'react';
import { httpGetAllEmployees, httpGetPositions } from '@/services';
import { getDateFormat } from '@/utilities';

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100
    });
    const [positions, setPositions] = useState([]);

    const handleGetAll = async () => {
        try {
            setLoading(true);
            const res = await httpGetAllEmployees();
            setEmployees(res);
        } catch (error) {
            message.error(`http erro get all employees: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetAll();
        httpGetPositions()
            .then(res => setPositions(res?.filter(item => item.estado === '1')) ?? [])
            .catch(err => message.error(`http error get positions: ${err.message}`));
    }, []);

    return (
        <div className='container h-100 flex flex-column'>
            <div className='flex justify-between gap-3 mb-3'>
                <div className='flex flex-row'>
                    <Tooltip title='Actualizar'>
                        <Button type='link' className='text-secondary' icon={<Icon.Reload />} onClick={handleGetAll} />
                    </Tooltip>
                    <p className='h5'>Empleados</p>
                </div>
                <Button
                    type='primary'
                    onClick={() => {
                        setEmployee({});
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>
            <Table
                size='small'
                pagination={{
                    position: ['none', 'bottomRight'],
                    defaultCurrent: pagination.current,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: [50, 100, 250, 500],
                    onShowSizeChange: (current, pageSize) => setPagination({ current, pageSize })
                }}
                scrollToFirstRowOnChange={true}
                loading={loading}
                showSorterTooltip={false}
                rowKey='id_empleado'
                dataSource={employees}
                columns={[
                    { title: 'No.', dataIndex: 'id_empleado', key: 'id_empleado', sorter: true, width: 80 },
                    { title: 'Puesto.', dataIndex: 'puesto', sorter: true },
                    { title: 'Nombre.', dataIndex: 'nombre', sorter: true, ellipsis: true },
                    { title: 'Estado.', dataIndex: '_estado' },
                    { title: 'Fecha', dataIndex: 'fecha_creacion', render: value => <span>{getDateFormat(value, 'DD/MM/YYYY')}</span> },
                    {
                        title: 'Opciones',
                        render: (_, item) => (
                            <div className='text-center'>
                                <Button
                                    htmlType='button'
                                    icon={<Icon.Edit />}
                                    type='primary'
                                    size='small'
                                    onClick={() => {
                                        setEmployee(item);
                                        setModal(true);
                                    }}
                                />
                            </div>
                        )
                    }
                ]}
            />

            <Modal
                title={<p className='h5'>{employee?.id_empleado ? 'Editar' : 'Agregar'} Empleado</p>}
                open={modal}
                centered
                footer={null}
                destroyOnClose
                maskClosable={false}
                onCancel={() => setModal(false)}
                width={800}
            >
                <EmployeeForm
                    employee={employee}
                    positions={positions}
                    onClose={() => {
                        handleGetAll();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
}
