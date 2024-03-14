using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<User> users = new List<User> { new User("Example", "Yona st. Jerusalem , Israel", "ry@gmail.com", "123") };
        // GET: api/<UserController>
        [HttpGet]
        public User[] Get()
        {
            return users.ToArray();
        }

        // GET api/<UserController>/5
        [HttpGet("{name}")]
        public User Get(string name)
        {
            //var user= users.Find(x => x.Id == id);
            var user=users.Find(n=>name == n.UserName);
            if(user != null) 
                return user;
            return new User("_");
        }

        // POST api/<UserController>
        [HttpPost]
        public bool Post([FromBody] User value)
        {
            var user= users.Find(n=>n.UserName == value.UserName);
            if(user == null) {
            users.Add(value);
            return true; }
            return false;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] User value)
        {
            var user=users.Find(x => x.Id == id);
            if(user != null)
            {
                user.Address = value.Address;
                user.Password = value.Password;
                user.UserName = value.UserName;
                user.Email= value.Email;
                return true;
            }
            return false;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var user=users.Find(x=>x.Id == id);
            if(user != null) { 
                users.Remove(user);
                return true;
            }
            return false;
        }
    }
}
