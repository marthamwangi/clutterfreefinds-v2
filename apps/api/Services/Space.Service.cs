using Google.Cloud.Firestore;
using Response;
using Response.Model;
using Space.Model;

namespace Space.Service
{
    public interface ISpaceServices
    {
        //CRUD
        Task<IResponseDataModel<IEnumerable<SpaceModel>>> GetAllSpaces();
    }
    public class SpaceServices : ISpaceServices
    {
        private static readonly FirestoreDb _firestoreDb = FirestoreDb.Create("cff-v2");
        private static List<SpaceModel>? _cffSpaces = [];
        public async Task<IResponseDataModel<IEnumerable<SpaceModel>>> GetAllSpaces()
        {
            try
            {
                Query allSpacesQuery = _firestoreDb.Collection("space");
                QuerySnapshot allSpacesQuerySnapshot = await allSpacesQuery.GetSnapshotAsync();
                foreach (DocumentSnapshot documentSnapshot in allSpacesQuerySnapshot.Documents)
                {
                    Dictionary<string, object> cff_space = documentSnapshot.ToDictionary();
                    _cffSpaces?.Add(new SpaceModel()
                    {
                        ID = documentSnapshot.Id,
                        Name = (string)cff_space["name"],
                        MaxHours = (long)cff_space["maxHours"],
                        MinHours = (long)cff_space["minHours"]
                    });
                }
                var result = _cffSpaces?.ToArray();

                return result != null
                ? new ResponseDataModel<IEnumerable<SpaceModel>> { Success = true, Message = "Got Spaces!!", Data = result }
                : new ResponseDataModel<IEnumerable<SpaceModel>> { Success = true, Message = "No Spaces!!" };
            }
            finally
            {
                _cffSpaces = [];
            }
        }
    }
}