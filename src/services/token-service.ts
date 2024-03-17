import Cookies from 'js-cookie';

export async function setAccessToken(token : any) {
  Cookies.set('accessToken', token, { expires: 1/24 }); // Store for 1 hou
}

export function getAccessToken(): string {
    const accessToken = Cookies.get('accessToken') as string;
    console.log('accessToken' + accessToken);
    return accessToken;
}

export async function setRefreshToken(token : any) {
    Cookies.set('refreshToken', token, { expires: 7, httpOnly: true }); // Store for 7 days
}
  
export async function getRefreshToken() {
    return Cookies.get('refreshToken');
}

export async function refreshAccessToken(refreshToken : any) {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }
  
    const data = await response.json();
    return data.accessToken; 
  }

