using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Options;

namespace CatFacts.Api.Services;

public sealed class CatFactsService(
    HttpClient httpClient,
    IOptions<CatFactsApiOptions> options,
    ILogger<CatFactsService> logger) : ICatFactsService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly HttpClient _httpClient = httpClient;
    private readonly CatFactsApiOptions _options = options.Value;
    private readonly ILogger<CatFactsService> _logger = logger;

    public async Task<string> GetRandomFactAsync(CancellationToken cancellationToken)
    {
        ConfigureClient();

        using var response = await _httpClient.GetAsync("/fact", cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            _logger.LogWarning("Cat facts provider returned status code {StatusCode}.", (int)response.StatusCode);
            throw new HttpRequestException("Cat facts provider failed.", null, response.StatusCode);
        }

        await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
        var payload = await JsonSerializer.DeserializeAsync<ExternalFactResponse>(stream, JsonOptions, cancellationToken);

        if (string.IsNullOrWhiteSpace(payload?.Fact))
        {
            _logger.LogWarning("Cat facts provider returned an empty payload.");
            throw new InvalidOperationException("Cat facts provider returned invalid payload.");
        }

        return payload.Fact.Trim();
    }

    private void ConfigureClient()
    {
        if (_httpClient.BaseAddress is null)
        {
            _httpClient.BaseAddress = new Uri(_options.BaseUrl.TrimEnd('/'));
        }

        _httpClient.Timeout = TimeSpan.FromSeconds(Math.Clamp(_options.TimeoutSeconds, 2, 60));
    }

    private sealed class ExternalFactResponse
    {
        [JsonPropertyName("fact")]
        public string? Fact { get; init; }
    }
}
