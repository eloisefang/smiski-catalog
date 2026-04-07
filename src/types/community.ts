export type CommunityPostType = "trade" | "showcase";

export type CommunityComment = {
  id: string;
  userId: string;
  author: string;
  text: string;
  createdAt: string;
};

export type CommunityPost = {
  id: string;
  /** Owner — from `community_posts.user_id` */
  userId: string;
  type: CommunityPostType;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
  series?: string;
  likes?: number;
  comments?: CommunityComment[];
};

export type TradePost = {
  /** `trade_posts.id` */
  id: string;
  /** Parent `community_posts.id` — use for delete/report/like/comments */
  communityPostId: string;
  /** Owner — from parent `community_posts.user_id` */
  userId: string;
  lookingFor: string;
  offering: string;
  description?: string;
  image?: string;
  createdAt: string;
  location?: string;
  series?: string;
};
