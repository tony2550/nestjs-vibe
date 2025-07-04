export interface User {
  id: number;
  provider: 'google' | 'kakao' | 'naver';
  providerId: string;
  email?: string;
}
