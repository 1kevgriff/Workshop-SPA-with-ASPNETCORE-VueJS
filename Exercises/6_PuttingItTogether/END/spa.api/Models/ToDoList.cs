using System.Collections.Generic;

public class ToDoList
{
    public string Name { get; set; }
    public List<ToDoItem> Items { get; set; } = new List<ToDoItem>();
}