import { Modal, Button } from 'antd';
import React from 'react';

const Comment = ({ description }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button type="primary" onClick={() => setVisible(true)}>
            </Button>
            <Modal
                title="Modal 1000px width"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
            </Modal>
        </div>
    );
}

export default Comment;