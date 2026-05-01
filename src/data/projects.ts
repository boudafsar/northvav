export type Project = {
  name: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  { name: "Everything Teeth", url: "https://everythingteeth.lovable.app/", category: "Healthcare", description: "Premium dental clinic website with booking system", tags: ["Web Design", "Healthcare", "Booking"] },
  { name: "MyOutreach", url: "https://myoutreach.lovable.app", category: "SaaS", description: "AI-powered sales outreach automation platform", tags: ["SaaS", "AI", "Automation"] },
  { name: "Khaalis Foods", url: "https://khaalis.lovable.app", category: "E-Commerce", description: "Premium artisan food brand from Kashmir", tags: ["E-Com", "Food", "3D"] },
  { name: "Zarmeen Aesthetics", url: "https://zarmeenaesthetics.lovable.app", category: "Healthcare", description: "Luxury aesthetic clinic with AI voice assistant", tags: ["Clinic", "AI", "Luxury"] },
  { name: "Shinde Eyecare", url: "https://shindeeyecare.lovable.app", category: "Healthcare", description: "Premium optical clinic with 3D iris animation", tags: ["Healthcare", "3D", "Premium"] },
  { name: "Tuler Honey", url: "https://tulerhoney.lovable.app", category: "E-Commerce", description: "Kashmir honey brand with 3D product viewer", tags: ["E-Com", "3D", "Food"] },
  { name: "Gurugram Estate", url: "https://gurugramestatepvtltd.lovable.app", category: "Real Estate", description: "Zero-brokerage real estate firm website", tags: ["Real Estate", "Premium"] },
  { name: "Harkaar IVF", url: "https://harkaarivfandmaternity.lovable.app/", category: "Healthcare", description: "IVF and maternity centre in Srinagar", tags: ["Healthcare", "Medical"] },
  { name: "Rehmaniya Connect", url: "https://rehmaniyaconnect.lovable.app", category: "Community", description: "Library community chat and social platform", tags: ["Community", "Chat", "Social"] },
  { name: "Smile Miami", url: "https://smile-miami-magic.lovable.app/", category: "Healthcare", description: "Miami dental clinic with before/after gallery", tags: ["Dental", "Miami", "Booking"] },
  { name: "Samvaad", url: "https://samvaad-growth-journey.lovable.app/", category: "Coaching", description: "Life coaching platform for parents and students", tags: ["Coaching", "Wellness"] },
  { name: "Maison Attire", url: "https://maisonattire.lovable.app", category: "Fashion", description: "Luxury modest fashion e-commerce brand", tags: ["Fashion", "E-Com", "Luxury"] },
  { name: "NorthVave Studio", url: "https://northvave.lovable.app", category: "SaaS", description: "Our own home — built with the same craft we ship", tags: ["Agency", "Brand", "3D"] },
];

export const categories = ["All", "Healthcare", "E-Commerce", "SaaS", "Real Estate", "Fashion", "Community", "Coaching"];
