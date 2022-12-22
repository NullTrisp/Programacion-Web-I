import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertComponent(props: any) {
    const [show, setShow] = useState(true);
    if (!show) {
        return null;
    }
    return (
        <Alert variant={props.variant} onClose={() => setShow(false)} dismissible>
            <p>{props.message}</p>
        </Alert>
    );
}

