export const loadComponent = (viewName: string) => {
  return () => import(`../views/${viewName}.vue`);
};
