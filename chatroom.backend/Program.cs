using Backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();


var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.MapHub<ChatHub>("/chat");

app.Run();
