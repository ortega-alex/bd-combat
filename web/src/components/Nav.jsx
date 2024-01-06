import logo from '@/assets/media/logo.png';
import { Validation, _SERVER, colors } from '@/models';
import { PublicRotes } from '@/models/route';
import { resetSession } from '@/redux';
import { passwordIsValid } from '@/utilities';
import { Avatar, Badge, Button, Drawer, Form, Input, Modal, Popover, message } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import { httpAddOrUpdateUser } from '@/services/user.service';

export default function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionState = useSelector(store => store.session);
    const formRef = useRef();

    const [drawer, setDrawer] = useState(false);
    const [modal, setModal] = useState(false);
    const [showPass, setShowPass] = useState({
        current: false,
        new: false,
        repeat: false
    });
    const [loading, setLoading] = useState(false);

    const handleSingOut = () => {
        dispatch(resetSession());
        navigate(`/${PublicRotes.SIGN_IN}`, { replace: true });
    };

    const handleValidation = async (val, name) => {
        let error = null;
        if (String(val) === '') error = 'El campo es obligatorio';
        else if (name === Validation.NEW_PASS) error = await passwordIsValid(val, formRef.current.getFieldValue('temp'));
        else if (name === Validation.REPEAT_PASS) {
            const newPass = formRef.current.getFieldValue('contrasenia');
            error = await passwordIsValid(val);
            if (newPass !== val && !error) error = 'La contraseña no es la misma';
        }
        if (error) throw new Error(error);
    };

    const handleChangeShowPass = (name, value) => setShowPass({ ...showPass, [name]: value });

    const handleChangePassword = values => {
        setLoading(true);
        httpAddOrUpdateUser({ ...sessionState, ...values, id_usuario: sessionState.id_sesion })
            .then(res => {
                message[res.error === false ? 'success' : 'warning'](res.message);
                if (res.error === false) setModal(false);
            })
            .catch(err => message.error(`http error add or update user: ${err.message}`))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <nav className='navbar navbar-dark'>
                <Link to='/' className='navbar-brand' replace={true}>
                    <img src={logo} width='115' className='d-inline-block align-top' alt='Logo de la aplicacion' />
                </Link>
                <div className='navbar-nav'>
                    <Popover content={<>Notificaciones</>}>
                        <Button type='text'>
                            <Badge count={10}>
                                <Icon.Bell color={colors.primary} size={32} />
                            </Badge>
                        </Button>
                    </Popover>
                    <Avatar
                        gap={3}
                        size={60}
                        style={{ background: sessionState?.imagen ? colors.white : colors.purple }}
                        src={sessionState?.imagen ? `${_SERVER.baseUrl}${sessionState?.imagen}` : null}
                        onClick={() => setDrawer(true)}
                        className='zoom'
                    >
                        {sessionState?.abreviatura}
                    </Avatar>
                </div>
            </nav>

            <Drawer
                placement='right'
                open={drawer}
                onClose={() => setDrawer(false)}
                width={250}
                styles={{ footer: { border: 'none' }, header: { border: 'none' } }}
                footer={
                    <div className='flex flex-column gap-3'>
                        <Button type='primary' block icon={<Icon.Exchange />} onClick={() => setModal(true)}>
                            Cambiar Contraseña
                        </Button>
                        <Button type='default' block icon={<Icon.Logout />} onClick={handleSingOut}>
                            Cerrar Sesión
                        </Button>
                    </div>
                }
            >
                <div className='flex flex-column justify-center items-center gap-1 text-secondary'>
                    <Avatar
                        gap={3}
                        size={150}
                        style={{ background: sessionState?.imagen ? colors.white : colors.purple }}
                        src={sessionState?.imagen ? `${_SERVER.baseUrl}${sessionState?.imagen}` : null}
                    >
                        {sessionState?.abreviatura}
                    </Avatar>

                    <h4 className='m-0 mt-3'>{sessionState?.nombre}</h4>
                    <p>{sessionState?.usuario}</p>
                </div>
            </Drawer>

            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
                centered
                destroyOnClose
                title={<p className='h6'>Cambiar Contraseña</p>}
            >
                <Form layout='vertical' ref={formRef} onFinish={handleChangePassword}>
                    <Form.Item
                        label='Contraseña Actual'
                        name='contrasenia_actual'
                        rules={[{ required: true, message: 'El campo es obligatorio' }]}
                    >
                        <Input
                            prefix={<Icon.Lock />}
                            placeholder='Ingrese la Contraseña Actual'
                            type={showPass.current ? 'text' : 'password'}
                            suffix={
                                <Button
                                    onClick={() => handleChangeShowPass('current', !showPass.current)}
                                    type='text'
                                    size='small'
                                    icon={showPass.current ? <Icon.EyeSlash /> : <Icon.Eye />}
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label='Nueva Contraseña'
                        name='contrasenia'
                        rules={[{ required: true, validator: (_, val) => handleValidation(val, Validation.NEW_PASS) }]}
                    >
                        <Input
                            prefix={<Icon.Lock />}
                            placeholder='Ingrese la Nueva Contraseña'
                            type={showPass.new ? 'text' : 'password'}
                            suffix={
                                <Button
                                    onClick={() => handleChangeShowPass('new', !showPass.new)}
                                    type='text'
                                    size='small'
                                    icon={showPass.new ? <Icon.EyeSlash /> : <Icon.Eye />}
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label='Repita la Contraseña'
                        name='coparacion_contrasenia'
                        rules={[{ required: true, validator: (_, val) => handleValidation(val, Validation.REPEAT_PASS) }]}
                    >
                        <Input
                            prefix={<Icon.Lock />}
                            placeholder='Ingrese Nuevamente la Contraseña'
                            type={showPass.repeat ? 'text' : 'password'}
                            suffix={
                                <Button
                                    onClick={() => handleChangeShowPass('repeat', !showPass.repeat)}
                                    type='text'
                                    size='small'
                                    icon={showPass.repeat ? <Icon.EyeSlash /> : <Icon.Eye />}
                                />
                            }
                        />
                    </Form.Item>
                    <div className='text-right'>
                        <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
