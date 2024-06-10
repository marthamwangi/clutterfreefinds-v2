using Google.Cloud.Firestore;
using Material.Model;
using Response;
using Response.Model;

namespace Material.Service
{
    public interface IMaterialServices
    {
        //CRUD
        Task<IResponseDataModel<IEnumerable<MaterialModel>>> GetAllMaterial();
    }


    public class MaterialServices : IMaterialServices
    {
        private static readonly FirestoreDb _firestoreDb = FirestoreDb.Create("cff-v2");
        private static List<MaterialModel> _cffMaterial = [];
        public async Task<IResponseDataModel<IEnumerable<MaterialModel>>> GetAllMaterial()
        {
            try
            {
                Query allMaterialQuery = _firestoreDb.Collection("material");
                QuerySnapshot allMaterialQuerySnapshot = await allMaterialQuery.GetSnapshotAsync();
                foreach (DocumentSnapshot documentSnapshot in allMaterialQuerySnapshot.Documents)
                {
                    var dictionaryMaterial = documentSnapshot.ToDictionary();
                    _cffMaterial?.Add(new MaterialModel
                    {
                        ID = documentSnapshot.Id,
                        Name = (string)dictionaryMaterial["name"],
                        PercentagePrice = (long)dictionaryMaterial["percentagePrice"],
                        Pros = (List<object>)dictionaryMaterial["pros"],
                        Cons = (List<object>)dictionaryMaterial["cons"],
                    });
                }
                var result = _cffMaterial;
                return result != null
                ? new ResponseDataModel<IEnumerable<MaterialModel>> { Success = true, Message = "Got Material!!", Data = result }
                : new ResponseDataModel<IEnumerable<MaterialModel>> { Success = true, Message = "No Material!!" };
            }
            finally
            {
                _cffMaterial = [];
            }
        }
    }
}