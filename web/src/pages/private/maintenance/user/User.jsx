import { Icon } from '@/components';
import { httpGetAllUsers } from '@/services/user.service';
import { getDateFormat } from '@/utilities';
import { Button, Modal, Table, Tooltip, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserForm } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { modifySession } from '@/redux';
import { sessionAdapter } from '@/adapters';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGetAllEmployeeById } from '@/services';
import { PrivateRotes } from '@/models';

export default function User() {
    const sessionState = useSelector(store => store.session);
    const dispath = useDispatch();
    const { id_employee } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100
    });

    const handleGetAll = () => {
        setLoading(true);
        httpGetAllUsers()
            .then(res => setUsers(res))
            .catch(err => message.error(`http error get all user: ${err.message}`))
            .finally(() => setLoading(false));
    };

    const handleGetEmployee = async id => {
        try {
            setLoading(true);
            const res = await httpGetAllEmployeeById(id);
            setUser({
                ...res,
                usuario: String(res.correo).split('@')[0],
                fecha_nacimiento: getDateFormat(res.fecha_nacimiento, 'YYYY-MM-DD')
            });
            setModal(true);
            navigate(`/${PrivateRotes.PRIVATE}/${PrivateRotes.USER}`, { replace: true });
        } catch (error) {
            message.error(`http error get employee by id: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetAll();
        if (id_employee) handleGetEmployee(id_employee);
    }, []);

    return (
        <div className='container h-100 flex flex-column'>
            <div className='flex justify-between gap-3 mb-3'>
                <div className='flex flex-row'>
                    <Tooltip title='Actualizar'>
                        <Button type='link' className='text-secondary' icon={<Icon.Reload />} onClick={handleGetAll} />
                    </Tooltip>
                    <p className='h5'>Usuarios</p>
                </div>
                <Button
                    type='primary'
                    onClick={() => {
                        setUser({});
                        setModal(true);
                    }}
                >
                    Agregar
                </Button>
            </div>
            <Table
                size='small'
                pagination={{
                    position: ['none', 'bottomRight'],
                    defaultCurrent: pagination.current,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: [50, 100, 250, 500],
                    onShowSizeChange: (current, pageSize) => setPagination({ current, pageSize })
                }}
                scrollToFirstRowOnChange={true}
                loading={loading}
                showSorterTooltip={false}
                rowKey='id_usuario'
                dataSource={users}
                columns={[
                    { title: 'No.', dataIndex: 'id_usuario', key: 'id_usuario', sorter: true },
                    { title: 'Nombre.', dataIndex: 'nombre' },
                    { title: 'Correo.', dataIndex: 'correo' },
                    { title: 'Usuario.', dataIndex: 'usuario' },
                    { title: 'Estado.', dataIndex: '_estado' },
                    { title: 'Fecha', dataIndex: 'fecha_creacion', render: value => <span>{getDateFormat(value, 'DD/MM/YYYY')}</span> },
                    {
                        title: 'Opciones',
                        render: (_, item) => (
                            <div className='text-center'>
                                <Button
                                    htmlType='button'
                                    icon={<Icon.Edit />}
                                    type='primary'
                                    size='small'
                                    onClick={() => {
                                        setUser(item);
                                        setModal(true);
                                    }}
                                />
                            </div>
                        )
                    }
                ]}
            />

            <Modal
                title={<p className='h5'>{user?.id_usuario ? 'Editar' : 'Agregar'} Usuario</p>}
                open={modal}
                centered
                footer={null}
                destroyOnClose
                maskClosable={false}
                onCancel={() => setModal(false)}
            >
                <UserForm
                    user={user}
                    onClose={usuario => {
                        if (usuario.id_usuario && Number(usuario.id_usuario) === sessionState.id_sesion)
                            dispath(modifySession(sessionAdapter(usuario)));
                        handleGetAll();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
}
