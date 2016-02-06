using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PlacementTracker.Startup))]
namespace PlacementTracker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
