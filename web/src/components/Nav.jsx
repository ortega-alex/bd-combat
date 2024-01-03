import logo from '@/assets/media/logo.png';
import { _SERVER, colors } from '@/models';
import { Avatar, Badge, Button, Popover } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export default function Nav() {
    const sessionState = useSelector(store => store.session);

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
                        style={{ background: sessionState?.imagen ? 'white' : '#ab47bc' }}
                        src={sessionState?.imagen > 0 ? `${_SERVER.baseUrl}${sessionState?.imagen}` : null}
                        onClick={() => setDrawer(true)}
                        className='zoom'
                    >
                        {sessionState?.nombre}
                    </Avatar>
                </div>
            </nav>
        </>
    );
}
