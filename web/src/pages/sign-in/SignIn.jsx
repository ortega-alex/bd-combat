import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import logo from '@/assets/media/logo.png';
import { Icon } from '@/components';

export default function SignIn() {
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = values => {
        console.log(values);
    };

    return (
        <div className='login-container'>
            <div className='card'>
                <div className='text-center mt-3 mb-5'>
                    <img src={logo} alt='imagen de logo de la empresa' height={170} />
                </div>

                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item
                        label='Usuario'
                        name='usuario'
                        className='customer-form-item'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <Input prefix={<Icon.User />} placeholder='Ingrese un Usuario' />
                    </Form.Item>
                    <Form.Item
                        label='Contraseña'
                        name='contrasenia'
                        className='customer-form-item'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <Input
                            prefix={<Icon.Lock />}
                            suffix={
                                <Button
                                    onClick={() => setShowPass(!showPass)}
                                    type='text'
                                    size='small'
                                    icon={showPass ? <Icon.EyeSlash /> : <Icon.Eye />}
                                />
                            }
                            placeholder='Ingrese una Contraseña'
                            autoComplete='off'
                            type={showPass ? 'text' : 'password'}
                        />
                    </Form.Item>
                    <Button htmlType='submit' className='mt-1' type='primary' block>
                        Iniciar Sesión
                    </Button>
                    <Button htmlType='button' className='mt-3' type='link' block>
                        ¿Olvidaste la contraseña?
                    </Button>
                </Form>
            </div>
        </div>
    );
}
