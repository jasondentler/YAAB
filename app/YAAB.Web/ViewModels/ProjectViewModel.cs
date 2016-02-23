namespace YetAnotherAgileBoard.Web.ViewModels
{
    public class ProjectViewModel
    {
        public ProjectViewModel()
        {
            Headers = new string[0];
            Swimlanes = new SwimlaneViewModel[0];
        }

        public string[] Headers { get; set; }
        public SwimlaneViewModel[] Swimlanes { get; set; }
    }
}
