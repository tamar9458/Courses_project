﻿using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public static List<Course> courses = new List<Course> { new Course("AAA", 1, 10, new DateTime(), new string[] { "aaa" }, LearningType.FRONTAL, 1, "image.png"),
        new Course("BBB", 2, 20, new DateTime(), new string[] { "bbb","bbb" }, LearningType.ZOOM, 2, "image2.png")};
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
