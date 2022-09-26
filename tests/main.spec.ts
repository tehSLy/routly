import { it } from "mocha";
import { compile, parse, route } from "../src";

describe("route", () => {
  it("can be created with a path", () => {
    const root = route("/user");
  });
  it("can be created with a type argument to describe it parameters", () => {
    route<{ id: number }>("/user/:id");
    //@ts-expect-error
    route<string>("/user/:id");
  });

  it("can be nested with routes", () => {
    const scheme = route("/app")({
      users: route("users")({
        byId: route<{ id: number }>(":id"),
        byType: route<{ type: string }>(":type")({
          byStatus: route<{ status: string }>(":status"),
        }),
      }),
      products: route("products"),
    });

    const root = parse(scheme);

    compile(root.users.byType, {
      type: "friends",
      status: "online"
    }); // => /app/users/friends/online
  });

  // const root = route<{ id: number }>("/user/:id")({
  //   showPosts: route<{ type: string }>("/showPosts/:type")({
  //     unread: "unread",
  //   }),
  // });
  // const routes = parse(root);
  // routes.showPosts.unread;
  // compile(routes.showPosts.unread);
  // //@ts-expect-error
  // compile(routes, {});
});
