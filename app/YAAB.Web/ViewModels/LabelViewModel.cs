namespace YetAnotherAgileBoard.Web.ViewModels
{
    public class LabelViewModel
    {
        public LabelViewModel()
        {
            Type = "default";
        }

        public string Text { get; set; }
        public string Type { get; set; }
    }
}