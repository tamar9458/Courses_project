using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : ControllerBase
    {
        public static List<Lecturer> lecturers = new List<Lecturer>
        { new Lecturer("aaa","aaa", "ruty@gmail.com", "123"),
            new Lecturer("shani", "bbb", "shani@gmail.com", "22222") };
        // GET: api/<LectureController>
        [HttpGet]
        public IEnumerable<Lecturer> Get()
        {
            return lecturers;
        }

        // GET api/<LectureController>/5
        //[HttpGet("{id}")]
        //public Lecturer Get(int id)
        //{
        //    var lec=lecturers.Find(x => x.Id == id);
        //    if (lec != null)
        //        return lec;
        //    return null;
        //}

        [HttpGet("{name}")]
        public Lecturer Get(string name)
        {
            var lec = lecturers.Find(n => name == n.UserName);
            if (lec != null)
                return lec;
            return new Lecturer("_");
        }
        // POST api/<LectureController>
        [HttpPost]
        public bool Post([FromBody] Lecturer value)
        {
            var lec = lecturers.Find(n => n.UserName == value.UserName);
            if (lec == null)
            {
                lecturers.Add(value);
                return true;
            }
            return false;
        }

        // PUT api/<LectureController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Lecturer value)
        {
            var lec=lecturers.Find(x=>x.Id == id);
            if(lec != null)
            {
                lec.Email = value.Email;
                lec.Address = value.Address;    
                lec.UserName= value.UserName;
                lec.Password= value.Password;
                return true;
            }
            return false;
        }

        // DELETE api/<LectureController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var lec=lecturers.Find(x=> x.Id == id);
            if (lec != null)
            { lecturers.Remove(lec); 
            return true;
            }
            return false;
        }
    }
}
