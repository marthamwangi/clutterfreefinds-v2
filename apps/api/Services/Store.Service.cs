
using clutterfreefinds.Store.Model;
using Google.Cloud.Firestore;
using Material.Model;
using Response;
using Response.Model;

namespace ClutterfreefindsV2.Api.Services.Store
{
    public interface IStoreService
    {
        //CRUD
        Task<IResponseDataModel<IEnumerable<ProductModel>>> GetAllStoreProducts();
        Task<IResponseDataModel<ProductModel>> GetProductDetails(string doc);
        Task<IResponseDataModel<IEnumerable<CategoryModel>>> GetCategories();
    }

    public class StoreServices : IStoreService
    {
        private static readonly FirestoreDb _firestoreDb = FirestoreDb.Create("cff-v2");
        private static readonly CollectionReference collectionRef = _firestoreDb.Collection("store-products");
        private static readonly CollectionReference catCollectionReference = _firestoreDb.Collection("shop-category");

        public async Task<IResponseDataModel<IEnumerable<ProductModel>>> GetAllStoreProducts()
        {
            try
            {
                var querySnapshot = await collectionRef.GetSnapshotAsync();
                var products = new List<ProductModel>();

                foreach (DocumentSnapshot productSnapshot in querySnapshot.Documents)
                {
                    var product = new ProductModel
                    {
                        ID = productSnapshot.Id,
                        Title = productSnapshot.GetValue<string>("title"),
                        Description = productSnapshot.GetValue<string>("description"),
                        Colors = productSnapshot.GetValue<List<object>>("colors"),
                        Price = productSnapshot.GetValue<int>("price"),
                        Image = productSnapshot.GetValue<string>("image"),
                        Size = productSnapshot.GetValue<string>("size"),
                        Images = productSnapshot.GetValue<List<object>>("images"),
                        PostedDate = productSnapshot.GetValue<Timestamp>("postedDate").ToDateTime().ToUniversalTime(),
                    };

                    if (productSnapshot.TryGetValue("material", out DocumentReference materialRef))
                    {
                        DocumentSnapshot materialSnapshot = await materialRef.GetSnapshotAsync();
                        if (materialSnapshot.Exists)
                        {
                            product.Material = materialSnapshot.ConvertTo<MaterialModel>();
                            product.Material.ID = materialSnapshot.Id;
                        }
                    }
                    if (productSnapshot.TryGetValue("category", out DocumentReference categoryRef))
                    {
                        DocumentSnapshot categorySnapshot = await categoryRef.GetSnapshotAsync();
                        if (categorySnapshot.Exists)
                        {
                            product.Category = new CategoryModel()
                            {
                                ID = categorySnapshot.Id,
                                Title = categorySnapshot.GetValue<string>("title")
                            };

                        }

                    }
                    products.Add(product);
                }

                var response = new ResponseDataModel<IEnumerable<ProductModel>> { Success = true, Data = products };
                return products != null ? response : new ResponseDataModel<IEnumerable<ProductModel>> { Success = true };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IResponseDataModel<ProductModel>> GetProductDetails(string doc)
        {
            try
            {
                var product = new ProductModel();
                DocumentReference docRef = collectionRef.Document(doc);
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
                if (snapshot.Exists)
                {
                    product = new ProductModel
                    {
                        ID = snapshot.Id,
                        Title = snapshot.GetValue<string>("title"),
                        Description = snapshot.GetValue<string>("description"),
                        Colors = snapshot.GetValue<List<object>>("colors"),
                        Price = snapshot.GetValue<int>("price"),
                        Image = snapshot.GetValue<string>("image"),
                        Size = snapshot.GetValue<string>("size"),
                        Images = snapshot.GetValue<List<object>>("images"),
                        PostedDate = snapshot.GetValue<Timestamp>("postedDate").ToDateTime().ToUniversalTime(),
                    };

                    if (snapshot.TryGetValue("material", out DocumentReference materialRef))
                    {
                        DocumentSnapshot materialSnapshot = await materialRef.GetSnapshotAsync();
                        if (materialSnapshot.Exists)
                        {
                            product.Material = materialSnapshot.ConvertTo<MaterialModel>();
                            product.Material.ID = materialSnapshot.Id;
                        }
                    }
                    if (snapshot.TryGetValue("category", out DocumentReference categoryRef))
                    {
                        DocumentSnapshot categorySnapshot = await categoryRef.GetSnapshotAsync();
                        if (categorySnapshot.Exists)
                        {
                            product.Category = new CategoryModel()
                            {
                                ID = categorySnapshot.Id,
                                Title = categorySnapshot.GetValue<string>("title")
                            };

                        }

                    }
                }
                else
                {
                    Console.WriteLine("Document {0} does not exist!", snapshot.Id);
                }

                var response = new ResponseDataModel<ProductModel> { Success = true, Data = product };
                return product != null ? response : new ResponseDataModel<ProductModel> { Success = true };
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IResponseDataModel<IEnumerable<CategoryModel>>> GetCategories()
        {
            try
            {
                var querySnapshot = await catCollectionReference.GetSnapshotAsync();
                var categories = new List<CategoryModel>();
                foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
                {
                    var category = new CategoryModel
                    {
                        ID = documentSnapshot.Id,
                        Title = documentSnapshot.GetValue<string>("title")
                    };
                    categories.Add(category);
                }
                var response = new ResponseDataModel<IEnumerable<CategoryModel>> { Success = true, Data = categories };
                return categories != null ? response : new ResponseDataModel<IEnumerable<CategoryModel>> { Success = true };
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }

}
