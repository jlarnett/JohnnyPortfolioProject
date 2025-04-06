class UAGenerator{
  readonly ChromiumOnWindowsUserAgentStrings = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  ];

  GetRandomChromiumWinUA() : string {
    return this.ChromiumOnWindowsUserAgentStrings[this.generateRandomInteger(0, this.ChromiumOnWindowsUserAgentStrings.length-1)];
  }

  //Used to generate a random number for the UA array
  generateRandomInteger(min, max): number {
    return Math.floor(min + Math.random()*(max - min + 1))
  }
}

export const UAGenTool = new UAGenerator();

  
