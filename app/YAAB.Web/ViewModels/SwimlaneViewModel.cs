namespace YetAnotherAgileBoard.Web.ViewModels
{
    public class SwimlaneViewModel
    {
        public SwimlaneViewModel()
        {
            Cards = new CardViewModel[0][];
            Status = "default";
            Completion = "0";
        }
        public string Id { get; set; }
        public string Title { get; set; }
        public string Completion { get; set; }
        public string Status { get; set; }
        public CardViewModel[][] Cards { get; set; }
    }
}