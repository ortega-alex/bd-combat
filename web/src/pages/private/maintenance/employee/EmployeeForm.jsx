import { Icon } from '@/components';
import { PrivateRotes, Validation, _SERVER, colors } from '@/models';
import { httpAddOrUpdateEmployee } from '@/services';
import { getDateFromString, mailIsValied, nitIsValid, noDpiIsValid, phoneNumberIsValid } from '@/utilities';
import { Avatar, Button, DatePicker, Form, Input, Select, Switch, Upload, message } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeForm({ employee, positions, onClose }) {
    const formRef = useRef();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleValidate = async (type, value) => {
        let error = null;
        if (!value || String(value).trim() === '') error = 'El campo es obligatorio';
        else if (type === Validation.MAIL) error = mailIsValied(value);
        else if (type === Validation.PHONE_NUMBER) error = phoneNumberIsValid(value);
        else if (type === Validation.NIT) error = nitIsValid(value);
        else if (type === Validation.DPI) error = noDpiIsValid(value);
        if (error) throw new Error(error);
    };

    const handleOnSubmit = async values => {
        try {
            setLoading(true);
            const res = await httpAddOrUpdateEmployee({
                ...employee,
                ...values,
                fecha_nacimiento: values.fecha_nacimiento.format('YYYY-MM-DD'),
                estado: values.estado ? 1 : 0,
                nueva_imagen: values?.avatar?.file?.originFileObj,
                carpeta: PrivateRotes.EMPLOYEE
            });
            message[res.error === false ? 'success' : 'warning'](res.message);
            if (res.error === false) onClose();
        } catch (error) {
            message.error(`http error add or update employee: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            layout='vertical'
            onFinish={handleOnSubmit}
            initialValues={{
                ...employee,
                fecha_nacimiento: employee.fecha_nacimiento ? getDateFromString(employee.fecha_nacimiento, 'YYYY-MM-DD') : undefined,
                estado: !employee?.estado || employee?.estado === '1' ? true : false
            }}
            ref={formRef}
        >
            <div className='flex flex-md-column'>
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
                            <Avatar size={150} src={image ? URL.createObjectURL(image) : _SERVER.baseUrl + employee?.imagen}>
                                <Icon.Image size={80} style={{ marginTop: 30 }} color={colors.white} />
                            </Avatar>
                        </center>
                    </Upload>
                </Form.Item>
                <div className='flex-1 pl-3'>
                    <Form.Item label='Nombre Completo' name='nombre' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                        <Input placeholder='Ingrese el nombre' />
                    </Form.Item>
                    <div className='row'>
                        <Form.Item
                            className='col-6'
                            label='Celular'
                            name='celular'
                            rules={[
                                {
                                    required: true,
                                    validator: async (_, value) => handleValidate(Validation.PHONE_NUMBER, value)
                                }
                            ]}
                        >
                            <Input placeholder='Ingrese un numero de Teléfono' />
                        </Form.Item>
                        <Form.Item
                            className='col-6'
                            label='Teléfono'
                            name='telefono'
                            rules={[
                                {
                                    required: true,
                                    validator: async (_, value) => handleValidate(Validation.PHONE_NUMBER, value)
                                }
                            ]}
                        >
                            <Input placeholder='Ingrese un numero de Teléfono' />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className='row'>
                <Form.Item
                    className='col-6'
                    label='Correo'
                    name='correo'
                    rules={[
                        {
                            required: true,
                            validator: async (_, value) => handleValidate(Validation.MAIL, value)
                        }
                    ]}
                >
                    <Input placeholder='Ingrese un correo' />
                </Form.Item>
                <Form.Item
                    className='col-6'
                    label='Fecha de Nacimiento'
                    name='fecha_nacimiento'
                    rules={[{ required: true, message: 'El campo es obligatorio' }]}
                >
                    <DatePicker className='w-100' placeholder='DD/MM/YYYY' format='DD/MM/YYYY' />
                </Form.Item>
                <Form.Item
                    className='col-6'
                    label='No. DPI:'
                    name='dpi'
                    rules={[
                        {
                            required: true,
                            validator: async (_, value) => handleValidate(Validation.DPI, value)
                        }
                    ]}
                >
                    <Input placeholder='Ingrese un DPI' />
                </Form.Item>
                <Form.Item
                    className='col-6'
                    label='No. NIT'
                    name='nit'
                    rules={[
                        {
                            required: true,
                            validator: async (_, value) => handleValidate(Validation.NIT, value)
                        }
                    ]}
                >
                    <Input placeholder='Ingrese un NIT' />
                </Form.Item>
            </div>
            <Form.Item className='flex-1' label='Puesto' name='id_puesto' rules={[{ required: true, message: 'El campo es obligatorio' }]}>
                <Select
                    placeholder='Seleccione una opción'
                    showSearch
                    autoClearSearchValue
                    optionFilterProp='children'
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {positions?.map(item => (
                        <Select.Option key={item.id_puesto} value={item.id_puesto}>
                            {item.puesto}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name='estado' label='Estado' valuePropName='checked'>
                <Switch defaultChecked checkedChildren='Activo' unCheckedChildren='Inactivo' />
            </Form.Item>
            <div className='flex justify-end gap-1'>
                <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
                    Guardar
                </Button>
                {employee?.id_empleado && (
                    <Button
                        type='primary'
                        ghost
                        htmlType='button'
                        disabled={employee?.id_usuario}
                        onClick={() => navigate(`/${PrivateRotes.PRIVATE}/${PrivateRotes.USER}/${employee.id_empleado}`, { replace: true })}
                    >
                        Generar Usuario
                    </Button>
                )}
            </div>
        </Form>
    );
}
