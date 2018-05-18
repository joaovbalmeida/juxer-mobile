const initialState = {
  route: '',
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROUTE':
      return Object.assign({}, state, {
        route: action.route,
      });

    case 'RESET_ROUTE':
      return Object.assign({}, state, {
        route: '',
      });

    default:
      return state;
  }
};

export default session;
