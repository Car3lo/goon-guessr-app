interface GameData {
  beforeRevealImages: string[];
  afterRevealImages: string[];
  correctWord: string;
  socialMediaUsername: string;
  socialMediaLink: string;
}

interface Schedule {
  [date: string]: GameData;
}

export const gameSchedule: Schedule = {
  "2025-04-27": {
    beforeRevealImages: [
      // Add your images for this date
      "https://lh3.googleusercontent.com/pw/AP1GczPzrEoEgAeozWA0z56xofYjQIxPspFVaWfJM97nFVQUpzqJ0kB5khc141Of-VAmvmHIxkN4noObGz3k71SvQulB88Pi5GPRZ2MwYN1Gvbh-4HWNHz3Cbi6FuoKhzqlw1r_IY60EEgPKmrfwFaC_4KQ=w583-h777-s-no-gm",
      "https://lh3.googleusercontent.com/pw/AP1GczPlA6FnbaEz-h6Re5IFYLtjqRckq18WEZ0006POCZK6OGf1B_xLIudklncRDaWGQ69w6hPgNq6Dt09J0f5A47p2WczL12aGX6sREYys420zifsTgAATBIbSLlUaHwzpmpIPUwKGYRlSJxKPv76WwE0=w718-h957-s-no-gm"
    ],
    afterRevealImages: [
      // Add your images for this date
      "https://pbs.twimg.com/media/GoVPfdBWMAEHByq?format=jpg&name=medium",
      "https://pbs.twimg.com/media/GooRwDwXMAAKjzs?format=jpg&name=large"
    ],
    // Add the rest:
    correctWord: "Sabrina Carpenter",
    socialMediaUsername: "@sabrinacarpenter",
    socialMediaLink: "https://www.instagram.com/sabrinacarpenter/"
  },
  "2025-04-28": {
    beforeRevealImages: [
      // Add your images for April 28
      "https://lh3.googleusercontent.com/pw/AP1GczPLA03rf6jIWdqTOU-RDmLEoTRMsia6b63jymwDjJXWhf_RblSw6dPHYVNczLxosZlZzvpaq90MYIaBvPhZQb6JjA48bUZcZ7Bpqiwd7mCE-XpVrLjMPTyPpgpI03T3BnyOC4q2UJlCRIwpTJtKae0=w611-h815-s-no-gm"
    ],
    afterRevealImages: [
      // Add your images for April 28
      "https://lh3.googleusercontent.com/pw/AP1GczNE3VsWtEpSyZoHjAUY9lAWxRJhY-9FgdLYL3GYPkppPpUCkz_2dDZrlzEA7y9C2e1JJnU4TkU1-3PqDE2p7JNy762EtCzQ9YSW6Vh_F_EgWO_BcKg1NVQw20SLxvgYHseyTI0dnNc-RFg-pGczcqY=w717-h957-s-no-gm"
    ],
    correctWord: "Vera Dijkmans",
    socialMediaUsername: "@veradijkmans",
    socialMediaLink: "https://www.instagram.com/veradijkmans"
  }
  // Add more dates as needed
};

// Helper function to get today's game data
export function getTodaysGameData(): GameData {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  return gameSchedule[today] || gameSchedule["2025-04-27"]; // Fallback to default if no schedule for today
}

// Helper function to get yesterday's correct word
export function getYesterdaysCorrectWord(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  return gameSchedule[yesterdayStr]?.correctWord || "Violet Myers"; // Fallback to default OR MANUAL* IF NEW STRINGS
} 