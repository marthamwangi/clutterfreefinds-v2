
using Google.Cloud.Firestore;
using Newsletter.Model;
using Response;
using Response.Model;

namespace Newsletter.Services;

public interface INewsletterService
{
    //CRUD implementations goes here
    Task<IResponseModel> AddNewsletter(NewsletterItem newsletterItem);
};
public class NewsletterServices : INewsletterService
{
    private static readonly FirestoreDb _firestoreDb = FirestoreDb.Create("cff-v2");
    private static readonly CollectionReference _collectionRef = _firestoreDb.Collection("newsletter");

    public async Task<IResponseModel> AddNewsletter(NewsletterItem newsletterItem)
    {

        try
        {
            Dictionary<string, object> newsletter = new Dictionary<string, object>{
               { "email",newsletterItem.Email},{"timestamp", Timestamp.GetCurrentTimestamp()}
            };
            DocumentReference _docRef = await _collectionRef.AddAsync(newsletter);

            return string.IsNullOrEmpty(_docRef.Id) ? new ResponseModel { Success = false, Message = "FOOTER.NEWSLETTER.TOASTS.ERROR.TITLE" }
                                 : new ResponseModel { Success = true, Message = "FOOTER.NEWSLETTER.TOASTS.SUCCESS.TITLE" };
        }
        catch (Exception)
        {
            throw;
        }
    }

}