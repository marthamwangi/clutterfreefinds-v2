using Google.Cloud.Firestore;
using Material.Model;
namespace clutterfreefinds.Store.Model;
public class ProductModel
{
    [FirestoreProperty("id")]
    public string? ID { get; set; }

    [FirestoreProperty("colors")]
    public List<object> Colors { get; set; }

    [FirestoreProperty("images")]
    public List<object> Images { get; set; }

    [FirestoreProperty("title")]
    public string Title { get; set; }

    [FirestoreProperty("image")]
    public string Image { get; set; }

    [FirestoreProperty("price")]
    public int Price { get; set; }

    [FirestoreProperty("description")]
    public string Description { get; set; }

    [FirestoreProperty("postedDate")]
    public DateTime PostedDate { get; set; }

    [FirestoreProperty("category")]
    public CategoryModel Category { get; set; }

    [FirestoreProperty("size")]
    public string Size { get; set; }

    [FirestoreProperty("material")]
    public MaterialModel Material { get; set; }
}

public class CategoryModel
{
    [FirestoreProperty("id")]
    public string? ID { get; set; }
    [FirestoreProperty("title")]
    public string? Title { get; set; }
}

public class Pagination
{
    public int Total { get; set; }
    public int Page { get; set; }
    public int? Limit { get; set; } = null;

}