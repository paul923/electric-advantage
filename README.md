# Getting Started with Electric Advantage.

This project is made with:

Frontend: [React](https://reactjs.org/)

Backend: [MariaDB](https://mariadb.org/)

Authtentication: [Firebase](https://firebase.google.com/)

## Initial setup

### Authorization configuration

To enable authentication on the applcation you will need to follow these steps:

1. Find the ".env.local" file in the project directory.

![directory](./src/images/directory.png?raw=true "directory")

2. Sign in to your [Firebase](https://firebase.google.com/) account
3. Click on your firebase project.

![console](./src/images/console.png?raw=true "console")

4. Click on settings for your project

![settings](./src/images/settings.png?raw=true "settings")

5. Scrolldown to "SDK setup and configuration" and copy and paste corresponding values to .env.local.

![configuration](./src/images/configuration.png?raw=true "configuration")

6. When copying and paste values, values SHOULD NOT BE wrapped in "".

![envlocal](./src/images/envlocal.png?raw=true "envlocal")

7. Now you are all set with authentication!

### Database configuration:

1. Setup MariaDB or MySQL on your drive and do basic setup including user, ip, and port.
2. Create file with name `.env` under `electric-advantage/backend`
3. Fill in `.env` with content underneath and replace following information (Remove double quotes):

```
DATABASE_HOST="Database HOST IP"
DATABASE_PORT="Database PORT"
DATABASE_USERNAME="Database username goes here"
DATABASE_PASSWORD="Database password goes here"
```

4. If you would like to change the port of the server running, port could be changed from `electric-advantage/backend/backend.js`. It is located on the very bottom of the file. Currently it is set to 3000.

### Basic setup for the frontend:

Frontend setup:

To run the commands for the project you will need these requirements on your local machine:

[Node.js and npm](https://www.npmjs.com/get-npm)

[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## How to run the project

### Installing npm

Go to https://www.npmjs.com/get-npm and click "Download Node.js and npm".

### `npm -v`

### `npm install npm@latest -g`

Checks if npm is installed, command will retrieve the npm version you currently have installed.\
Updates the version of npm installed.

There are 2 parts for this project and each part has to be run seperate

To run the frontend part of the project,
navigate to project directory(../electric-advantage/) in cmd, and run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:2000](http://localhost:2000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To run the backend part of the project,
navigate to backend directory(../electric-advantage/backend) in another cmd, and run:

### `npm install`

### `npm start`

Runs the server as the backend.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Your console will keep track of your backend activity and status.

## Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Dealership Registeration

Dealerships can signup in the signup page.

To complete the registeration, dealership account will send the admin an email including their information.

Once the admin received the email, admin can register the dealership based on the information.

Dealerships will have access to the dealership menu only if they are registered.

### Dealership Registeration Flow

1. When a new dealership signs up, they will be blocked from accessing dealer menus and see dealership regsiteration.

![dealershipreg](./src/images/dealershipreg.png?raw=true "dealershipreg")

2. When dealership registeration is clicked, it will make an email draft to send it to the admin.

![email](./src/images/email.png?raw=true "email")

3. When admin receive the email, log in with admin account and navigate to "dealership registeration" page

![register](./src/images/register.png?raw=true "register")

4. Register the dealership based on the information email from a dealership.

![register2](./src/images/register2.png?raw=true "register2")

5. If the dealership registeration is complete, dealership account will have access to the dealer menu.

![dealer](./src/images/dealer.png?raw=true "dealer")
