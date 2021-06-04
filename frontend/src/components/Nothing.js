import { Empty } from 'antd';
import React from 'react';

const Nothing = ({ description }) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Empty
				style={{
					position: 'absolute',
					top: '50%',
					transform: 'translateY(-50%)'
				}}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={description}
			/>
		</div>
	);
}

export default Nothing;