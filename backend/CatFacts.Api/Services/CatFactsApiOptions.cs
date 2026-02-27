namespace CatFacts.Api.Services;

public sealed class CatFactsApiOptions
{
    public const string SectionName = "CatFactsApi";

    public string BaseUrl { get; set; } = "https://catfact.ninja";

    public int TimeoutSeconds { get; set; } = 10;
}
