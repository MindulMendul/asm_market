// apps/web/src/lib/mock.ts
// 실제 API 연동 전까지 사용하는 MOCK 데이터 소스.
// 추후 hono 클라이언트(apiClient)로 교체하면 됩니다.

export interface Post {
  id: number;
  title: string;
  price: number;
  location: string;
  thumbnail: string;
  seller: string;
  createdAt: string; // ISO string
  likes: number;
  chats: number;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "아이폰 15 Pro 256GB 자급제 (풀박스)",
    price: 1090000,
    location: "서울 강남구 역삼동",
    thumbnail: "https://picsum.photos/seed/iphone15/400/400",
    seller: "민덜",
    createdAt: "2026-06-27T01:30:00.000Z",
    likes: 12,
    chats: 5,
  },
  {
    id: 2,
    title: "한샘 책상 1200x600 거의 새것",
    price: 45000,
    location: "서울 마포구 합정동",
    thumbnail: "https://picsum.photos/seed/desk/400/400",
    seller: "재현",
    createdAt: "2026-06-26T22:10:00.000Z",
    likes: 3,
    chats: 1,
  },
  {
    id: 3,
    title: "닌텐도 스위치 OLED + 게임 3종",
    price: 280000,
    location: "경기 성남시 분당구",
    thumbnail: "https://picsum.photos/seed/switch/400/400",
    seller: "소마",
    createdAt: "2026-06-26T15:42:00.000Z",
    likes: 27,
    chats: 9,
  },
  {
    id: 4,
    title: "리바이스 501 데님 자켓 (M)",
    price: 38000,
    location: "서울 용산구 이태원동",
    thumbnail: "https://picsum.photos/seed/jacket/400/400",
    seller: "지우",
    createdAt: "2026-06-26T09:05:00.000Z",
    likes: 8,
    chats: 2,
  },
  {
    id: 5,
    title: "다이슨 V11 무선청소기 (필터 새것)",
    price: 320000,
    location: "인천 연수구 송도동",
    thumbnail: "https://picsum.photos/seed/dyson/400/400",
    seller: "현우",
    createdAt: "2026-06-25T18:20:00.000Z",
    likes: 41,
    chats: 14,
  },
  {
    id: 6,
    title: "캠핑 의자 2개 일괄 (헬리녹스 호환)",
    price: 25000,
    location: "서울 송파구 잠실동",
    thumbnail: "https://picsum.photos/seed/chair/400/400",
    seller: "다은",
    createdAt: "2026-06-25T11:00:00.000Z",
    likes: 5,
    chats: 0,
  },
];

/**
 * MOCK: 글 목록을 가져옵니다. 네트워크 지연을 흉내내기 위해 delay를 줍니다.
 */
export function getPosts(delay = 1200): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_POSTS), delay);
  });
}
