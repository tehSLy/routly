type RouteChild = string | Route<any, any>;
type RouteChildren<C> = { [key in keyof C]: RouteChild };

interface _ParsedRoute<P> {}

type ParsedRoute<P, C> = _ParsedRoute<P> & {
  [key in keyof C]: C[key] extends Route<infer U, infer T>
    ? ParsedRoute<U, T>
    : ParsedRoute<void, void>;
};

interface Route<P, C = void> {
  <S extends RouteChildren<S>>(children: S): Route<P, S>;
}

declare function parse<P, C>(rootRoute: Route<P, C>): ParsedRoute<P, C>;

declare function compile<P extends object, C>(
  route: ParsedRoute<P, C>,
  args: P
): string;
declare function compile(route: ParsedRoute<never, void>): string;

function route<P extends object>(path: string): Route<P>{
  return {} as any;
}

export { compile, route, parse };
