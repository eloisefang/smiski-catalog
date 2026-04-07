export type CommunityPostType = "collection" | "trade" | "showcase";

export type CommunityComment = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type CommunityPost = {
  id: string;
  type: CommunityPostType;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
  /** Optional tag for filtering (e.g. series name) */
  series?: string;
  likes?: number;
  comments?: CommunityComment[];
};

export type TradePost = {
  id: string;
  lookingFor: string;
  offering: string;
  description?: string;
  image?: string;
  createdAt: string;
};
