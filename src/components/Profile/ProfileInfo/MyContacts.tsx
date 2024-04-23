import React, { FC } from 'react'

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const MyContact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <span>
        <b>{contactTitle}:</b> {contactValue}
    </span>
}

export default MyContact