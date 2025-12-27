const isMode = (value: unknown, mode: string) => {
  if (Array.isArray(value)) {
    return value.includes(mode);
  }
  return value === mode;
};

export default defineNuxtRouteMiddleware((to, from) => {
  const fromMode = isMode(from.query.mode, 'kawaii') ? 'kawaii' : isMode(from.query.mode, 'rainbow') ? 'rainbow' : '';
  if (fromMode && !isMode(to.query.mode, fromMode)) {
    return navigateTo(
      {
        path: to.path,
        query: { ...to.query, mode: fromMode },
        hash: to.hash
      },
      { replace: true }
    );
  }
});
