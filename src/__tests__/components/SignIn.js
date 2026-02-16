import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import { SignInForm } from '../../components/SignIn';

jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useNavigate: () => jest.fn(),
}));

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'eclose');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'secret');
      fireEvent.press(screen.getByText('Log In'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'eclose',
          password: 'secret',
        });
      });
    });
  });
});
