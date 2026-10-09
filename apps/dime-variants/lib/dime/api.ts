export interface ThreadInfo {
  id: string;
  title: string;
  updated: string;
  turns: number;
}

export function getQueryParam(_key: string): string | null {
  return null;
}

export function setQueryParam(_key: string, _value: string, _replace?: boolean): void {}
