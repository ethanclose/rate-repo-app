import React from 'react';
import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hello {name}!</Text>
    </View>
  );
};

describe('Greeting', () => {
  it('renders the correct message based on props', () => {
    render(<Greeting name="Ethan" />);

    // screen.debug();

    expect(screen.getByText('Hello Ethan!')).toBeDefined();

    expect(screen.getByText('Hello Ethan!')).toBeOnTheScreen();
  });
});
