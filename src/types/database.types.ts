export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      community_posts: {
        Row: {
          id: string;
          user_id: string;
          type: "collection" | "showcase" | "trade";
          title: string;
          description: string;
          series: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "collection" | "showcase" | "trade";
          title: string;
          description: string;
          series?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "collection" | "showcase" | "trade";
          title?: string;
          description?: string;
          series?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      post_images: {
        Row: {
          id: string;
          post_id: string;
          image_url: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          image_url: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          image_url?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      trade_posts: {
        Row: {
          id: string;
          post_id: string;
          looking_for: string;
          offering: string;
          location: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          looking_for: string;
          offering: string;
          location?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          looking_for?: string;
          offering?: string;
          location?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          post_id: string;
          reporter_user_id: string;
          reason: string;
          details: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          reporter_user_id: string;
          reason: string;
          details?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          reporter_user_id?: string;
          reason?: string;
          details?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      user_smiski: {
        Row: {
          id: string;
          user_id: string;
          smiski_id: string;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          smiski_id: string;
          quantity?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          smiski_id?: string;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
