using Microsoft.AspNet.Mvc;

namespace YetAnotherAgileBoard.Web.ViewComponents
{
    public class RequireViewComponent : ViewComponent
    {
        private readonly IRequireAccessor _requireAccessor;

        public RequireViewComponent(IRequireAccessor requireAccessor)
        {
            _requireAccessor = requireAccessor;
        }

        public IViewComponentResult Invoke()
        {
            return View(_requireAccessor);
        }
    }
}
