using System.Net;
using System.Text;
using CatFacts.Api.Services;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;

namespace CatFacts.Api.Tests;

public sealed class CatFactsServiceTests
{
    [Fact]
    public async Task GetRandomFactAsync_UsesConfiguredBaseUrlAndReturnsTrimmedFact()
    {
        var handler = new StubHttpMessageHandler(_ =>
            new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("""{"fact":"  Cats purr to communicate.  "}""", Encoding.UTF8, "application/json")
            });

        var httpClient = new HttpClient(handler);
        var service = CreateService(
            httpClient,
            new CatFactsApiOptions
            {
                BaseUrl = "https://example.test/",
                TimeoutSeconds = 1
            });

        var fact = await service.GetRandomFactAsync(CancellationToken.None);

        Assert.Equal("Cats purr to communicate.", fact);
        Assert.Equal("https://example.test/fact", handler.LastRequestUri?.ToString());
        Assert.Equal(TimeSpan.FromSeconds(2), httpClient.Timeout);
    }

    [Fact]
    public async Task GetRandomFactAsync_ThrowsHttpRequestException_WhenProviderReturnsFailureStatus()
    {
        var service = CreateService(
            new HttpClient(new StubHttpMessageHandler(_ => new HttpResponseMessage(HttpStatusCode.BadGateway))),
            new CatFactsApiOptions { BaseUrl = "https://example.test" });

        var error = await Assert.ThrowsAsync<HttpRequestException>(() => service.GetRandomFactAsync(CancellationToken.None));

        Assert.Equal(HttpStatusCode.BadGateway, error.StatusCode);
    }

    [Fact]
    public async Task GetRandomFactAsync_ThrowsInvalidOperationException_WhenProviderReturnsEmptyPayload()
    {
        var service = CreateService(
            new HttpClient(new StubHttpMessageHandler(_ =>
                new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent("""{"fact":"   "}""", Encoding.UTF8, "application/json")
                })),
            new CatFactsApiOptions { BaseUrl = "https://example.test" });

        await Assert.ThrowsAsync<InvalidOperationException>(() => service.GetRandomFactAsync(CancellationToken.None));
    }

    private static CatFactsService CreateService(HttpClient httpClient, CatFactsApiOptions options)
    {
        return new CatFactsService(
            httpClient,
            Options.Create(options),
            NullLogger<CatFactsService>.Instance);
    }

    private sealed class StubHttpMessageHandler(Func<HttpRequestMessage, HttpResponseMessage> responseFactory)
        : HttpMessageHandler
    {
        private readonly Func<HttpRequestMessage, HttpResponseMessage> _responseFactory = responseFactory;

        public Uri? LastRequestUri { get; private set; }

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            LastRequestUri = request.RequestUri;
            return Task.FromResult(_responseFactory(request));
        }
    }
}
