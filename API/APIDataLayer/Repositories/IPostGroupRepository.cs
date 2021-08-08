using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public interface IPostGroupRepository : IDisposable
    {
        IEnumerable<PostGroup> GetAllGroups();

        PostGroup GetGroupById(int groupId);

        bool InsertGroup(PostGroup postGroup);
        bool UpdateGroup(PostGroup postGroup);
        bool DeleteGroup(PostGroup postGroup);
        bool DeleteGroup(int groupId);
        void Save();
        IEnumerable<ShowGroupViewModel> GetGroupsForView();
    }
}
