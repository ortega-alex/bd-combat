import { CustomMaintenance, Icon } from '@/components';
import { httpAddOrUpdateInventory, httpGetColor, httpGetMeasure, httpGetProducts } from '@/services';
import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ColorFrom, MeasureFrom, ProducFrom } from '../maintenance';
import { useSelector } from 'react-redux';

export default function InventoryForm({ inventory, onClose }) {
    const sessionState = useSelector(store => store.session);
    const initialCustomMaintenance = {
        title: null,
        open: false,
        show: false,
        item: {},
        children: null,
        list: []
    };
    const formRef = useRef();

    const [products, setProducts] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [colors, setColors] = useState([]);
    const [customMaintenance, setCustomMaintenance] = useState(initialCustomMaintenance);
    const [loading, setLoading] = useState(false);

    const handleChangeCustomer = (data = {}, val = false) => {
        let open = true;
        if (val === true) {
            switch (customMaintenance.children) {
                case 1:
                    handleGetProducts();
                    break;
                case 2:
                    handleGetMeasures();
                    break;
                case 3:
                    handleGetColor();
                    break;
                default:
                    break;
            }
            open = false;
        }
        setCustomMaintenance({ ...customMaintenance, ...data, show: false, open });
    };

    const handleGetProducts = () =>
        httpGetProducts()
            .then(res => setProducts(res))
            .catch(err => message.error(`http error get products: ${err.message}`));

    const handleGetMeasures = () =>
        httpGetMeasure()
            .then(res => setMeasures(res))
            .catch(err => message.error(`http error get products: ${err.message}`));

    const handleGetColor = () =>
        httpGetColor()
            .then(res => setColors(res))
            .catch(err => message.error(`http error get color: ${err.message}`));

    const handleSubmit = values => {
        setLoading(true);
        httpAddOrUpdateInventory({
            ...inventory,
            ...values,
            id_usuario: sessionState.id_sesion,
            estado: '1'
        })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) onClose();
            })
            .catch(err => message.error(`http error add or update inventor: ${err.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGetProducts();
        handleGetMeasures();
        handleGetColor();
    }, []);

    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit} initialValues={inventory} ref={formRef}>
                <div className='flex items-center gap-1 w-100'>
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
                            {products.map(item => {
                                if (item.estado === '1')
                                    return (
                                        <Select.Option key={item.id_producto} value={item.id_producto}>
                                            {item.producto}
                                        </Select.Option>
                                    );
                                return null;
                            })}
                        </Select>
                    </Form.Item>
                    <Button
                        type='primary'
                        icon={<Icon.Plus />}
                        onClick={() =>
                            handleChangeCustomer({
                                title: 'Productos',
                                list: products.map(item => ({
                                    ...item,
                                    name: item.producto
                                })),
                                children: 1
                            })
                        }
                    />
                </div>
                <div className='flex flex-row justify-between gap-3'>
                    <Form.Item
                        className='w-50'
                        label='Cantidad'
                        name='cantidad'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <InputNumber
                            min={1}
                            placeholder='Cantidad de producto'
                            className='w-100'
                            onBlur={env => formRef.current.setFieldsValue({ disponible: env.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        className='w-50'
                        label='Disponible'
                        name='disponible'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <InputNumber min={1} placeholder='Cantidad de producto' className='w-100' />
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
                                style={{ maxWidth: 280 }}
                            >
                                {measures.map(item => {
                                    if (item.estado === '1')
                                        return (
                                            <Select.Option key={item.id_medida} value={item.id_medida}>
                                                {item.medida}
                                            </Select.Option>
                                        );
                                    return null;
                                })}
                            </Select>
                        </Form.Item>
                        <Button
                            type='primary'
                            icon={<Icon.Plus />}
                            onClick={() =>
                                handleChangeCustomer({
                                    title: 'Medidas',
                                    list: measures.map(item => ({
                                        ...item,
                                        name: item.medida
                                    })),
                                    children: 2
                                })
                            }
                        />
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
                                style={{ maxWidth: 280 }}
                            >
                                {colors.map(item => {
                                    if (item.estado === '1')
                                        return (
                                            <Select.Option key={item.id_color} value={item.id_color}>
                                                {item.color}
                                            </Select.Option>
                                        );
                                    return null;
                                })}
                            </Select>
                        </Form.Item>
                        <Button
                            type='primary'
                            icon={<Icon.Plus />}
                            onClick={() =>
                                handleChangeCustomer({
                                    title: 'Colores',
                                    list: colors.map(item => ({
                                        ...item,
                                        name: item.color
                                    })),
                                    children: 3
                                })
                            }
                        />
                    </div>
                </div>
                <div className='flex flex-row justify-between gap-3'>
                    <Form.Item
                        className='w-50'
                        label='Precio Venta'
                        name='precio_venta'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <InputNumber
                            min={0}
                            placeholder='Imgrese un precio'
                            className='w-100'
                            formatter={value => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/Q\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item
                        className='w-50'
                        label='Precio Compra'
                        name='precio_compra'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <InputNumber
                            min={0}
                            placeholder='Imgrese un precio'
                            className='w-100'
                            formatter={value => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/Q\s?|(,*)/g, '')}
                        />
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

            <Modal
                title={<p className='h5'>{customMaintenance.title}</p>}
                open={customMaintenance.open}
                centered
                footer={null}
                destroyOnClose
                maskClosable={false}
                onCancel={() => setCustomMaintenance(initialCustomMaintenance)}
                width={600}
            >
                <CustomMaintenance
                    list={customMaintenance.list}
                    showChildren={customMaintenance.show}
                    onAdd={() => setCustomMaintenance({ ...customMaintenance, show: true, item: {} })}
                    onEdit={item => setCustomMaintenance({ ...customMaintenance, show: true, item })}
                >
                    {customMaintenance.children === 1 && (
                        <ProducFrom product={customMaintenance.item} onClose={val => handleChangeCustomer({}, val)} hidden={false} />
                    )}
                    {customMaintenance.children === 2 && (
                        <MeasureFrom measure={customMaintenance.item} onClose={val => handleChangeCustomer({}, val)} hidden={false} />
                    )}
                    {customMaintenance.children === 3 && (
                        <ColorFrom color={customMaintenance.item} onClose={val => handleChangeCustomer({}, val)} hidden={false} />
                    )}
                </CustomMaintenance>
            </Modal>
        </>
    );
}
