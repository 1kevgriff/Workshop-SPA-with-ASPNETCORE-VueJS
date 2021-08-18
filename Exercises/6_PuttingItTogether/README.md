# Exercise 6: Putting It All Together

## Introduction

> If you run into an issue, refer to the END folder which contains the solution to this exercise.

## Step 1
Open the BEGIN folder in Visual Studio Code, or your preferred text editor.

## Step 2
You're going to notice there are TWO applications in the BEGIN folder.

`spa-client` is the VueJS application for our Single Page App.

`spa.api` is the ASP.NET Core application which will serve the API for saving and getting To Do lists and items.

Both these applications will work together, but we will start with the `spa-client` as the entry point into our app doing work.

You can run both applications by calling:

```
spa-client --> npm run dev
spa.api --> dotnet watch run
```

These will start their own servers.  We'll use the client endpoint to access the application, and we'll request API endpoints through a mechanism called a proxy.

## Step 3
Let's set up the proxy.  Open `vite.config.js` in the `spa-client` main folder.  It should already have some configuration inside of it.  Add the following section:

```javascript
server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
```

The proxy configuration tells the Vite dev server that if it sees a request for `localhost:3000/api/{something}` (which is the Vite dev server) it should redirect the request to our ASP.NET Core Application running on port `5000`.  It also drops the `/api` so we don't need to worry about that on the server-side.

> Fun Fact: Inside of `.env' we define the api URL used by the application.  Environment variables are a great way to control development and production settings.

## Step 4
Next, we want to configure Axios, which is an HTTP Client for JavaScript applications.  Since our API is already configured, we just need to wire up the calls.

Open `store.js`, and Axios to the import section for your file.

```javascript
import axios from 'axios';
```

Next, move to the `getToDoLists` method:

```javascript
var result = await axios.get(url + "/todos");
```

There are a variety of ways to use Axios, depending on how you want to format your calls.  Simple `.get()` and `.post()` will work for a lot of cases!

The first parameter of these methods is the URL to make the HTTP call to.  The `url` parameter is populated from configuration, and we're appending the rest of the call to it.

> Note: we're not error handling.  Bad developer.  But since this is an async/await call, the method will throw an error.  You could wrap it in a try/catch for error handling.

Move down to `addNewToDoList` and set up it's call to Axios!

```javascript
var result = await axios.post(url + "/todos", {
                name: toDoListName
            });
```

Notice this time that we're passing a second parameter.  For each HTTP verb you're using, the parameters will be different.  For `POST` requests, you'll want to attach a POST body.  That's the second parameter.  It's automatically serialized to JSON.

Continue to `addToDoListItem` and add:

```javascript
var result = await axios.post(url + "/todos/" + toDoListName + "/items", {
                name: taskName
            });
```

Finish up with `toggleItem`:

```javascript
var result = await axios.put(url + "/todos/" + toDoListName + "/items/" + index);
```

`PUT` is an interesting HTTP Verb.  Technically, it's meant to be `replace` an entity on the server.  We're bastardizing it a little to ack as our toggle been DONE or NOT DONE.

## Step 5
Time to test!

Open two terminals, one inside of `spa-client` and another inside `spa.api`.  

Start the API first with:

```Powershell
dotnet watch run

or

dotnet run
```

Now, start the client:

```Powershell
npm run dev
```

Open a browser, and navigate to the **CLIENT** server.  It should be `http://localhost:3000/`.

Try it out!

**YOU HAVE COMPLETED THIS EXERCISE - WAY TO GO**