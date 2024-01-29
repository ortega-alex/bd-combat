import { httpAddOrUpdatePosition } from '@/services';
import { Button, Form, Input, Switch, message } from 'antd';
import React, { useState } from 'react';

export default function PositionForm({ position, onClose }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = values => {
        setLoading(true);
        httpAddOrUpdatePosition({
            ...position,
            ...values,
            estado: values.estado ? 1 : 0
        })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) onClose();
            })
            .catch(err => message.error(`http error add or update position: ${err.message}`))
            .finally(() => setLoading(false));
    };

    return (
        <Form
            layout='vertical'
            initialValues={{
                ...position,
                estado: !position?.estado || position?.estado === '1' ? true : false
            }}
            onFinish={handleSubmit}
        >
            <Form.Item label='Nombre' name='puesto' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese un nombre' />
            </Form.Item>
            <Form.Item name='estado' label='Estado' valuePropName='checked'>
                <Switch defaultChecked checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>
            <div className='text-right'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Guardar
                </Button>
            </div>
        </Form>
    );
}
