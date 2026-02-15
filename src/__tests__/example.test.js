import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View, Text } from 'react-native';

describe('Example', () => {
  it('works', () => {
    render(
      <View>
        <Text>Hello World</Text>
      </View>,
    );
    expect(screen.getByText('Hello World')).toBeOnTheScreen();
  });
});
