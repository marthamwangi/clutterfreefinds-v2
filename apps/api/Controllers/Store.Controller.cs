using clutterfreefinds.Store.Model;
using ClutterfreefindsV2.Api.Services.Store;
using Microsoft.AspNetCore.Mvc;
using Response;
using Response.Model;

namespace clutterfreefinds.Store.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController(IStoreService storeService) : ControllerBase
    {
        private readonly IStoreService _storeService = storeService;

        // HTTP-GET: /Store/

        [HttpGet]
        public async Task<IResponseDataModel<IEnumerable<ProductModel>>> GetAllProducts()
        {
            try
            {
                var result = await _storeService.GetAllStoreProducts();
                return result.Success.Equals(true) ? new ResponseDataModel<IEnumerable<ProductModel>>
                {
                    Success = true,
                    Data = result.Data
                } : new ResponseDataModel<IEnumerable<ProductModel>> { Success = false };

            }
            catch (System.Exception)
            {

                throw;
            }
        }

        [HttpGet("Product/{id}")]
        public async Task<IResponseDataModel<ProductModel>> GetProductDetails(string id)
        {
            try
            {
                var result = await _storeService.GetProductDetails(id);
                return result.Success.Equals(true) ? new ResponseDataModel<ProductModel>
                {
                    Success = true,
                    Data = result.Data
                } : new ResponseDataModel<ProductModel> { Success = false };

            }
            catch (System.Exception)
            {

                throw;
            }
        }

        [HttpGet("Categories")]
        public async Task<IResponseDataModel<IEnumerable<CategoryModel>>> GetAllCategories()
        {
            try
            {
                var result = await _storeService.GetCategories();
                return result.Success.Equals(true) ? new ResponseDataModel<IEnumerable<CategoryModel>>
                {
                    Success = true,
                    Data = result.Data
                } : new ResponseDataModel<IEnumerable<CategoryModel>> { Success = false };

            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}