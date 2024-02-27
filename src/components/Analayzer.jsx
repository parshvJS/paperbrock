import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Analayzer = () => {
  const { id } = useParams();
  const [impKey, setImpKey] = useState([]);
  const [impQ, setImpQ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/pyq/getParamsData`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            params: id
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
console.log(responseData);
const parsedJsonData = JSON.parse(responseData.data.data)
        // Assuming responseData.data contains the JSON object directly
        setImpKey(parsedJsonData.imp_keywords || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div>
        {impKey && impKey.map((keyword, index) => (
          <div key={index}>{keyword}</div>
        ))}
      </div>
      {/* <div>
        {impQ && impQ.map((question, index) => (
          <div key={index}>{question}</div>
        ))}
      </div> */}
    </div>
  );
};

export default Analayzer;
