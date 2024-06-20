import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchJson = ({onfetchData}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8000/get');
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <div>
        {/* <button onClick={fetchData}></button> */}
        {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading JSON data...</p>
      )}

        </div>
    );
};

export default FetchJson