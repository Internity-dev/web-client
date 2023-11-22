import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/notifications');
        setData(response.data.news.data);

        // Log the data to the console
        console.log('API Data:', response.data.news.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My Component</h1>
      {/* Render your component using the fetched data */}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;