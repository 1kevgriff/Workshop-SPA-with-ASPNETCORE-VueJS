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
        return Ok(await GetToDoLists());
    }

    [HttpPost]
    public async Task<IActionResult> AddToDoList(ToDoList toDoList)
    {
        var todos = await GetToDos();
        todos.Add(toDoList);

        memoryCache.Set(key, todos, new MemoryCacheEntryOptions());

        return CreatedAtAction("GetToDoLists", new { }, todos);
    }
}