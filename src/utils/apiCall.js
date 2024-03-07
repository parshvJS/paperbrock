// take form data and return analyzed array and store in local storage

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/authChecked";
// const {setIsLoading} = useUserContext()
// used in Home_dashboard.jsx
export const getPyqData = async (formData) => {
  const accessToken = localStorage.getItem("AccessToken");

  const headers = {
    "Authorization": `Bearer ${accessToken}`,
  };

  // Make fetch request with headers
  const response = await fetch(`http://localhost:8000/api/v1/pyq/pyq`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  const resp = await response.json()
  
  console.log(resp.data.resp);
  // console.log(parsedJsonData)
  const dataToStore = {
    name: resp.data.name,
    stream: resp.data.stream,
    resp: resp.data.resp
  }
  localStorage.setItem(resp.data.id, JSON.stringify(dataToStore))
  console.log(resp, dataToStore, "is stored")
  return resp;
}

// get data from paramns 

export const getParamsData = async (id) => {
  await fetch(`http://localhost:8000/api/v1/pyq/getParamsData`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      params: id
    })
  });

}

export const getUsageArray = async () => {
  const arr = await fetch("http://localhost:8000/api/v1/pyq/getUsage", {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("AccessToken")}`
    }
  });
  const array = await arr.json();
  if(array.message == "log-in"){
    return array
  }
  // console.log("returning : " ,array.data.usage)
  return array.data.usage;
}

