const updateRoute = route => (
  {
    type: 'UPDATE_ROUTE',
    route,
  }
);

const resetRoute = () => (
  {
    type: 'RESET_ROUTE',
  }
);

export default {
  updateRoute,
  resetRoute,
};
