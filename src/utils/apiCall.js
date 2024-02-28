// take form data and return analyzed array and store in local storage
// used in Home_dashboard.jsx
export const getPyqData =async (formData) => {
    const response = await fetch(`http://localhost:8000/api/v1/pyq/pyq`, {
        method: "POST",
        body: formData,
    });
    const resp = await response.json()
    if(resp.success == false){
      return resp
    }
    console.log(resp.data.resp);
    // console.log(parsedJsonData)
    const dataToStore = {
      name:resp.data.name,
      stream : resp.data.stream,
      resp: resp.data.resp
    }
    localStorage.setItem(resp.data.id,JSON.stringify(dataToStore))
    console.log(resp,dataToStore,"is stored")
    return resp;
}

// get data from paramns 

export const getParamsData = async (id) =>{
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
