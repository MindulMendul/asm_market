// apps/web/src/lib/mock.ts
// 실제 API 연동 전까지 사용하는 MOCK 데이터 소스.
// 추후 hono 클라이언트(apiClient)로 교체하면 됩니다.

/** 거래 유형: SELL = 팝니다, BUY = 삽니다 */
export type TradeType = "SELL" | "BUY";

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
  description: string;
  tradeType: TradeType;
  /** 사용자가 직접 작성한 글(localStorage 저장)인지 여부 */
  isUser?: boolean;
}

export interface NewPostInput {
  title: string;
  tradeType: TradeType;
  price: number;
  location: string;
  description: string;
  thumbnail?: string;
}

export interface ChatMessage {
  id: number;
  /** 'me' = 구매자(나), 'seller' = 판매자 */
  from: "me" | "seller";
  text: string;
  createdAt: string; // ISO string
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
    tradeType: "SELL",
    description:
      "작년 11월에 자급제로 구입한 아이폰 15 Pro 256GB 내추럴 티타늄입니다.\n케이스 끼고 강화유리 부착해서 사용해 생활기스 거의 없습니다. 배터리 성능 100% 유지 중이고 풀박스(충전케이블 미개봉) 모두 드립니다.\n직거래는 역삼역 1번 출구에서 가능합니다.",
  },
  {
    id: 2,
    title: "맥북 에어 M2 13인치 (스페이스그레이) 삽니다",
    price: 900000,
    location: "서울 마포구 합정동",
    thumbnail: "https://picsum.photos/seed/macbookair/400/400",
    seller: "재현",
    createdAt: "2026-06-26T22:10:00.000Z",
    likes: 3,
    chats: 1,
    tradeType: "BUY",
    description:
      "맥북 에어 M2 13인치 스페이스그레이 8GB/256GB 구합니다.\n배터리 사이클 200회 이하, 외관 깨끗한 제품 우선합니다. 예산은 90만원 선이고 상태에 따라 조율 가능합니다.\n합정역 직거래 희망합니다. 충전기 포함이면 좋아요.",
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
    tradeType: "SELL",
    description:
      "닌텐도 스위치 OLED 화이트 모델입니다. 게임 3종(젤다 왕국의 눈물, 마리오카트8, 스마브)도 함께 드립니다.\n조이콘 쏠림 없고 액정 보호필름 부착되어 있습니다. 정품 박스 포함입니다. 분당 서현역 직거래 가능합니다.",
  },
  {
    id: 4,
    title: "에어팟 프로 2세대 (USB-C) 삽니다",
    price: 200000,
    location: "서울 용산구 이태원동",
    thumbnail: "https://picsum.photos/seed/airpodspro/400/400",
    seller: "지우",
    createdAt: "2026-06-26T09:05:00.000Z",
    likes: 8,
    chats: 2,
    tradeType: "BUY",
    description:
      "에어팟 프로 2세대 USB-C 버전 구합니다.\n정품, 배터리 양호한 제품이면 좋겠습니다. 한쪽만 분실/고장난 제품은 제외입니다. 케이스 포함 풀구성 우선합니다.\n이태원 직거래 또는 안전택배 가능합니다.",
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
    tradeType: "SELL",
    description:
      "다이슨 V11 무선청소기입니다. 흡입력 좋고 배터리 사용시간 정상입니다.\n새 필터로 교체했고 헤드 청소까지 마쳤습니다. 본체, 거치대, 추가 헤드 2종 포함입니다. 송도 직거래 환영합니다.",
  },
  {
    id: 6,
    title: "LG 그램 17인치 (2023) 팝니다",
    price: 1150000,
    location: "서울 송파구 잠실동",
    thumbnail: "https://picsum.photos/seed/lggram/400/400",
    seller: "다은",
    createdAt: "2026-06-25T11:00:00.000Z",
    likes: 5,
    chats: 0,
    tradeType: "SELL",
    description:
      "LG 그램 17인치 2023년형(i7/16GB/512GB)입니다. 가볍고 화면 커서 작업용으로 최고입니다.\n배터리 상태 양호하고 키보드/액정 깨끗합니다. 정품 어댑터와 박스 포함입니다. 잠실역 직거래 가능합니다.",
  },
  {
    id: 7,
    title: "갤럭시 워치6 클래식 47mm 삽니다",
    price: 230000,
    location: "경기 수원시 영통구",
    thumbnail: "https://picsum.photos/seed/galaxywatch/400/400",
    seller: "태윤",
    createdAt: "2026-06-24T13:20:00.000Z",
    likes: 6,
    chats: 3,
    tradeType: "BUY",
    description:
      "갤럭시 워치6 클래식 47mm 블루투스 모델 구합니다.\n액정 기스 적고 배터리 상태 좋은 제품 우선합니다. 정품 충전기 포함이면 가산점입니다.\n영통/광교 직거래 희망하고 택배도 가능합니다.",
  },
  {
    id: 8,
    title: "소니 WH-1000XM5 헤드폰 (블랙)",
    price: 290000,
    location: "서울 성동구 성수동",
    thumbnail: "https://picsum.photos/seed/sonyxm5/400/400",
    seller: "유진",
    createdAt: "2026-06-24T08:00:00.000Z",
    likes: 19,
    chats: 7,
    tradeType: "SELL",
    description:
      "소니 WH-1000XM5 노이즈캔슬링 헤드폰 블랙입니다. 실내에서만 사용해 상태 매우 좋습니다.\n이어패드 들뜸 없고 노캔/통화 정상입니다. 정품 케이스, 케이블, 박스 모두 포함입니다. 성수역 직거래 가능합니다.",
  },
];

