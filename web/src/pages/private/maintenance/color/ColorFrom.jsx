import { httpAddOrUpdateColor } from '@/services';
import { Button, Form, Input, Switch, message } from 'antd';
import { useState } from 'react';

export default function ColorFrom({ color, hidden, onClose }) {
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = values => {
        setLoading(true);
        httpAddOrUpdateColor({
            ...color,
            ...values,
            estado: values.estado ? '1' : '0'
        })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) onClose(true);
            })
            .catch(err => message.error(`http error add or update measure: ${err.message}`))
            .finally(() => setLoading(false));
    };

    return (
        <Form
            layout='vertical'
            initialValues={{ ...color, estado: !color?.estado || color?.estado === '1' ? true : false }}
            onFinish={handleOnSubmit}
        >
            <Form.Item name='color' label='Nombre' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese un nombre' />
            </Form.Item>
            <Form.Item name='estado' label='Estado' valuePropName='checked'>
                <Switch defaultChecked checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>
            <div className='flex gap-3 justify-end'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Guardar
                </Button>
                {!hidden && (
                    <Button type='primary' htmlType='button' ghost disabled={loading} onClick={onClose}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
}
