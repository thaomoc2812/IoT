import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css'; // Import CSS module
import treeImage from './tree.jpg'; // Import image file


const Tree = ({ macId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [customError, setCustomError] = useState(''); // State cho thông báo lỗi tùy chỉnh
    const [threshold, setThreshold] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const instance = axios.create({
                baseURL: 'http://localhost:8000/api',
                timeout: 1000,
            });

            const response = await instance.get(`/chaucay/${macId}`);

            setData(response.data); // Cập nhật dữ liệu vào state khi nhận được kết quả từ API
            setLoading(false);
            setError(null); // Đặt error thành null khi không có lỗi
            setCustomError(''); // Đặt thông báo lỗi tùy chỉnh thành rỗng khi không có lỗi
        } catch (error) {
            console.error('Lỗi khi thêm thiết bị:', error);
            setError(error.message); // Cập nhật lỗi vào state nếu có lỗi xảy ra
            setLoading(false);
            setCustomError('Không thể tìm thấy thiết bị trên hệ thống với địa chỉ MAC này.'); // Thiết lập thông báo lỗi tùy chỉnh
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 5000)
        return () => clearInterval(interval)
    });

    const handleSaveThreshold = async () => {
        try {
            setLoading(true);
            const instance = axios.create({
                baseURL: 'http://localhost:8000/api',
                timeout: 1000,
            });

            const response = await instance.get(`/command/${threshold}`);

            console.log('Command response:', response.data);

            // Sau khi gọi lệnh thành công, có thể cập nhật lại dữ liệu nếu cần

            setLoading(false);
            setError(null);
            setCustomError('');
        } catch (error) {
            console.error('Lỗi khi lưu ngưỡng:', error);
            setError(error.message);
            setLoading(false);
            setCustomError('Không thể gửi lệnh đến thiết bị.');
        }
    };

    useEffect(() => {
        fetchData(); // Gọi fetchData khi component được mount lần đầu

        const intervalId = setInterval(() => {
            //fetchData(); // Gọi lại fetchData mỗi 2 giây
        }, 2000);

        return () => clearInterval(intervalId); // Clear interval khi component unmount
    }, [macId]); // Gọi lại useEffect khi macId thay đổi

    const handleThresholdChange = (e) => {
        setThreshold(e.target.value);
    };

    return (
        <div className={styles.dataContainer}>
            {loading && <p>Loading...</p>}
            {customError && <p className={styles.error}>{customError}</p>} {/* Sử dụng customError thay vì error */}
            {data && (
                <div className={styles.data}>
                    <div>
                    <p><strong>MAC:</strong> {data.MAC}</p>
                    <p><strong>Soil:</strong> {data.Soil}</p>
                    <p><strong>Water:</strong> {data.Water}</p>
                    <p><strong>Temperature:</strong> {data.Temperature}</p>
                    <p><strong>Humidity:</strong> {data.Humidity}</p>
                    <p><strong>Arrival Timestamp:</strong> {data.arrival_timestamp}</p>
                    </div>
                    <div><img src={treeImage} alt="Tree" className={styles.treeImage} /></div>
                    <div className={styles.thresholdContainer}>
                        <label htmlFor="threshold" className={styles.label}>Set Threshold:</label>
                        <input
                            type="text"
                            id="threshold"
                            value={threshold}
                            onChange={handleThresholdChange}
                            className={styles.input}
                        />
                        <button onClick={handleSaveThreshold} className={styles.button} style={{ background: 'gray' }}>
                            Save
                        </button>
                        
                    </div>
                </div>

            )}
            
        </div>
    );
};

export default Tree;