const STORAGE_KEY = "soma_user_posts";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** localStorage에 저장된 사용자 작성 글 목록 (최신순) */
export function getUserPosts(): Post[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : [];
  } catch {
    return [];
  }
}

/** 새 글을 작성해 localStorage에 저장하고, 생성된 Post를 반환 */
export function addUserPost(input: NewPostInput): Post {
  const post: Post = {
    id: Date.now(),
    title: input.title,
    price: input.price,
    location: input.location,
    description: input.description,
    thumbnail:
      input.thumbnail && input.thumbnail.trim()
        ? input.thumbnail.trim()
        : `https://picsum.photos/seed/${encodeURIComponent(input.title || "soma")}/400/400`,
    seller: "나",
    createdAt: new Date().toISOString(),
    likes: 0,
    chats: 0,
    tradeType: input.tradeType,
    isUser: true,
  };
  const posts = getUserPosts();
  posts.unshift(post);
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
  return post;
}

/**
 * MOCK: 글 목록을 가져옵니다. 사용자 작성 글을 앞에 합쳐서 반환합니다.
 * 네트워크 지연을 흉내내기 위해 delay를 줍니다.
 */
export function getPosts(delay = 1200): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...getUserPosts(), ...MOCK_POSTS]), delay);
  });
}

/**
 * MOCK: 단일 글 상세를 가져옵니다(사용자 작성 글 포함). 없으면 null.
 */
export function getPost(id: number, delay = 800): Promise<Post | null> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve([...getUserPosts(), ...MOCK_POSTS].find((p) => p.id === id) ?? null),
      delay
    );
  });
}

/**
 * MOCK: 특정 글의 채팅 초기 메시지를 가져옵니다.
 * 판매자가 먼저 인사를 건넨 상태로 시작합니다.
 */
export function getMessages(postId: number, delay = 600): Promise<ChatMessage[]> {
  const post = MOCK_POSTS.find((p) => p.id === postId);
  const seller = post?.seller ?? "판매자";
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            from: "seller",
            text: `안녕하세요! '${post?.title ?? "상품"}' 글 보고 연락 주셨네요. 궁금한 점 있으면 편하게 물어보세요 :)`,
            createdAt: new Date(Date.now() - 60000).toISOString(),
          },
        ]),
      delay
    );
  });
}

/**
 * MOCK: 메시지를 보내면 판매자의 자동 응답을 흉내내서 돌려줍니다.
 * 실제 API 연동 시 이 부분을 서버 전송/구독으로 교체하세요.
 */
export function sendMessage(postId: number, text: string, delay = 900): Promise<ChatMessage> {
  const replies = [
    "네 가능합니다! 언제 시간 괜찮으세요?",
    "확인했습니다. 직거래 위치는 글에 적힌 곳에서 가능해요.",
    "네고는 조금만 가능합니다 :)",
    "아직 판매중입니다. 편하신 시간 말씀해주세요!",
    "넵 답변 드릴게요. 더 궁금한 점 있으실까요?",
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id: Date.now(),
          from: "seller",
          text: reply,
          createdAt: new Date().toISOString(),
        }),
      delay
    );
  });
}
