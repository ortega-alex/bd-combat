import { Icon } from '@/components';
import { Button, Modal, Table, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { PositionForm } from '.';
import { httpGetPositions } from '@/services';
import { getDateFormat } from '@/utilities';

export default function Position() {
    const [positions, setPositions] = useState([]);
    const [position, setPosition] = useState({});
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100
    });

    const handleGetAll = () => {
        setLoading(true);
        httpGetPositions()
            .then(res => setPositions(res))
            .catch(err => message.error(`http error get position: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGetAll();
    }, []);

    return (
        <div className='container h-100 flex flex-column'>
            <div className='flex justify-between gap-3 mb-3'>
                <div className='flex flex-row'>
                    <Tooltip title='Actualizar'>
                        <Button type='link' className='text-secondary' icon={<Icon.Reload />} onClick={handleGetAll} />
                    </Tooltip>
                    <p className='h5'>Puestos</p>
                </div>
                <Button
                    type='primary'
                    onClick={() => {
                        setPosition({});
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
                rowKey='id_puesto'
                dataSource={positions}
                columns={[
                    { title: 'No.', dataIndex: 'id_puesto' },
                    { title: 'Puesto.', dataIndex: 'puesto' },
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
                                        setPosition(item);
                                        setModal(true);
                                    }}
                                />
                            </div>
                        )
                    }
                ]}
            />

            <Modal
                title={<p className='h5'>{position?.id_puesto ? 'Editar' : 'Agregar'} Puesto</p>}
                open={modal}
                centered
                footer={null}
                destroyOnClose
                maskClosable={false}
                onCancel={() => setModal(false)}
            >
                <PositionForm
                    position={position}
                    onClose={() => {
                        handleGetAll();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
}
