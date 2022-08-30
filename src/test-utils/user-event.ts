import userEvent from '@testing-library/user-event';

export default () => {
  // @ts-ignore
  if (userEvent.default !== undefined) {
    // @ts-ignore
    return userEvent.default;
  }

  return userEvent;
};
