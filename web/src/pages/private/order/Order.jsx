import { Icon } from '@/components';
import { httpGetEmployeesByPositionId, httpGetOrders } from '@/services';
import { commaSeparateNumber, getDateFormat } from '@/utilities';
import { Button, Input, Modal, Table, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { OrderForm } from '.';

export default function Order() {
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState({});
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100
    });
    const [sellers, setSellers] = useState([]);

    const handleGetAll = () => {
        setLoading(true);
        httpGetOrders()
            .then(res => setOrders(res))
            .catch(err => message.error(`http error get orders: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGetAll();
        httpGetEmployeesByPositionId(1)
            .then(res => setSellers(res))
            .catch(err => message.error(`http get sellers: ${err.message}`));
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
                    { title: 'No.', dataIndex: 'id_orden' },
                    { title: 'Numero de factura', dataIndex: 'no_factura' },
                    { title: 'Total.', dataIndex: 'total', align: 'right', render: value => <span>{commaSeparateNumber(value)}</span> },
                    { title: 'Vendedor', dataIndex: 'vendedor' },
                    { title: 'Cliente', dataIndex: 'nombre' },
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
                                        setOrder(item);
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
                <OrderForm
                    order={order}
                    sellers={sellers}
                    onClose={() => {
                        handleGetAll();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
}
