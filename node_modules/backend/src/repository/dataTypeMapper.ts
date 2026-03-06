import { z } from 'zod';


type Props<T> = {
  data: unknown,
  nullToUndefined: boolean,
  schema: T
}

// 単一の文字列を snake_case から camelCase に変換するヘルパー
const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};


export const dbObjectToCamel = <T extends z.ZodTypeAny>({
  data,
  nullToUndefined,
  schema
}: Props<T>): z.infer<T> => {

  function mapDbRow(item: any): any {
    if (Array.isArray(item)) {
      return item.map(mapDbRow);
    }
    if (item !== null && typeof item === 'object') {
      const n: Record<string, any> = {};
      Object.keys(item).forEach((key) => {
        n[toCamel(key)] = mapDbRow(item[key]);
      });
      return n;
    }
    // null を undefined に変換
    if (nullToUndefined && item === null) return undefined;
    else return item;
  }

  const camelCaseData = mapDbRow(data);

  // Zod でバリデーション・型確定
  return schema.parse(camelCaseData);
};
