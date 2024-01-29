import { Icon } from '@/components';
import { Button, DatePicker, Divider, Form, Input, InputNumber, Select, Table } from 'antd';
import { useRef, useState } from 'react';

export default function OrderForm({ products, order }) {
    const formRef = useRef();

    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState({
        form: false,
        table: false
    });

    const handleAddProduct = () => {
        const { producto, cantidad } = formRef.current.getFieldsValue();
        if (!producto || !cantidad)
            Modal.warning({
                title: 'Sin producto o cantidad seleccionada',
                content: 'Por favor seleccione un producto he ingrese la cantidad antes de agregar'
            });
        else {
            setLoading({ ...loading, table: true });
            let list = lists.find(item => item.sku === producto);
            const _lists = lists.filter(item => item.sku !== producto);
            const product = products.find(item => item.sku === producto);

            const subtotal = product?.precio * cantidad;
            if (list) {
                list.subtotal += subtotal;
                list.cantidad += cantidad;
            } else list = { ...product, subtotal, cantidad };

            setLists([..._lists, list]);

            formRef.current.setFieldsValue({
                producto: undefined,
                cantidad: undefined
            });
            setLoading({ ...loading, table: false });
        }
    };

    const handleDelete = data => setLists(lists.filter(item => item.sku !== data.sku));

    return (
        <Form ref={formRef} layout='vertical' initialValues={order}>
            <div className='flex flex-md-column justify-between gap-3'>
                <div className='flex-1'>
                    <Divider size='small' plain orientation='center'>
                        Encabezado
                    </Divider>

                    <div className='row'>
                        <Form.Item
                            className='col-md-6'
                            label='Numero de Factura'
                            name='numero_factura'
                            rules={[{ required: true, message: 'El campo es obligatorio' }]}
                        >
                            <Input placeholder='Ingrese un numero' />
                        </Form.Item>
                        <Form.Item
                            className='col-md-6'
                            label='Nit'
                            name='nit'
                            rules={[{ required: true, message: 'El campo es obligatorio' }]}
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
                            name='vendedor'
                            rules={[{ required: true, message: 'El campo es obligatorio' }]}
                        >
                            <Select
                                placeholder='Seleccione una opción'
                                showSearch
                                autoClearSearchValue
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            />
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
                    <div className='row flex items-center'>
                        <Form.Item className='col-7' label='Producto' name='producto'>
                            <Select
                                placeholder='Seleccione una opción'
                                showSearch
                                autoClearSearchValue
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {products?.map(item => (
                                    <Select.Option key={item.sku} value={item.sku}>
                                        {item.resumen}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item className='col-3' label='Cantidad' name='cantidad'>
                            <InputNumber className='w-100' placeholder='Cantidad' min={0} />
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
                        rowKey='sku'
                        dataSource={lists}
                        pagination={false}
                        columns={[
                            { title: 'Detalle', dataIndex: 'resumen', ellipsis: true, width: 250 },
                            { title: 'Cantidad', dataIndex: 'cantidad' },
                            { title: 'Precio', dataIndex: 'precio' },
                            { title: 'Subtotal', dataIndex: 'subtotal' },
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
                                        <Table.Summary.Cell index={3}>
                                            <strong>{total}</strong>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            );
                        }}
                    />
                </div>
            </div>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading.form} disabled={loading.form || lists.length <= 0}>
                    Guardar
                </Button>
            </div>
        </Form>
    );
}
