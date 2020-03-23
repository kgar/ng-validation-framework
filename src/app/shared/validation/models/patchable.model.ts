/**
 * Take your type (your interface, class, raw type declaration, etc.),
 * and make every property optional.
 *
 * Happy coding!
 */
export declare type Patchable<T> = {
  [K in keyof T]+?: T[K];
};
