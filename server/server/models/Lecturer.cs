﻿namespace server.models
{
    public class Lecturer
    {
        static int index = 0;
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Lecturer(string userName,string address,string email,string password)
        {
            Id = index++;
            UserName = userName;
            Address = address;
            Email = email;
            Password = password;
        }
        public Lecturer(string name)
        {
            UserName = name;
            Id = index++;
        }
        public Lecturer()
        {
            
        }
    }
}
