import type { CommunityPost, TradePost } from "@/src/types/community";

const ph = (w: number, h: number, text: string) =>
  `https://placehold.co/${w}x${h}/E2F0D9/3E9A0B/png?text=${encodeURIComponent(text)}`;

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "cp-1",
    type: "collection",
    title: "My Bedroom Setup",
    description:
      "Soft lighting and a tiny shelf for my glow-in-the-dark friends. They keep me company while I read.",
    images: [ph(800, 520, "Bedroom+1"), ph(800, 520, "Bedroom+2")],
    createdAt: "2026-03-18T14:22:00.000Z",
    series: "Bed Series",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: "mimi",
        text: "The shelf angle is perfect!",
        createdAt: "2026-03-19T09:01:00.000Z",
      },
    ],
  },
  {
    id: "cp-2",
    type: "collection",
    title: "Desk Buddies While I Work",
    description:
      "A small forest next to my monitor. Productivity unclear, morale high.",
    images: [ph(800, 520, "Desk")],
    createdAt: "2026-03-12T11:05:00.000Z",
    series: "Work Series",
    likes: 18,
  },
  {
    id: "cp-3",
    type: "showcase",
    title: "Bathroom Shelf Glow",
    description: "Minimal, calm, slightly silly.",
    images: [ph(640, 900, "Bath+tall"), ph(640, 640, "Bath+sq")],
    createdAt: "2026-03-28T08:40:00.000Z",
    series: "Bath Series",
    likes: 41,
  },
  {
    id: "cp-4",
    type: "showcase",
    title: "Windowsill Garden",
    description: "Sunlight + tiny poses = instant serotonin.",
    images: [ph(640, 800, "Window"), ph(640, 720, "Leaf")],
    createdAt: "2026-03-30T16:12:00.000Z",
    series: "Living Series",
    likes: 33,
  },
];

export const MOCK_TRADE_POSTS: TradePost[] = [
  {
    id: "tp-1",
    lookingFor: "Secret — Bath Series",
    offering: "Duplicate Yoga (Lotus)",
    description: "Local meetup preferred; ships within US.",
    image: ph(480, 360, "Trade+A"),
    createdAt: "2026-04-01T10:00:00.000Z",
  },
  {
    id: "tp-2",
    lookingFor: "Hippers — Dressing",
    offering: "Series 3 Strap (unused)",
    createdAt: "2026-04-02T18:30:00.000Z",
  },
  {
    id: "tp-3",
    lookingFor: "Moving — Box peeking",
    offering: "Cheer duplicate + small add",
    description: "Happy to swap photos first.",
    createdAt: "2026-04-03T12:15:00.000Z",
  },
];
