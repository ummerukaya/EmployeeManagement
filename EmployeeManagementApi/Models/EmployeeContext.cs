﻿using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options):base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set;}
        public DbSet<Designation> Designations { get; set;}
    }
}
