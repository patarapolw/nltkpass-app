import { shuffle, choice, clone, randRange } from '@/util';
import { fetchText } from '@/cordova';

interface IRareWord {
  [pos: string]: string[];
}

interface PassObject {
  password: string;
  sentence: string;
}

export default class NltkPass {
  public static async build(): Promise<NltkPass> {
    const [brownRare, brownTagged] = await Promise.all([
      fetchText("brown-rare.json"),
      fetchText("brown-tagged.ndjson")
    ]);

    return new NltkPass({brownRare: JSON.parse(brownRare), brownTagged});
  }

  private rare: IRareWord;
  private taggedSentences: string[][][];

  private PUNC = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split("");
  private DIGITS = '0123456789'.split("");

  constructor({brownRare, brownTagged}: any) {
    this.rare = brownRare;
    this.taggedSentences = brownTagged.trimEnd().split("\n").map((r: string) => JSON.parse(r));
  }

  public generateSentence(rareCount: number = 5, specificity?: number): string {
    shuffle(this.taggedSentences);

    let tssI = 0;
    let rareI = 0;
    const output: string[][][] = [];

    while (rareI < rareCount) {
      const ts = clone(this.taggedSentences[tssI]);
      const tsMap: Record<string, Record<number, string>> = {};

      ts.forEach(([word, pos], i) => {
        pos = pos.substr(0, specificity);
        tsMap[pos] = tsMap[pos] || {};
        tsMap[pos][i] = word;
      });

      for (const [tsPos, tsValue] of Object.entries(tsMap)) {
        for (const [pos, wordSet] of Object.entries(this.rare)) {
          if (pos.substr(0, specificity) === tsPos) {
            const tsI = choice(Object.keys(tsValue)) as unknown as number;
            ts[tsI] = [choice(wordSet), `${pos}_RAND`];
            rareI++;
          }
        }
      }

      output.push(ts);
      tssI++;
    }

    return output.map((sent) => {
      return sent.map((seg) => seg[0]).join(" ")
    }).join(" ");
  }

  public generatePassword(s?: string, puncCount: number = 2, digitCount: number = 2, wordCount?: number): PassObject {
    const allRares = this.getAllRares();

    if (wordCount) {
      s = Array.from({length: wordCount}).map((_) => choice(allRares)).join(" ");
    }

    if (!s) {
      s = this.generateSentence();
    }

    console.log(s);

    const words = s.split(" ").filter((w) => /[A-Z]/i.test(w));

    for (const c of words.join("")) {
      if (this.PUNC.includes(c)) {
        puncCount--;
      } else if (this.DIGITS.includes(c)) {
        digitCount--;
      }
    }

    let n = 0;
    while (n < puncCount) {
      words.splice(randRange(words.length + 1), 0, choice(this.PUNC));
      n++;
    }

    n = 0;
    while (n < digitCount) {
      words.splice(randRange(words.length + 1), 0, choice(this.DIGITS));
      n++;
    }

    words.forEach((w, i) => {
      if (!allRares.includes(w)) {
        w = w[0];
      }

      if (i > 0) {
        const wP = words[i - 1];

        const prevLast = wP.charAt(wP.length - 1);
        const nextFirst = w.charAt(0);

        if (prevLast.toLocaleLowerCase() === prevLast && nextFirst.toLocaleLowerCase() === nextFirst) {
          words[i] = w[0].toLocaleUpperCase() + w.substr(1);
        } else if (prevLast.toLocaleUpperCase() === prevLast && nextFirst.toLocaleUpperCase() === nextFirst) {
          words[i] = w[0].toLocaleLowerCase() + w.substr(1);
        }
      }
    });

    return {
      password: words.join(""),
      sentence: s
    };
  }

  private getAllRares(): string[] {
    return Object.values(this.rare).reduce((a, b) => [...a, ...b]);
  }
}