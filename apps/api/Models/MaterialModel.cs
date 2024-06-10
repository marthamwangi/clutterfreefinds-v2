using Google.Cloud.Firestore;

namespace Material.Model;


[FirestoreData]
public class MaterialModel
{
    [FirestoreProperty("id")]
    public string? ID { get; set; }
    [FirestoreProperty("name")]
    public string? Name { get; set; }

    [FirestoreProperty("percentagePrice")]
    public long? PercentagePrice { get; set; }

    [FirestoreProperty("pros")]
    public List<object>? Pros { get; set; }

    [FirestoreProperty("cons")]
    public List<object>? Cons { get; set; }
}
