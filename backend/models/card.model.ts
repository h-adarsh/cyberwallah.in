import type { Tier } from "./profile.model";

// MODEL — the privacy-safe subset returned by the `get_public_card` RPC and
// shown on the public /id/:cardNumber verify page. Deliberately excludes
// age / location / email.
export interface PublicCard {
  card_number: number;
  full_name: string | null;
  tier: Tier;
  avatar_url: string | null;
  created_at: string;
}
