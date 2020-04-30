export declare type Patchable<T> = {
  [K in keyof T]+?: T[K];
};
