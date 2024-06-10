using Google.Cloud.Firestore;

namespace clutterfreefinds.Service.Model;

[FirestoreData]
public class CFFServiceModel
{
    [FirestoreProperty("id")]
    public string? ID { get; set; }

    [FirestoreProperty("name")]
    public string? Name { get; set; }

    [FirestoreProperty("price")]
    public int? Price { get; set; }

    [FirestoreProperty("price")]
    public string? Description { get; set; }


}