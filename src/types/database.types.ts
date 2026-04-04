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
