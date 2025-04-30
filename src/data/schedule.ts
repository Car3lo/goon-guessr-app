interface GameData {
  images: string[];
  correctWord: string;
  socialMediaUsername: string;
  socialMediaLink: string;
  placeholder: string;
}

interface Schedule {
  [date: string]: GameData;
}

export const gameSchedule: Schedule = {
  "2025-04-27": {
    images: [
      "https://i.imgur.com/34sK7ft.jpeg",
      "https://i.imgur.com/uzuX27F.jpeg"
    ],
    correctWord: "Lea Martinez",
    socialMediaUsername: "@slayeas",
    socialMediaLink: "https://www.instagram.com/slayeas/",
    placeholder: "Enter your guess (Full Name)"
  },
  "2025-04-28": {
    images: [
      "https://i.imgur.com/JkvPAqI.jpeg"
    ],
    correctWord: "Vera Dijkmans",
    socialMediaUsername: "@veradijkmans",
    socialMediaLink: "https://www.instagram.com/veradijkmans",
    placeholder: "Enter your guess (Full Name)"
  },
  "2025-04-29": {
    images: [
      "https://pbs.twimg.com/media/GoVPfdBWMAEHByq?format=jpg&name=medium",
      "https://pbs.twimg.com/media/GooRwDwXMAAKjzs?format=jpg&name=large"
    ],
    correctWord: "Sabrina Carpenter",
    socialMediaUsername: "@sabrinacarpenter",
    socialMediaLink: "https://www.instagram.com/sabrinacarpenter/",
    placeholder: "Enter your guess (Full Name)"
  },
  "2025-04-30": {
    images: [
      "https://i.imgur.com/34sK7ft.jpeg",
      "https://i.imgur.com/uzuX27F.jpeg"
    ],
    correctWord: "Lea Martinez",
    socialMediaUsername: "@slayeas",
    socialMediaLink: "https://www.instagram.com/slayeas/",
    placeholder: "Enter your guess (Full Name)"
  },
  "2025-05-01": {
    images: [
      "https://i.imgur.com/JkvPAqI.jpeg"
    ],
    correctWord: "Vera Dijkmans",
    socialMediaUsername: "@veradijkmans",
    socialMediaLink: "https://www.instagram.com/veradijkmans",
    placeholder: "Enter your guess (Full Name)"
  },
  "2025-05-02": {
    images: [
      "https://pbs.twimg.com/media/GoVPfdBWMAEHByq?format=jpg&name=medium",
      "https://pbs.twimg.com/media/GooRwDwXMAAKjzs?format=jpg&name=large"
    ],
    correctWord: "Sabrina Carpenter",
    socialMediaUsername: "@sabrinacarpenter",
    socialMediaLink: "https://www.instagram.com/sabrinacarpenter/",
    placeholder: "Enter your guess (Full Name)"
  },
  "2025-05-03": {
    images: [
      "https://i.imgur.com/34sK7ft.jpeg",
      "https://i.imgur.com/uzuX27F.jpeg"
    ],
    correctWord: "Lea Martinez",
    socialMediaUsername: "@slayeas",
    socialMediaLink: "https://www.instagram.com/slayeas/",
    placeholder: "Enter your guess (Full Name)"
  }
  // Add more dates as needed
};

// Helper function to get today's game data
export function getTodaysGameData(): GameData {
  const today = new Date();
  const utcDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const todayStr = utcDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  return gameSchedule[todayStr] || gameSchedule["2025-04-27"]; // Fallback to default if no schedule for today
}

// Helper function to get yesterday's correct word
export function getYesterdaysCorrectWord(): string {
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  return gameSchedule[yesterdayStr]?.correctWord || "Violet Myers"; // Fallback to default OR MANUAL* IF NEW STRINGS
} 