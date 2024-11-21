export type Color = `#${string}`;
export type PartiallyRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
