export const getUserData = async () => {
  let UserData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/user/info/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    UserData = data.data;
    console.log(data.data);
  } catch (error) {
    alert('유저 정보가 없습니다!')
  }
  return UserData;
};
