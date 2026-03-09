using CatFacts.Api.Controllers;
using CatFacts.Api.Models;
using CatFacts.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;

namespace CatFacts.Api.Tests;

public sealed class CatFactsControllerTests
{
    [Fact]
    public async Task GetRandom_ReturnsOkWithFact_WhenServiceSucceeds()
    {
        var controller = new CatFactsController(
            new StubCatFactsService(_ => Task.FromResult("Cats sleep for most of the day.")),
            NullLogger<CatFactsController>.Instance);

        var result = await controller.GetRandom(CancellationToken.None);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

        var payload = Assert.IsType<CatFactResponse>(okResult.Value);
        Assert.Equal("Cats sleep for most of the day.", payload.Fact);
    }

    [Fact]
    public async Task GetRandom_ReturnsBadGateway_WhenServiceThrows()
    {
        var controller = new CatFactsController(
            new StubCatFactsService(_ => Task.FromException<string>(new HttpRequestException("boom"))),
            NullLogger<CatFactsController>.Instance);

        var result = await controller.GetRandom(CancellationToken.None);

        var statusResult = Assert.IsType<StatusCodeResult>(result.Result);
        Assert.Equal(StatusCodes.Status502BadGateway, statusResult.StatusCode);
    }

    private sealed class StubCatFactsService(Func<CancellationToken, Task<string>> implementation) : ICatFactsService
    {
        private readonly Func<CancellationToken, Task<string>> _implementation = implementation;

        public Task<string> GetRandomFactAsync(CancellationToken cancellationToken) => _implementation(cancellationToken);
    }
}
