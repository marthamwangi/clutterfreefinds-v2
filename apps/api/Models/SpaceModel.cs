using Google.Cloud.Firestore;

namespace Space.Model;

[FirestoreData]
public class SpaceModel
{
    [FirestoreProperty("id")]
    public string? ID { get; set; }

    [FirestoreProperty("name")]
    public string? Name { get; set; }

    [FirestoreProperty("maxHours")]
    public long MaxHours { get; set; }

    [FirestoreProperty("minHours")]
    public long MinHours { get; set; }
}