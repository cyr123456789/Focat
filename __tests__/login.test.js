import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as eva from '@eva-design/eva';
import { RootSiblingParent } from 'react-native-root-siblings';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Login from '../screens/Login/login';

const getComponent = () => {
  return render(
    <RootSiblingParent>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Login />
      </ApplicationProvider>
    </RootSiblingParent>
  );
};

describe('Snapshot Test', () => {
  test('renders correctly', () => {
    const component = getComponent().toJSON();
    expect(component).toMatchSnapshot();
  });
});

describe('Sign Up Function', () => {
  /**
   * valid logid n password
   * invalid logid n password
   * empty
   */
  test('returns login page due to empty fields', () => {
    const { queryByTestId } = getComponent();
    const loginButton = queryByTestId('loginButton');
    fireEvent.press(loginButton);
    expect(queryByTestId('loginButton')).toBeTruthy();
  });

  // TODO
  test('returns successful login', () => {
    const userObject = {
      username: 'Test User',
      email: 'testuser@email.com',
      password: 'Password123!',
    };
    const { getByPlaceholderText, queryByTestId } = getComponent();
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = queryByTestId('loginButton');
    fireEvent.changeText(emailInput, userObject.email);
    fireEvent.changeText(passwordInput, userObject.password);
    fireEvent.press(loginButton);

    expect(queryByTestId('loginButton')).toBeTruthy();
  });
});

describe('Login Function', () => {});
