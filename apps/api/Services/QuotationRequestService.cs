using Google.Cloud.Firestore;
using QuotationRequest.Model;
using Response;
using Response.Model;

namespace Quotation.Request.Service;

public interface IQuotationRequestService
{
    //CRUD
    Task<IResponseModel> CreateQuotationRequest(QuotationRequestModel quotation);

};

public class QuotationRequestService : IQuotationRequestService
{
    private static readonly FirestoreDb _firestoreDb = FirestoreDb.Create("cff-v2");
    private static readonly CollectionReference _collectionRef = _firestoreDb.Collection("quotation");

    public async Task<IResponseModel> CreateQuotationRequest(QuotationRequestModel quotationItem)
    {
        try
        {
            Dictionary<string, object> quotation = new Dictionary<string, object>
            {
                { "timestamp", Timestamp.GetCurrentTimestamp() },
                { "serviceDate", quotationItem.ServiceDate },
                { "images", quotationItem.Images },
                { "notes", quotationItem.Notes },
                { "minPrice", quotationItem.MinimumPrice},
                { "maxprice", quotationItem.MaximumPrice},
                { "serviceType", quotationItem.ServiceType},
                { "service", _firestoreDb.Document("service/" + quotationItem.Service) },
                { "space", _firestoreDb.Document("space/" + quotationItem.Space) },
                { "material", _firestoreDb.Document("material/" + quotationItem.Material) },
            };
            Dictionary<string, object> clientObject = new Dictionary<string, object>
            {
                {"email",quotationItem.ClientDetails.Email},
                {"firstName",quotationItem.ClientDetails.FirstName},
                {"lastName",quotationItem.ClientDetails.LastName},
                {"phone",quotationItem.ClientDetails.Phone},
                {"address",quotationItem.ClientDetails.Address},
                {"houseNumber",quotationItem.ClientDetails.HouseNumber},
                {"county",quotationItem.ClientDetails.County},
                {"constituency",quotationItem.ClientDetails.Constituency},
                {"ward",quotationItem.ClientDetails.Ward},
            };

            DocumentReference _docRef = _collectionRef.Document();
            quotation.Add("clientDetails", clientObject);
            await _docRef.SetAsync(quotation);

            // return string.IsNullOrEmpty(_docRef.Id) ? new ResponseModel { Success = false, Message = "Made Quotation entry" }
            //                     : new ResponseModel { Success = true, Message = "Failed to make a quotation entry" };
            return string.IsNullOrEmpty(_docRef.Id) ? new ResponseModel { Success = false, Message = "FOOTER.NEWSLETTER.TOASTS.ERROR.TITLE" }
                                 : new ResponseModel { Success = true, Message = "FOOTER.NEWSLETTER.TOASTS.SUCCESS.TITLE" };
        }
        catch (Exception)
        {
            throw;
        }
    }
}