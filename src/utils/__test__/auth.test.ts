import { clearLocalStorage, getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, setAccessTokenToLocalStorage, setProfileToLocalStorage, setRefreshTokenToLocalStorage } from 'src/utils/auth';
import { beforeEach, describe, expect, it } from 'vitest';

const access_token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const profile = '{"_id":"6374a6115fdc5f037e6f694b","roles":["User"],"email":"d7@gmail.com","createdAt":"2022-11-16T08:57:53.872Z","updatedAt":"2022-12-05T06:55:57.846Z","__v":0,"date_of_birth":"1997-01-13T17:00:00.000Z","name":"Dư Thanh Được 3","address":"Da nang, Vietnam","avatar":"44f75461-560e-42b5-a9d7-2b833a9f4d67.jpg","phone":"11111111111"}';


beforeEach(() => {
  localStorage.clear();
});

describe('access_token', () => {
  it('access_token is set in localStorage', () => {
    setAccessTokenToLocalStorage(access_token);
    expect(getAccessTokenFromLocalStorage()).toBe(access_token);
  });
});

describe('refresh_token', () => {
  it('refresh_token is set in localStorage', () => {
    setRefreshTokenToLocalStorage(refresh_token);
    expect(getRefreshTokenFromLocalStorage()).toEqual(refresh_token);
  });
});

describe('clearLS', () => {
  it('Clears access_token, refresh_token, and profile', () => {
    setRefreshTokenToLocalStorage(refresh_token);
    setAccessTokenToLocalStorage(access_token);
    setProfileToLocalStorage(profile as any);
    clearLocalStorage();
    expect(getAccessTokenFromLocalStorage()).toBe('');
    expect(getRefreshTokenFromLocalStorage()).toBe('');
    // Add additional checks here if you want to verify profile clearance
  });
});
