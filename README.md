# Focat

## Team Name

Focat

## Links to the project materials

[APK file](https://expo.dev/artifacts/0413f217-f600-4bd1-bd69-7893ef037eb9), [Poster](https://drive.google.com/file/d/1_vdZ7aGngZ0KxI86qr9NWiPJacvyxbDe/view?usp=sharing), [Video](https://drive.google.com/file/d/1TGBXktSJMU_t8y5HA2QlCAqS_8dgSNUG/view?usp=sharing)

## Motivation

It is hard to stay focused with the abundance of applications on our mobile devices demanding our attention and, as students, it can be hard to visualise progress in your studies which is demotivating when you have spent hours studying yet nothing to show for it. By using Focat, **a gamified timer mobile application**, you can be rewarded for putting down your phone and staying focused.

Whenever you need to sit down and focus on your studies, you can start a focus session on Focat and put down your phone to focus on getting things done until the session timer runs out. Your progress will be shown on the dashboard giving you a sense of achievement after successfully completing a focus session which will also motivate you to stop procrastinating and to build upon time management habits.

Peer pressure is a powerful influence and by using Focat, users create positive feedback loops within their circle of friends by encouraging one another to sit down and focus together. With features like focus time hiscores and push notifications whenever a friend starts a focus session, users will be positively peer pressured into starting a focus session themselves or joining their friends to do so.

## Project Scope

We hope to replicate most of the basic features of a similar app called Forest and further improve upon it by adding features that we wanted to have when we were using the Forest app ourselves.

Instead of planting trees like in Forest, Focat will have users each raise a cat of their choice, which they can choose when they first register on the application. The more time they spend focusing, the more in-game currency rewards they will receive which can be spent on their in-game pets.

## Features

1. Login Page

-   Users will be able to login.
-   Users will be able to register for an account.
-   Users will be able to reset their password.

2. Home Page

-   There is a timer and stopwatch for users to set the duration of their next focus session.
-   Before a session begins, it can be tagged with a task/label for dashboard statistics.
-   Users can see the list of people in the room waiting for the session to start.
-   Users can communicate with users within the same room but only before the session begins. There is no communication feature during the session.
-   There is a start button for the host to start the session.
-   If the host leaves the room, the host will be automatically transferred to someone else in the room.
-   Each session can be set to play simple background music/sounds during the session.
-   Friends of the user will be notified through push notifications when a friend begins/is about to begin a session.
-   Friends of the user can join the session without the session code. There will be a button for them to join the friend’s session if there is an active session.
-   For the first session of each day, users will be given additional rewards.

3. To-do list

-   There is a to-do list for users to keep track of the tasks to be completed.
-   The to-dos listed here can be selected to be tracked for completion in the home page before a session starts.

4. Dashboard

-   Users can see their dashboard on daily, weekly, monthly, or yearly focus time statistics.
-   They can see their focus time distribution based on the tags they chose before the start of each session.

5. Profile

-   Users will see their cats here and be able to customise their own cats.

6. Timeline

-   Users can see their own progress and achievements.
-   Users can see their friend's progress and achievements.

7. Friends

-   Users can see their lists of friends.
-   Users can add/remove friends in their friends list.
-   Users can see basic statistics of their friends such as total hours focused.
-   Users can click on their friends to see their cats and more detailed statistics.
-   Users will be able to see which of their friends are currently in a session and will be able to join their friend's session directly from this page.

8. Achievements

-   Users can see a list of achievements that they can complete to get rewards.
-   Examples of achievements include:
    -   Time spent focusing
    -   Number of days they checked in on their cats
    -   Number of friends they have
    -   Number of sessions completed as a group

9. Store

-   Users can purchase items from the store.
-   Examples of items include:
    -   Clothes and accessories for the cats
    -   Cat breeds (application themes)

10. Settings

-   Users will be able to configure their account settings such as e-mail and password.
-   Users will be able to configure their application notification settings.
-   Users will be able to set the theme of their application.

## User Stories

1. As a student who uses Forest, I wish it has many more features that cater to my needs and streamline my study process.

2. As a student who gets distracted by the social media platforms and games on my phone, I want to be able to restrict myself from using applications that I am addicted to and be rewarded for being productive.

3. As a student who does not have anyone to study with at home, I want to be able to study with my friends and have a character that is virtually there to study with me.

4. As a student who gets too engrossed when studying, I want to be able to set a stopwatch to remind myself to take a break after every study session and not overwork myself.

5. As a student who wishes to know how much time I spend on each module, I want to be able to time myself and give this duration a tag to indicate the module I was studying. This can help me to keep track of which are the modules I should focus more on.

6. As a student who enjoys using software to keep track of my study progress, I want to be able to keep track of all my study progress on one single application.

7. As a user of Forest but not a huge fan of trees, I would like a similar app with a different theme and more functionality.

## Design

### Tech Stack

![alt text](../assets/design/tech_stack.png?raw=true)

### Program Flowchart

![alt text](../assets/design/program_flowchart.png?raw=true)

### Database Schema

![alt text](../assets/design/database_schema.png?raw=true)

### Wireframe

![alt text](../assets/design/wireframe1.png?raw=true)
![alt text](../assets/design/wireframe2.png?raw=true)

## Current Implementation (Milestone 1)

### Getting Started

![alt text](../assets/implementation/get_started.png?raw=true)

A screen meant to be shown only upon the first launch of Focat. By using AsyncStorage, a string is saved in the device's local storage during the first launch of Focat. In subsequent launches, Focat will check whether the string exists and decide whether to display this screen.

A challenge faced in the development of this screen was in the ability to test whether the screen only shows up during the first launch. The React Native Debugger tool could be used to read into the contents of AsyncStorage but there were problems encountered in installing the tool, hence instead of using the debugger tool, a temporary button to reset the device's AsyncStorage contents was created and subsequently removed when the first launch detection functionality was sufficiently tested. If possible, automated testing could be set up in future milestones.

### Login

![alt text](../assets/implementation/login.png?raw=true)

A login screen implemented with Firebase Authentication. Error messages upon logging in are not yet implemented but will be in subsequent milestones.

### Signup

![alt text](../assets/implementation/signup.png?raw=true)

Users can create their Focat accounts on this screen. All fields must be filled up before the user can create an account. Input restrictions are enforced for security reasons. Username input can have a maximum of 15 characters. Password input must have at least 8 characters, consisting of at least 1 upper case character, 1 lower case character, and 1 special character. The input entered in both password fields must be the same before the user can create an account on Firebase. Both email and password are stored in Firebase Authentication. The username is stored in Firestore Database, which links to the corresponding user row in Firebase Authentication using the UID that is automatically generated for each user in Firebase Authentication.

Redux is implemented to store the username. However, the redux state does not persist upon restarting the app. Hence, this persistence feature will be implemented in subsequent milestones.

### Countdown Timer

![alt text](../assets/implementation/countdown_timer_solo.png?raw=true)
![alt text](../assets/implementation/countdown_timer_group.png?raw=true)

A simple proof-of-concept countdown timer which only works locally. Simple UI for group countdowns have been implemented but actual group countdown functionality will be implemented in subsequent milestones.

A challenge faced in the development of this screen was that the available libraries online were not suitable for the intended design of Focat. This was solved by creating a custom component for the countdown timer and by extension, this also solved the problem in looking for a suitable stopwatch library.

Another challenged faced was in the development of the design of the slider. However, this was overcame by temporarily using a standard slider library and deferring the UI modifications to future milestones.

### Stopwatch

![alt text](../assets/implementation/stopwatch.png?raw=true)

A stopwatch alongside the countdown timer. Swipe left on the home screen to reach this page. Functionality is complete but the UI will be improved upon in subsequent milestones.

### Settings

![alt text](../assets/implementation/settings.png?raw=true)

A settings screen for users to configure their account and application settings. No functionality has been added yet but will be in subsequent milestones.

### Navigation Drawer

![alt text](../assets/implementation/navigation_drawer.png?raw=true)

A navigation drawer for users to navigate to different screens of Focat. Functionality is complete. In subsequent milestones, the user's username will be displayed at the top of the drawer instead of the user's email.

## Projected Timeline

### Features by Milestone 1 (30 May):

1. Do up the skeleton of the application

-   Login (Home Page for non-logged in users)
-   Registration
-   Settings, including Logout

2. Timer and stopwatch for one user

### Features by Milestone 2 (27 Jun):

3. Friend system including friends list
4. Joining other sessions via unique code or unique URL

-   Join a friend's session halfway
-   Join a friend's room instead of waiting for invite code/link
-   Transfer host of the room when host leaves the room
-   Chat room within the application itself (Before the session starts)

5. Dashboard
6. Timeline
7. Goals

-   Goal setting
-   To-do list
-   Session tags

### Features by Milestone 3 (25 Jul):

8. Achievements
9. Store
10. Push notification reminders to clock in focus sessions and when friends begin sessions
11. Profile page to interact with user items

## Project Log

| S/N |                           Task                            |        Date         | Yun Rong (hrs) | Venus (hrs) |
| :-: | :-------------------------------------------------------: | :-----------------: | :------------: | :---------: |
|  1  |              Team meetings, initial planning              | 09/05/22 - 13/05/22 |       7        |      7      |
|  2  |          Proposal, poster and video for Liftoff           | 09/05/22 - 13/05/22 |       6        |      6      |
|  3  |               Meeting with Orbital adviser                |      09/05/22       |       1        |      1      |
|  4  |             Prepare mentor matching materials             |      13/05/22       |       3        |      3      |
|  5  |     Self-learn new technologies and attend workshops      | 14/05/22 - 30/05/22 |       20       |     20      |
|  6  |   Design tech stack, program flowchart, database schema   | 17/05/22 - 20/05/22 |       5        |      5      |
|  7  |                  Create Figma Wireframe                   | 17/05/22 - 20/05/22 |       1        |     15      |
|  8  | Create login screen, setup Firebase and setup Github repo | 17/05/22 - 20/05/22 |       5        |      1      |
|  9  |               Create getting started screen               | 22/05/22 - 28/05/22 |       3        |      0      |
| 10  |   Create signup screen and link it to Firebase database   | 23/05/22 - 28/05/22 |       0        |      8      |
| 11  |           Create countdown timer and stopwatch            | 23/05/22 - 28/05/22 |       5        |      0      |
| 12  |                Create UI for settings page                | 25/05/22 - 28/05/22 |       2        |      0      |
| 13  |    Setup navigation stack and custom navigation drawer    | 25/05/22 - 28/05/22 |       3        |      0      |
| 14  |                       Update READme                       |      29/05/22       |       3        |      0      |
| 15  |         Create .apk for users to test application         |      29/05/22       |       0        |      1      |
|     |                                                           |     Total hours     |       64       |     67      |
