namespace YetAnotherAgileBoard.Web.ViewModels
{

    public class CardViewModel
    {
        public CardViewModel()
        {
            Labels = new LabelViewModel[0];
            Type = "default";
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Type { get; set; }
        public bool IsBlocked { get; set; }
        public bool IsReady { get; set; }
        public string Estimate { get; set; }
        public LabelViewModel[] Labels { get; set; }
    }
}
