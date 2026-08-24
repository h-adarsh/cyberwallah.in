import type { Resource } from "@/types";

export const resources: Resource[] = [
  {
    name: "NordVPN",
    description: "Best VPN for Indian users - protects privacy on public WiFi.",
    url: "https://nordvpn.com/?YOUR_AFFILIATE_CODE",
    category: "VPN",
    affiliate: true,
    free: false,
  },
  {
    name: "TryHackMe",
    description: "Best platform to learn ethical hacking - perfect for beginners.",
    url: "https://tryhackme.com",
    category: "Practice",
    affiliate: false,
    free: true,
  },
  {
    name: "Kali Linux",
    description: "Standard OS for penetration testing - free download.",
    url: "https://www.kali.org/get-kali/",
    category: "Tools",
    affiliate: false,
    free: true,
  },
];
