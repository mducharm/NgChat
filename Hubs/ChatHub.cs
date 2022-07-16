
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;

namespace NgChat.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(string username, string message)
    {
        Debug.WriteLine($"Received msg from {username}: {message}");
        await Clients.All.SendAsync("ReceiveMessage", username, message);
    }

}