using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class UserRepository : IUserRepository
    {
        private EinsteinContext db;

        public UserRepository(EinsteinContext context)
        {
            db = context;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return db.Users;
        }

        public User GetUserById(int userId)
        {
            var user = db.Users.Find(userId);
            return user;
        }

        public User GetUserByIdentity(string identity)
        {
            var user = db.Users.Where(u => u.Identity == identity).First();
            return user;
        }

        public Tuple<User, string> GetUserInLogin(LoginUser loginUser)
        {
            try
            {
                var user = db.Users.FirstOrDefault(u => u.Email == loginUser.Email);
                if (user == null)
                {
                    Tuple<User, string> res = new Tuple<User, string>(null, "dosent exist");
                    return res;
                }
                else if (user.Password == loginUser.Password)
                {
                    Tuple<User, string> res = new Tuple<User, string>(user, "exist");
                    return res;
                }
                else
                {
                    Tuple<User, string> res = new Tuple<User, string>(null, "password incorrect");
                    return res;
                }
            }
            catch (Exception)
            {
                Tuple<User, string> res = new Tuple<User, string>(null, "error");
                return res;
            }
        }

        public bool AddUser(User user)
        {
            try
            {
                db.Users.Add(user);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteUser(User user)
        {
            try
            {
                db.Users.Remove(user);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteUser(int userId)
        {
            var user = db.Users.Find(userId);

            try
            {
                DeleteUser(user);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateUser(User user)
        {
            try
            {
                var oldUser = db.Users.Find(user.Identity);
                db.Users.Update(oldUser).CurrentValues.SetValues(user);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public IEnumerable<User> TopUsers(int take = 4)
        {
            var top = db.Users.Where(u => u.Posts.Count > take);
            return top;
        }

        public bool CheckUser(string email)
        {
            try
            {
                var user = db.Users.Where(u => u.Email == email).First();
                if (user != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void Dispose()
        {
            db.Dispose();
        }

        public bool IsAdmin(string identity)
        {
            var user = db.Users.Find(identity);
            if (user.Role == Roles.Creator || user.Role == Roles.Admin)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}