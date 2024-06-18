export const getLogout = async () => {
  let UserData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    UserData = data
    console.log(data);
  } catch (error) {
    alert('사용자의 토큰이 유효하지 않습니다')
  }
  return UserData;
};
