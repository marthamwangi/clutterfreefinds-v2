using Newtonsoft.Json;

namespace Daraja.Model;
public class STKAuthResponse
{
    public string access_token { get; set; }
}
public class STKPayModelResponse
{
    public string MerchantRequestID { get; set; }
    public string CheckoutRequestID { get; set; }
    public string ResponseCode { get; set; }
    public string ResponseDescription { get; set; }
    public string CustomerMessage { get; set; }
}

public class STKPayRequest
{

    // [JsonProperty("BusinessShortCode")]
    public string BusinessShortCode { get; set; }

    // [JsonProperty("Password")]
    public string Password { get; set; }

    // [JsonProperty("Timestamp")]
    public string Timestamp { get; set; }

    // [JsonProperty("TransactionType")]
    public string TransactionType { get; set; }

    // [JsonProperty("Amount")]
    public string Amount { get; set; }

    // [JsonProperty("PartyA")]
    public string PartyA { get; set; }

    // [JsonProperty("PartyB")]
    public string PartyB { get; set; }

    // [JsonProperty("PhoneNumber")]
    public string PhoneNumber { get; set; }

    // [JsonProperty("CallBackURL")]
    public string CallBackURL { get; set; }

    // [JsonProperty("AccountReference")]
    public string AccountReference { get; set; }

    // [JsonProperty("TransactionDesc")]
    public string TransactionDesc { get; set; }

}