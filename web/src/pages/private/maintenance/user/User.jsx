import { Icon } from '@/components';
import { httpGetAllUsers } from '@/services/user.service';
import { getDateFormat } from '@/utilities';
import { Button, Modal, Table, Tooltip, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserForm } from '.';

export default function User() {
    const handleGetAll = () => {
        setLoading(true);
        httpGetAllUsers()
            .then(res => setUsers(res))
            .catch(err => message.error(`http error get all user: ${err.message}`))
            .finally(() => setLoading(false));
    };

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 100
    });

    useEffect(() => {
        handleGetAll();
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
                    { title: 'No.', dataIndex: 'id_usuario' },
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
                    onClose={() => {
                        handleGetAll();
                        setModal(false);
                    }}
                />
            </Modal>
        </div>
    );
}
