import { Icon } from '@/components';
import { httpAddOrUpdateOrder, httpGetOrderDetailByOrderId, httpGetStock } from '@/services';
import { commaSeparateNumber, getDateFromString, nitIsValid } from '@/utilities';
import { Button, DatePicker, Divider, Form, Input, InputNumber, Modal, Select, Table, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default function OrderForm({ order, sellers, onClose }) {
    const formRef = useRef();

    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState({
        form: false,
        table: false
    });
    const [products, setProducts] = useState([]);
    const [max, setMax] = useState(0);

    const handleGetStock = () =>
        httpGetStock()
            .then(res => setProducts(res))
            .catch(err => message.error(`http get stock: ${err.message}`));

    const handleAddProduct = () => {
        const { id_producto, cantidad } = formRef.current.getFieldsValue();
        if (!id_producto || !cantidad)
            Modal.warning({
                title: 'Sin producto o cantidad seleccionada',
                content: 'Por favor seleccione un producto he ingrese la cantidad antes de agregar'
            });
        else {
            setLoading({ ...loading, table: true });
            let list = detail.find(item => item.id_producto === id_producto);
            const _lists = detail.filter(item => item.id_producto !== id_producto);
            const product = products.find(item => item.id_producto === id_producto);

            const subtotal = product?.precio_venta * cantidad;
            if (list) list = { ...list, subtotal: list.subtotal + subtotal, cantidad: list.cantidad + cantidad };
            else list = { ...product, subtotal, cantidad };

            if (list?.cantidad > product?.disponible) {
                Modal.warning({
                    title: 'disponibilidad',
                    content: 'La cantidad supera la disponibilidad del producto'
                });
            } else {
                setDetail([..._lists, list]);
                formRef.current.setFieldsValue({
                    producto: undefined,
                    disponible: undefined,
                    cantidad: undefined
                });
            }
            setLoading({ ...loading, table: false });
        }
    };

    const handleDelete = data => setDetail(detail.filter(item => item.sku !== data.sku));

    const handleSubmit = values => {
        setLoading(true);
        httpAddOrUpdateOrder({
            ...order,
            ...values,
            fecha: values.fecha.format('YYYY-MM-DD'),
            detalle: detail
        })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) onClose();
            })
            .catch(err => message.error(`http error add or update order: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGetStock();
        if (order?.id_orden)
            httpGetOrderDetailByOrderId(order?.id_orden)
                .then(res => setDetail(res))
                .catch(err => message.error(`http erro get detail by order id: ${err.message}`));
    }, []);

    return (
        <Form
            ref={formRef}
            layout='vertical'
            initialValues={{
                ...order,
                fecha: order.fecha ? getDateFromString(order.fecha, 'YYYY-MM-DD') : undefined
            }}
            onFinish={handleSubmit}
        >
            <div className='flex flex-md-column justify-between gap-3'>
                <div className='flex-1'>
                    <Divider size='small' plain orientation='center'>
                        Encabezado
                    </Divider>

                    <div className='row'>
                        <Form.Item
                            className='col-md-6'
                            label='Numero de Factura'
                            name='no_factura'
                            rules={[{ required: true, message: 'El campo es obligatorio' }]}
                        >
                            <Input placeholder='Ingrese un numero' />
                        </Form.Item>
                        <Form.Item
                            className='col-md-6'
                            label='Nit'
                            name='nit'
                            rules={[
                                {
                                    required: true,
                                    validator: async (_, value) => {
                                        let error = null;
                                        if (!value || String(value).trim() === '') error = 'El campo es obligatorio';
                                        else error = nitIsValid(value);
                                        if (error) throw new Error(error);
                                    }
                                }
                            ]}
                        >
                            <Input placeholder='Ingrese un nit' />
                        </Form.Item>
                    </div>
                    <div className='row'>
                        <Form.Item
                            className='col-md-6'
                            label='Fecha'
                            name='fecha'
                            rules={[{ required: true, message: 'El campo es obligatorio' }]}
                        >
                            <DatePicker format='DD/MM/YYYY' placeholder='DD/MM/YYYY' className='w-100' />
                        </Form.Item>
                        <Form.Item
                            className='col-md-6'
                            label='Vendedor'
                            name='id_vendedor'
                            rules={[{ required: true, message: 'El campo es obligatorio' }]}
                        >
                            <Select
                                placeholder='Seleccione una opción'
                                showSearch
                                autoClearSearchValue
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {sellers?.map(item => (
                                    <Select.Option key={item.id_empleado} value={item.id_empleado}>
                                        {item.nombre}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item label='Nombre' name='nombre' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                        <Input placeholder='Ingrese un nombre' />
                    </Form.Item>
                    <Form.Item label='Direccion' name='direccion' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                        <Input.TextArea rows={3} placeholder='Ingrese una direccion' />
                    </Form.Item>
                </div>
                <div className='flex-1'>
                    <Divider size='small' plain orientation='center'>
                        Detalle
                    </Divider>
                    <Form.Item label='Producto' name='id_producto'>
                        <Select
                            placeholder='Seleccione una opción'
                            showSearch
                            autoClearSearchValue
                            optionFilterProp='children'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={value => {
                                const producto = products.find(item => item.id_producto === value);
                                const disponible = producto?.disponible ?? 0;
                                setMax(disponible);
                                formRef.current.setFieldsValue({ disponible });
                            }}
                        >
                            {products?.map(item => (
                                <Select.Option key={item.id_producto} value={item.id_producto}>
                                    {item.detalle}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <div className='flex items-center gap-3'>
                        <Form.Item label='Disponibles' name='disponible' className='flex-1'>
                            <InputNumber className='w-100' placeholder='Disponible' min={0} disabled />
                        </Form.Item>
                        <Form.Item label='Cantidad' name='cantidad' className='flex-1'>
                            <InputNumber className='w-100' placeholder='Cantidad' min={0} max={max} />
                        </Form.Item>
                        <Button type='link' htmlType='button' icon={<Icon.Plus />} onClick={handleAddProduct} />
                    </div>
                    <Divider size='small' plain orientation='center'>
                        Listado de productos
                    </Divider>

                    <Table
                        size='small'
                        scrollToFirstRowOnChange={true}
                        loading={loading.table}
                        showSorterTooltip={false}
                        rowKey='id_producto'
                        dataSource={detail}
                        pagination={false}
                        columns={[
                            { title: 'Detalle', dataIndex: 'detalle', ellipsis: true, width: 250 },
                            { title: 'Cantidad', dataIndex: 'cantidad', align: 'center' },
                            {
                                title: 'Precio',
                                dataIndex: 'precio_venta',
                                align: 'center',
                                render: value => <span>{commaSeparateNumber(value)}</span>
                            },
                            {
                                title: 'Subtotal',
                                dataIndex: 'subtotal',
                                align: 'right',
                                render: value => <span>{commaSeparateNumber(value)}</span>
                            },
                            {
                                title: 'Opcion',
                                align: 'center',
                                render: (_, data) => (
                                    <Button type='link' onClick={() => handleDelete(data)} icon={<Icon.TrashAlt />} danger size='small' />
                                )
                            }
                        ]}
                        summary={pageData => {
                            let total = 0;
                            pageData.forEach(({ subtotal }) => {
                                if (subtotal) total += parseFloat(subtotal);
                            });
                            return (
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell>
                                            <strong>Total:</strong>
                                        </Table.Summary.Cell>
                                        {[1, 2].map((item, i) => (
                                            <Table.Summary.Cell key={i} index={item} />
                                        ))}
                                        <Table.Summary.Cell index={3} align='right'>
                                            <strong>{commaSeparateNumber(total)}</strong>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            );
                        }}
                    />
                </div>
            </div>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading.form} disabled={loading.form || detail.length <= 0}>
                    Guardar
                </Button>
            </div>
        </Form>
    );
}
