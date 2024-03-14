using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public static List<Course> courses = new List<Course> { new Course("English", 1, 10, new DateTime(), new string[] { "a-f chracters" }, LearningType.FRONTAL, 1, "assets/english.jpg"),
        new Course("Math", 2, 20, new DateTime(), new string[] { "graph","sqrt schema" }, LearningType.ZOOM, 2, "assets/math.jpg")};
        // GET: api/<CourseController>
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return courses;
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public Course Get(int id)
        {
            var course= courses.Find(x=>x.Id==id);
            if(course!=null)
                return course;
            return null;
        }
        // GET api/<CourseController>/5
        [HttpGet("type/{t}")]
        public List<Course> GetType(int t)
        {
            if(t==-1) return courses;
            var course = courses.Where(x => (int)x.LearningType == t).ToList();
            if (course != null && course.Count() > 0)
                return course;
            return null;
        }
        // GET api/<CourseController>/5
        [HttpGet("category/{c}")]
        public List<Course> GetCategory(int c)
        {
            if(c==-1) return courses;
            var course = courses.Where(x => x.CategoryId == c).ToList();
            if (course != null &&course.Count()>0)
                return course;
            return null;
        }  // GET api/<CourseController>/5
        [HttpGet("name/{name}")]
        public List<Course> GetByName(string name)
        {
            var course = courses.Where(x => x.Name.IndexOf(name)!=-1).ToList();
            if (!name.Equals("_")&&course != null)
                return course;
            return courses;
        }

        // POST api/<CourseController>
        [HttpPost]
        public bool Post([FromBody] Course value)
        {
            courses.Add(value);
            return true;
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Course value)
        {
            var course=courses.Find(x=>x.Id==id);
            if (course != null)
            {
                course.LecturerId = value.LecturerId;
                course.Image=value.Image;
                course.Name=value.Name;
                course.Amount=value.Amount;
                course.BeginDate=value.BeginDate;
                course.CategoryId=value.CategoryId;
                course.LearningType=value.LearningType;
                course.Syllabus=value.Syllabus;
                return true;
            }
            return false;
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var course = courses.Find(x => x.Id == id);
            if (course != null)
            {
                courses.Remove(course);
                return true;
            }
            return false;
        }
    }
}
