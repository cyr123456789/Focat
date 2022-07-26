# Focat

## Team Name

Focat

## Links to the project materials

[APK file](https://expo.dev/@venuslimm/Focat), [Poster](https://drive.google.com/file/d/1yqlfmytt7FJdj57hl4IUf7sWteaJEKGw/view), [Video](https://drive.google.com/file/d/1_b5Gn_Acp0OYRCcJlNI6h3xiLA0Nw8yl/view?usp=sharing)

## Motivation

It is hard to stay focused with the abundance of applications on our mobile devices demanding our attention and, as students, it can be hard to visualise progress in your studies which is demotivating when you have spent hours studying yet nothing to show for it. By using Focat, **a gamified timer mobile application**, you can be rewarded for putting down your phone and staying focused.

Whenever you need to sit down and focus on your studies, you can start a focus session on Focat and put down your phone to focus on getting things done until the session timer runs out. Your progress will be shown on the dashboard giving you a sense of achievement after successfully completing a focus session which will also motivate you to stop procrastinating and to build upon time management habits.

Peer pressure is a powerful influence and by using Focat, users create positive feedback loops within their circle of friends by encouraging one another to sit down and focus together. With features like focus time hiscores and push notifications whenever a friend starts a focus session, users will be positively peer pressured into starting a focus session themselves or joining their friends to do so.

## Project Scope

We hope to replicate most of the basic features of a similar app called Forest and further improve upon it by adding features that we wanted to have when we were using the Forest app ourselves.

Instead of planting trees like in Forest, Focat will have users each raise a cat of their choice, which they can choose when they first register on the application. The more time they spend focusing, the more in-game currency rewards they will receive which can be spent on their in-game pets.

## Features

1. Login Page

- Users will be able to login.
- Users will be able to register for an account.
- Users will be able to reset their password.

2. Home Page

- There is a timer and stopwatch for users to set the duration of their next focus session.
- There is a start button for the host to start the session.
- There will be a button for them to join the friend’s session if there is an active session.

3. Sessions

- Users can only join their friends once the session has started.
- Only the host of the session can stop the session for all participants, if participants choose
  to stop the session, it will only be stopped for themselves.
- At the end of the session, users will be rewarded with points based on the session
  duration.

4. To-do list

- There is a to-do list for users to keep track of the tasks to be completed.

5. Leaderboard

- Users can see the top 100 users with the highest overall points.
- Users can conveniently add other users as friends in this screen.

6. Friends

- Users can see their lists of friends.
- Users can search up other users to add them as friends.
- Users can add/remove friends in their friends list.
- Users will be able to see which of their friends are currently in a session and will be able
  to join their friend's session directly from this page.

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

### Database Design on Google Firebase

![alt text](../assets/design/database_schema.png?raw=true)

Focat’s database is set up as shown above. Even though we are using Firebase Cloud Firestore and can
nest data up to 100 levels deep, we decided to design our data as lightweight and flat as possible to make
it easier to work with. With this decision in mind, we decided to nest complex objects like Arrays within
the documents and keep the number of keys as few as possible. This is not as scalable because as the lists
grow larger, the document might take a longer time to be retrieved. However, this allows us to easily
setup and streamline our data structure.

8
The User Id collection is stored in Firebase Authentication. When a user signs up on Focat, a document,
consisting of the userid, email, and password, will be created in Firebase Authentication. The userid is
used to link the User Id collection in Firebase Authentication with the User collection in Firestore
Database. The newly created document in the User collection will consist of the userid and the remaining
User keys when the user signs up. When the user begins a session, a document will be created in the
Sessions collection.

### Local Storage using AsyncStorage

We stored several data locally so that the users do not need to have Internet access to retrieve them.
These data include their username and todo tasks. We chose AsyncStorage because it does not require
additional setup to use it. However, it has slow runtime and do not allow developers to index the values
stored in AsyncStorage. Hence, we only used it to store small amounts of data when necessary and
convenient.

### State Management

Although Redux is a great tool used for state management, we did not use it in our code and only used
the useState hook. We believe useState hook is sufficient for our app and do not need to implement
Redux.

### Wireframe

![alt text](../assets/design/wireframe.png?raw=true)

## Implementation

### Landing Page

![alt text](../assets/implementation/landing_page.png?raw=true)

A screen meant to be shown only upon the first launch of Focat. By using AsyncStorage, a string is saved in the device's local storage during the first launch of Focat. In subsequent launches, Focat will check whether the string exists and decide whether to display this screen.

A challenge faced in the development of this screen was in the ability to test whether the screen only shows up during the first launch. The React Native Debugger tool could be used to read into the contents of AsyncStorage but there were problems encountered in installing the tool, hence instead of using the debugger tool, a temporary button to reset the device's AsyncStorage contents was created and subsequently removed when the first launch detection functionality was sufficiently tested. If possible, automated testing could be set up in future milestones.

### Login

![alt text](../assets/implementation/login.png?raw=true)

A login screen implemented with Firebase Authentication. Error messages will be shown if incorrect
credentials are provided. Users can also continue using Focat without logging in if they do not wish to use
online features such as getting rewards and interacting with other users.

### Signup

![alt text](../assets/implementation/signup.png?raw=true)
![alt text](../assets/implementation/signup_password_error.png?raw=true)
![alt text](../assets/implementation/signup_username_error.png?raw=true)
![alt text](../assets/implementation/signup_success.png?raw=true)

To implement the signup, we used Firebase Authentication to store and validate credentials, and Firestore
Database to store usernames.

Users can create their Focat accounts on this screen. All fields must be filled up before the user can create
an account. Input restrictions are enforced for security reasons. Username input can have a maximum of
15 characters. Password input must have at least 8 characters, consisting of at least 1 upper case
character, 1 lower case character, and 1 special character. This is a necessary security practice that makes
it harder for hackers to crack the users’ passwords and prevents dictionary attacks. The input entered in
both password fields must be the same before the user can create an account on Firebase. Both email
and password are stored in Firebase Authentication. The username is stored in Firestore Database, which
links to the corresponding user row in Firebase Authentication using the UID that is automatically
generated for each user in Firebase Authentication.

In Milestone 1, Redux was implemented to store the username. However, the redux state did not persist
upon restarting the app. Hence, in Milestone 2, this persistence feature is implemented using
AsyncStorage.

### Countdown Timer && Sessions

![alt text](../assets/implementation/countdown_timer_not_inprogress.png?raw=true)
![alt text](../assets/implementation/countdown_timer_inprogress.png?raw=true)
![alt text](../assets/implementation/friend_list.png?raw=true)
![alt text](../assets/implementation/session_incomplete.png?raw=true)

A countdown timer that users can start and stop. If users are logged in, their session progress will be
tracked and points (cat cash) will be awarded upon successful completion of the focus session. If the user
prematurely ends the session, there will be a popup saying that the session is incomplete.

If a user’s friend is currently in a session, the user can join their session by clicking the join button in the
friend list page. The timers for all users within the same session will be synchronised.

To implement this screen, we added listeners onto the screen such that whenever any changes happen
on the backend, the front end will update accordingly.

We have 3 event listeners on this screen.

The first event listener listens for changes in the user’s current session. If the user session is in progress,
the UI will be updated accordingly. This is to ensure that if a user closes the application halfway through
the session, their UI will be synced again when they reconnect.

The second event listener also listens for changes in the user’s current session. If the user session
starts/stop, popups will be shown to the user depending on whether the current session was successfully
completed.

The third event listener listens for changes with the user’s cat cash amount and updates the UI
accordingly.

A challenge faced in the development of this screen was that the available libraries online were not
suitable for the intended design of Focat. This was solved by creating a custom component for the
countdown timer and by extension, this also solved the problem in looking for a suitable stopwatch library.

Another challenge faced was in the development of the design of the slider. However, this was overcome
by temporarily using a standard slider library and deferring the UI modifications to future milestones.

### Stopwatch

![alt text](../assets/implementation/stopwatch.png?raw=true)

A stopwatch alongside the countdown timer. Swipe left on the home screen to reach this page. This is just
a simple functionality for users who wish to count up instead of count down. However, there will not be
rewards given for using this feature, because users can leave it on indefinitely to gain rewards against the
spirit of Focat.

To implement this, we used the same component to display the time left in the countdown timer, but
instead, we increment the timer instead of decrementing it.

### Navigation Drawer

![alt text](../assets/implementation/navigation_drawer_guest.png?raw=true)
![alt text](../assets/implementation/navigation_drawer_user.png?raw=true)

A navigation drawer for users to navigate to different screens of Focat. Users will be shown different
contents in the navigation drawer depending on their login status. If the user is not logged in, they will
not be able to navigate to the Friends screen.

To implement the navigation system within Focat, we utilised React Navigation which provides both Stack
and Drawer Navigation. Stack Navigation is used for the landing page, login and signup page while the
remaining pages uses Drawer Navigation. The navigation drawer is also customised to fit components at
the top and bottom of the drawer.

### Friends System

![alt text](../assets/implementation/friend_list.png?raw=true)
![alt text](../assets/implementation/friend_search.png?raw=true)
![alt text](../assets/implementation/friend_add.png?raw=true)
![alt text](../assets/implementation/friend_request.png?raw=true)

This page shows a list of all users that the user is friends with. The user can open the Search Friends modal
and Friend Requests modal from this page, join the current focus session of their friends, and delete their
friends.

In the Search Friends modal, users can look up all users and send them friend requests. After sending the
request, the button will change from Add to Pending.

In the Friend Requests modal, users can see incoming friend requests and choose whether to accept or
reject them.

To implement this page, we used 2 event listeners to update the UI according to the database accordingly.
The first event listener listens for changes in the user’s friend list, whenever a friend is added or removed,
the event listener will fetch the changes and reflect the changes on the UI accordingly.

The second event listener listens for changes in the user’s friend requests, whenever a friend request is
received, the event listener will fetch the changes and reflect the changes on the UI accordingly.

A challenge faced in implementing this page was that the UI was not updating appropriately whenever
buttons are clicked. To fix this problem, we fetch the relevant data from the database whenever the user
clicks on a button which will update the components automatically as React refreshes components
whenever data changes.

### Leaderboard

![alt text](../assets/implementation/leaderboard.png?raw=true)

This page shows the top 100 richest users based on the amount of cat cash the users own.

A challenge faced when implementing this page was that the cat cash amount does not update in real
time. It takes a lot of resources to set up 100 listeners to listen for each individual’s cat cash amount,
hence we overcame this challenge by refreshing the page every time the user focuses onto this screen.
React Navigation provides a hook called useFocusEffect which runs a function every time the screen is
focused. We utilised this hook to update the page accordingly.

### Todo List

![alt text](../assets/implementation/todo_list.png?raw=true)
![alt text](../assets/implementation/todo_list_add_task.png?raw=true)
![alt text](../assets/implementation/todo_list_task_completed.png?raw=true)

This page shows a list of tasks that the user has added to their todo list. Users can strike off the tasks when
they have done the tasks by clicking on the container wrapping the task. Users can also delete the tasks
from their todo list by clicking on the trash bin beside the task title.

The tasks are only stored locally using AsyncStorage. When the user logs out, their tasks will be deleted
permanently and cannot be retrieved again since they are not stored onto the database.

A challenge faced when implementing this feature is the amount of time needed to execute the
AsyncStorage codes. The long execution time causes the application to lag on the todo screen.
Furthermore, when the user adds many tasks, the whole application lags, affecting the user experience.
To overcome this challenge, we plan to use a more efficient method to store the tasks if time permits.
Instead of constantly accessing the AsyncStorage item, “tasks”, when actions are performed on this
screen, we can implement Redux to store the tasks temporarily and only read and update the tasks in
AsyncStorage when the user opens and closes the app.

## Tests

### Unit Testing

Unit tests are written using Jest, a JavaScript testing framework, to make sure that the login and sign-up
components are rendered correctly. Snapshot tests are also written for these components to make sure
that the user interface does not change unexpectedly.

For the Login screen, the unit tests expect the login button and button that directs the user to the Sign-
Up screen to render as expected. Moreover, the tests expect the email and password input fields to be

updated to the correct values when values are entered. The unit tests written for the Sign-up screen are
similar to the unit tests written for the Login screen. These tests are important because the user must be
able to login or sign up without any issues caused by the UI since logging in and signing up are the first
few steps performed by the user when they use this app.
Implementing this was challenging because of the slightly steep learning curve to software testing. It was
also difficult to debug the errors as there was no user interface to refer to. However, with the help of
logging, debugging was much easier.
Below is a screenshot of the results from running the unit test. The test failed because the current
components rendered are different from the snapshot that was saved previously. We were able to pass
all the tests after we updated the snapshots using [npm test -- -u].
![alt text]()
![alt text]()

### User Testing

User Testing was conducted after the app is completed for Milestone 3. Users were given instructions to
install Expo Go on their Android phones and they were also provided with the Expo link to access the Focat
app. After testing the app, they input their feedbacks and suggestions onto a Google Form provided by us
and below are some of the findings.

![alt text]()

A total of 9 users have tested our application and above are their demographics, with 66.7% of them
currently studying in university, 22.2% of them working, and 11.1% of them in tertiary education.

## Timeline

### Features by Milestone 1 (30 May):

1. Do up the skeleton of the application

- Login (Home Page for non-logged in users)
- Registration
- Settings, including Logout

2. Timer and stopwatch for one user

### Features by Milestone 2 (27 Jun):

1. Friend system

- Display friend list
- Search users
- Send friend request
- Receive and accept friend request

2. Focus sessions

- Allow multiple users to be in the same focus session
- Join a friend’s ongoing focus session through the friend list

### Features by Milestone 3 (25 Jul):

1. To-do list

- Allow users to add and delete tasks

2. Leaderboard

- Display top 100 users based on points.

3. App Enhancements

- Real-time updates for friends list and session start/stop
- UI enhancements

### Potential Future Features/Improvements

1. More focus session features

- Join a friend's room through their list of friends instead of waiting for invite code/link
- Chat room within the application itself (Before the session starts)
- Send focus session invitations to friends

2. Dashboard

- Display weekly, monthly, yearly focus time statistics
- Filter the statistics based on the to-do list categories

3. Timeline

- Display user and friends’ progress and achievements

4. Store

- Implement in-game currency feature
- Display a list of items that the user own and items that are sold at the store
- Allow user to purchase items with their Cat Cash

5. Push notification reminders to clock in focus sessions and when friends begin sessions

- Users can choose to turn it off in the Settings screen

6. Profile page to interact with user items

7. More to-do list features

- Add deadlines and categories
- Sort tasks by categories or deadlines

8. Achievements

- Display list of achievements that have been completed and to be completed

## Project Log

| S/N |                                 Task                                  |        Date         | Yun Rong (hrs) | Venus (hrs) |
| :-: | :-------------------------------------------------------------------: | :-----------------: | :------------: | :---------: |
|  1  |                    Team meetings, initial planning                    | 09/05/22 - 13/05/22 |       7        |      7      |
|  2  |                Proposal, poster and video for Liftoff                 | 09/05/22 - 13/05/22 |       6        |      6      |
|  3  |                     Meeting with Orbital adviser                      |      09/05/22       |       1        |      1      |
|  4  |                   Prepare mentor matching materials                   |      13/05/22       |       3        |      3      |
|  5  |           Self-learn new technologies and attend workshops            | 14/05/22 - 30/05/22 |       20       |     20      |
|  6  |         Design tech stack, program flowchart, database schema         | 17/05/22 - 20/05/22 |       5        |      5      |
|  7  |                        Create Figma Wireframe                         | 17/05/22 - 20/05/22 |       1        |     15      |
|  8  |       Create login screen, setup Firebase and setup Github repo       | 17/05/22 - 20/05/22 |       5        |      1      |
|  9  |                     Create getting started screen                     | 22/05/22 - 28/05/22 |       3        |      0      |
| 10  |         Create signup screen and link it to Firebase database         | 23/05/22 - 28/05/22 |       0        |      8      |
| 11  |                 Create countdown timer and stopwatch                  | 23/05/22 - 28/05/22 |       5        |      0      |
| 12  |                      Create UI for settings page                      | 25/05/22 - 28/05/22 |       2        |      0      |
| 13  |          Setup navigation stack and custom navigation drawer          | 25/05/22 - 28/05/22 |       3        |      0      |
| 14  |                             Update READme                             |      29/05/22       |       3        |      0      |
| 15  |               Create .apk for users to test application               |      29/05/22       |       0        |      1      |
| 16  |                            Peer evaluation                            | 31/05/22 - 05/06/22 |       3        |      3      |
| 17  |                   Implement Friends system feature                    | 08/06/22 - 20/06/22 |       12       |      0      |
| 18  |           Create unit tests for Login and Sign Up features            | 14/06/22 - 21/06/22 |       0        |      6      |
| 19  |                 Implement Single user Session feature                 | 17/06/22 - 25/06/22 |       8        |      0      |
| 20  |               Update drawer navigation username display               | 21/06/22 - 22/06/22 |       0        |      2      |
| 21  |                  Attempted to implement Chat Feature                  | 24/06/22 - 28/06/22 |       0        |      5      |
| 22  |                 Implement Multi users Session feature                 | 25/06/22 - 26/06/22 |       4        |      0      |
| 23  |                     Update Video for Milestone 2                      | 26/06/22 - 27/06/22 |       6        |      0      |
| 24  |                     Update Poster for Milestone 2                     | 26/06/22 - 27/06/22 |       0        |      6      |
| 25  |                     Update READme and Project Log                     | 26/06/22 - 27/06/22 |       5        |      5      |
| 26  |            Prepare prototype for users to test application            |      27/06/22       |       0        |      1      |
| 27  |                            Peer evaluation                            | 28/06/22 - 03/07/22 |       3        |      3      |
| 28  | Evaluate peer evaluation and improve on current features and fix bugs | 04/07/22 - 10/07/22 |       8        |      8      |
| 29  |                     Implement Leaderboard feature                     | 11/07/22 - 23/07/22 |       4        |      0      |
| 30  |                      Implement Todo list feature                      | 11/07/22 - 23/07/22 |       0        |     15      |
| 31  |                             Refactor code                             | 11/07/22 - 23/07/22 |       12       |      5      |
| 32  |                 Fix bugs to prepare for user testing                  | 23/07/22 - 24/07/22 |       10       |      6      |
| 33  |                              Clean up UI                              | 23/07/22 - 24/07/22 |       0        |      6      |
| 34  |                     Update Video for Milestone 2                      | 23/07/22 - 24/07/22 |       6        |      0      |
| 35  |                     Update Poster for Milestone 2                     | 23/07/22 - 24/07/22 |       0        |      6      |
| 36  |                     Update READme and Project Log                     | 22/07/22 - 24/07/22 |       5        |      5      |
| 37  |            Prepare prototype for users to test application            |      24/07/22       |       0        |      1      |
|     |                                                                       |     Total hours     |      150       |     150     |
