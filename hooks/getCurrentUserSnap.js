let userSnap;

export const setCurrentUserSnap = (snap) => {
  userSnap = snap;
};

export const currentUserSnap = () => {
  return userSnap;
};
