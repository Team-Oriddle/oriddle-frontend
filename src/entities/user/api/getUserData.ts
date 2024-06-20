export const getUserData = async () => {
  let UserData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/user/info`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    UserData = data
  } catch (error) {
    throw error
  }
  return UserData;
};


