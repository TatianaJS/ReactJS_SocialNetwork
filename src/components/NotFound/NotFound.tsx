import { Button } from 'antd'
import React, { FC } from 'react'

const NotFound: FC = () => {
    return <>
        <div>404 NOT FOUND</div>
        <Button type={'primary'}>
            На главную
        </Button>
    </>
}

export default NotFound