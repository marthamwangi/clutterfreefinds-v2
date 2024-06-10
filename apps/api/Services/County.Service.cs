using County.Model;
using Google.Cloud.Firestore;
using Response;
using Response.Model;

namespace County.Service
{
    public interface ICountyServices
    {
        //CRUD
        Task<IResponseDataModel<IEnumerable<CountyModel>>> GetAllCounty();
    }


    public class CountyServices : ICountyServices
    {
        private static readonly FirestoreDb _firestoreDb = FirestoreDb.Create("cff-v2");
        private static List<CountyModel> _cffCounty = [];
        public async Task<IResponseDataModel<IEnumerable<CountyModel>>> GetAllCounty()
        {
            try
            {
                Query allCountyQuery = _firestoreDb.Collection("counties");
                QuerySnapshot allCountyQuerySnapshot = await allCountyQuery.GetSnapshotAsync();
                foreach (DocumentSnapshot documentSnapshot in allCountyQuerySnapshot.Documents)
                {
                    var dictionaryCounty = documentSnapshot.ToDictionary();
                    _cffCounty?.Add(new CountyModel
                    {
                        Name = (string)dictionaryCounty["name"],
                        CountyCode = (long)dictionaryCounty["countyCode"],
                        Constituencies = (List<object>)dictionaryCounty["constituencies"]
                    });
                }
                var result = _cffCounty;
                //order by countyName
                return result != null
                ? new ResponseDataModel<IEnumerable<CountyModel>> { Success = true, Message = "Got County!!", Data = result }
                : new ResponseDataModel<IEnumerable<CountyModel>> { Success = true, Message = "No County!!" };
            }
            finally
            {
                _cffCounty = [];
            }
        }
    }
}
