# Exercise 5: ASP.NET Core

## Introduction

> If you run into an issue, refer to the END folder which contains the solution to this exercise.

## Step 1
Open the BEGIN folder in Visual Studio Code, or your preferred text editor.

## Step 2
Create a new ASP.NET Core project by using the **ASP.NET Core Empty** template.

Use the command:

```Powershell
dotnet new web -o AspNetCoreDemo
```

## Step 3
Open the folder `AspNetCoreDemo` in your editor.  

## Step 4
Open `Startup.cs`.  This is the class used by ASP.NET Core to setup dependency injection and routing pipelines.

In the `ConfigureService`, we're adding two services for later use:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddMemoryCache();
}
```

`AddControllers` sets up appropriate injections for our API we're about to build.

`AddMemoryCache` will provide us a flexible in-memory storage device for tracking ToDos.

## Step 5

Next, in `Configure` you'll want to add the following line within `app.UseEndpoints()`:

```csharp
endpoints.MapControllers();
```

And while you're at it, remove the `MapGet` call.  It's not necessary to another we're doing.

That means the complete `Configure` method will look like:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

Your Startup.cs is properly configured!

## Step 6
Create a new folder called `Models` at the top level of `AspNetCoreDemo`.  Create new files within that folder, `ToDoItem.cs` and `ToDoList.cs`.

This models will be used by the controller to save To Do Lists and Item on the To Do List.

Fill in the files accordingly:

```csharp
public class ToDoItem
{
    public string Name { get; set; }
    public bool Done { get; set; } = false;
}
```

```csharp
using System.Collections.Generic;

public class ToDoList
{
    public string Name { get; set; }
    public List<ToDoItem> ToDoItems { get; set; }    
}
```

## Step 7
Create a new folder called `Controllers` at the top level of `AspNetCoreDemo`.  Create a new file called `ToDoController.cs`.

## Step 8
It's time to build out `ToDoController`.  We'll work our way down the file.  

At the top:

```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
```

Then create the controller class:

```csharp
[Route("todos")]
public class ToDoController : ControllerBase
{
}
```

`ControllerBase` tells ASP.NET Core this is a Controller with Actions, and we do not want to worry about loading View dependencies (such as Razor).

The `[Route]` attribute is used by ASP.NET Core for proper routing. We're telling ASP.NET Core that any calls to `/todos` should go through this controller.

Next, add the constructor and private fields for the controller inside the controller class:

```csharp
private readonly IMemoryCache memoryCache;

private const string key = "todos";

public ToDoController(IMemoryCache memoryCache)
{
    this.memoryCache = memoryCache;
}
```

`IMemoryCache` will be injected into the class anytime it is instantiated.  We'll save the instance as a private field which can be used by any method inside of the class.

The `keys` constant will be used later to reference our todo list inside of the cache.

To make everything work, we're using Memory Cache to save our todo lists.  There are several ways to solve this problem, but Memory Cache is easy and straight forward.

Because we'll want to access the cache often, and sometimes it might not exists, let's create a helper method for getting To Do's from the cache:

```csharp
private async Task<List<ToDoList>> GetToDos()
{
    System.Func<ICacheEntry, Task<List<ToDoList>>> createCacheEntry =
            (k) =>
                {
                    return Task.FromResult(new List<ToDoList>());
                };

    return await memoryCache.GetOrCreateAsync(key,
                    createCacheEntry);
}
```

Next, we'll create two Actions for getting todos from the list and creating To Dos.  Add the following method to the Controller:

```csharp
[HttpGet]
public async Task<IActionResult> GetToDoLists()
{
    return Ok(await GetToDos());
}
```

`[HttpGet]` tells the controllers this method responds to `GET` requests to `/todos` and it returns the To Do lists from the cache.

By default, this cache is empty.  How do we add something to it?

```csharp
[HttpPost]
public async Task<IActionResult> AddToDoList([FromBody]ToDoList toDoList)
{
    var todos = await GetToDos();
    todos.Add(toDoList);

    memoryCache.Set(key, todos, new MemoryCacheEntryOptions());

    return CreatedAtAction("GetToDoLists", new { }, todos);
}
```

`HttpPost`, just like the similar GET request, will only respond to `POST` requests to `/todos`.  We're not doing any validation on the incoming data, so we get the current todos from the cache, add our new todo list, and then update the cache with the updated content.

`CreatedAtAction` will return a 201 CREATED status code to whatever called the Action.  It'll provide the new list of To Dos.

> Note: This is a very simple API and we're not following all the rules of REST. 

## Step 9
It's time to test!

At the terminal, type `dotnet run` or `dotnet watch run`.  The code should compile and start a development server.

In a browser, navigate to `https://localhost:5001/todos` and it should return an empty array.

## Step 10 - Extra Credit

Want to test a POST request?  This is an excellent use case for [Postman](https://www.postman.com/downloads/).  
 
Download the app (it's free) and create a POST request to `https://localhost:5001/todos`

Sample payload:
```json
{
    "name" : "My ToDo List"
}
```

**YOU HAVE COMPLETED THIS EXERCISE - WAY TO GO**