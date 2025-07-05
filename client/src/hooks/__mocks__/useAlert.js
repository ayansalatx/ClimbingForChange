// Mock implementation of useAlert
export const useAlert = () => ({
  displayAlert: jest.fn(),
  clearAlert: jest.fn(),
  AlertComponent: () => null,
});

export default useAlert;
