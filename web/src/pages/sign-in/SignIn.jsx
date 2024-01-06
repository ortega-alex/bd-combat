import { sessionAdapter } from '@/adapters';
import logo from '@/assets/media/logo.png';
import { Icon } from '@/components';
import { PrivateRotes } from '@/models/route';
import { setSession } from '@/redux';
import { httpSignIn } from '@/services/user.service';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const dispath = useDispatch();
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = values => {
        setLoading(true);
        httpSignIn(values)
            .then(res => {
                message[res?.error === true ? 'warning' : 'success'](res?.message);
                if (!res?.error) {
                    dispath(setSession({ session: sessionAdapter(res.session), token: res?.token }));
                    navigate(`/${PrivateRotes.PRIVATE}`, { replace: true });
                }
            })
            .catch(err => message.error(`http sign-in error: ${err.message}`))
            .finally(() => setLoading(false));
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
                    <Button htmlType='submit' className='mt-1' type='primary' block loading={loading} disabled={loading}>
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
