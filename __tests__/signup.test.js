import React from 'react';
import { create, act } from 'react-test-renderer';
import * as eva from '@eva-design/eva';
import { RootSiblingParent } from 'react-native-root-siblings';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  IconRegistry,
  Button,
} from '@ui-kitten/components';
import Signup from '../screens/Signup/signup';
jest.useFakeTimers();

const userObject = {
  username: 'Test User',
  email: 'testuser@email.com',
  password: 'Password123!',
};

const getComponent = () => {
  return create(
    <RootSiblingParent>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Signup />
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

describe('Signup Function', () => {
  test('renders sign up button', () => {
    const component = getComponent();
    const signupButton = component.root.findByType(Button);
    expect(signupButton).toBeTruthy();
  });

  test('updates username input field', () => {
    const component = getComponent();
    const usernameInput = component.root.findByProps({
      testID: 'usernameInput',
    });
    act(() => {
      usernameInput.props.onChangeText(userObject.username);
    });
    expect(usernameInput.props.value).toBe(userObject.username);
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

  test('updates confirm password input field', () => {
    const component = getComponent();
    const passwordInput = component.root.findByProps({
      testID: 'confirmPasswordInput',
    });
    act(() => {
      passwordInput.props.onChangeText(userObject.password);
    });
    expect(passwordInput.props.value).toBe(userObject.password);
  });
});
