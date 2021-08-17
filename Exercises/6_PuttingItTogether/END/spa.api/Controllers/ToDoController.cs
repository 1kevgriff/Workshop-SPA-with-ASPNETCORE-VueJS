using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

[Route("todos")]
public class ToDoController : ControllerBase
{
    private readonly IMemoryCache memoryCache;

    private const string key = "todos";

    public ToDoController(IMemoryCache memoryCache)
    {
        this.memoryCache = memoryCache;
    }

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

    [HttpGet]
    public async Task<IActionResult> GetToDoLists()
    {
        return Ok(await GetToDos());
    }

    [HttpPost]
    public async Task<IActionResult> AddToDoList([FromBody] ToDoList toDoList)
    {
        var todos = await GetToDos();
        todos.Add(toDoList);

        memoryCache.Set(key, todos, new MemoryCacheEntryOptions());

        return CreatedAtAction("GetToDoLists", new { }, todos);
    }

    [HttpPost("{toDoListName}/items")]
    public async Task<IActionResult> AddToDoItem(string toDoListName, [FromBody] ToDoItem toDoItem)
    {
        var todos = await GetToDos();

        var toDoList = todos.Find(x => x.Name == toDoListName);
        if (toDoList == null) return NotFound();

        toDoList.Items.Add(toDoItem);

        memoryCache.Set(key, todos, new MemoryCacheEntryOptions());
        return CreatedAtAction("GetToDoLists", new { }, todos);
    }

    [HttpPut("{toDoListName}/items/{toDoItemName}")]
    public async Task<IActionResult> ToggleToDoItem(string toDoListName, string toDoItemName)
    {
        var todos = await GetToDos();
        var toDoList = todos.Find(x => x.Name == toDoListName);
        if (toDoList == null) return NotFound();

        var toDoItem = toDoList.Items.Find(x => x.Name == toDoItemName);
        if (toDoItem == null) return NotFound();

        toDoItem.Done = !toDoItem.Done;
        memoryCache.Set(key, todos, new MemoryCacheEntryOptions());
        return Ok(todos);
    }
}