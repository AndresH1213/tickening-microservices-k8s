export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}), // returns a mock promise
  },
};
