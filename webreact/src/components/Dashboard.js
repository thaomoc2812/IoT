import React, { useState } from 'react';
import styles from './Dashboard.module.css'; 
import Chaucay from './Tree'; 

const Dashboard = () => {
    const [macId, setMacId] = useState('');
    
    const [isDeviceAdded, setIsDeviceAdded] = useState(false); // State để kiểm tra xem thiết bị đã được thêm hay chưa

    const handleChange = (e) => {
        setMacId(e.target.value);
    };

    const handleAddDevice = () => {
        // Xử lý logic khi người dùng nhấn vào nút Add Device
        // Ở đây có thể gọi hàm xử lý hoặc làm các công việc khác
        console.log('Adding device with MAC:', macId);

        // Đặt state để hiển thị component Chaucay
        setIsDeviceAdded(true);
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.inputContainer}>
                <form className={styles.form}>
                    <label htmlFor="macId" className={styles.label}>Enter MAC Address:</label>
                    <input
                        type="text"
                        id="macId"
                        value={macId}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <button
                        type="button"
                        onClick={handleAddDevice}
                        className={styles.button}
                    >
                        Add Device
                    </button>
                </form>
                {isDeviceAdded && <Chaucay macId={macId} />} {/* Render Chaucay khi isDeviceAdded là true */}
            </div>
        </div>
    );
};

export default Dashboard;
