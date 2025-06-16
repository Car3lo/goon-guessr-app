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
  "2025-06-16": {
    images: ["https://pbs.twimg.com/media/GomcbUTWMAAhIWA?format=jpg&name=large"],
    correctWord: "Sydney Thomas",
    socialMediaUsername: "@itssydneythomas",
    socialMediaLink: "https://www.instagram.com/iamsydneythomas/",
    placeholder: "Enter your guess"
  },
  "2025-06-17": {
    images: ["https://pbs.twimg.com/media/GpcKBmYW4AAIxDS?format=jpg&name=large"],
    correctWord: "Thea Thompson",
    socialMediaUsername: "@theaadoraa",
    socialMediaLink: "https://www.instagram.com/theaadoraa/",
    placeholder: "Enter your guess"
  },
  "2025-06-18": {
    images: ["https://i.imgur.com/McrVzKQ.jpeg"],
    correctWord: "Izel Palacio",
    socialMediaUsername: "@ayzelll_",
    socialMediaLink: "https://www.instagram.com/ayzelll_/",
    placeholder: "Enter your guess"
  },
  "2025-06-19": {
    images: ["https://pbs.twimg.com/media/GceW5mzXAAAWLO2?format=jpg&name=large"],
    correctWord: "Violet Myers",
    socialMediaUsername: "@waifuviolet",
    socialMediaLink: "https://www.instagram.com/waifuviolet/?hl=en",
    placeholder: "Enter your guess"
  },
  "2025-06-20": {
    images: ["https://pbs.twimg.com/media/Ger7CrpXYAAbdgw?format=jpg&name=large"],
    correctWord: "Ella Netzer",
    socialMediaUsername: "@ella_netzer8",
    socialMediaLink: "https://www.instagram.com/ella_netzer8/",
    placeholder: "Enter your guess"
  },
  "2025-06-21": {
    images: ["https://pbs.twimg.com/media/GooRwDwXMAAKjzs?format=jpg&name=large"],
    correctWord: "Sabrina Carpenter",
    socialMediaUsername: "@sabrinacarpenter",
    socialMediaLink: "https://www.instagram.com/sabrinacarpenter/",
    placeholder: "Enter your guess"
  },
  "2025-06-22": {
    images: ["https://pbs.twimg.com/media/Gkk--H_bkAAHvA0?format=jpg&name=large"],
    correctWord: "Antje Utgaard",
    socialMediaUsername: "@awesomeantjay",
    socialMediaLink: "https://www.instagram.com/awesomeantjay/",
    placeholder: "Enter your guess"
  },
  "2025-06-23": {
    images: ["https://pbs.twimg.com/media/GoSdSd5XIAAC06I?format=jpg&name=4096x4096"],
    correctWord: "Duygu German",
    socialMediaUsername: "@duygu.grmn",
    socialMediaLink: "https://www.instagram.com/duygu.grmn/",
    placeholder: "Enter your guess"
  },
  "2025-06-24": {
    images: ["https://pbs.twimg.com/media/GoloZ5fWAAA02if?format=jpg&name=4096x4096"],
    correctWord: "Sydney Sweeney",
    socialMediaUsername: "@sydney_sweeney",
    socialMediaLink: "https://www.instagram.com/sydney_sweeney/",
    placeholder: "Enter your guess"
  },
  "2025-06-25": {
    images: ["https://pbs.twimg.com/media/GoZ_XF2XoAA-Wi_?format=jpg&name=900x900"],
    correctWord: "Ashley Schultz",
    socialMediaUsername: "@ashxschultz",
    socialMediaLink: "https://www.instagram.com/ashxschultz/",
    placeholder: "Enter your guess"
  },
  "2025-06-26": {
    images: ["https://pbs.twimg.com/media/GoZ_hcqWcAAsYiu?format=jpg&name=large"],
    correctWord: "Hilda Sigurdsson",
    socialMediaUsername: "@hildasigurdsson",
    socialMediaLink: "https://www.instagram.com/hildasigurdsson/",
    placeholder: "Enter your guess"
  },
  "2025-06-27": {
    images: ["https://pbs.twimg.com/media/GoUCt48XEAA3zZ0?format=jpg&name=4096x4096"],
    correctWord: "Lil Nyachty",
    socialMediaUsername: "@lilnyachtyy",
    socialMediaLink: "https://www.instagram.com/lilnyachtyy/",
    placeholder: "Enter your guess"
  },
  "2025-06-28": {
    images: ["https://pbs.twimg.com/media/GomcbUTWMAAhIWA?format=jpg&name=large"],
    correctWord: "Sydney Thomas",
    socialMediaUsername: "@itssydneythomas",
    socialMediaLink: "https://www.instagram.com/iamsydneythomas/",
    placeholder: "Enter your guess"
  },
  "2025-06-29": {
    images: ["https://pbs.twimg.com/media/GomrMNjXMAAatx1?format=jpg&name=large"],
    correctWord: "mochiopia",
    socialMediaUsername: "@mochiopia",
    socialMediaLink: "https://www.mochiopia.com/",
    placeholder: "Enter your guess"
  },
  "2025-06-30": {
    images: ["https://lh3.googleusercontent.com/pw/AP1GczNgrV4e4ijXrujMM1Yf4U2MsFIQe2vtRhG5IY_pF_WoRwhTdQS6izaMpDcWo9UbkeSbOKUEvDyaB2HkjZOh6q4yvzVod29DxhsHqcBrv7xPYT6esA1WNo2hSUVYFhWJGcWAcgFE7Ssxy7b4n3jqvaA=w611-h815-s-no-gm"],
    correctWord: "Sasha Ferro",
    socialMediaUsername: "@sashaferro",
    socialMediaLink: "https://www.instagram.com/sashaferro/",
    placeholder: "Enter your guess"
  },
  "2025-07-01": {
    images: ["https://pbs.twimg.com/media/Gs5YK5TXIAELyGa?format=png&name=900x900"],
    correctWord: "Katarina Deme",
    socialMediaUsername: "@katarina.deme",
    socialMediaLink: "https://www.instagram.com/katarina.deme/?hl=en",
    placeholder: "Enter your guess"
  },
};

// Helper functions
export function getTodaysGameData(): GameData {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return gameSchedule[todayStr] || null;
}

export function getYesterdaysCorrectWord(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  return gameSchedule[yesterdayStr]?.correctWord || "Unknown";
}
