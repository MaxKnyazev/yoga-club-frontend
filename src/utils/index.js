
// ---------------------------- FUNCTIONS ----------------------------

export const sendGetRequest = async(url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
  
  export const sendPostRequest = async(url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
  
  export const sendPutRequest = async(url, id, data) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Ошибка при отправке PUT-запроса:', error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
  
  export const sendDeleteRequest = async(url, id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      });
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Ошибка при отправке PUT-запроса:', error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
  
  // ---------------------------- FUNCTIONS ----------------------------
  