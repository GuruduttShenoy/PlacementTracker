using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PlacementTracker.Models;

namespace PlacementTracker.ViewModel
{
    public class EmployeeViewModel
    {
        public Employee employee { get; set; }

        public List<Employee> employees { get; set; }
    }
}