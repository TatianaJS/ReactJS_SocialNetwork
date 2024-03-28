import React from 'react';

const MyContact = ({contactTitle, contactValue}) => {
    return <span>
        <b>{contactTitle}:</b> {contactValue}
    </span>
}

export default MyContact;