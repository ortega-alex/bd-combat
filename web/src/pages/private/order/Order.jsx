import { Icon } from '@/components';
import { getDateFormat } from '@/utilities';
import { Button, Input, Modal, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { OrderForm } from '.';

const data = [
    {
        sku: '1212323',
        nombre: 'producto x',
        resumen: 'producto x | mediano | negro',
        medida: 'grande',
        color: 'negro',
        precio: 100
    },
    {
        sku: '3453454',
        nombre: 'producto y',
        resumen: 'producto y | mediano | azul',
        medida: 'grande',
        color: 'azul',
        precio: 120
    }
];

export default function Order() {
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState({});
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100
    });
    const [products, setProducts] = useState(data);

    const handleGetAll = () => {};

    useEffect(() => {
        handleGetAll();
        setProducts(data);
    }, []);

    return (
        <div className='container h-100 flex flex-column'>
            <div className='flex justify-between gap-3 mb-3'>
                <div className='flex flex-row'>
                    <Tooltip title='Actualizar'>
                        <Button type='link' className='text-secondary' icon={<Icon.Reload />} onClick={handleGetAll} />
                    </Tooltip>
                    <p className='h5'>Ordenes</p>
                </div>
                <Input prefix={<Icon.Search />} placeholder='Buscar' style={{ maxWidth: 300 }} />
                <Button
                    type='primary'
                    onClick={() => {
                        setOrder({});
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
                rowKey='id_orden'
                dataSource={orders}
                columns={[
                    { title: 'No.', dataIndex: 'id_inventario' },
                    { title: 'Productos', dataIndex: 'productos' },
                    { title: 'Total.', dataIndex: 'total' },
                    { title: 'Cliente', dataIndex: 'cliente' },
                    { title: 'Direccion', dataIndex: 'direccion' },
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
                                        setUser(item);
                                        setModal(true);
                                    }}
                                />
                            </div>
                        )
                    }
                ]}
            />

            <Modal
                title='Agregar orden'
                open={modal}
                centered
                onCancel={() => setModal(false)}
                width={1200}
                footer={false}
                destroyOnClose={true}
            >
                <OrderForm order={order} products={products} />
            </Modal>
        </div>
    );
}
