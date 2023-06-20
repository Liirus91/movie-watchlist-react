export default (state, action) => {
  switch (action.tipe) {
    case 'ADD_MOVIE_TO_WATCHLIST':
      return { ...state, watchlist: [action.payload, ...state.watchlist] };
    default:
      return state;
  }
};
