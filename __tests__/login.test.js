import React from 'react';
import { create, act } from 'react-test-renderer';
import * as eva from '@eva-design/eva';
import { RootSiblingParent } from 'react-native-root-siblings';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Login from '../screens/Login/login';
jest.useFakeTimers();

const userObject = {
  email: 'testuser@email.com',
  password: 'Password123!',
};

const getComponent = () => {
  return create(
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

describe('Login Function', () => {
  test('renders login button', () => {
    const component = getComponent();
    const loginButton = component.root.findByProps({
      testID: 'loginButton',
    });
    expect(loginButton).toBeTruthy();
  });

  test('renders sign up button', () => {
    const component = getComponent();
    const signupButton = component.root.findByProps({
      testID: 'signupButton',
    });
    expect(signupButton).toBeTruthy();
  });

  test('updates email input field', () => {
    const component = getComponent();
    const emailInput = component.root.findByProps({ testID: 'emailInput' });
    act(() => {
      emailInput.props.setEmail(userObject.email);
    });
    expect(emailInput.props.email).toBe(userObject.email);
  });

  test('updates password input field', () => {
    const component = getComponent();
    const passwordInput = component.root.findByProps({
      testID: 'passwordInput',
    });
    act(() => {
      passwordInput.props.setPassword(userObject.password);
    });
    expect(passwordInput.props.password).toBe(userObject.password);
  });
});
