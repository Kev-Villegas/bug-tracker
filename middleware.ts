export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/bugs/new", "/bugs/:id+"],
};
