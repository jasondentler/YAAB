using System.Linq;
using Microsoft.AspNet.Mvc;
using YetAnotherAgileBoard.Web.ViewModels;

namespace YetAnotherAgileBoard.Web.ViewComponents
{
    public class ProjectViewComponent : ViewComponent
    {

        public IViewComponentResult Invoke(string projectId)
        {
            var vm = GetViewModel(projectId);
            return View("AgileBoard", vm);
        }

        public IViewComponentResult Invoke(CardViewModel card)
        {
            return View("Card", card);
        }

        private ProjectViewModel GetViewModel(string projectId)
        {
            var vm = new ProjectViewModel()
            {
                Headers = new[] {"Feature", "To Do", "Doing", "Testing", "Done"},
                Swimlanes = new[]
                {
                    new SwimlaneViewModel()
                    {
                        Title = "All colors in pricing cache",
                        Status = "danger",
                        Completion = "0",
                        Cards = new[]
                        {
                            new[]
                            {
                                new CardViewModel()
                                {
                                    Title = "Demo",
                                    Type = "demo",
                                    UserName = "Michael",
                                    UserEmail = "m@f.com"
                                },
                                new CardViewModel()
                                {
                                    Title = "Merge",
                                    Type = "merge",
                                    UserName = "Will",
                                    UserEmail = "w@k.com"
                                }
                            },
                            new[]
                            {
                                new CardViewModel()
                                {
                                    Title = "Do It",
                                    Description = "I have no idea what I'm doing",
                                    Type = "task",
                                    UserName = "Jason",
                                    UserEmail = "j@d.com",
                                    IsBlocked = true
                                }
                            }
                        }
                    },
                    new SwimlaneViewModel()
                    {
                        Title = "Line Item Edit",
                        Completion = "80",
                        Status = "primary",
                        Cards = new[]
                        {
                            new[]
                            {
                                new CardViewModel()
                                {
                                    Title = "Demo",
                                    Type = "demo",
                                    UserName = "Thang",
                                    UserEmail = "t@l.com",
                                    Estimate = "¼"
                                },
                                new CardViewModel()
                                {
                                    Title = "Merge It",
                                    Description = "Merge it good",
                                    Type = "merge",
                                    UserName = "Will",
                                    UserEmail = "w@k.com",
                                    Estimate = "¼"
                                }
                            },
                            new CardViewModel[0],
                            new[]
                            {
                                new CardViewModel()
                                {
                                    Title = "Test It",
                                    Description = "Brokens. Brokens everywhere.",
                                    Type = "bug",
                                    UserName = "Sri",
                                    UserEmail = "s@k.com",
                                    IsReady = true,
                                    Estimate = "1½"
                                }
                            },
                            new[]
                            {
                                new CardViewModel()
                                {
                                    Title = "Do It",
                                    Description = "Make it happen",
                                    Type = "task",
                                    UserName = "Peter",
                                    UserEmail = "p@s.com",
                                    IsReady = true,
                                    Estimate = "2¾",
                                    Labels = new[]
                                    {
                                        new LabelViewModel()
                                        {
                                            Text = "Solid 5 out of 7",
                                            Type = "danger"
                                        },
                                        new LabelViewModel()
                                        {
                                            Text = "Meta",
                                            Type = "info"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var allCards = vm.Swimlanes
                .SelectMany(s => s.Cards.SelectMany(c => c));

            var id = 1;
            foreach (var card in allCards)
                card.Id = projectId + "-" + id++;

            return vm;
        }
    }
}
