import { Icon } from '@/components';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';

export default function InventoryForm() {
    const [products, setProducts] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [colors, setColors] = useState([]);

    return (
        <Form layout='vertical'>
            <div className='flex flex-row justify-between gap-3'>
                <div className='flex items-center gap-1 w-50'>
                    <Form.Item
                        className='flex-1'
                        label='Producto'
                        name='id_producto'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <Select
                            placeholder='Seleccione una opción'
                            showSearch
                            autoClearSearchValue
                            optionFilterProp='children'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {products.map(item => (
                                <Select.Option key={item.id_producto} value={item.id_producto}>
                                    {item.producto}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button type='primary' icon={<Icon.Plus />} />
                </div>
                <Form.Item
                    className='w-50'
                    label='Cantidad'
                    name='cantidad'
                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                >
                    <InputNumber placeholder='Cantidad de producto' className='w-100' />
                </Form.Item>
            </div>
            <div className='flex flex-row justify-between gap-3'>
                <div className='flex items-center gap-1 w-50'>
                    <Form.Item
                        className='flex-1'
                        label='Medida'
                        name='id_medida'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <Select
                            placeholder='Seleccione una opción'
                            showSearch
                            autoClearSearchValue
                            optionFilterProp='children'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {measures.map(item => (
                                <Select.Option key={item.id_medida} value={item.id_medida}>
                                    {item.medida}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button type='primary' icon={<Icon.Plus />} />
                </div>
                <div className='flex items-center gap-1 w-50'>
                    <Form.Item
                        className='flex-1'
                        label='Color'
                        name='id_color'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <Select
                            placeholder='Seleccione una opción'
                            showSearch
                            autoClearSearchValue
                            optionFilterProp='children'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {colors.map(item => (
                                <Select.Option key={item.id_color} value={item.id_color}>
                                    {item.color}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button type='primary' icon={<Icon.Plus />} />
                </div>
            </div>
            <div className='flex flex-row justify-between gap-3'>
                <Form.Item
                    className='w-50'
                    label='Precio Venta'
                    name='precio_venta'
                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                >
                    <InputNumber placeholder='Imgrese un precio' className='w-100' />
                </Form.Item>
                <Form.Item
                    className='w-50'
                    label='Precio Compra'
                    name='precio_compra'
                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                >
                    <InputNumber placeholder='Imgrese un precio' className='w-100' />
                </Form.Item>
            </div>
            <Form.Item label='Descripción' name='descripcion' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input.TextArea rows={3} placeholder='Descripcion del producto' />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit'>
                    Guardar
                </Button>
            </div>
        </Form>
    );
}
