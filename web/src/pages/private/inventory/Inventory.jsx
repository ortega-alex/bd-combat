import { Icon } from '@/components';
import { Button, Form, Input, Modal, Table, Tooltip, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { InventoryForm } from '.';
import { httpGetInventory } from '@/services';
import { getDateFormat } from '@/utilities';

export default function Inventory() {
    const [inventory, setInventory] = useState({});
    const [inventories, setInventories] = useState([]);
    const [modals, setModals] = useState({
        form: false,
        massive: false
    });
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100
    });

    const handleOnChangeModal = (name, value = true) => setModals({ ...modals, [name]: value });

    const handleGetAll = () => {
        setLoading(true);
        httpGetInventory()
            .then(res => setInventories(res))
            .catch(err => message.error(`http get inventories: ${err.message}`))
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
                    <p className='h5'>Inventario</p>
                </div>
                <Input prefix={<Icon.Search />} placeholder='Buscar' style={{ maxWidth: 300 }} />
                <div className='flex gap-2'>
                    <Button
                        type='primary'
                        onClick={() => {
                            setInventory({});
                            handleOnChangeModal('form');
                        }}
                    >
                        Agregar
                    </Button>
                    <Button
                        type='primary'
                        className='bg-secondary text-white'
                        onClick={() => {
                            setInventory({});
                            handleOnChangeModal('massive');
                        }}
                    >
                        Carga Masiva
                    </Button>
                </div>
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
                scroll={{ x: 1200, y: window.innerHeight / 2 }}
                loading={loading}
                showSorterTooltip={false}
                rowKey='id_inventario'
                dataSource={inventories}
                columns={[
                    { title: 'No.', dataIndex: 'id_inventario' },
                    { title: 'Producto', dataIndex: 'producto' },
                    { title: 'Disponible.', dataIndex: 'disponible' },
                    { title: 'Precio Venta.', dataIndex: 'precio_venta' },
                    { title: 'Medida', dataIndex: 'medida' },
                    { title: 'Color', dataIndex: 'color' },
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
                                        setInventory(item);
                                        handleOnChangeModal('form');
                                    }}
                                />
                            </div>
                        )
                    }
                ]}
            />

            <Modal
                title={<p className='h5'>{inventory?.id_inventario ? 'Editar' : 'Agregar'}</p>}
                open={modals.form}
                centered
                footer={null}
                destroyOnClose
                maskClosable={false}
                onCancel={() => handleOnChangeModal('form', false)}
                width={700}
            >
                <InventoryForm
                    inventory={inventory}
                    onClose={() => {
                        handleGetAll();
                        handleOnChangeModal('form', false);
                    }}
                />
            </Modal>

            <Modal
                title={<p className='h5'>Carga de Inventario</p>}
                open={modals.massive}
                centered
                footer={null}
                destroyOnClose
                maskClosable={false}
                onCancel={() => handleOnChangeModal('massive', false)}
            >
                <Form>
                    <div className='flex gap-3 mt-3'>
                        <Button type='primary' icon={<Icon.Download />} htmlType='button'>
                            Formato
                        </Button>
                        <Form.Item name='file' rules={[{ required: true, message: 'El campo es obligatorio' }]} className='flex-1'>
                            <Upload
                                accept={['.xlsx']}
                                customRequest={({ onSuccess }) => onSuccess('Ok')}
                                onChange={info => (info.file.status = 'done')}
                            >
                                <Button block type='dashed' htmlType='button'>
                                    Seleccione un archivo
                                </Button>
                            </Upload>
                        </Form.Item>
                    </div>
                    <div className='text-right'>
                        <Button type='primary' htmlType='submit'>
                            Cargar
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
