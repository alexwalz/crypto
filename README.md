# CryptoMe Web Application

This is an application starting point that is fully configured with the following:

* React (v 15.6.2 - via `create-react-app`)
* React Router
* Redux (with form and router)
* Express
* Node.js 
* MongoDB


## Installation 

1. Install all dependencies from the server level `yarn install`

2. Install all dependencies from the client level `cd client && yarn install`

3. Use nodemon to start the express server `nodemon server.js`. This will listen for any changes to the server file and automatically update. 

4. Start the client server `cd client && yarn start`

## Configuring React
The client of this app was built using [create-react-app](https://github.com/facebook/create-react-app). It comes complete with react router for easy page/component navigation. In order to get started, modify the routes in `client/components/App.js`. A home page component has already been created as a template, as well as a 404 page. 

## Configuring Redux
The redux store is configured in `client/tools/store.js`. Thunk middleware has been added as well as a router and form reducer. All reducers are stored in `client/reducers` and actions are stored in `client/actions`. A template has already been created for these as well. 

## Configuring a Database
You need to configure the database URL found in `/config/index.json`. If you're using an online source like mLab, just paste the access URL in the file.

## Deploying to Heroku
Once the application has been setup, simply create a heroku instance (`heroku create` from the terminal if you've installed the Heroku CLI) and then push up the files `git push heroku master`. Buildpacks are automatically enabled. 

Add your Heroku URL to `/client/tools/api-config.js`. This will allow the production code to use your production API.

You should now be able to access `<your-app>.herokuapp.com` for the client and make requests to `<your-app>.herokuapp.com/api/:your-endpoint`


**NOTE: There is a slight issue with rendering GET requests as JSON in the browser. You can, however, make http requests via postman or a similar client to see responses and data. 

## Questions and Contributing
If there are any issues or concerns, please feel free to file them on Github. I welcome all contribution efforts and pull requests! 
