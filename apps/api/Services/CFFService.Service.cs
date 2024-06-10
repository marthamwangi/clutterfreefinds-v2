using clutterfreefinds.Service.Model;
using Google.Cloud.Firestore;
using Response;
using Response.Model;

namespace CFFService.service
{
    public interface ICFFService
    {
        //CRUD
        Task<IResponseDataModel<IEnumerable<CFFServiceModel>>> GetAllCffServices();
    }
    public class CFFServices : ICFFService
    {
        private static readonly FirestoreDb _firestoreDb = FirestoreDb.Create("cff-v2");
        private static List<CFFServiceModel>? _cffServices = [];
        public async Task<IResponseDataModel<IEnumerable<CFFServiceModel>>> GetAllCffServices()
        {
            try
            {
                Query allServicesQuery = _firestoreDb.Collection("service");
                QuerySnapshot allServicesQuerySnapshot = await allServicesQuery.GetSnapshotAsync();
                foreach (DocumentSnapshot documentSnapshot in allServicesQuerySnapshot.Documents)
                {
                    Dictionary<string, object> cff_service = documentSnapshot.ToDictionary();
                    _cffServices?.Add(new CFFServiceModel()
                    {
                        ID = documentSnapshot.Id,
                        Name = (string)cff_service["name"],
                        Description = (string)cff_service["description"],
                        Price = (int)(long)cff_service["price"]
                    });
                }
                var result = _cffServices?.ToArray();

                return result != null ?
                new ResponseDataModel<IEnumerable<CFFServiceModel>> { Success = true, Message = "Got Services!!", Data = result }
                : new ResponseDataModel<IEnumerable<CFFServiceModel>> { Success = true, Message = "Empty Services!!" };
            }
            finally
            {
                _cffServices = [];

            }
        }
    }
}