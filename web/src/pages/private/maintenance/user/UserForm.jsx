import { Icon } from '@/components';
import { _SERVER, colors } from '@/models';
import { httpAddOrUpdateUser } from '@/services/user.service';
import { mailIsValied } from '@/utilities';
import { Avatar, Button, Form, Input, Switch, Upload, message } from 'antd';
import React, { useRef, useState } from 'react';

export default function UserForm({ user, onClose }) {
    const formRef = useRef();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSyggestUser = value => {
        console.log(user, value);
        if (!user?.id_usuario) {
            const usuario = value.split('@')[0];
            formRef.current.setFieldsValue({ usuario });
        }
    };

    const handleOnSubmit = values => {
        setLoading(true);
        httpAddOrUpdateUser({
            ...user,
            ...values,
            nueva_imagen: values?.avatar?.file?.originFileObj,
            estado: values.estado ? '1' : '0'
        })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) onClose(res.usuario);
            })
            .catch(err => message.error(`http erro add or update user: ${err.message}`))
            .finally(() => setLoading(false));
    };

    return (
        <Form
            layout='vertical'
            onFinish={handleOnSubmit}
            initialValues={{
                ...user,
                estado: !user?.estado || user?.estado === '1' ? true : false
            }}
            ref={formRef}
        >
            <Form.Item name='avatar' valuePropName='file'>
                <Upload
                    accept='.jpg, .png'
                    customRequest={({ file, onSuccess }) => {
                        setImage(file);
                        onSuccess('ok');
                    }}
                    onChange={info => (info.file.status = 'done')}
                    showUploadList={false}
                    className='avatar-uploader zoom'
                >
                    <center>
                        <Avatar size={150} src={image ? URL.createObjectURL(image) : _SERVER.baseUrl + user?.imagen}>
                            <Icon.Image size={80} style={{ marginTop: 30 }} color={colors.white} />
                        </Avatar>
                    </center>
                </Upload>
            </Form.Item>

            <Form.Item label='Nombre Completo' name='nombre' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Input placeholder='Ingrese el nombre' disabled={user?.id_empleado} />
            </Form.Item>
            <div className='row'>
                <Form.Item
                    className='col-6'
                    label='Correo'
                    name='correo'
                    rules={[
                        {
                            required: true,
                            validator: async (_, value) => {
                                let error = null;
                                if (!value || String(value).trim() === '') error = 'El campo es obligatorio';
                                else error = mailIsValied(value);
                                if (error) throw new Error(error);
                            }
                        }
                    ]}
                >
                    <Input
                        placeholder='Ingrese un correo'
                        onBlur={env => handleSyggestUser(env.target.value)}
                        disabled={user?.id_empleado}
                    />
                </Form.Item>
                <Form.Item
                    className='col-6'
                    label='Usuario'
                    name='usuario'
                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                >
                    <Input placeholder='Ingrese un correo' disabled={user?.id_usuario} />
                </Form.Item>
            </div>
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
