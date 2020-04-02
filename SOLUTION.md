This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Code Improvements

One of the biggest issues I faced was the 60 request per hour limit when using the Github API. Because additional information such as number of repositories or number of followers required 1 request per user, this limit means that additional information about Github users can only be accessed at that rate. Another limitation is that each request could only return general information on 100 users. This means that even for general information, a user is limited to viewing 100 users at once. 

How I worked around this issue is by showing the additional information when the query returned less than 60 users and only showing the general information when more than 60 users were returned. I also implemented additional parameters of minimum repositories and minimum followers so that a user would be more likely to be able to find his target Github user within the 100 users displayed. 

Search Queries returning additional info:
Search term: tom  Minimum Repositories: 42  Minimum Followers: 1000
Search term: lopon  Minimum Repositories: 0   Minimum Followers: 0
Search term: dadew  Minimum Repositories: 0   Minimum Followers: 0

Search Queries without additional info:
Search term: tom  Minimum Repositories: 0  Minimum Followers: 0
Search term: john  Minimum Repositories: 0   Minimum Followers: 0
Search term: brent  Minimum Repositories: 0   Minimum Followers: 0

If I had more time I would have tried to find another workaround for this limit, possibly through the use of proxy servers or VPNs because I noticed that it was my IP address being used to identify that I had gone over the limit. I would also have done more extensive testing to ensure that all bugs were fixed. 

Some known bugs are that leaving the minimum repository and follower fields empty causes an error. Though a default value of 0 is included, if a user were to delete away whatever was in the entry fields and attempted a search, an error would appear. Another issue is that if more than 60 queries occur in an hour it will cause an error. Another bug is that enter key does not submit the query and the search button must be pressed manually. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



