import { describe, it, expect, beforeEach } from 'vitest';
import { Http } from "src/utils/http";
import { HttpStatusCode } from 'axios';
import { setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from 'src/utils/auth';

describe('http axios', () => {
  const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MThkMDA5YmE2MTRhMzdmOGM4YTcwNiIsImVtYWlsIjoiYWRtaW4yNDA0QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMTEtMDFUMTA6MDM6NTkuNjg4WiIsImlhdCI6MTczMDQ1NTQzOSwiZXhwIjoxNzMxMDYwMjM5fQ.2Laf5swgphmF0Cc5PWWCUXuJtUfvcWnaIUtwFQI7xfU'
  const refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MThkMDA5YmE2MTRhMzdmOGM4YTcwNiIsImVtYWlsIjoiYWRtaW4yNDA0QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMTEtMDFUMTA6MDM6NTkuNjg4WiIsImlhdCI6MTczMDQ1NTQzOSwiZXhwIjoxNzM5MDk1NDM5fQ.kNstj7ICg11XJtX69NzsqRfY0ROyxCf1V1TiDZYq9Xk'
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear();
    http = new Http().instance;
  })

  it("Gọi API", async () => {
    // Không nên đụng đến thư mục API
    // vì chúng ta test riêng file http nên chỉ nên dùng http thôi
    // vì lỡ như thư mục api có thay đổi gì đó
    // thì cũng không ảnh hưởng gì đến file test này
    const res = await http.get("products")
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it("Auth Request", async () => {
    // Nên có 1 account test 
    // và 1 server test
    await http.post('login', { email: "admin2404@gmail.com", password: "123123" })
    const res = await http.get("me")
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it("Request Token", async () => {
    setAccessTokenToLocalStorage(access_token)
    setRefreshTokenToLocalStorage(refresh_token)
    const httpNew = new Http().instance;
    const res = await httpNew.get('me')
    console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})

