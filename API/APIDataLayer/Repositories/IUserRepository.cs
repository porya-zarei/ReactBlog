using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public interface IUserRepository : IDisposable
    {

        IEnumerable<User> GetAllUsers();
       
        User GetUserById(int userId);

        Tuple<User,string> GetUserInLogin(LoginUser loginUser);

        bool AddUser(User user);

        bool UpdateUser(User user);

        bool DeleteUser(User user);

        bool DeleteUser(int userId);

        bool CheckUser(string email);

        void Save();

        IEnumerable<User> TopUsers(int take = 4);

        User GetUserByIdentity(string identity);

        bool IsAdmin(string oldToken);
    }
}
